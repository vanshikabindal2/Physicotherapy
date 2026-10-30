
import React, { useEffect, useState } from "react";
import "./Trustedcare.css";
import { Link } from "react-router-dom";
const slides = [
  "https://medicaldemos2.wpenginepowered.com/physeo/wp-content/uploads/sites/2/2025/07/home2-slider-01.jpg",
  "https://images.pexels.com/photos/20860578/pexels-photo-20860578.jpeg",
  "https://medicaldemos2.wpenginepowered.com/physeo/wp-content/uploads/sites/2/2025/07/home-2-hero-physeo-img.jpg",
];

const helpImage =
  "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=700&q=85";

const smallImages = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=85",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=100&q=85",
  "https://medicaldemos2.wpenginepowered.com/physeo/wp-content/uploads/sites/2/2025/07/home2-guy.png",
];

export default function PhysioHero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="physio-hero">
      <div className="physio-container">

        {/* LEFT SIDE */}
        <div className="physio-left">

          <div
            className="physio-help-card"
            style={{ backgroundImage: `url("${helpImage}")` }}
          >
            <div className="physio-help-overlay">
              <span className="mini-label">PERSONALIZED CARE</span>
              <h2>Physio Help<br />Here</h2>

              <p>
                Restore movement, relieve pain,
                and improve your physical function.
              </p>

              <button
                className="help-arrow"
                aria-label="Explore physiotherapy"
                onClick={() =>
                  document.getElementById("physio-details")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                ↗
              </button>
            </div>
          </div>

          <div className="physio-stats-card">
            <div className="stats-glow" />

            <div className="stats-number">10<span>+</span></div>
            <p>Years of Expertise</p>

            <div className="stats-bottom">
              <div className="doctor-avatars">
                {smallImages.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`Healthcare specialist ${index + 1}`}
                  />
                ))}
                <span className="patient-count">4.5k</span>
              </div>

              <span className="trusted-caption">TRUSTED BY PATIENTS</span>
            </div>
          </div>

        </div>

        {/* LARGE IMAGE SLIDER */}
        <div className="physio-slider">
          {slides.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Physiotherapy care ${index + 1}`}
              className={`physio-slide ${
                activeSlide === index ? "active" : ""
              }`}
            />
          ))}

          <div className="slider-counter">
            0{activeSlide + 1}
            <span className="counter-line" />
            0{slides.length}
          </div>

          <div className="slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`slider-dot ${
                  activeSlide === index ? "active-dot" : ""
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="physio-content" id="physio-details">
          <div className="trusted-label">
            <span className="trusted-line" />
            <span className="trusted-dot" />
            <span>TRUSTED CARE</span>
          </div>

          <h1>
            Pathway To A <span>Pain</span>
            <br />
            <span>Free</span> Life
          </h1>

          <p className="physio-description">
            Our skilled therapists design personalized
            recovery programs just for you. Each plan
            focuses on relieving your pain and restoring
            movement.
          </p>

          <button
            className="appointment-btn"
            onClick={() =>
              document.getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
           <Link to="/book-appointment" className="appointment-btn">
  <span>Set Appointment</span>
  <span className="appointment-icon">↗</span>
</Link>
          </button>

          <div className="content-note">
            <span className="note-dot" />
            Personalized treatment. Meaningful recovery.
          </div>
        </div>

      </div>
    </section>
  );
}
