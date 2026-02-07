import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/Logo1.svg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-solid" : "navbar-transparent"}`}>
      <div className="navbar-left">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logo} alt="ITechSkillsHub Logo" className="navbar-logo" />
          <span className="navbar-title">ITechSkillsHub</span>
        </Link>
      </div>

      <div className="navbar-center">
        <Link to="/">Home</Link>
        <a href="#about">About</a>
        <Link to="/courses">Courses</Link>
        <a href="#resources">Resources ▾</a>
      </div>

      <Link to="/auth">
        <button className="login-btn">Login</button>
      </Link>
    </nav>
  );
};

export default Navbar;