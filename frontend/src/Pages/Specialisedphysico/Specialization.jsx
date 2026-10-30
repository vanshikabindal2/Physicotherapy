
import React, { useEffect, useRef } from "react";
import "./Specializations.css";

const specializations = [
  {
    number: "01",
    title: "Orthopedic Physiotherapy",
    description:
      "Learn assessment and treatment techniques for musculoskeletal conditions, joint pain, fractures, and rehabilitation.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80",
  },
  {
    number: "02",
    title: "Neurological Physiotherapy",
    description:
      "Understand rehabilitation approaches for stroke, nerve injuries, balance problems, and neurological disorders.",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=700&q=80",
  },
  {
    number: "03",
    title: "Sports Physiotherapy",
    description:
      "Explore sports injury assessment, recovery protocols, muscle strengthening, and return-to-sport rehabilitation.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=80",
  },
  {
    number: "04",
    title: "Cardiopulmonary Physiotherapy",
    description:
      "Study breathing exercises, chest physiotherapy, endurance training, and cardiopulmonary rehabilitation.",
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=700&q=80",
  },
  {
    number: "05",
    title: "Pediatric Physiotherapy",
    description:
      "Discover child-focused assessment and rehabilitation methods for developmental and movement difficulties.",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=700&q=80",
  },
  {
    number: "06",
    title: "Geriatric Physiotherapy",
    description:
      "Learn rehabilitation techniques that support mobility, balance, strength, and independence in older adults.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=700&q=80",
  },
];

export default function Specializations() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const getAnimation = () => {
      return track
        .getAnimations()
        .find((animation) => animation.animationName === "specializationSlide");
    };

    const saveAnimation = () => {
      animationRef.current = getAnimation();
    };

    saveAnimation();

    const observer = new MutationObserver(saveAnimation);
    observer.observe(track, { attributes: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const moveCards = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const animation =
      animationRef.current ||
      track
        .getAnimations()
        .find((item) => item.animationName === "specializationSlide");

    if (!animation) return;

    animationRef.current = animation;

    const duration = 35000;
    const step = duration / specializations.length;
    const currentTime = Number(animation.currentTime) || 0;

    animation.currentTime =
      ((currentTime + direction * step) % duration + duration) % duration;
  };

  return (
    <section className="specializations-section">
      <div className="specializations-header">
        <div>
          <span className="specializations-label">WHAT WE OFFER</span>
          <h2>
            Explore Our <span>Specializations</span>
          </h2>
          <p>
            Discover essential physiotherapy fields and build your clinical
            knowledge.
          </p>
        </div>

        <div className="specializations-arrows">
          <button
            type="button"
            className="specialization-arrow"
            aria-label="Previous cards"
            onClick={() => moveCards(-1)}
          >
            &#8592;
          </button>

          <button
            type="button"
            className="specialization-arrow"
            aria-label="Next cards"
            onClick={() => moveCards(1)}
          >
            &#8594;
          </button>
        </div>
      </div>

      <div className="specializations-viewport">
        <div className="specializations-track" ref={trackRef}>
          {[0, 1].map((group) => (
            <div
              className="specializations-group"
              key={group}
              aria-hidden={group === 1 ? "true" : undefined}
            >
              {specializations.map((item) => (
                <article
                  className="specialization-card"
                  key={`${group}-${item.number}`}
                >
                  <div className="specialization-image-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="specialization-image"
                      loading="lazy"
                    />
                    <span className="specialization-number">
                      {item.number}
                    </span>
                  </div>

                  <div className="specialization-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>

                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
