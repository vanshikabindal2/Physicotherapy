
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./About.css";
import Aboutbanner from '../Aboutbanner/Aboutbanner.jsx'
import Testimonial from '../Testimonial/Testimonial.jsx'
import Featurecards from "../Featurecards/Featurecards.jsx";

const aboutTabs = [
  {
    label: "Our Vision",
    icon: "vision",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=85",
    text:
      "Physiotherapists are quiet experts, guiding recovery through movement, relieving pain every step of the way.",
    points: [
      "Guided Recovery",
      "Restored Strength",
      "Functional Relief",
      "Improved Mobility",
    ],
  },
  {
    label: "Our Mission",
    icon: "mission",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=85",
    text:
      "Our mission is to provide personalized, evidence-based physiotherapy that reduces pain, restores mobility, improves strength, and helps every patient live a healthier, more active life.",
    points: [
      "Personalized Treatment",
      "Expert Physiotherapists",
      "Patient-Centered Care",
      "Long-Term Recovery",
    ],
  },
  {
    label: "Our Values",
    icon: "values",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=600&q=85",
    text:
      "Our values are rooted in compassion, integrity, and excellence. We are committed to treating every patient with respect, providing quality physiotherapy, and supporting their journey toward lasting health and improved mobility.",
    points: [
      "Compassion & Empathy",
      "Trust & Integrity",
      "Quality Patient Care",
      "Health & Wellbeing",
    ],
  },
];

function TabIcon({ type }) {
  if (type === "vision") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2.5 12s3.3-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.3 6.5-9.5 6.5S2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    );
  }

  if (type === "mission") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 15 6l4-1 1 4 2 3-3 3-1 4-4-1-2 2-3-3-4-1 1-4-2-3 3-3 1-3 4 1z" />
        <path d="m8 12 2.5 2.5L16 9" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="m14 10 5-5M16 5h3v3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" />
      <path
        d="m6 10 2.5 2.5L14 7"
        fill="none"
        stroke="#54aaa9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = aboutTabs[activeTab];

  return (
    <>
        <Aboutbanner/>

    <main className="about-story">
    
      <section className="about-story-inner">
        {/* LEFT IMAGE */}
        <div className="about-visual">
          <div className="about-main-image">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1100&q=90"
              alt="Healthcare professional talking with a patient"
            />
          </div>

          <div className="about-image-accent" />

          <Link to="/contact" className="about-know-more">
            <span>Know More</span>
            <span className="about-know-arrow">→</span>
          </Link>
        </div>

        {/* RIGHT CONTENT */}
        <div className="about-story-content">
          <div className="about-eyebrow">
            <span className="about-eyebrow-line" />
            <span className="about-eyebrow-dot" />
            <span>CARE THAT LASTS</span>
          </div>

          <h1 className="about-story-heading">
            Commitment To{" "}
            <span>Expert Care</span> And Lasting Recovery
          </h1>

          <p className="about-story-description">
            Compassion fuels our expertise, and your progress drives
            our purpose. By working together, we lay the groundwork
            for a long-term recovery.
          </p>

          {/* INTERACTIVE TABS */}
          <div className="about-tabs" role="tablist" aria-label="About us">
            {aboutTabs.map((tab, index) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={activeTab === index}
                className={`about-tab ${
                  activeTab === index ? "about-tab-active" : ""
                }`}
                onClick={() => setActiveTab(index)}
              >
                <TabIcon type={tab.icon} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* INFORMATION CARD */}
          <div className="about-info-card" key={activeTab}>
            <div className="about-info-image">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=85"
                alt="Physiotherapist supporting patient recovery"
              />
           
            </div>

            <div className="about-info-content">
              <p>{currentTab.text}</p>

              <div className="about-info-divider" />

              <div className="about-benefits">
                {currentTab.points.map((point) => (
                  <div className="about-benefit" key={point}>
                    <CheckIcon />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Testimonial/>
      <Featurecards/>
    </main>
    </>
  );
}
