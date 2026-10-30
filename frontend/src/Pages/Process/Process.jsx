import { useEffect, useRef, useState } from "react";
import "./Process.css";

const STEPS = [
  {
    title: "Awareness & Goal Setting",
    text: "Being educated about your condition/injury is the most important factor towards your recovery. After a thorough assessment, our experts help you understand body mechanics, your condition/injury, types of treatment, exercises and help you set specific goals. This personalized therapy guides your treatment to expedite recovery and more successful results.",
  },
  {
    title: "Recovery",
    text: "We recognize that you are in pain and/or unable to move the way you want to. Experience relief with our experts through drug-free modern therapies like Mulligan, McKenzie, Kinesio-taping, Cupping, and more. Our physios can offer the best of methods to reduce pain, improve mobility and functionality.",
  },
  {
    title: "Maintenance",
    text: "Pain relief is just the start but the key is to get back to your previous level of function. We tailor exercises to restore mobility and full function, best suited to your lifestyle for long term results. Home based rehab programs also involve caregivers for enhanced support.",
  },
  {
    title: "Prevention & Lifestyle",
    text: "At ReLiva, we believe that our true success lies in the fact that our client can maintain the physical recovery on his/her own even after the treatment. Before leaving, we equip you with a home exercise plan with a clear list of \"Dos and Don'ts\" and suggestions to improve your lifestyle or to benefit after a specific surgery.",
  },
];

export default function Process() {
  const timelineRef = useRef(null);
  const stepRefs = useRef([]);

  const [fillHeight, setFillHeight] = useState(0);
  const [current, setCurrent] = useState(-1); // -1 = koi step reach nahi hua

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const timeline = timelineRef.current;
      if (!timeline) return;

      // Viewport ka ~45% neeche wala point reference hai
      const trigger = window.innerHeight * 0.45;
      const tlTop = timeline.getBoundingClientRect().top;

      // Green line: scroll down par badhti hai, scroll up par ghat jati hai
      const max = timeline.offsetHeight - 40;
      const h = Math.max(0, Math.min(trigger - tlTop, max));
      setFillHeight(h);

      // Sabse last reached step
      let idx = -1;
      stepRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= trigger) idx = i;
      });
      setCurrent(idx);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goToStep = (i) => {
    stepRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeTab = Math.max(0, current);

  return (
    <section className="process-section">
      <div className="process-head">
        <h2>Our Process</h2>
        <p>4 Step Standardized ReLiva Process</p>
      </div>

      {/* Sticky tabs */}
      <div className="process-tabs-wrap">
        <div className="process-tabs">
          {STEPS.map((step, i) => (
            <button
              key={step.title}
              type="button"
              className={`process-tab ${i === activeTab ? "is-active" : ""}`}
              onClick={() => goToStep(i)}
            >
              {step.title}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="process-timeline" ref={timelineRef}>
        <div className="process-line" />
        <div className="process-line-fill" style={{ height: fillHeight }} />

        {STEPS.map((step, i) => (
          <div
            key={step.title}
            ref={(el) => (stepRefs.current[i] = el)}
            className={`process-step ${i <= current ? "is-reached" : ""} ${
              i === current ? "is-current" : ""
            }`}
          >
            <div className="process-dot">{i + 1}</div>
            <div className="process-card">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}