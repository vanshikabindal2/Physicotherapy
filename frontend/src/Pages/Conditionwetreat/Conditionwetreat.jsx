import React, { useEffect, useRef, useState } from "react";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import "./Conditionwetreat.css";
import { Link } from "react-router-dom";
import Process from '../Process/Process'
const icons = {
  spine: (
    <>
      <rect x="9" y="3" width="6" height="3" rx="1" />
      <rect x="8.5" y="8" width="7" height="3" rx="1" />
      <rect x="8" y="13" width="8" height="3" rx="1" />
      <rect x="8.5" y="18" width="7" height="3" rx="1" />
    </>
  ),
  knee: (
    <>
      <path d="M9 3v5l-2 3 2 2v8M15 3v5l2 3-2 2v8" />
      <circle cx="12" cy="11" r="2" />
    </>
  ),
  shoulder: <path d="M4 20V11a6 6 0 0 1 6-6h2a4 4 0 0 1 0 8h-2a2 2 0 0 0-2 2v5" />,
  joint: (
    <>
      <path d="M9 3h6M9 6h6M10 6v4l-2 2 2 2v1M14 6v4l2 2-2 2v1" />
      <path d="M9 21h6M10 17h4" />
    </>
  ),
  sports: (
    <>
      <circle cx="15" cy="4.5" r="1.8" />
      <path d="M13 8l-3 3 3 3-1 5M10 11l-4 1M13 14l4 1 2-3M12 19l-3 2" />
    </>
  ),
  brain: (
    <path d="M12 4a4 4 0 0 0-4 1 3.5 3.5 0 0 0-2 5 3.5 3.5 0 0 0 1 6 3.5 3.5 0 0 0 5 3zM12 4a4 4 0 0 1 4 1 3.5 3.5 0 0 1 2 5 3.5 3.5 0 0 1-1 6 3.5 3.5 0 0 1-5 3zM12 4v16" />
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
      <path d="M12 8.5v5M9.5 11h5" />
    </>
  ),
  posture: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M8 9h8l-1 6h-2v6h-2v-6H9z" />
    </>
  ),
};

const conditions = [
  {
    title: "Back & Neck Pain",
    text: "Relieve pain, improve posture and strengthen your spine with personalised treatment.",
    img: "https://orthonj.org/wp-content/uploads/2024/09/neck-pain-1024x705.jpg",
    icon: "spine",
  },
  {
    title: "Knee Pain",
    text: "Restore joint mobility, reduce stiffness and get back to your daily activities.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBDoThBY_UVHhkyRMo6EbsFR6FTyhFdoaDuqfJkEtEUp7yTOjFkF2VJyQ&s=10",
    icon: "knee",
  },
  {
    title: "Shoulder Pain",
    text: "Improve movement, reduce discomfort and regain strength in your shoulder.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-1PnsYmvFQPt7FPNv9VlMNDAdm9czsN1Kq0so6rfMa57xeDuKjLSpOY&s=10",
    icon: "shoulder",
  },
  {
    title: "Arthritis",
    text: "Manage pain, improve flexibility and maintain an active lifestyle.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwwtcEtmU0ZeeC1GL4_B1C7M3dyWYRDkotu7jPkRZgt1VcTprdr1RKtksp&s=10",
    icon: "joint",
  },
  {
    title: "Sports Injuries",
    text: "Get back to your game with safe and effective rehabilitation programs.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3D3EVw6Ux30QrCGlBlZK0xD5CXt3rwZFwVaoOmLl8zn-WD5WElrDcI2s&s=10",
    icon: "sports",
  },
  {
    title: "Neurological Conditions",
    text: "Support recovery, improve balance and enhance functional movement.",
    img: "https://adaa.org/sites/default/files/2019-08/neurological%20disorders_0.jpg",
    icon: "brain",
  },
  {
    title: "Post-Surgical Rehabilitation",
    text: "Recover faster, regain strength and return to daily life with confidence.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC6Xgz5v9xpEPdPT6UfPXAlNlgoxM9_fMdSsGek8Zs6PTBBxVMU0DREwA&s=10",
    icon: "shield",
  },
  {
    title: "Posture & Ergonomic Issues",
    text: "Correct alignment, reduce strain and prevent future discomfort.",
    img: "https://www.cmd-ltd.com/wp-content/uploads/2021/09/Bad-posture.jpg",
    icon: "posture",
  },
];

const facilities = [
  {
    id: 1,
    title: "Blood Test",
    description: "Accurate blood testing for better health monitoring and diagnosis.",
    image:
      "https://bloodsample360.com/wp-content/uploads/2026/06/Top-5-Blood-Tests-Every-Man-Over-40-Should-Consider-BloodSample360.webp",
    icon: "🩸",
  },
  {
    id: 2,
    title: "Health Screening",
    description: "Routine health checks to help you stay healthy and informed.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR88VeLnAXsLltJyUY-gAUIeT0GmS4fH9ZqbdZ-_MGcWlMEePF7qIKFpvO0&s=10",
    icon: "♡",
  },
  {
    id: 3,
    title: "Sample Collection",
    description: "Safe and hygienic blood sample collection by trained professionals.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4DDIP-HpxyhwqdVkaY8YHwZC_mBS7pKDAJmB814Ax2cMiOWXUk5LBBuBs&s=10",
    icon: "✚",
  },
  {
    id: 4,
    title: "Diagnostic Testing",
    description: "Reliable diagnostic tests to support your healthcare needs.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3twA2AuB-fErpz63iVklH7tBgnHic5pIwBk9oXg9l9Di01Nb-KRF1Z4Dd&s=10",
    icon: "⌕",
  },
];

