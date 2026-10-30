
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const Patient = require("./models/Patient");

const app = express();
const PORT = process.env.PORT || 5000;

// =====================================
// MIDDLEWARE
// =====================================

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5174",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "1mb" }));

// =====================================
// PRIVATE PDF DIRECTORY
// =====================================

const reportsDirectory = path.join(__dirname, "private-reports");

fs.mkdirSync(reportsDirectory, { recursive: true });

// =====================================
// MULTER PDF UPLOAD CONFIGURATION
// =====================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, reportsDirectory);
  },

  filename: (req, file, cb) => {
    cb(null, `${crypto.randomUUID()}.pdf`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 10,
  },

  fileFilter: (req, file, cb) => {
    const isPdf =
      file.mimetype === "application/pdf" &&
      path.extname(file.originalname).toLowerCase() === ".pdf";

    if (!isPdf) {
      return cb(new Error("Only PDF files are allowed."));
    }

    cb(null, true);
  },
});

// =====================================
// DELETE FILES IF REGISTRATION FAILS
// =====================================

function deleteUploadedFiles(files) {
  if (!files) return;

  for (const file of files) {
    if (file.path && fs.existsSync(file.path)) {
      try {
        fs.unlinkSync(file.path);
      } catch (error) {
        console.error("Unable to delete uploaded file:", error);
      }
    }
  }
}

// =====================================
// SERVER HEALTH CHECK
// =====================================

app.get("/", (req, res) => {
  res.status(200).send("Physiotherapy backend is running.");
});

// =====================================
// REGISTER PATIENT + UPLOAD PDF REPORTS
// =====================================

app.post(
  "/api/patients",
  upload.array("reports", 10),
  async (req, res) => {
    const files = req.files || [];

    try {
      const { name, phone, age, gender, problem } = req.body;

      if (
        !name?.trim() ||
        !phone ||
        !age ||
        !gender ||
        !problem?.trim()
      ) {
        deleteUploadedFiles(files);

        return res.status(400).json({
          success: false,
          message: "Please fill in all patient details.",
        });
      }

      if (!/^[6-9]\d{9}$/.test(phone)) {
        deleteUploadedFiles(files);

        return res.status(400).json({
          success: false,
          message: "Enter a valid 10-digit mobile number.",
        });
      }

      const patientAge = Number(age);

      if (
        !Number.isInteger(patientAge) ||
        patientAge < 1 ||
        patientAge > 120
      ) {
        deleteUploadedFiles(files);

        return res.status(400).json({
          success: false,
          message: "Enter a valid patient age.",
        });
      }

      if (!["Male", "Female", "Other"].includes(gender)) {
        deleteUploadedFiles(files);

        return res.status(400).json({
          success: false,
          message: "Select a valid gender.",
        });
      }

      if (files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please upload at least one PDF report.",
        });
      }

      const reports = files.map((file) => ({
        originalName: path.basename(file.originalname),
        filename: file.filename,
        size: file.size,
        uploadedAt: new Date(),
      }));

      const patient = await Patient.create({
        name: name.trim(),
        phone,
        age: patientAge,
        gender,
        problem: problem.trim(),
        reports,
      });

      return res.status(201).json({
        success: true,
        message: "Patient details and reports saved successfully.",
        patient: {
          id: patient._id.toString(),
          name: patient.name,
          phone: patient.phone,
          reportsCount: patient.reports.length,
        },
      });
    } catch (error) {
      deleteUploadedFiles(files);

      console.error("Patient registration error:", error);

      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Unable to save patient details.",
      });
    }
  }
);

// =====================================
// FIND PATIENT HISTORY USING PHONE
// =====================================

app.post("/api/patients/history", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit mobile number.",
      });
    }

    const patient = await Patient.findOne({ phone });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "No patient records found for this number.",
      });
    }

    return res.status(200).json({
      success: true,
      patient: {
        id: patient._id.toString(),
        name: patient.name,
        phone: patient.phone,
        age: patient.age,
        gender: patient.gender,
        problem: patient.problem,

        reports: patient.reports.map((report) => ({
          id: report._id.toString(),
          originalName: report.originalName,
          size: report.size,
          uploadedAt: report.uploadedAt,
        })),
      },
    });
  } catch (error) {
    console.error("Patient history error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve patient history.",
    });
  }
});

// =====================================
// OPEN PATIENT PDF REPORT
// =====================================

app.get(
  "/api/patients/report/:patientId/:reportId",
  async (req, res) => {
    try {
      const { patientId, reportId } = req.params;

      if (
        !/^[a-f\d]{24}$/i.test(patientId) ||
        !/^[a-f\d]{24}$/i.test(reportId)
      ) {
        return res.status(400).send("Invalid patient or report ID.");
      }

      const patient = await Patient.findById(patientId);

      if (!patient) {
        return res.status(404).send("Patient not found.");
      }

      const report = patient.reports.id(reportId);

      if (!report) {
        return res.status(404).send("Report not found.");
      }

      const safeFilename = path.basename(report.filename);
      const filePath = path.join(reportsDirectory, safeFilename);

      if (!fs.existsSync(filePath)) {
        return res.status(404).send("PDF file not found.");
      }

      const stats = fs.statSync(filePath);

      if (!stats.isFile() || stats.size === 0) {
        return res.status(404).send("PDF file is unavailable.");
      }

      res.status(200);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${path.basename(report.originalName)}"`
      );
      res.setHeader("Content-Length", stats.size);
      res.setHeader("X-Content-Type-Options", "nosniff");

      const pdfStream = fs.createReadStream(filePath);

      pdfStream.on("error", (error) => {
        console.error("PDF stream error:", error);

        if (!res.headersSent) {
          res.status(500).end("Unable to read PDF file.");
        } else {
          res.destroy(error);
        }
      });

      pdfStream.pipe(res);
    } catch (error) {
      console.error("Report route error:", error);

      if (!res.headersSent) {
        res.status(500).send("Unable to open PDF report.");
      } else {
        res.destroy(error);
      }
    }
  }
);

// =====================================
// ERROR HANDLER
// =====================================

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof multer.MulterError) {
    let message = err.message;

    if (err.code === "LIMIT_FILE_SIZE") {
      message = "Each PDF must be 5 MB or smaller.";
    } else if (err.code === "LIMIT_FILE_COUNT") {
      message = "You can upload a maximum of 10 PDF reports.";
    }

    return res.status(400).json({
      success: false,
      message,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Request failed.",
    });
  }

  next();
});

// =====================================
// CONNECT MONGODB + START SERVER
// =====================================

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from backend/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully.");

    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Backend startup error:", error.message);
    process.exit(1);
  }
}

startServer();
