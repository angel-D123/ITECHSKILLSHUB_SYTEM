import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LandingPage1 from "./components/LandingPage1";
import LandingPage2 from "./components/LandingPage2";
import LandingPage3 from "./components/LandingPage3";

import AuthPage from "./pages/AuthPage";
import Course from "./Course/Course";

// ✅ NEW PAGES
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import InstructorLogin from "./pages/InstructorLogin";
import InstructorDashboard from "./pages/InstructorDashboard";

// ✅ RESOURCES PAGES
import Games from "./pages/Games";
import Blog from "./pages/Blog";

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/auth" ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/instructor");

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              <LandingPage1 />
              <LandingPage2 />
              <LandingPage3 />
            </>
          }
        />

        {/* STUDENT AUTH */}
        <Route path="/auth" element={<AuthPage />} />

        {/* COURSES */}
        <Route path="/course/*" element={<Course />} />

        {/* RESOURCES */}
        <Route path="/games" element={<Games />} />
        <Route path="/blog" element={<Blog />} />

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* INSTRUCTOR */}
        <Route path="/instructor/login" element={<InstructorLogin />} />
        <Route
          path="/instructor/dashboard"
          element={<InstructorDashboard />}
        />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;