import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LandingPage1 from "./components/LandingPage1";
import LandingPage2 from "./components/LandingPage2";
import LandingPage3 from "./components/LandingPage3";

import AuthPage from "./pages/AuthPage";
import Course from "./Course/Course";

// Dashboard Layout
import DashboardLayout from "./layouts/DashboardLayout";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminAssignments from "./pages/admin/AdminAssignments";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";

// Instructor Pages
import InstructorLogin from "./pages/InstructorLogin";

// Resources Pages
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

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN DASHBOARD ROUTES */}
        <Route path="/admin" element={<DashboardLayout userRole="admin" />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="assignments" element={<AdminAssignments />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* INSTRUCTOR LOGIN */}
        <Route path="/instructor/login" element={<InstructorLogin />} />

        {/* INSTRUCTOR DASHBOARD ROUTES - Phase 4 pa to, placeholder lang */}
        <Route path="/instructor" element={<DashboardLayout userRole="instructor" />}>
          <Route path="dashboard" element={<div style={{padding: '50px'}}>Instructor Dashboard - Phase 4</div>} />
        </Route>
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;