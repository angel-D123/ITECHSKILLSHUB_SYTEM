import React from "react";
import "../styles/courseHero.css";
import ParticleBackground from "../components/ParticleBackground";

const CourseHero = () => {
  return (
    <section className="course-hero">
      {/* PARTICLE BACKGROUND ONLY */}
      <div className="particle-bg">
        <ParticleBackground />
      </div>

      {/* CONTENT */}
      <div className="hero-content">
        <span className="hero-badge">TESDA-Aligned Programs</span>

        <h1>
          Computer Systems <br />
          Servicing Training <br />
          Courses
        </h1>

        <p>
          Master the skills employers demand with our comprehensive,
          nationally-recognized CSS training programs. Start your tech
          career journey today.
        </p>

        <button className="hero-btn">Browse All Courses</button>
      </div>
    </section>
  );
};

export default CourseHero;
