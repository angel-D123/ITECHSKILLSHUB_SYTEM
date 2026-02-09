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
        {/* Home */}
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

        {/* Auth */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Courses - Fixed: Single route instead of duplicate */}
        <Route
          path="/course/*"
          element={<Course />}
        />
      </Routes>

      {/* Footer - Placed outside Routes so it shows on all pages except /auth */}
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
