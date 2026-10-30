
import { useState } from "react";
import "./Whychooseus.css";
import { Link } from "react-router-dom";
const reasons = [
  {
    title: "We listen to you",
    description:
      "We prioritize listening to you actively, ensuring your needs and concerns are heard and addressed.",
  },
  {
    title: "Pioneering new avenues in Physiotherapy & Rehabilitation",
    description:
      "We lead the way in exploring innovative approaches and opening new possibilities in the field of Physiotherapy and Rehabilitation.",
  },
  {
    title: "Team of Experts",
    description:
      "Individually we are strong, but together we are unstoppable when it comes to your treatment & results.",
  },
  {
    title: "Committed to Provide Top-Notch Care",
    description:
      "We are dedicated to delivering exceptional care, ensuring that patients receive top-notch treatment and support throughout their healing journey.",
  },
  {
    title: "Promising Results",
    description:
      "Our unwavering commitment to our patients ensures exceptional results and mesmerizing outcomes, thus transforming their lives.",
  },
];

export default function Whychooseus() {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <section className="why-section">
      <div className="why-image">
        <img
          src="https://www.missionhealth.co.in/images/why.jpg"
          alt="Physiotherapy and rehabilitation centre"
        />
      </div>

      <div className="why-content">
        <h2>Why choose us?</h2>

        <p className="why-intro">
          Your ultimate success in rehabilitation intricately relies upon
          the careful selection of the ideal rehabilitation partner.
        </p>

        <div className="why-accordion">
          {reasons.map((reason, index) => (
            <div
              className={`why-item ${
                activeIndex === index ? "active" : ""
              }`}
              key={reason.title}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <button
                className="why-question"
                onClick={() =>
                  setActiveIndex(
                    activeIndex === index ? -1 : index
                  )
                }
                aria-expanded={activeIndex === index}
              >
                <span>{reason.title}</span>

                <span className="why-arrow">
                  {activeIndex === index ? "⌃" : "⌄"}
                </span>
              </button>

              {activeIndex === index && (
                <div className="why-answer">
                  {reason.description}
                </div>
              )}
            </div>
          ))}
        </div>

        <Link to="/about" className="why-button">
          About us
        </Link>
      </div>
    </section>
  );
}
