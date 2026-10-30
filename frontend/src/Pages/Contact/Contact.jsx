
import { useEffect, useRef, useState } from "react";
import "./Contact.css";
// import contact from "../../assets/contact.png";
import news from "../../assets/news.jpg"
export default function ContactHero() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".contact-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("contact-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setStatus("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const clinicEmail = "info@physiocare.in";

    const subject = encodeURIComponent(
      "Physiotherapy Appointment Request"
    );

    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n` +
      `Service: ${form.service}\n` +
      `Message: ${form.message}`
    );

    setStatus("Opening your email application...");

    window.location.href =
      `mailto:${clinicEmail}?subject=${subject}&body=${body}`;
  };

  const services = [
    "Pain Management",
    "Sports Rehabilitation",
    "Orthopedic Physiotherapy",
    "Neurological Rehabilitation",
    "Post-Surgery Recovery",
    "General Consultation",
  ];

  return (
    <main className="contact-page">

      {/* ================= HERO SECTION ================= */}

      <section
        ref={sectionRef}
        className={`contact-banner ${
          visible ? "contact-banner-visible" : ""
        }`}
        style={{ backgroundImage: `url(${news})` }}
      >
        <div className="contact-banner-content">
          <span className="contact-banner-label">
            CONTACT US
          </span>

          <h1>
            We're Here to Help
            <br />
            You Feel Better
          </h1>

          <p>
            Have a question or ready to start your recovery?
            <br className="desktop-break" />
            Our team is here to support you. Reach out to us
            <br className="desktop-break" />
            through your preferred channel.
          </p>

          <div className="contact-banner-line" />
        </div>
      </section>

      {/* ================= CONTACT INFORMATION ================= */}

      <section className="contact-info-section">
        <div className="contact-info-grid">

          <a
            href="tel:+919876543210"
            className="contact-info-card contact-reveal"
          >
            <div className="contact-info-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.6 3.8 9.2 3c.7-.2 1.4.2 1.6.9l1 3.1c.2.6 0 1.2-.5 1.6l-1.6 1.2a14 14 0 0 0 5.5 5.5l1.2-1.6c.4-.5 1-.7 1.6-.5l3.1 1c.7.2 1.1.9.9 1.6l-.8 2.6c-.2.7-.9 1.2-1.7 1.2A16.5 16.5 0 0 1 4.2 5.5c0-.8.5-1.5 1.2-1.7Z" />
              </svg>
            </div>

            <div className="contact-card-copy">
              <h3>Call Us</h3>
              <p>Speak directly with our team.</p>
              <strong>+91 98765 43210</strong>
            </div>
          </a>

          <a
            href="mailto:info@physiocare.in"
            className="contact-info-card contact-reveal"
          >
            <div className="contact-info-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
            </div>

            <div className="contact-card-copy">
              <h3>Email Us</h3>
              <p>Send us your questions anytime.</p>
              <strong>drabhisheknegi@gmail.com</strong>
            </div>
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Green+Park+New+Delhi"
            target="_blank"
            rel="noreferrer"
            className="contact-info-card contact-reveal"
          >
            <div className="contact-info-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>

            <div className="contact-card-copy">
              <h3>Visit Us</h3>
              <p>Our clinic is open for you.</p>
              <strong>Green Park, New Delhi</strong>
              <small>India</small>
            </div>
          </a>

          <div className="contact-info-card contact-reveal">
            <div className="contact-info-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3.5 2" />
              </svg>
            </div>

            <div className="contact-card-copy">
              <h3>Opening Hours</h3>
              <p>Plan your visit with us.</p>
              <strong>Mon – Sat: 9 AM – 7 PM</strong>
              <small>Sunday: Closed</small>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FORM + CLINIC DETAILS ================= */}

      <section className="contact-main-section">

        {/* APPOINTMENT FORM */}

        <div
          className="contact-form-wrapper contact-reveal"
          id="contact-form"
        >
          <div className="contact-form-heading">
            <span>GET IN TOUCH</span>

            <h2>Send Us a Message</h2>

            <p>
              Fill in your details and tell us how we can help
              you on your journey to better movement and a
              healthier life.
            </p>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="contact-input-row">

              <div className="contact-field">
                <label htmlFor="contact-name">
                  Full Name *
                </label>

                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">
                  Email Address *
                </label>

                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="contact-input-row">

              <div className="contact-field">
                <label htmlFor="contact-phone">
                  Phone Number *
                </label>

                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-service">
                  Service Required *
                </label>

                <select
                  id="contact-service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select a service
                  </option>

                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">
                How Can We Help You?
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows="4"
                placeholder="Tell us briefly about your concern..."
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="contact-submit-btn"
            >
              <span className="contact-send-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </span>

              <span>Request an Appointment</span>
              <span className="contact-submit-arrow">→</span>
            </button>

            {status && (
              <p className="contact-status" role="status">
                {status}
              </p>
            )}

            <div className="contact-privacy-note">
              <span>✓</span>
              <span>
                Your information is safe with us. We respect
                your privacy.
              </span>
            </div>
          </form>
        </div>

        {/* CLINIC IMAGE AND LOCATION — NO MAP */}

        <aside className="contact-location-card contact-reveal">

          <div className="contact-location-image">
            <img
              src='https://reliva.in/wp-content/uploads/2024/01/ReLiva-Physiotherapy-Clinic-in-Ameerpet-Hyderabad.webp'
              alt="Physiotherapy clinic and patient care"
              loading="lazy"
            />

            <div className="contact-location-image-text">
              

              <div className="contact-image-underline" />
            </div>
          </div>

          <div className="contact-address">
            <div className="contact-address-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>

            <div className="contact-address-copy">
              <h3>Our Location</h3>

              <p>
                Green Park,
                <br />
                New Delhi, India
              </p>
            </div>
          </div>

          <div className="contact-location-divider" />

          <div className="contact-visit-note">
            <div className="contact-visit-icon">✦</div>

            <div>
              <h4>We're Ready to Help</h4>

              <p>
                Get personalized physiotherapy care and
                rehabilitation support from our team.
              </p>
            </div>
          </div>

          <a
            href="tel:+919876543210"
            className="contact-directions-btn"
          >
            <span>☎</span>
            <span>Call to Plan Your Visit</span>
            <span>→</span>
          </a>

        </aside>

      </section>
    </main>
  );
}
