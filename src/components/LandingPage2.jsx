import "../styles/landingPage2.css";

import startImg from "../assets/Start.png";
import beginImg from "../assets/Begin.png";
import finishImg from "../assets/Finish.png";

const LandingPage2 = () => {
  return (
    <section className="process-section">
      <p className="process-label">Process</p>
      <p className="process-small-title">How it works</p>

      <p className="process-subtitle">
        Three steps to your CSS certification and career readiness
      </p>

      <div className="process-cards">
        {/* CARD 1 */}
        <div
          className="process-card"
          style={{ backgroundImage: `url(${startImg})` }}
        >
          <span className="step">Step</span>
          <h3>
            Sign up and <br /> choose your path
          </h3>
          <p>
            Create your account and select the CSS course that fits your goals
            and schedule.
          </p>
          <span className="card-action">Start</span>
        </div>

        {/* CARD 2 */}
        <div
          className="process-card"
          style={{ backgroundImage: `url(${beginImg})` }}
        >
          <span className="step">Step</span>
          <h3>
            Learn through <br /> hands-on training
          </h3>
          <p>
            Work through modules with real labs, video lessons, and guidance from
            certified instructors.
          </p>
          <span className="card-action">Begin</span>
        </div>

        {/* CARD 3 */}
        <div
          className="process-card"
          style={{ backgroundImage: `url(${finishImg})` }}
        >
          <span className="step">Step</span>
          <h3>
            Earn your TESDA <br /> certification
          </h3>
          <p>
            Complete assessments and receive your credential recognized across
            the industry.
          </p>
          <span className="card-action">Finish</span>
        </div>
      </div>
    </section>
  );
};

export default LandingPage2;