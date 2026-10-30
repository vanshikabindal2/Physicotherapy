
import { useState } from "react";
import "./Admin.css";
import PatientForm from "../PatientForm/PatientForm";
function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email.trim() === "admin@gmail.com" &&
      password === "Admin@123"
    ) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid email or password!");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setShowPatientForm(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  // Patient form screen
  if (loggedIn && showPatientForm) {
    return (
      <div>
        <div className="patient-back-bar">
          <button
            type="button"
            onClick={() => setShowPatientForm(false)}
          >
            ← Back to Admin
          </button>

          <button
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <PatientForm />
      </div>
    );
  }

  // Successful login screen
  if (loggedIn) {
    return (
      <div className="admin-welcome-page">
        <div className="welcome-card">
          <div className="welcome-icon">✓</div>

          <p className="login-subtitle">
            PHYSIOCARE ADMIN PORTAL
          </p>

          <h1>Welcome, Admin!</h1>

          <p>
            You have successfully logged in.
            You can now manage patient information and medical reports.
          </p>

          <button
            type="button"
            className="login-button"
            onClick={() => setShowPatientForm(true)}
          >
            Add Patient Information →
          </button>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Login screen
  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="login-logo">✚</div>

        <p className="login-subtitle">
          PHYSIOTHERAPY MANAGEMENT
        </p>

        <h1>Admin Login</h1>

        <p className="login-description">
          Sign in to manage patient information
          and medical reports.
        </p>

        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email ID</label>

          <input
            id="email"
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="login-error">{error}</p>
          )}

          <button
            type="submit"
            className="login-button"
          >
            Login to Admin Panel →
          </button>
        </form>

        <p className="login-footer">
          PhysioCare · Admin Portal
        </p>
      </div>
    </div>
  );
}

export default Admin;
