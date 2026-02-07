import { useState } from "react";
import "../styles/authPage.css";
import Logo from "../assets/Logo1.svg";

import Lottie from "lottie-react";
import techAnim from "../assets/tech.json";
import ParticleBackground from "../components/ParticleBackground";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="auth-wrapper">
      <div className="auth-box">

        {/* LEFT – PURPLE SLIDE */}
        <div className={`auth-left ${isSignUp ? "slide-right" : ""}`}>
          {/* PARTICLES ONLY HERE */}
          <ParticleBackground />

          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h3>ITechSkillsHub</h3>
          </div>

          <div className="left-content">
            {!isSignUp ? (
              <>
                <h2>Welcome Back</h2>
                <p>Sign in to continue your learning journey.</p>
                <button
                  className="slide-btn"
                  onClick={() => setIsSignUp(true)}
                >
                  CREATE ACCOUNT
                </button>
              </>
            ) : (
              <>
                <h2>Hello, Learner</h2>
                <p>Join us and start building your tech future.</p>
                <button
                  className="slide-btn"
                  onClick={() => setIsSignUp(false)}
                >
                  SIGN IN
                </button>
              </>
            )}
          </div>
        </div>

        {/* RIGHT – FORM PANEL */}
        <div className={`auth-right ${isSignUp ? "slide-left" : ""}`}>

          {/* LOTTIE – UPPER CENTER */}
          <div className="white-lottie">
            <Lottie animationData={techAnim} loop />
          </div>

          {!isSignUp ? (
            /* SIGN IN */
            <div className="form">
              <h2>Welcome back</h2>
              <p className="subtitle">
                Enter your credentials to access your account
              </p>

              <label>Email address</label>
              <input type="email" placeholder="name@company.com" />

              <label>Password</label>
              <input type="password" placeholder="••••••••" />

              <div className="form-row">
                <label className="remember">
                  <input type="checkbox" />
                  Remember me
                </label>
                <span className="forgot">Forgot password?</span>
              </div>

              <button className="submit">Sign in</button>

              <div className="divider">Or continue with</div>

              <button className="google-auth">
                <img src="/google.svg" alt="Google" />
                Continue with Google
              </button>

              <p className="switch">
                Don’t have an account?
                <span onClick={() => setIsSignUp(true)}>
                  {" "}Sign up for free
                </span>
              </p>

              <footer>© 2024 ITechSkillsHub. All rights reserved</footer>
            </div>
          ) : (
            /* SIGN UP */
            <div className="form">
              <h2>Create an account</h2>
              <p className="subtitle">
                Start your journey to mastering new technologies
              </p>

              <label>Full Name</label>
              <input type="text" placeholder="John Doe" />

              <label>Email address</label>
              <input type="email" placeholder="name@company.com" />

              <label>Password</label>
              <input type="password" placeholder="Create a strong password" />

              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm your password" />

              <p className="terms">
                By clicking "Create account", you agree to our
                <span> Terms of Service</span> and
                <span> Privacy Policy</span>.
              </p>

              <button className="submit">Create account</button>

              <p className="switch">
                Already have an account?
                <span onClick={() => setIsSignUp(false)}>
                  {" "}Sign in instead
                </span>
              </p>

              <footer>© 2024 ITechSkillsHub. All rights reserved</footer>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}