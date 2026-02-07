import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LandingPage1 from "./components/LandingPage1";
import LandingPage2 from "./components/LandingPage2";
import LandingPage3 from "./components/LandingPage3";

import AuthPage from "./pages/AuthPage";
import Course from "./Course/Course";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/auth";

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* 🔴 FADE / SCROLL ZONE */}
              <div className="page-content">
                <LandingPage1 />
                <LandingPage2 />
                <LandingPage3 />
              </div>

              {/* 🟢 SAFE ZONE */}
              {!hideLayout && <Footer />}
            </>
          }
        />

        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="/courses"
          element={
            <>
              <Course />
              {!hideLayout && <Footer />}
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
