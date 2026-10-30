import { useEffect, useState, useCallback } from "react";
import "./Testimonial.css";

const REVIEWS = [
  {
    title: "Patient Centric!",
    text: "Prompt, Punctual and Communicative. Good doctor with positive approach. Will not let down patient at any cost. Always gives confidence to the patient. Patient gets inspiration to be active whole day....",
    name: "N. V. Surya Prakash",
  },
  {
    title: "Highly Recommended!",
    text: "Very informative, caring and punctual. Suggested good and easy breathing exercises for my dad having COPD. Gave enough confidence and support to him. Have no hesitation in recommending their services....",
    name: "Vikram Venkatesh",
  },
  {
    title: "Most Professional!",
    text: "One of the most professional physiotherapist I've met through them. The Expert was a great listener, asks the right questions, and is genuinely concerned about patient's well being.Highly satisfied wi...",
    name: "Abhishek Rocks",
  },
  // ↓ Sample reviews – inhe apne real reviews se replace kar lijiye
  {
    title: "Life Changing!",
    text: "My back pain was bothering me for months. After just a few sessions I could feel the difference. The exercises were simple and the therapist explained everything clearly....",
    name: "Rahul Sharma",
  },
  {
    title: "Very Caring!",
    text: "Excellent recovery plan after my knee surgery. Always on time, very supportive and motivates you to keep going. I'm back to my daily walks thanks to the team....",
    name: "Priya Singh",
  },
  {
    title: "Excellent Care!",
    text: "Friendly staff and a very clean clinic. The personalized treatment really helped my neck and shoulder stiffness. Would definitely recommend to friends and family....",
    name: "Amit Verma",
  },
];

const AUTOPLAY_MS = 3500;

function Stars() {
  return (
    <span className="tst__stars" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />
        </svg>
      ))}
    </span>
  );
}

function Avatar() {
  return (
    <svg className="tst__avatar" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="24" fill="#000" />
      <circle cx="24" cy="18" r="7" fill="#fff" />
      <path d="M10 39c2-8 8-11 14-11s12 3 14 11c-4 4-9 6-14 6s-10-2-14-6z" fill="#fff" />
    </svg>
  );
}

function usePerPage() {
  const get = () =>
    window.innerWidth <= 700 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  const [perPage, setPerPage] = useState(get);
  useEffect(() => {
    const onResize = () => setPerPage(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return perPage;
}

export default function Testimonial() {
  const perPage = usePerPage();
  const maxIndex = REVIEWS.length - perPage; // last position of the slider
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i >= maxIndex ? 0 : i + 1)),
    [maxIndex]
  );

  // screen size change hone par index ko valid range mein rakho
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  // auto slide
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section className="tst">
      <div className="tst__head">
        <span className="tst__pill">
          Happiness On Our Patient's Faces Is What Drives Us
        </span>
        <h2 className="tst__title">
          What <span>Patients</span> Says About us
        </h2>
      </div>

      <div
        className="tst__viewport"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          className="tst__track"
          style={{ transform: `translateX(-${(index * 100) / perPage}%)` }}
        >
          {REVIEWS.map((r) => (
            <div className="tst__slide" style={{ flexBasis: `${100 / perPage}%` }} key={r.name}>
              <article className="tst__card">
                <div className="tst__rating">
                  <Stars />
                  <span className="tst__rtitle">{r.title}</span>
                </div>
                <p className="tst__text">{r.text}</p>
                <div className="tst__user">
                  <Avatar />
                  <div>
                    <div className="tst__name">{r.name}</div>
                    <div className="tst__role">Patient</div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="tst__dots">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            className={`tst__dot ${i === index ? "is-active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}