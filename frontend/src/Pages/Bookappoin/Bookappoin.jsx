
import React, { useState } from "react";
import "./Bookappoin.css";

const Bookappoin = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    treatment: "",
    therapist: "",
    date: "",
    time: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(true);

    console.log("Appointment Details:", formData);
  };

  const today = new Date().toLocaleDateString("en-CA");

  return (
    <main className="booking-page">
      {/* Hero Section */}
     

      {/* Main Booking Section */}
      <section className="booking-section">
        <div className="booking-heading">
          <span className="booking-section-label">
            APPOINTMENT FORM
          </span>

          <h2>Let's Get You Moving</h2>

          <p>
            Fill in your details below to request your appointment.
          </p>
        </div>

        <div className="booking-layout">
          {/* Left Information Card */}
          <aside className="booking-info">
            <span className="booking-info-tag">
              PHYSIOTHERAPY CARE
            </span>

            <h3>
              Start Your Journey to Better Movement
            </h3>

            <p>
              Whether you're recovering from an injury or managing
              pain, we're here to help you move better.
            </p>

            <div className="booking-benefits">
              <div className="booking-benefit">
                <span>01</span>
                <div>
                  <h4>Personalized Care</h4>
                  <p>Treatment tailored to your needs.</p>
                </div>
              </div>

              <div className="booking-benefit">
                <span>02</span>
                <div>
                  <h4>Expert Guidance</h4>
                  <p>Support throughout your recovery.</p>
                </div>
              </div>

              <div className="booking-benefit">
                <span>03</span>
                <div>
                  <h4>Convenient Scheduling</h4>
                  <p>Choose a suitable date and time.</p>
                </div>
              </div>
            </div>

            <div className="booking-help">
              <span className="booking-help-icon">☎</span>
              <div>
                <p>Need help with booking?</p>
                <strong>Contact our clinic</strong>
              </div>
            </div>
          </aside>

          {/* Appointment Form */}
          <div className="booking-form-card">
            <div className="booking-form-title">
              <div>
                <h3>Appointment Details</h3>
                <p>Please complete all required fields.</p>
              </div>

              <span className="booking-form-symbol">✚</span>
            </div>

            {success ? (
              <div className="booking-success" role="status">
                <span className="booking-success-icon">✓</span>
                <h3>Request Submitted!</h3>
                <p>
                  Your form has been completed successfully.
                  Please connect this form to your backend or
                  booking service to confirm the appointment.
                </p>

                <button
                  type="button"
                  className="booking-submit-btn"
                  onClick={() => setSuccess(false)}
                >
                  Back to Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="booking-form-grid">
                  <div className="booking-field">
                    <label htmlFor="booking-name">
                      Full Name <span>*</span>
                    </label>

                    <input
                      id="booking-name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="booking-field">
                    <label htmlFor="booking-phone">
                      Phone Number <span>*</span>
                    </label>

                    <input
                      id="booking-phone"
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      title="Please enter a 10-digit phone number"
                      required
                    />
                  </div>

                  <div className="booking-field booking-full">
                    <label htmlFor="booking-email">
                      Email Address
                    </label>

                    <input
                      id="booking-email"
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </div>

                  <div className="booking-field">
                    <label htmlFor="booking-treatment">
                      Select Treatment <span>*</span>
                    </label>

                    <select
                      id="booking-treatment"
                      name="treatment"
                      value={formData.treatment}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choose treatment</option>
                      <option value="Back Pain">Back Pain</option>
                      <option value="Neck Pain">Neck Pain</option>
                      <option value="Sports Injury">Sports Injury</option>
                      <option value="Post Surgery Rehab">
                        Post Surgery Rehabilitation
                      </option>
                      <option value="Joint Pain">Joint Pain</option>
                      <option value="Neurological Rehab">
                        Neurological Rehabilitation
                      </option>
                      <option value="General Physiotherapy">
                        General Physiotherapy
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="booking-field">
                    <label htmlFor="booking-therapist">
                      Preferred Therapist
                    </label>

                    <select
                      id="booking-therapist"
                      name="therapist"
                      value={formData.therapist}
                      onChange={handleChange}
                    >
                      <option value="">Any available therapist</option>
                      <option value="Male Therapist">
                        Male Therapist
                      </option>
                      <option value="Female Therapist">
                        Female Therapist
                      </option>
                    </select>
                  </div>

                  <div className="booking-field">
                    <label htmlFor="booking-date">
                      Appointment Date <span>*</span>
                    </label>

                    <input
                      id="booking-date"
                      type="date"
                      name="date"
                      min={today}
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="booking-field">
                    <label htmlFor="booking-time">
                      Preferred Time <span>*</span>
                    </label>

                    <select
                      id="booking-time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select time slot</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                    </select>
                  </div>

                  <div className="booking-field booking-full">
                    <label htmlFor="booking-message">
                      Tell Us About Your Problem
                    </label>

                    <textarea
                      id="booking-message"
                      name="message"
                      placeholder="Briefly describe your pain or concern..."
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <p className="booking-required-note">
                  <span>*</span> Required fields
                </p>

                <button type="submit" className="booking-submit-btn">
                  Book Appointment
                  <span aria-hidden="true"> →</span>
                </button>

                <p className="booking-privacy">
                  Your details will be used to manage your appointment
                  request.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Bookappoin;
