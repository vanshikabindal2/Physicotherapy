import "./Featurecards.css";

const icon = (children) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const FEATURES = [
  {
    title: "+ 500 Practitioners",
    text: "CBP has a strong network of over 500 physiotherapists/chiropractors enrolled through a structured empanelment criterion.",
    icon: icon(
      <>
        <circle cx="12" cy="7.5" r="3.5" />
        <path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
        <path d="M10 14l2 3 2-3" />
      </>
    ),
  },
  {
    title: "Integrated Approach",
    text: "Our integrated / multi-therapy approach enables us take a holistic view of patient needs and provide and outcome-based treatment.",
    icon: icon(
      <>
        <circle cx="12" cy="6" r="2.5" />
        <circle cx="5" cy="17" r="2.5" />
        <circle cx="19" cy="17" r="2.5" />
        <path d="M10.5 8l-4 7M13.5 8l4 7M7.5 17h9" />
      </>
    ),
  },
  {
    title: "Treatment Scheduling",
    text: "Instant confirmation of clinic appointment & home visit is confirmed within 30 mins. We try our best to not change a physio for ongoing treatments.",
    icon: icon(
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: "Always Listening",
    text: "Continuous monitoring of treatment progress with feedback & Counseling calls. Pro-active grievance redressal to ensure a smooth path to your recovery.",
    icon: icon(
      <>
        <path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
        <path d="M20 9a2 2 0 0 1 2 2v6l-3-2h-4" />
        <path d="M7 9.5h.01M11 9.5h.01" />
      </>
    ),
  },
  {
    title: "Payments",
    text: "Transparent Pricing with friendly packages for long term treatments. Option to pay through cash, card or online with insurance reimbursement friendly billing.",
    icon: icon(
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
        <path d="M2.5 10h19" />
        <path d="M6 15h4" />
      </>
    ),
  },
  {
    title: "12*7 Support",
    text: "Help is just a text Away. 12*7 support on WhatsApp for any query or concern for your new appointment or for an ongoing physio treatment.",
    icon: icon(
      <>
        <rect x="3" y="5" width="18" height="16" rx="2.5" />
        <path d="M3 10h18M8 3v4M16 3v4" />
        <path d="M9 16l2 2 4-4" />
      </>
    ),
  },
];

export default function Featurecards() {
  return (
    <section className="fcards">
      <h2 className="fcards__title">
        Why Choose <span>CB Physiotherapy</span>
      </h2>

      <div className="fcards__grid">
        {FEATURES.map((f) => (
          <article className="fcards__card" key={f.title}>
            <div className="fcards__icon">{f.icon}</div>
            <h3 className="fcards__ctitle">{f.title}</h3>
            <p className="fcards__text">{f.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}