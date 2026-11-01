import React, { useState } from "react";
import "./PatientForm.css";


const API_URL = "https://physicotherapy-wvwm.vercel.app/api/patients";
const PatientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "",
    problem: "",
  });

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Select and add multiple PDF files
  const handleReportChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const maxSize = 5 * 1024 * 1024; // 5 MB per PDF

    if (selectedFiles.length === 0) return;

    // Validate PDF files
    const invalidFile = selectedFiles.some(
      (file) =>
        file.type !== "application/pdf" ||
        !file.name.toLowerCase().endsWith(".pdf")
    );

    if (invalidFile) {
      setMessage("Only PDF files are allowed.");
      setMessageType("error");
      e.target.value = "";
      return;
    }

    // Validate individual file size
    const oversizedFile = selectedFiles.some(
      (file) => file.size > maxSize
    );

    if (oversizedFile) {
      setMessage("Each PDF must be 5 MB or smaller.");
      setMessageType("error");
      e.target.value = "";
      return;
    }

    // Add new files without removing previously selected files
    setReports((prevReports) => {
      const combinedFiles = [...prevReports, ...selectedFiles];

      // Prevent duplicate selections
      return combinedFiles.filter((file, index, array) => {
        return (
          array.findIndex(
            (item) =>
              item.name === file.name &&
              item.size === file.size &&
              item.lastModified === file.lastModified
          ) === index
        );
      });
    });

    setMessage("");
    setMessageType("");

    // Reset input so files can be selected again
    e.target.value = "";
  };

  // Remove a selected PDF
  const handleRemoveReport = (indexToRemove) => {
    setReports((prevReports) =>
      prevReports.filter((_, index) => index !== indexToRemove)
    );

    setMessage("");
    setMessageType("");
  };

  // Submit patient registration form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    // Validate patient name
    if (!formData.name.trim()) {
      setMessage("Please enter the patient's name.");
      setMessageType("error");
      return;
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(formData.phone)) {
      setMessage("Please enter a valid 10-digit mobile number.");
      setMessageType("error");
      return;
    }

    // Validate age
    const age = Number(formData.age);

    if (!Number.isInteger(age) || age < 1 || age > 120) {
      setMessage("Please enter a valid age between 1 and 120.");
      setMessageType("error");
      return;
    }

    // Validate reports
    if (reports.length === 0) {
      setMessage("Please select at least one PDF report.");
      setMessageType("error");
      return;
    }

    // Create multipart form data
    const data = new FormData();

    data.append("name", formData.name.trim());
    data.append("phone", formData.phone);
    data.append("age", formData.age);
    data.append("gender", formData.gender);
    data.append("problem", formData.problem.trim());

    // Attach all selected PDFs
    reports.forEach((file) => {
      data.append("reports", file);
    });

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        body: data,
      });

      // Read the response as text first
      const responseText = await response.text();

      let result;

      // Safely parse JSON
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error(
          "Backend returned a non-JSON response:",
          responseText
        );

        if (responseText.trim().startsWith("<!DOCTYPE") ||
            responseText.trim().startsWith("<html")) {
          throw new Error(
            "Backend returned an HTML page instead of JSON. Please check the API URL and backend route."
          );
        }

        throw new Error(
          "Invalid response from the backend. Please check the backend terminal."
        );
      }

      // Handle unsuccessful responses
      if (!response.ok) {
        throw new Error(
          result.message || `Request failed with status ${response.status}.`
        );
      }

      // Show success message
      setMessage(
        result.message || "Patient registered successfully!"
      );
      setMessageType("success");

      // Reset form after successful registration
      setFormData({
        name: "",
        phone: "",
        age: "",
        gender: "",
        problem: "",
      });

      setReports([]);

      const fileInput = document.getElementById("reports");

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Patient registration error:", error);

      if (error instanceof TypeError) {
        setMessage(
          "Cannot connect to the backend. Make sure the server is running on port 5000."
        );
      } else {
        setMessage(
          error.message || "Unable to register patient."
        );
      }

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-form-container">
      <form className="patient-form" onSubmit={handleSubmit}>
        <h2>Patient Registration</h2>

        <p className="form-description">
          Enter patient details and upload medical reports.
        </p>

        {/* Success or error message */}
        {message && (
          <div
            className={`form-message ${messageType}`}
            role="alert"
          >
            {message}
          </div>
        )}

        {/* Patient name */}
        <div className="form-group">
          <label htmlFor="name">Patient Name</label>

          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter patient name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mobile number */}
        <div className="form-group">
          <label htmlFor="phone">
            Registered Mobile Number
          </label>

          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Enter 10-digit mobile number"
            value={formData.phone}
            onChange={(e) => {
              const value = e.target.value
                .replace(/\D/g, "")
                .slice(0, 10);

              setFormData((prev) => ({
                ...prev,
                phone: value,
              }));
            }}
            inputMode="numeric"
            maxLength={10}
            required
          />
        </div>

        {/* Age */}
        <div className="form-group">
          <label htmlFor="age">Age</label>

          <input
            id="age"
            type="number"
            name="age"
            placeholder="Enter age"
            min="1"
            max="120"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div className="form-group">
          <label htmlFor="gender">Gender</label>

          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Medical problem */}
        <div className="form-group">
          <label htmlFor="problem">Medical Problem</label>

          <textarea
            id="problem"
            name="problem"
            placeholder="Describe the patient's problem"
            value={formData.problem}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        {/* PDF reports */}
        <div className="form-group">
          <label htmlFor="reports">
            Upload Medical Reports (PDF)
          </label>

          <input
            id="reports"
            type="file"
            accept=".pdf,application/pdf"
            multiple
            onChange={handleReportChange}
            required={reports.length === 0}
          />

          <small>
            PDF only · No file count limit · Maximum 5 MB per file.
            You can add files multiple times.
          </small>

          {/* Selected reports */}
          {reports.length > 0 && (
            <div className="selected-reports">
              <p>
                <strong>{reports.length}</strong> PDF file(s) selected
              </p>

              <ul>
                {reports.map((file, index) => (
                  <li
                    key={`${file.name}-${file.size}-${file.lastModified}`}
                  >
                    <span>
                      {file.name} (
                      {(file.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>

                    <button
                      type="button"
                      className="remove-report-btn"
                      onClick={() => handleRemoveReport(index)}
                      aria-label={`Remove ${file.name}`}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Submit button */}
        <button type="submit" disabled={loading}>
          {loading
            ? "Registering Patient..."
            : "Register Patient"}
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
