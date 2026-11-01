require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");

const Patient = require("./models/Patient");
const cloudinary = require("./config/cloudinary");

const app = express();
const PORT = process.env.PORT || 5000;

// =====================================
// CORS MIDDLEWARE
// =====================================


app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Frontend Origin:", origin);

      const allowedOrigins = [
        "https://physicotherapy.vercel.app",
        "https://physicotherapy-a8rqpzc6q-vanshikabindal2s-projects.vercel.app",
        process.env.FRONTEND_URL,
        "http://localhost:5173",
        "http://localhost:5174",
      ].filter(Boolean);

      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS blocked: " + origin));
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);


// =====================================
// BODY PARSER
// =====================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================
// MONGODB CONNECTION
// =====================================

let dbConnectionPromise = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in .env file");
  }

  if (!dbConnectionPromise) {
    dbConnectionPromise = mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("MongoDB connected successfully");
      })
      .catch((error) => {
        dbConnectionPromise = null;

        console.error(
          "MongoDB connection error:",
          error.message
        );

        throw error;
      });
  }

  return dbConnectionPromise;
}

// =====================================
// DATABASE MIDDLEWARE
// =====================================

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// =====================================
// MULTER MEMORY STORAGE
// =====================================

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const isPDF =
    file.mimetype === "application/pdf" &&
    file.originalname.toLowerCase().endsWith(".pdf");

  if (!isPDF) {
    return cb(
      new Error("Only PDF files are allowed")
    );
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 10,
  },
});

// =====================================
// CLOUDINARY PDF UPLOAD
// =====================================

function uploadPDFToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "physiotherapy-reports",
          format: "pdf",
        },
        (error, result) => {
          if (error) {
            console.error(
              "Cloudinary upload error:"
            );

            console.dir(error, { depth: 10 });

            return reject(error);
          }

          console.log(
            "Cloudinary PDF upload successful:",
            result.public_id
          );

          resolve({
            originalName: file.originalname,
            publicId: result.public_id,
            resourceType: result.resource_type,
            format: result.format,
            size: file.size,
            uploadedAt: new Date(),
          });
        }
      );

    uploadStream.end(file.buffer);
  });
}

// =====================================
// DELETE CLOUDINARY REPORTS
// =====================================

async function deleteCloudinaryReports(reports) {
  for (const report of reports) {
    try {
      if (report.publicId) {
        await cloudinary.uploader.destroy(
          report.publicId,
          {
            resource_type:
              report.resourceType || "raw",
            type: "upload",
          }
        );

        console.log(
          "Deleted Cloudinary file:",
          report.publicId
        );
      }
    } catch (error) {
      console.error(
        "Cloudinary cleanup error:",
        error.message
      );
    }
  }
}

// =====================================
// HOME ROUTE
// =====================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Physiotherapy API is running",
  });
});

// =====================================
// CLOUDINARY CONNECTION TEST
// =====================================

app.get("/upload-direct-test", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
      {
        resource_type: "image",
      }
    );

    return res.json({
      success: true,
      message: "Cloudinary connection successful",
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Cloudinary test error:");
    console.dir(error, { depth: 10 });

    return res.status(500).json({
      success: false,
      message: error.message,
      http_code: error.http_code,
      name: error.name,
    });
  }
});

// =====================================
// ADD PATIENT + UPLOAD REPORTS
// =====================================

app.post(
  "/api/patients",
  upload.array("reports", 10),
  async (req, res) => {
    const uploadedReports = [];

    try {
      const {
        name,
        phone,
        age,
        gender,
        problem,
      } = req.body;

      const files = req.files || [];

      console.log(
        "\n========== NEW PATIENT REQUEST =========="
      );

      console.log("Files received:", files.length);

      // Validate patient details

      if (
        !name ||
        !phone ||
        !age ||
        !gender ||
        !problem
      ) {
        return res.status(400).json({
          success: false,
          message: "Please fill all patient details",
        });
      }

      if (!/^[6-9][0-9]{9}$/.test(phone.trim())) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid 10-digit mobile number",
        });
      }

      if (files.length === 0) {
        return res.status(400).json({
          success: false,
          message:
            "Please upload at least one PDF report",
        });
      }

      // Upload PDFs to Cloudinary

      for (const file of files) {
        console.log(
          "Uploading:",
          file.originalname
        );

        const uploadedFile =
          await uploadPDFToCloudinary(file);

        uploadedReports.push(uploadedFile);
      }

      // Save patient in MongoDB

      const patient = new Patient({
        name: name.trim(),
        phone: phone.trim(),
        age: Number(age),
        gender,
        problem,
        reports: uploadedReports,
      });

      await patient.save();

      console.log(
        "Patient saved successfully:",
        patient._id
      );

      return res.status(201).json({
        success: true,
        message:
          "Patient and reports saved successfully",
        patient,
      });
    } catch (error) {
      console.error(
        "PATIENT SAVE ERROR:",
        error.message
      );

      await deleteCloudinaryReports(
        uploadedReports
      );

      return res.status(500).json({
        success: false,
        message:
          error.message || "Unable to save patient",
      });
    }
  }
);

// =====================================
// PATIENT HISTORY BY PHONE NUMBER
// =====================================

app.post(
  "/api/patients/history",
  async (req, res) => {
    try {
      const { phone } = req.body;

      if (
        !phone ||
        !/^[6-9][0-9]{9}$/.test(phone.trim())
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid 10-digit mobile number",
        });
      }

      console.log(
        "Patient history requested for:",
        phone
      );

      const patient = await Patient.findOne({
        phone: phone.trim(),
      });

      if (!patient) {
        return res.status(404).json({
          success: false,
          message: "No patient record found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Patient history found",
        patient,
      });
    } catch (error) {
      console.error(
        "Patient history error:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to fetch patient history",
      });
    }
  }
);

// =====================================
// VIEW / DOWNLOAD PATIENT PDF REPORT
// =====================================

app.get(
  "/api/patients/report/:patientId/:reportId",
  async (req, res) => {
    try {
      const {
        patientId,
        reportId,
      } = req.params;

      if (
        !mongoose.Types.ObjectId.isValid(patientId) ||
        !mongoose.Types.ObjectId.isValid(reportId)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid patient or report ID",
        });
      }

      const patient = await Patient.findById(
        patientId
      );

      if (!patient) {
        return res.status(404).json({
          success: false,
          message: "Patient not found",
        });
      }

      const report = patient.reports.id(reportId);

      if (!report || !report.publicId) {
        return res.status(404).json({
          success: false,
          message: "Report not found",
        });
      }

      const reportUrl = cloudinary.url(
        report.publicId,
        {
          resource_type:
            report.resourceType || "raw",

          type: "upload",

          secure: true,
        }
      );

      return res.redirect(reportUrl);
    } catch (error) {
      console.error(
        "Report access error:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message: "Unable to open report",
      });
    }
  }
);

// =====================================
// MULTER ERROR HANDLER
// =====================================

app.use((error, req, res, next) => {
  console.error(
    "Request error:",
    error.message
  );

  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message:
        error.code === "LIMIT_FILE_SIZE"
          ? "Each PDF must be smaller than 5 MB"
          : error.message,
    });
  }

  return res.status(400).json({
    success: false,
    message:
      error.message || "Something went wrong",
  });
});

// =====================================
// SERVER
// =====================================

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}`
    );

    console.log(
      "CORS enabled for localhost development ports"
    );
  });
}

module.exports = app;
