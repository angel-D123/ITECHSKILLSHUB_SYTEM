import { useEffect } from "react";
import "../styles/Courses1.css";
import coursesData from "./coursesData";

const Courses1 = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".course-box");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="courses-section">
      <div className="courses-header">
        <h2>Available Courses</h2>
        <p>
          Choose from our selection of TESDA-aligned courses designed to give you
          job-ready skills in Computer Systems Servicing.
        </p>
      </div>

      <div className="courses-grid">
        {coursesData.map((course) => (
          <div className="course-box" key={course.id}>
            {/* IMAGE */}
            <div className="course-image">
              {course.badge && (
                <span className="course-badge">{course.badge}</span>
              )}

              <img src={course.image} alt={course.title} />

              <div className="course-meta">
                <span>🕒 {course.hours}</span>
                <span>👥 {course.students}</span>
                <span>⭐ {course.rating}</span>
              </div>
            </div>

            {/* BODY */}
            <div className="course-body">
              <h3>{course.title}</h3>
              <small>{course.level}</small>

              <p>{course.description}</p>

              <div className="course-tags">
                <span className="tag-purple">{course.modules}</span>
                <span className="tag-orange">{course.lessons}</span>
                {course.free && (
                  <span className="tag-orange-soft">
                    Free for Students
                  </span>
                )}
              </div>

              <div className="course-footer">
                <span className="free-access">✔ Free Access</span>
                <button className="course-btn">
                  Start Learning →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses1;
