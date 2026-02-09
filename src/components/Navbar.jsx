import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/Logo1.svg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 FORCE SCROLL TO TOP EVEN IF SAME ROUTE
  const goHome = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-solid" : "navbar-transparent"}`}>
      
      {/* LOGO + TITLE */}
      <div className="navbar-left">
        <button className="navbar-brand-btn" onClick={goHome}>
          <img src={logo} alt="ITechSkillsHub Logo" className="navbar-logo" />
          <span className="navbar-title">ITechSkillsHub</span>
        </button>
      </div>

      {/* CENTER */}
      <div className="navbar-center">
        <button className="nav-link-btn" onClick={goHome}>
          Home
        </button>
        <a href="#about">About</a>
        <Link to="/course">Courses</Link>
        <a href="#resources">Resources ▾</a>
      </div>

      {/* RIGHT */}
      <button className="login-btn">Login Admin</button>
    </nav>
  );
};

export default Navbar;
