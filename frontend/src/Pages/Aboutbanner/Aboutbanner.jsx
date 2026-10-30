import "./Aboutbanner.css";
import { Link } from "react-router-dom";
import about from '../../assets/about.png'
export default function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${about})` }}>
      <div className="hero__text">
        <div className="hero__eyebrow">ABOUT US</div>

        <h1 className="hero__title">
          Your Health,
          <span>Our Priority</span>
        </h1>

        <p className="hero__desc">
          At PhysioCare, we believe in the power of movement. Our goal is to
          help you recover, stay active and live a healthier, pain-free life
          through expert physiotherapy and personalized care.
        </p>

        <Link className="hero__btn" to='/book-appointment'>
          Book Your Consultation <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="hero__tag">
        Better Movement.
        <br />
        Better Life ♡
      </div>
    </section>
  );
}