import { useEffect, useRef, useState } from "react";
import "../styles/landingPage3.css";
import careerImg from "../assets/Career.png";

const LandingPage3 = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: "0px 0px -100px 0px", // Start slightly before entering viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`lp3-section ${isVisible ? "lp3-visible" : ""}`}
    >
      <h2 className="lp3-title">
        Ready to start your <br /> career
      </h2>

      <p className="lp3-subtitle">
        Enroll now and begin your path to CSS certification today
      </p>

      <div className="lp3-buttons">
        <button className="lp3-btn-primary">Enroll</button>
        <button className="lp3-btn-secondary">Browse courses</button>
      </div>

      <div
        className="lp3-image"
        style={{ backgroundImage: `url(${careerImg})` }}
      />
    </section>
  );
};

export default LandingPage3;