import { useEffect, useRef } from "react";
import "./Human.css";
import { Link } from "react-router-dom";
/*
  Stage ka design grid 1600 x 1250 hai (sab kuch % me scale hota hai).
  dot   = body par hotspot point (hamesha fixed)
  lineX = connector ki vertical line ka x
  card  = card ki FINAL position (x, y, width)
*/
const W = 1600;
const H = 1250;

const services = [
  {
    title: "Neck Stiffness",
    description: "Therapeutic Touch, Controlled Motion, Reduce Stiffness",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=85",
    dot: [739, 225],
    lineX: 605,
    card: { x: 190, y: 313, w: 562 },
  },
  {
    title: "Hand Tightness",
    description: "Reclaim Hand Function Through Targeted Treatment",
    image:
      "https://medicaldemos2.wpenginepowered.com/physeo/wp-content/uploads/sites/2/2025/07/home-3-hotspot-img-4.jpg",
    dot: [750, 325],
    lineX: 887,
    card: { x: 738, y: 412, w: 563 },
  },
  {
    title: "Palm Discomfort",
    description: "Personalized hand therapy to relieve stress and tension.",
    image:
      "https://medicaldemos2.wpenginepowered.com/physeo/wp-content/uploads/sites/2/2025/07/home-3-hotspot-img-3.jpg",
    dot: [937, 600],
    lineX: 937,
    card: { x: 788, y: 687, w: 563 },
  },
  {
    title: "Leg Fatigue",
    description: "Restore Strength and Comfort in Your Legs Through Expert Therapy",
    image:
      "https://medicaldemos2.wpenginepowered.com/physeo/wp-content/uploads/sites/2/2025/07/home-3-hotspot-img-2.jpg",
    dot: [575, 807],
    lineX: 439,
    card: { x: 25, y: 895, w: 562 },
  },
];

const pct = (v, total) => `${(v / total) * 100}%`;

export default function Human() {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const slots = stage.querySelectorAll(".human-slot");
    const cards = stage.querySelectorAll(".human-card");
    const lines = stage.querySelectorAll(".human-lines polyline");
    let raf = 0;

    const OFFSET = 23; // cqw: card kitna upar se aayega
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

    const drawLines = () => {
      const sr = stage.getBoundingClientRect();
      services.forEach((s, i) => {
        const dx = (s.dot[0] / W) * sr.width;
        const dy = (s.dot[1] / H) * sr.height;
        const lx = (s.lineX / W) * sr.width;
        const cr = cards[i].getBoundingClientRect();
        const top = cr.top - sr.top;
        const bottom = cr.bottom - sr.top;
        const ey = (top + bottom) / 2 < dy ? bottom : top;
        lines[i].setAttribute("points", `${dx},${dy} ${lx},${dy} ${lx},${ey}`);
      });
    };

    // Scroll ke hisaab se har card ki position set karta hai
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;

      slots.forEach((slot, i) => {
        if (reduceMotion) {
          cards[i].style.transform = "";
          return;
        }
        const top = slot.getBoundingClientRect().top;

        // slot screen ke 95% par -> p = 0 (card upar)
        // slot screen ke 50% par -> p = 1 (card apni jagah)
        const start = vh * 0.95;
        const end = vh * 0.5;
        let p = clamp((start - top) / (start - end), 0, 1);
        p = p * p * (3 - 2 * p); // smooth ease

        cards[i].style.transform = `translateY(${-(1 - p) * OFFSET}cqw)`;
      });

      drawLines();
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="human-section">
      <div className="human-heading">
        <h2>Understand your body. Move without limits.</h2>
        <p>
          Personalized physiotherapy to support mobility, comfort and a
          healthier, more active life.
        </p>
      </div>

      <div className="human-scroll">
        <div className="human-stage" ref={stageRef}>
          <img
            src="https://medicaldemos2.wpenginepowered.com/physeo/wp-content/uploads/sites/2/2025/07/home-3-hotspot-bg.png"
            alt="Human body anatomy illustration"
            className="human-skeleton-image"
          />

          {/* Connector lines (cards ke peeche) */}
          <svg className="human-lines" aria-hidden="true">
            {services.map((s) => (
              <polyline key={s.title} />
            ))}
          </svg>

          {/* Dots (cards ke peeche) */}
          {services.map((s) => (
            <span
              key={s.title}
              className="human-dot"
              style={{ left: pct(s.dot[0], W), top: pct(s.dot[1], H) }}
            />
          ))}

          {/* Cards */}
          {services.map((s) => (
            <div
              key={s.title}
              className="human-slot"
              style={{
                left: pct(s.card.x, W),
                top: pct(s.card.y, H),
                width: pct(s.card.w, W),
              }}
            >
              <article className="human-card">
                <img src={s.image} alt={s.title} loading="lazy" />
                <div className="human-card-body">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <Link to="/condition-we-treat">View Services</Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="human-bottom">
        <p>Every movement is a step towards feeling better.</p>
        <Link to="/contact" className="human-cta">
          Start your recovery
        </Link>
      </div>
    </section>
  );
}