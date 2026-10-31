import React, { useState } from "react";
import "./PatientHistory.css";

const PatientHistory = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const mobile = phone.trim();

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Open the tab during the user click to avoid popup blocking.
    const recordsTab = window.open("about:blank", "_blank");

    if (recordsTab) {
      recordsTab.document.title = "Loading Patient Records";
      recordsTab.document.body.innerHTML =
        "<p style='font-family:Arial;padding:30px'>Loading patient records...</p>";
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://physicotherapy-wvwm.vercel.app/api/patients/history",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone: mobile }),
        }
      );

      // Safely parse the response so HTML errors are easier to identify.
      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          "Server returned an invalid response. Check the backend URL and API route."
        );
      }

      if (!response.ok) {
        throw new Error(data.message || "Patient history not found.");
      }

      if (!data.patient) {
        throw new Error("No patient records found.");
      }

      const recordsUrl =
        `${window.location.origin}/patient-records?phone=` +
        encodeURIComponent(mobile);

      if (recordsTab && !recordsTab.closed) {
        recordsTab.location.href = recordsUrl;
      } else {
        window.open(recordsUrl, "_blank");
      }

      setMessage("Patient records opened in a new tab.");
    } catch (error) {
      if (recordsTab && !recordsTab.closed) {
        recordsTab.close();
      }

      console.error("Patient history error:", error);

      setMessage(
        error.message === "Failed to fetch"
          ? "Unable to connect to the server. Check whether the backend is running."
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="patient-history-page">
      <div className="patient-history-overlay"></div>

      <div className="patient-history-layout">
        <div className="patient-history-intro">
          <span className="patient-eyebrow">YOUR HEALTH JOURNEY</span>

          <h1>
            Your Health.
            <br />
            Your <span>History.</span>
          </h1>

          <p className="patient-description">
            Everything about your recovery, all in one place.
            Access your treatment details, progress notes and
            medical reports with ease.
          </p>

          <div className="patient-benefits">
            <div className="patient-benefit">
              <span className="benefit-icon">✚</span>
              <div>
                <h3>Treatment History</h3>
                <p>Review your previous treatment details.</p>
              </div>
            </div>

            <div className="patient-benefit">
              <span className="benefit-icon">↗</span>
              <div>
                <h3>Recovery Progress</h3>
                <p>Keep track of your recovery journey.</p>
              </div>
            </div>

            <div className="patient-benefit">
              <span className="benefit-icon">▤</span>
              <div>
                <h3>Medical Reports</h3>
                <p>View reports uploaded by your clinic.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="patient-form-card">
          <div className="patient-form-icon">♡</div>

          <span className="form-eyebrow">PATIENT PORTAL</span>

          <h2>Welcome Back!</h2>

          <p className="form-description">
            Enter your registered mobile number to access
            your patient history.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="patient-phone">
              Registered Mobile Number
            </label>

            <div className="patient-phone-field">
              <span className="country-code">+91</span>

              <input
                id="patient-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="Enter your mobile number"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                maxLength={10}
                required
              />
            </div>

            <button
              type="submit"
              className="patient-submit-btn"
              disabled={loading}
            >
              {loading ? "Checking..." : "View Patient History"}
              {!loading && <span> →</span>}
            </button>

            {message && (
              <p
                className="patient-status-message"
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            )}
          </form>

          <div className="patient-privacy">
            <span className="privacy-lock">♧</span>
            <p>
              Access your health records through your clinic's
              patient portal.
            </p>
          </div>

          <div className="patient-card-footer">
            Need help accessing your records? Contact your clinic.
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientHistory;