import React, { useState, useRef } from 'react';

// ===================== STYLES (inlined for portability) =====================
const styles = `
/* UPDATED VERSION - v3.3 - Feb 2026 - SIDE-BY-SIDE LAYOUT + SMALLER STAT FONT */

/* PAGE CONTAINER */
.course-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #262c4a, #1a2035);
  padding: 140px 80px 60px 80px !important;
  box-sizing: border-box;
}

/* BREADCRUMB */
.breadcrumb {
  font-size: 14.5px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 40px !important;
  margin-top: 50px;
  font-weight: 400;
}
.breadcrumb-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s ease;
}
.breadcrumb-link:hover { color: #ff8c1a; }
.breadcrumb-separator {
  margin: 0 8px;
  color: rgba(255, 255, 255, 0.5);
}
.breadcrumb-current {
  color: #ffffff;
  font-weight: 500;
}

/* -----------------------------------------------
   LAYOUT — now SIDE BY SIDE (row)
----------------------------------------------- */
.course-layout {
  display: flex;
  flex-direction: row;          /* ← changed from column */
  gap: 40px;
  align-items: flex-start;
  margin-top: -25px;
}

/* LEFT: course info takes remaining space */
.course-main {
  flex: 1;
  min-width: 0;
  color: #ffffff;
}

/* TITLE */
.course-title {
  font-size: 46px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 35px;
  color: #ffffff;
}

/* DESCRIPTION */
.course-description {
  font-size: 16px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 45px;
  max-width: 700px;
}

/* COURSE STATS */
.course-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 35px;
  max-width: 500px;
}
.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  color: #1f2937;
  font-size: 15px;
  font-weight: 600;
  padding: 12px 14px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}
.stat-item svg {
  flex-shrink: 0;
  stroke: #ff8c1a;
  width: 18px;
  height: 18px;
}
.stat-item span {
  color: #1f2937;
  font-weight: 600;
  font-size: 15px;
  white-space: nowrap;
}

/* -----------------------------------------------
   RIGHT: progress card — fixed width beside description
----------------------------------------------- */
.progress-section {
  width: 320px;            /* ← fixed width */
  flex-shrink: 0;
  margin-top: 0;           /* ← removed margin-top: 20px */
}

.progress-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 24px 28px !important;   /* slightly tighter to fit */
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
}

.progress-heading {
  font-size: 19px !important;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 20px 0 !important;
}

/* COMPLETION BLOCK */
.completion-block { margin-bottom: 20px; }
.completion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.completion-label {
  font-size: 13.5px;
  color: #6b7280;
  font-weight: 500;
}
.completion-percent {
  font-size: 16px;
  font-weight: 700;
  color: #3b82f6;
}
.progress-bar-bg {
  height: 8px;
  background: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  border-radius: 8px;
  transition: width 0.5s ease;
}

/* -----------------------------------------------
   PROGRESS STATS — 2×2 grid to fit narrower card
----------------------------------------------- */
.progress-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);   /* ← 2 cols instead of 4 */
  gap: 12px;
}

.progress-card .progress-stats .progress-stat {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: flex-start !important;
  text-align: left !important;
  background: #f9fafb;
  padding: 14px 12px;
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  gap: 10px !important;
}
.progress-stat:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.progress-card .progress-stats .progress-stat .stat-emoji {
  font-size: 24px;    /* ← smaller emoji to match compact card */
  flex-shrink: 0;
  line-height: 1;
}

.progress-card .progress-stats .progress-stat .stat-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

/* ← SMALLER number font as requested */
.progress-card .progress-stats .progress-stat .stat-info .stat-value {
  font-size: 16px !important;   /* was 20px */
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1.2;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.progress-card .progress-stats .progress-stat .stat-info .stat-label {
  font-size: 11.5px !important;
  color: #6b7280;
  font-weight: 500;
  line-height: 1.3;
  margin: 0;
  text-align: left;
}

/* RATE BUTTON */
.rate-course-btn {
  width: 100%;
  margin-top: 16px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #FFA726, #FF9800);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(255,167,38,0.3);
}
.rate-course-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #FF9800, #F57C00);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255,167,38,0.4);
}
.rate-course-btn:disabled {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
}

/* LESSON SECTION */
.lesson-section {
  margin-top: 80px;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
}
.lesson-tabs {
  display: flex;
  border-bottom: 2px solid #e5e7eb;
  background: #f9fafb;
}
.lesson-tab {
  flex: 1;
  padding: 18px 24px;
  background: transparent;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}
.lesson-tab:hover {
  color: #3b82f6;
  background: rgba(59,130,246,0.05);
}
.lesson-tab.active {
  color: #3b82f6;
  background: #ffffff;
}
.lesson-tab.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0; right: 0;
  height: 3px;
  background: #3b82f6;
}

.lesson-content-wrapper {
  display: flex;
  gap: 30px;
  padding: 30px;
}
.lesson-main {
  flex: 1;
  min-width: 0;
}
.video-container {
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
}
.lesson-info { padding: 20px 0; }
.lesson-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px 0;
}
.lesson-description {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 8px 0;
}
.lesson-duration {
  font-size: 14px;
  color: #9ca3af;
  margin: 0 0 20px 0;
}
.lesson-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.completed-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #10b981;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}
.completed-btn:hover { background: #059669; }
.mark-complete-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}
.mark-complete-btn:hover { background: #2563eb; }
.download-pdf-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #f97316;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s ease;
}
.download-pdf-btn:hover { background: #ea580c; }
.download-pdf-btn.disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
}

/* ASSIGNMENTS */
.assignments-section {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 2px solid #e5e7eb;
}
.assignments-heading {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 20px 0;
}
.assignment-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  transition: box-shadow 0.2s ease;
}
.assignment-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.assignment-card.module-assignment { border-left: 4px solid #8b5cf6; }
.assignment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
}
.assignment-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  flex: 1;
}
.module-badge {
  display: inline-block;
  background: #8b5cf6;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  margin-right: 8px;
  text-transform: uppercase;
}
.assignment-status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  text-transform: capitalize;
}
.assignment-description {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 12px 0;
  line-height: 1.5;
}
.assignment-meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #9ca3af;
  margin-bottom: 12px;
}
.view-assignment-btn {
  width: 100%;
  padding: 10px 16px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}
.view-assignment-btn:hover { background: #2563eb; }

/* SIDEBAR */
.course-sidebar {
  width: 380px;
  flex-shrink: 0;
  background: #f9fafb;
  border-radius: 12px;
  padding: 24px;
  max-height: 600px;
  overflow-y: auto;
}
.sidebar-heading {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 20px 0;
}
.module-item {
  margin-bottom: 16px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}
.module-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.module-header:hover { background: #f3f4f6; }
.module-title-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}
.module-number {
  width: 32px;
  height: 32px;
  background: #3b82f6;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}
.module-info { flex: 1; min-width: 0; }
.module-title {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}
.module-meta {
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
}
.module-toggle {
  color: #9ca3af;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}
.module-lessons { padding: 0 16px 12px 16px; }
.lesson-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-bottom: 4px;
}
.lesson-item:hover { background: #f3f4f6; }
.lesson-item.active {
  background: #e0f2fe;
  border-left: 3px solid #3b82f6;
}
.lesson-item.completed .lesson-icon { color: #10b981; }
.lesson-item:not(.completed) .lesson-icon { color: #9ca3af; }
.lesson-name {
  flex: 1;
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}
.lesson-item.completed .lesson-name { color: #6b7280; }
.lesson-time {
  font-size: 12px;
  color: #9ca3af;
  flex-shrink: 0;
}

/* MODALS */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}
.modal-content {
  background: #fff;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}
.modal-header h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  flex: 1;
}
.modal-close {
  background: none;
  border: none;
  font-size: 32px;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}
.modal-close:hover { color: #374151; }
.modal-body { padding: 24px; }
.modal-description {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 16px 0;
}
.modal-meta {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #9ca3af;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}
.form-group { margin-bottom: 20px; }
.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s ease;
}
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
}
.form-group input[type="file"] {
  width: 100%;
  padding: 12px;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  cursor: pointer;
}
.quiz-placeholder {
  background: #f3f4f6;
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
}
.quiz-placeholder p { margin: 0; color: #6b7280; }
.quiz-note { font-size: 13px; margin-top: 8px !important; color: #9ca3af !important; }
.submit-btn {
  width: 100%;
  padding: 14px 24px;
  background: #10b981;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 20px;
}
.submit-btn:hover:not(:disabled) { background: #059669; }
.submit-btn:disabled { background: #d1d5db; cursor: not-allowed; }
.waiting-grade {
  background: #fef3c7;
  border: 1px solid #fde047;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  color: #92400e;
  font-weight: 500;
  margin-top: 16px;
}

/* RATING MODAL */
.star-rating-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 30px 0 20px 0;
}
.star-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  transition: transform 0.2s ease;
}
.star-button:hover { transform: scale(1.15); }
.rating-text {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #FFA726;
  margin: 10px 0;
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .course-layout {
    flex-direction: column;
  }
  .progress-section {
    width: 100%;
  }
  .progress-stats {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .course-page { padding: 90px 20px 30px 20px !important; }
  .course-title { font-size: 1.8rem; }
  .progress-stats { grid-template-columns: repeat(2, 1fr); }
  .lesson-content-wrapper { flex-direction: column; padding: 20px; }
  .course-sidebar { width: 100%; max-height: 500px; }
}

@media (max-width: 480px) {
  .course-page { padding: 80px 16px 20px 16px !important; }
  .course-title { font-size: 1.5rem; }
  .progress-stats { grid-template-columns: 1fr; }
}
`;

const CourseCSSNCII = () => {
  const assignmentsData = [
    { id: 1, lessonId: 1, moduleId: null, type: 'lesson', title: "PC Components Identification Quiz", description: "Complete the quiz about different computer components and their functions.", submissionType: "quiz", dueDate: "2026-02-15", points: 20, status: "pending", studentSubmission: null, grade: null, feedback: null },
    { id: 2, lessonId: 3, moduleId: null, type: 'lesson', title: "PC Build Documentation", description: "Document your PC assembly process with photos and descriptions of each step.", submissionType: "file", dueDate: "2026-02-20", points: 50, status: "pending", studentSubmission: null, grade: null, feedback: null },
    { id: 3, lessonId: null, moduleId: 1, type: 'module', title: "Hardware Assembly Module Assessment", description: "Submit a comprehensive report covering all topics in the Hardware Assembly module.", submissionType: "file", dueDate: "2026-02-25", points: 100, status: "pending", studentSubmission: null, grade: null, feedback: null }
  ];

  const courseLessons = {
    modules: [
      { id: 1, title: "Hardware Assembly Fundamentals", lessons: [
        { id: 1, name: "Introduction to Computer Components", duration: "15 min", videoUrl: "https://www.youtube.com/embed/ExxFxD4OSZ0", description: "Overview of motherboards, CPUs, RAM, storage, and peripheral devices.", pdfUrl: null, completed: false },
        { id: 2, name: "Safety Procedures & ESD Prevention", duration: "12 min", videoUrl: "https://www.youtube.com/embed/nXkgbmr3dRA", description: "Learn essential safety protocols and electrostatic discharge prevention techniques.", pdfUrl: null, completed: false },
        { id: 3, name: "Step-by-Step PC Assembly", duration: "25 min", videoUrl: "https://www.youtube.com/embed/BL4DCEp7blY", description: "Complete guide to assembling a computer from individual components.", pdfUrl: null, completed: false },
        { id: 4, name: "BIOS Setup & Configuration", duration: "18 min", videoUrl: "https://www.youtube.com/embed/ezubjTO7rRI", description: "Configure BIOS settings for optimal system performance.", pdfUrl: null, completed: false }
      ]},
      { id: 2, title: "Operating System Installation", lessons: [
        { id: 5, name: "Creating Bootable Installation Media", duration: "10 min", videoUrl: "https://www.youtube.com/embed/wmqX1-kQKa0", description: "Learn how to create bootable USB drives for operating system installation.", pdfUrl: null, completed: false },
        { id: 6, name: "Windows Installation Guide", duration: "20 min", videoUrl: "https://www.youtube.com/embed/bP03Y-l9NOM", description: "Complete walkthrough of Windows installation process.", pdfUrl: null, completed: false },
        { id: 7, name: "Linux Installation (Ubuntu)", duration: "18 min", videoUrl: "https://www.youtube.com/embed/mXyN1aJYefc", description: "Step-by-step guide to installing Ubuntu Linux.", pdfUrl: null, completed: false },
        { id: 8, name: "Driver Installation & Updates", duration: "15 min", videoUrl: "https://www.youtube.com/embed/mUCCvdtY34U", description: "Install and update essential system drivers.", pdfUrl: null, completed: false }
      ]},
      { id: 3, title: "Network Configuration", lessons: [
        { id: 9, name: "Networking Fundamentals", duration: "20 min", videoUrl: "https://www.youtube.com/embed/3QhU9jd03a0", description: "Understanding basic networking concepts and protocols.", pdfUrl: null, completed: false },
        { id: 10, name: "Cable Termination & Testing", duration: "15 min", videoUrl: "https://www.youtube.com/embed/lullzS740wI", description: "Learn proper cable termination techniques and testing procedures.", pdfUrl: null, completed: false },
        { id: 11, name: "Router & Switch Configuration", duration: "22 min", videoUrl: "https://www.youtube.com/embed/eMamgWllRFY", description: "Configure routers and switches for network connectivity.", pdfUrl: null, completed: false },
        { id: 12, name: "Network Troubleshooting", duration: "18 min", videoUrl: "https://www.youtube.com/embed/1i3XdhC2ZAs", description: "Diagnose and resolve common network issues.", pdfUrl: null, completed: false }
      ]},
      { id: 4, title: "Preventive Maintenance", lessons: [
        { id: 13, name: "System Cleaning & Thermal Management", duration: "12 min", videoUrl: "https://www.youtube.com/embed/Y51yZE18qus", description: "Proper cleaning techniques and thermal paste application.", pdfUrl: null, completed: false },
        { id: 14, name: "Disk Maintenance & Optimization", duration: "15 min", videoUrl: "https://www.youtube.com/embed/XSvOfu2PfXk", description: "Optimize disk performance and maintain storage health.", pdfUrl: null, completed: false },
        { id: 15, name: "Backup & Recovery Procedures", duration: "18 min", videoUrl: "https://www.youtube.com/embed/07EHsPuKXc0", description: "Implement effective backup strategies and recovery procedures.", pdfUrl: null, completed: false },
        { id: 16, name: "Security Updates & Malware Prevention", duration: "16 min", videoUrl: "https://www.youtube.com/embed/inWWhr5tnEA", description: "Keep systems secure with updates and malware prevention.", pdfUrl: null, completed: false }
      ]}
    ]
  };

  const courseMetadata = { totalStudents: 0, averageRating: 0, totalRatings: 0 };

  const [modules, setModules] = useState(courseLessons.modules);
  const [currentLesson, setCurrentLesson] = useState(courseLessons.modules[0].lessons[0]);
  const [expandedModules, setExpandedModules] = useState([1]);
  const [assignments, setAssignments] = useState(assignmentsData);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [submissionFile, setSubmissionFile] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [hasRated, setHasRated] = useState(false);
  const videoRef = useRef(null);

  const getCurrentLessonAssignments = () => assignments.filter(a => a.lessonId === currentLesson.id);
  const getCurrentModuleAssignments = () => {
    const currentModule = modules.find(m => m.lessons.some(l => l.id === currentLesson.id));
    return assignments.filter(a => a.moduleId === currentModule?.id);
  };

  const calculateProgress = () => {
    const allLessons = modules.flatMap(m => m.lessons);
    const completedCount = allLessons.filter(l => l.completed).length;
    const totalCount = allLessons.length;
    const percentage = Math.round((completedCount / totalCount) * 100);
    const completedDuration = allLessons.filter(l => l.completed).reduce((total, lesson) => total + parseInt(lesson.duration), 0);
    const hours = Math.floor(completedDuration / 60);
    const mins = completedDuration % 60;
    return { completedCount, totalCount, percentage, duration: `${hours}h ${mins}min` };
  };

  const progress = calculateProgress();

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]);
  };

  const markLessonComplete = (lessonId) => {
    setModules(prevModules => prevModules.map(module => ({ ...module, lessons: module.lessons.map(lesson => lesson.id === lessonId ? { ...lesson, completed: true } : lesson) })));
    if (currentLesson.id === lessonId) setCurrentLesson(prev => ({ ...prev, completed: true }));
  };

  const openAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setShowAssignmentModal(true);
    setSubmissionText('');
    setSubmissionFile(null);
  };

  const submitAssignment = () => {
    if (!selectedAssignment) return;
    const submission = { submittedAt: new Date().toISOString(), type: selectedAssignment.submissionType };
    setAssignments(prev => prev.map(a => a.id === selectedAssignment.id ? { ...a, status: 'submitted', studentSubmission: submission } : a));
    setShowAssignmentModal(false);
    alert('Assignment submitted successfully!');
  };

  const submitRating = () => {
    if (userRating === 0) { alert('Please select a rating'); return; }
    setHasRated(true);
    setShowRatingModal(false);
    alert(`Thank you for rating this course ${userRating} stars!`);
    setUserRating(0);
    setRatingComment('');
  };

  const getModuleCompletion = (module) => {
    const completed = module.lessons.filter(l => l.completed).length;
    return Math.round((completed / module.lessons.length) * 100);
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#f59e0b';
      case 'submitted': return '#3b82f6';
      case 'graded': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="course-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/course" className="breadcrumb-link">Courses</a>
          <span className="breadcrumb-separator"> › </span>
          <span className="breadcrumb-current">Computer Systems Servicing NC II</span>
        </nav>

        {/* ── SIDE-BY-SIDE: course info LEFT, progress card RIGHT ── */}
        <div className="course-layout">
          {/* Left - Course Info */}
          <div className="course-main">
            <h1 className="course-title">Computer Systems Servicing NC II</h1>
            <p className="course-description">
              This comprehensive course prepares you for the TESDA National Certificate II in Computer Systems 
              Servicing. You'll learn everything from basic hardware assembly to advanced network configuration, with 
              hands-on practice using real equipment and simulated environments.
            </p>
            <div className="course-stats">
              <div className="stat-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span>280 hours</span>
              </div>
              <div className="stat-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>{courseMetadata.totalStudents} students</span>
              </div>
              <div className="stat-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                <span>16 lessons</span>
              </div>
              {courseMetadata.totalRatings > 0 && (
                <div className="stat-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFA726"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span>{courseMetadata.averageRating.toFixed(1)} rating ({courseMetadata.totalRatings})</span>
                </div>
              )}
            </div>
          </div>

          {/* Right - Progress Card (beside description) */}
          <div className="progress-section">
            <div className="progress-card">
              <h2 className="progress-heading">Your Progress</h2>
              <div className="completion-block">
                <div className="completion-header">
                  <span className="completion-label">Course Completion</span>
                  <span className="completion-percent">{progress.percentage}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${progress.percentage}%` }}></div>
                </div>
              </div>
              <div className="progress-stats">
                <div className="progress-stat">
                  <div className="stat-emoji">📚</div>
                  <div className="stat-info">
                    <div className="stat-value">{progress.completedCount}/{progress.totalCount}</div>
                    <div className="stat-label">Lessons Done</div>
                  </div>
                </div>
                <div className="progress-stat">
                  <div className="stat-emoji">⏱️</div>
                  <div className="stat-info">
                    <div className="stat-value">{progress.duration}</div>
                    <div className="stat-label">Total Duration</div>
                  </div>
                </div>
                <div className="progress-stat">
                  <div className="stat-emoji">➕</div>
                  <div className="stat-info">
                    <div className="stat-value">4</div>
                    <div className="stat-label">Modules</div>
                  </div>
                </div>
                <div className="progress-stat">
                  <div className="stat-emoji">🏅</div>
                  <div className="stat-info">
                    <div className="stat-value">{progress.percentage === 100 ? 'Ready' : 'Pending'}</div>
                    <div className="stat-label">Certificate</div>
                  </div>
                </div>
              </div>
              <button className="rate-course-btn" onClick={() => setShowRatingModal(true)} disabled={hasRated}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={hasRated ? "#FFA726" : "none"} stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                {hasRated ? 'You rated this course' : 'Rate this Course'}
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Section */}
        <div className="lesson-section">
          <div className="lesson-tabs">
            <button className="lesson-tab active">Learn</button>
            <button className="lesson-tab">Overview</button>
            <button className="lesson-tab">Certificate</button>
          </div>
          <div className="lesson-content-wrapper">
            <div className="lesson-main">
              <div className="video-container">
                <iframe ref={videoRef} key={currentLesson.id} width="100%" height="100%" src={`${currentLesson.videoUrl}?enablejsapi=1`} title={currentLesson.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className="lesson-info">
                <h2 className="lesson-title">{currentLesson.name}</h2>
                <p className="lesson-description">{currentLesson.description}</p>
                <p className="lesson-duration">Duration: {currentLesson.duration}</p>
                <div className="lesson-actions">
                  {currentLesson.completed ? (
                    <button className="completed-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      Completed
                    </button>
                  ) : (
                    <button className="mark-complete-btn" onClick={() => markLessonComplete(currentLesson.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      Mark as Complete
                    </button>
                  )}
                  {currentLesson.pdfUrl ? (
                    <a href={currentLesson.pdfUrl} className="download-pdf-btn" download target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Download PDF
                    </a>
                  ) : (
                    <button className="download-pdf-btn disabled" disabled>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      No PDF Available
                    </button>
                  )}
                </div>
                {(getCurrentLessonAssignments().length > 0 || getCurrentModuleAssignments().length > 0) && (
                  <div className="assignments-section">
                    <h3 className="assignments-heading">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      Assignments
                    </h3>
                    {getCurrentLessonAssignments().map(assignment => (
                      <div key={assignment.id} className="assignment-card">
                        <div className="assignment-header">
                          <h4 className="assignment-title">{assignment.title}</h4>
                          <span className="assignment-status-badge" style={{ backgroundColor: getStatusColor(assignment.status) }}>{assignment.status}</span>
                        </div>
                        <p className="assignment-description">{assignment.description}</p>
                        <div className="assignment-meta">
                          <span>Due: {formatDate(assignment.dueDate)}</span>
                          <span>{assignment.points} points</span>
                        </div>
                        <button className="view-assignment-btn" onClick={() => openAssignment(assignment)}>
                          {assignment.status === 'pending' ? 'Submit Assignment' : 'View Submission'}
                        </button>
                      </div>
                    ))}
                    {getCurrentModuleAssignments().map(assignment => (
                      <div key={assignment.id} className="assignment-card module-assignment">
                        <div className="assignment-header">
                          <h4 className="assignment-title"><span className="module-badge">Module</span>{assignment.title}</h4>
                          <span className="assignment-status-badge" style={{ backgroundColor: getStatusColor(assignment.status) }}>{assignment.status}</span>
                        </div>
                        <p className="assignment-description">{assignment.description}</p>
                        <div className="assignment-meta">
                          <span>Due: {formatDate(assignment.dueDate)}</span>
                          <span>{assignment.points} points</span>
                        </div>
                        <button className="view-assignment-btn" onClick={() => openAssignment(assignment)}>
                          {assignment.status === 'pending' ? 'Submit Assignment' : 'View Submission'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="course-sidebar">
              <h3 className="sidebar-heading">Course Content</h3>
              {modules.map((module) => (
                <div key={module.id} className="module-item">
                  <div className="module-header" onClick={() => toggleModule(module.id)}>
                    <div className="module-title-wrapper">
                      <span className="module-number">{module.id}</span>
                      <div className="module-info">
                        <h4 className="module-title">{module.title}</h4>
                        <p className="module-meta">{module.lessons.length} lessons • {getModuleCompletion(module)}% complete</p>
                      </div>
                    </div>
                    <svg className="module-toggle" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: expandedModules.includes(module.id) ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                  {expandedModules.includes(module.id) && (
                    <div className="module-lessons">
                      {module.lessons.map((lesson) => (
                        <div key={lesson.id} className={`lesson-item ${lesson.completed ? 'completed' : ''} ${currentLesson.id === lesson.id ? 'active' : ''}`} onClick={() => setCurrentLesson(lesson)}>
                          {lesson.completed ? (
                            <svg className="lesson-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                          ) : (
                            <svg className="lesson-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          )}
                          <span className="lesson-name">{lesson.name}</span>
                          <span className="lesson-time">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Assignment Modal */}
        {showAssignmentModal && selectedAssignment && (
          <div className="modal-overlay" onClick={() => setShowAssignmentModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{selectedAssignment.title}</h3>
                <button className="modal-close" onClick={() => setShowAssignmentModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <p className="modal-description">{selectedAssignment.description}</p>
                <div className="modal-meta">
                  <span>Due: {formatDate(selectedAssignment.dueDate)}</span>
                  <span>Points: {selectedAssignment.points}</span>
                </div>
                {selectedAssignment.status === 'pending' ? (
                  <div className="submission-form">
                    {selectedAssignment.submissionType === 'text' && (
                      <div className="form-group">
                        <label>Your Answer:</label>
                        <textarea value={submissionText} onChange={(e) => setSubmissionText(e.target.value)} placeholder="Type your answer here..." rows="8"/>
                      </div>
                    )}
                    {selectedAssignment.submissionType === 'file' && (
                      <div className="form-group">
                        <label>Upload File:</label>
                        <input type="file" onChange={(e) => e.target.files && setSubmissionFile(e.target.files[0])} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"/>
                        {submissionFile && <p style={{marginTop:8,fontSize:13,color:'#10b981'}}>Selected: {submissionFile.name}</p>}
                      </div>
                    )}
                    {selectedAssignment.submissionType === 'quiz' && (
                      <div className="quiz-placeholder">
                        <p>Quiz interface will be displayed here</p>
                        <p className="quiz-note">(To be implemented by instructor)</p>
                      </div>
                    )}
                    <button className="submit-btn" onClick={submitAssignment} disabled={(selectedAssignment.submissionType === 'text' && !submissionText) || (selectedAssignment.submissionType === 'file' && !submissionFile)}>
                      Submit Assignment
                    </button>
                  </div>
                ) : (
                  <div className="submission-view" style={{marginTop:20}}>
                    <h4>Your Submission</h4>
                    <p style={{fontSize:14,color:'#6b7280',marginBottom:20}}>Submitted: {selectedAssignment.studentSubmission?.submittedAt ? new Date(selectedAssignment.studentSubmission.submittedAt).toLocaleString() : 'N/A'}</p>
                    {selectedAssignment.status === 'submitted' && <p className="waiting-grade">Waiting for instructor to grade...</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Rating Modal */}
        {showRatingModal && (
          <div className="modal-overlay" onClick={() => setShowRatingModal(false)}>
            <div className="modal-content" style={{maxWidth:500}} onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Rate this Course</h3>
                <button className="modal-close" onClick={() => setShowRatingModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <p className="modal-description">How would you rate your experience with this course?</p>
                <div className="star-rating-container">
                  {[1,2,3,4,5].map((star) => (
                    <button key={star} className="star-button" onClick={() => setUserRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill={(hoverRating || userRating) >= star ? "#FFA726" : "none"} stroke="#FFA726" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </button>
                  ))}
                </div>
                {userRating > 0 && <p className="rating-text">You selected: {userRating} star{userRating > 1 ? 's' : ''}</p>}
                <div className="form-group" style={{marginTop:24}}>
                  <label>Comment (Optional):</label>
                  <textarea value={ratingComment} onChange={(e) => setRatingComment(e.target.value)} placeholder="Share your thoughts about this course..." rows="4"/>
                </div>
                <button className="submit-btn" onClick={submitRating} disabled={userRating === 0}>Submit Rating</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseCSSNCII;