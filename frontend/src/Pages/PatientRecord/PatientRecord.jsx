import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./PatientRecord.css";

const API_URL = "http://localhost:5000";

const PatientRecord = () => {
  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone");

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError("");
      setPatient(null);

      if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
        setError("Invalid mobile number. Please return and try again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/patients/history`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to retrieve patient records."
          );
        }

        if (!data.success || !data.patient) {
          throw new Error("No patient records found for this number.");
        }

        setPatient(data.patient);
      } catch (err) {
        console.error("Patient history error:", err);

        setError(
          err.message === "Failed to fetch"
            ? "Unable to connect to the server. Please check whether the backend is running."
            : err.message || "Something went wrong while loading records."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [phone]);

  const openReport = (patientId, reportId) => {
    if (!patientId || !reportId) {
      setError("Patient or report ID is missing.");
      return;
    }

    const url =
      `${API_URL}/api/patients/report/` +
      `${encodeURIComponent(patientId)}/${encodeURIComponent(reportId)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <main className="records-page">
        <div className="records-message">
          <h2>Loading your records...</h2>
          <p>Please wait while we retrieve your patient history.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="records-page">
        <div className="records-message">
          <h2>Unable to show records</h2>
          <p>{error}</p>
          <button onClick={() => window.history.back()}>
            Go Back
          </button>
        </div>
      </main>
    );
  }

  if (!patient) {
    return (
      <main className="records-page">
        <div className="records-message">
          <h2>No Records Found</h2>
          <p>No patient records were found for this mobile number.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="records-page">
      <header className="records-header">
        <div className="records-logo">✚</div>

        <div>
          <p className="records-eyebrow">PATIENT PORTAL</p>
          <h1>My Health Records</h1>
          <p>
            Your treatment details and medical reports in one place.
          </p>
        </div>
      </header>

      <section className="records-card">
        <div className="records-card-heading">
          <div className="patient-avatar">
            {patient.name?.charAt(0)?.toUpperCase() || "P"}
          </div>

          <div>
            <h2>{patient.name}</h2>
            <p>Patient Treatment Record</p>
          </div>
        </div>

        <div className="records-details">
          <div>
            <span>Mobile Number</span>
            <strong>{patient.phone}</strong>
          </div>

          <div>
            <span>Age</span>
            <strong>{patient.age} years</strong>
          </div>

          <div>
            <span>Gender</span>
            <strong>{patient.gender}</strong>
          </div>

          <div>
            <span>Health Concern</span>
            <strong>{patient.problem}</strong>
          </div>
        </div>

        <div className="records-report-section">
          <h3>Medical Reports</h3>

          <p className="records-report-subtitle">
            Reports uploaded by your clinic
          </p>

          {patient.reports?.length > 0 ? (
            <div className="records-report-list">
              {patient.reports.map((report) => (
                <div
                  className="records-report-item"
                  key={report.id}
                >
                  <div className="pdf-icon">PDF</div>

                  <div className="pdf-info">
                    <strong>{report.originalName}</strong>

                    <span>
                      {report.size
                        ? `${(report.size / 1024).toFixed(1)} KB`
                        : "Medical document"}
                    </span>

                    {report.uploadedAt && (
                      <span>
                        Uploaded:{" "}
                        {new Date(report.uploadedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="records-view-button"
                    onClick={() =>
                      openReport(patient.id, report.id)
                    }
                  >
                    View Report ↗
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No reports have been uploaded yet.</p>
          )}
        </div>
      </section>

      <footer className="records-footer">
        Your health information deserves privacy and care.
      </footer>
    </main>
  );
};

export default PatientRecord;