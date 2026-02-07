import React from "react";
import "../styles/courseHero.css";

const CourseHero = () => {
  return (
    <section className="course-hero">
      {/* VIDEO BACKGROUND */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/course-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* OVERLAY */}
      <div className="hero-overlay"></div>

      {/* CONTENT */}
      <div className="hero-content">
        <span className="hero-badge">TESDA-Aligned Programs</span>

        <h1>Computer Systems Servicing Training Courses</h1>

        <p>
          Master the skills employers demand with our comprehensive,
          nationally-recognized CSS training programs. Start your tech career
          journey today.
        </p>

        <button className="hero-btn">Browse All Courses</button>
      </div>
    </section>
  );
};

export default CourseHero;
