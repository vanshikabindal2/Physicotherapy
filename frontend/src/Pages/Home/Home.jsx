
import React, { useEffect, useState } from "react";
import "./Home.css";
import Trustedcare from '../Trustedcare/Trustedcare'
import Human from '../HumanSkel/Human'
import Specializations from "../Specialisedphysico/Specialization";
import Whychooseus from "../Whychooseus/Whychooseus";
import { Link } from "react-router-dom";
const slides = [
  {
    image:
      "https://images.pexels.com/photos/4506214/pexels-photo-4506214.jpeg",
    position: "center 45%",
  },
  {
    image:
      "https://images.pexels.com/photos/20860594/pexels-photo-20860594.jpeg",
    position: "center 45%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2000&q=90",
    position: "center 40%",
  },
];

const features = [
  {
    icon: "clinic",
    title: "Advanced Clinics",
    description:
      "Modern Infrastructure, Latest Technology & Top Physiotherapy Experts",
  },
  {
    icon: "home",
    title: "Professional Home Care",
    description:
      "Physiotherapy at home with expert oversight & Strong quality checks",
  },
  {
    icon: "remote",
    title: "Tele / Remote Rehab",
    description:
      "Personalized Physio exercises at home with Continuous guidance & mentoring",
  },
];

function FeatureIcon({ type }) {
  if (type === "clinic") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 40V17h32v23M5 40h38M15 17v-5h18v5" />
        <path d="M19 24h10M24 19v10M13 31h6v5h-6zM29 31h6v5h-6z" />
        <path d="M20 40v-7h8v7" />
      </svg>
    );
  }

  if (type === "home") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M4 23 24 6l20 17M10 20v21h28V20" />
        <path d="M20 41V28h8v13M16 25h4M28 25h4" />
        <path d="M17 32h3M28 32h3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="5" y="8" width="38" height="27" rx="3" />
      <path d="M15 41h18M24 35v6M12 29h24" />
      <circle cx="17" cy="17" r="3" />
      <circle cx="31" cy="17" r="3" />
      <path d="M12 26c0-4 2-6 5-6s5 2 5 6M26 26c0-4 2-6 5-6s5 2 5 6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M13 5l7 7-7 7" />
    </svg>
  );
}

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const changeSlide = (direction) => {
    setActiveSlide(
      (current) =>
        (current + direction + slides.length) % slides.length
    );
  };

  return (
    <main className="recovery-home">
      {/* HERO SLIDER */}
      <section className="recovery-hero">
        <div className="recovery-backgrounds">
          {slides.map((slide, index) => (
            <div
              key={slide.image}
              className={`recovery-bg ${
                activeSlide === index ? "is-active" : ""
              }`}
              style={{
                backgroundImage: `url("${slide.image}")`,
                backgroundPosition: slide.position,
              }}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="recovery-shade" />

        <div className="hero-decoration hero-decoration-one" />
        <div className="hero-decoration hero-decoration-two" />

        {/* LEFT CONTENT */}
        <div className="recovery-content" key={activeSlide}>
          <div className="recovery-eyebrow">
            <span className="eyebrow-line" />
            <span>MOVE BETTER</span>
            <span className="eyebrow-divider">/</span>
            <span>FEEL STRONGER</span>
            <span className="eyebrow-divider">/</span>
            <span>LIVE HEALTHIER</span>
          </div>

          <h1 className="recovery-title">
           Diagnostics &
            <span className="recovery-script">
              Physiotherapy<span className="title-sparkle">✦</span>
            </span>
          </h1>

          <p className="recovery-description">
            Accurate blood testing and personalized physiotherapy for better health and lasting recovery.
          </p>

          <div className="recovery-actions">
            <Link to='/contact' className="recovery-button primary-button">
              <span>Request Callback</span>
              <span className="recovery-button-icon">
                <ArrowIcon />
              </span>
            </Link>

            <Link
              to='/book-appointment'
              className="recovery-button secondary-button"
            >
              <span>Book Appointment</span>
              <span className="recovery-button-icon">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          {/* TRUST INDICATORS */}
          <div className="recovery-trust">
            <div className="trust-item">
              <span className="trust-icon">
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M16 3 27 7v8c0 7-5 11-11 14C10 26 5 22 5 15V7z" />
                  <path d="m10 16 4 4 8-9" />
                </svg>
              </span>
              <span>
                <strong>Expert Care</strong>
                <small>You Can Trust</small>
              </span>
            </div>

            <div className="trust-item">
              <span className="trust-icon">
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M12 5a5 5 0 0 0-8 4 5 5 0 0 0 0 8 5 5 0 0 0 8 4z" />
                  <path d="M20 5a5 5 0 0 1 8 4 5 5 0 0 1 0 8 5 5 0 0 1-8 4z" />
                  <path d="M16 4v24M8 12h4M20 12h4M8 18h4M20 18h4" />
                </svg>
              </span>
              <span>
                <strong>AI Powered</strong>
                <small>Personalized Plans</small>
              </span>
            </div>

            <div className="trust-item">
              <span className="trust-icon">
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M16 27S3 19 3 10a7 7 0 0 1 13-3 7 7 0 0 1 13 3c0 9-13 17-13 17z" />
                </svg>
              </span>
              <span>
                <strong>Faster Recovery</strong>
                <small>Better Living</small>
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT-SIDE DECORATIVE MESSAGE */}
        <div className="recovery-side-note">
          <span>Your</span>
          <span>Recovery</span>
          <span>Our Mission</span>
          <i />
        </div>

        {/* SLIDER ARROWS */}
        <button
          type="button"
          className="recovery-arrow recovery-arrow-left"
          onClick={() => changeSlide(-1)}
          aria-label="Previous slide"
        >
          &#10094;
        </button>

        <button
          type="button"
          className="recovery-arrow recovery-arrow-right"
          onClick={() => changeSlide(1)}
          aria-label="Next slide"
        >
          &#10095;
        </button>

        {/* SLIDER DOTS */}
        <div className="recovery-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              className={`recovery-dot ${
                activeSlide === index ? "active-dot" : ""
              }`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
            />
          ))}
        </div>

        <div className="hero-bottom-curve" />
      </section>

      {/* BOTTOM FEATURE SECTION */}
      <section className="recovery-features">
        <div className="feature-container">
          {features.map((feature) => (
            <article className="recovery-feature" key={feature.title}>
              <div className="feature-icon-box">
                <FeatureIcon type={feature.icon} />
              </div>

              <div className="feature-content">
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* OUR VISION & MISSION SECTION */}
<section className="home-vision-mission">
  <div className="hvm-container">

    <div className="hvm-heading">
      <span className="hvm-eyebrow">
        <span></span> OUR PURPOSE & PROMISE
      </span>

      <h2>
        Healing With Purpose,
        <br />
        <em>Moving Towards Better.</em>
      </h2>

      <p>
        We believe everyone deserves to move freely, live confidently,
        and enjoy a healthier life. Every step we take is guided by
        compassion, care, and a commitment to your well-being.
      </p>
    </div>

    <div className="hvm-grid">

      {/* VISION */}
      <article className="hvm-card hvm-vision">
        <div className="hvm-card-top">
          <div className="hvm-icon">◎</div>
          <span>01 / OUR VISION</span>
        </div>

        <div className="hvm-card-content">
          <h3>A World Without Movement Limitations.</h3>

          <p>
            Our vision is to create a healthier world where every
            individual can move with confidence, embrace independence,
            and live life to the fullest without physical limitations.
          </p>
        </div>

        <div className="hvm-card-bottom">
          <span>See the possibilities.</span>
          <span className="hvm-arrow">↗</span>
        </div>
      </article>

      {/* MISSION */}
      <article className="hvm-card hvm-mission">
        <div className="hvm-card-top">
          <div className="hvm-icon">✳</div>
          <span>02 / OUR MISSION</span>
        </div>

        <div className="hvm-card-content">
          <h3>Personalized Care. Meaningful Recovery.</h3>

          <p>
            Our mission is to provide compassionate, personalized
            physiotherapy that supports recovery, improves mobility,
            helps manage pain, and empowers every patient to return
            to the activities they love.
          </p>
        </div>

        <div className="hvm-card-bottom">
          <span>Your recovery matters.</span>
          <span className="hvm-arrow">↗</span>
        </div>
      </article>

    </div>

    <div className="hvm-footer">
      <div className="hvm-footer-mark">✳</div>
      <p>Better movement. Better living. A healthier tomorrow.</p>
    </div>

  </div>
</section>
<Trustedcare/>
<Human/>
<Specializations/>
<br/>
<Whychooseus/>
    </main>
  );
}
