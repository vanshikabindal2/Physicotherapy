import React from "react";
import { motion } from "motion/react";
import "./Footer.css";

const footerColumns = [
  [
      ["Home", "/home"],
    ["About Us", "/about"],
  
    ["Condition we treat", "/condition-we-treat"],
   
    ["Our Membership", "/our-membership"],
    ["Patient History", "/patient-history"],
    ["Contact", "/contact"],
        ["Book Appointment", "/book-appointment"],

  ],
  [
    ["Ability Clinics®", "/ability-clinics"],
    ["Technology", "/technology"],
    ["Robotics", "/robotics"],
    ["Conditions We Treat", "/conditions"],
    ["Ergonomics", "/ergonomics"],
    ["Rehab Tourism", "/rehab-tourism"],
    ["Home Visits", "/home-visits"],
  ],
  [
    ["Online Rehab", "/online-rehab"],
    ["Research / Education", "/research"],
    ["Global Patient Assistance", "/global-assistance"],
    ["Media / Awards", "/media"],
    ["Contact", "/contact"],
    ["Careers", "/careers"],
    ["Blogs", "/blogs"],
  ],
  [
    ["Book an Appointment", "/appointment"],
    ["Feedback", "/feedback"],
    ["Terms & Conditions", "/terms"],
    ["Refund Policy", "/refund-policy"],
    ["Privacy Policy", "/privacy-policy"],
  ],
];

const Footer = () => {
  return (
    <footer className="mh-footer">
      <motion.div
        className="mh-footer-main"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="mh-footer-brand"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.3 }}
        >
          <a href="/" className="mh-logo-link" aria-label="Mission Health home">
            <div className="mh-logo-symbol">
              <span className="mh-logo-bar mh-bar-one" />
              <span className="mh-logo-bar mh-bar-two" />
              <span className="mh-logo-bar mh-bar-three" />
              <span className="mh-logo-bar mh-bar-four" />
            </div>

            <div className="mh-logo-name">Mission Health</div>

            <div className="mh-logo-tagline">
              Physiotherapy <span>|</span> Fitness <span>|</span> Rehab
            </div>
          </a>
        </motion.div>

        <div className="mh-footer-links">
          {footerColumns.map((column, columnIndex) => (
            <motion.div
              className="mh-footer-column"
              key={columnIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: columnIndex * 0.12,
              }}
            >
              {column.map(([label, link]) => (
                <a className="mh-footer-link" href={link} key={label}>
                  <span className="mh-footer-arrow">‹</span>
                  <span>{label}</span>
                </a>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mh-footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25 }}
      >
        <p>
          Copyright © {new Date().getFullYear()} Mission Health. All Rights
          Reserved
        </p>

        <p className="mh-footer-credit">
          Powered by: <a href="/">Dezine Brainz</a>
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;