const whyItems = [
  {
    label: ["Experienced", "Physiotherapists"],
    icon: (
      <svg viewBox="0 0 48 48">
        <circle cx="20" cy="15" r="7" />
        <path d="M6 40c0-8 6-13 14-13 3 0 5 .6 7 1.8" />
        <path d="M36 26l1.6 3.4 3.4 1.6-3.4 1.6L36 36l-1.6-3.4L31 31l3.4-1.6z" />
      </svg>
    ),
  },
  {
    label: ["Personalised", "Treatment Plans"],
    icon: (
      <svg viewBox="0 0 48 48">
        <rect x="10" y="9" width="26" height="33" rx="3" />
        <path d="M18 9V6h10v3" />
        <path d="M16 20h14M16 26h8M16 32h6" />
        <path d="M30 34l8-8 3 3-8 8-4 1z" />
      </svg>
    ),
  },
  {
    label: ["Modern Equipment", "& Lab Facilities"],
    icon: (
      <svg viewBox="0 0 48 48">
        <rect x="8" y="8" width="32" height="32" rx="6" />
        <circle cx="24" cy="24" r="8" />
        <path d="M20 24h3l2-4 2 8 2-4h1" />
      </svg>
    ),
  },
  {
    label: ["Safe & Comfortable", "Environment"],
    icon: (
      <svg viewBox="0 0 48 48">
        <circle cx="24" cy="10" r="5" />
        <path d="M24 15v7" />
        <path d="M12 28c5 0 8-3 12-3s7 3 12 3" />
        <path d="M10 40c0-6 6-10 14-10s14 4 14 10z" />
      </svg>
    ),
  },
];

const Conditionwetreat = () => {
  // "Why Choose Us" scroll animation
  const whyRef = useRef(null);
  const [showWhy, setShowWhy] = useState(false);

  useEffect(() => {
    const el = whyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowWhy(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="condition-hero">
        <div className="condition-bg"></div>
        <div className="condition-overlay"></div>

        <div className="condition-content">
          <span className="condition-label">COMPREHENSIVE CARE</span>

          <h1>Conditions We Treat</h1>

          <p>
            Personalised physiotherapy and rehabilitation care to relieve pain,
            restore movement and help you return to everyday life.
          </p>

          <button
            className="condition-btn"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            <FaCalendarAlt />
          <Link to="/book-appointment" className="appointment-link">
  <span>Book an Appointment</span>
</Link>
            <FaArrowRight />
          </button>
        </div>

        <div className="condition-tagline">
          Better Movement
          <br />
          Better Life
        </div>
      </section>

      {/* ---------- CONDITIONS ---------- */}
      <section className="cwt">
        <div className="cwt-head">
          <span className="cwt-eyebrow">Our Treatment Areas</span>
          <h2>Conditions We Treat</h2>
          <p>
            We treat a wide range of physical conditions with evidence-based
            physiotherapy, personalised care and advanced rehabilitation
            techniques.
          </p>
        </div>

        <div className="cwt-grid">
          {conditions.map((c, i) => (
            <article className="cwt-card" key={c.title} style={{ "--i": i }}>
              <div className="cwt-photo">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>

              <div className="cwt-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {icons[c.icon]}
                </svg>
              </div>

              <div className="cwt-body">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- FACILITIES ---------- */}
      <section className="facilities-section">
        <div className="facilities-container">
          <div className="facilities-intro">
            <span className="facilities-label">OUR FACILITIES</span>

            <h2>
              Blood Test &
              <br />
              Diagnostic Services
            </h2>

            <p>
              Get reliable blood testing and diagnostic services with a focus on
              accuracy, hygiene, and your health. We help you take a step
              towards a healthier life.
            </p>

            <Link to="/our-membership" className="facilities-btn">
             Take the Next Step 
              <span>→</span>
            </Link>
          </div>

          <div className="facilities-grid">
            {facilities.map((item) => (
              <div className="facility-card" key={item.id}>
                <div className="facility-image">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>

                <div className="facility-icon">{item.icon}</div>

                <div className="facility-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY CHOOSE US ---------- */}
      <section
  ref={whyRef}
  className={`why-choose-section ${showWhy ? "why-choose-show" : ""}`}
>
  <div className="why-choose-intro">
    <h2>Why Choose Us?</h2>
    <p>Your health, comfort and progress are our priority.</p>
  </div>

  {whyItems.map((item, i) => (
    <div
      className="why-choose-item"
      key={i}
      style={{ "--i": i }}
    >
      <div className="why-choose-icon">{item.icon}</div>

      <span>
        {item.label[0]}
        <br />
        {item.label[1]}
      </span>
    </div>
  ))}
</section>
      <Process/>
    </>
  );
};

export default Conditionwetreat;