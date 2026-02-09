import React from "react";
import { Routes, Route } from "react-router-dom";
import CourseHero from "./CourseHero";
import Courses1 from "./Courses1"; 
import Courses2 from './Courses2';
import CourseCSSNCII from './courseCSSNCII/CourseCSSNCII';

const Course = () => {
  return (
    <>
      <Routes>
        {/* Main course page with hero and course list */}
        <Route path="/" element={
          <>
            <CourseHero />
            <Courses1 />
            <Courses2 />
          </>
        } />
        
        {/* Individual course page - FIXED PATH */}
        <Route path="/css-ncii" element={<CourseCSSNCII />} />
      </Routes>
    </>
  );
};

export default Course;