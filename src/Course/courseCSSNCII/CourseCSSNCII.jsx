import React, { useState, useRef } from 'react';
import '../../styles/CourseCSSNCII.css';

const CourseCSSNCII = () => {
  // Sample assignment data (will come from instructor dashboard later)
  const assignmentsData = [
    {
      id: 1,
      lessonId: 1,
      moduleId: null,
      type: 'lesson', // 'lesson', 'module', or 'general'
      title: "PC Components Identification Quiz",
      description: "Complete the quiz about different computer components and their functions.",
      submissionType: "quiz", // 'text', 'file', 'link', 'quiz'
      dueDate: "2026-02-15",
      points: 20,
      status: "pending", // 'pending', 'submitted', 'graded'
      studentSubmission: null,
      grade: null,
      feedback: null
    },
    {
      id: 2,
      lessonId: 3,
      moduleId: null,
      type: 'lesson',
      title: "PC Build Documentation",
      description: "Document your PC assembly process with photos and descriptions of each step.",
      submissionType: "file",
      dueDate: "2026-02-20",
      points: 50,
      status: "pending",
      studentSubmission: null,
      grade: null,
      feedback: null
    },
    {
      id: 3,
      lessonId: null,
      moduleId: 1,
      type: 'module',
      title: "Hardware Assembly Module Assessment",
      description: "Submit a comprehensive report covering all topics in the Hardware Assembly module.",
      submissionType: "file",
      dueDate: "2026-02-25",
      points: 100,
      status: "pending",
      studentSubmission: null,
      grade: null,
      feedback: null
    }
  ];

  // Lesson data with YouTube URLs and PDF resources
  const courseLessons = {
    modules: [
      {
        id: 1,
        title: "Hardware Assembly Fundamentals",
        lessons: [
          {
            id: 1,
            name: "Introduction to Computer Components",
            duration: "15 min",
            videoUrl: "https://www.youtube.com/embed/ExxFxD4OSZ0",
            description: "Overview of motherboards, CPUs, RAM, storage, and peripheral devices.",
            pdfUrl: null,
            completed: false
          },
          {
            id: 2,
            name: "Safety Procedures & ESD Prevention",
            duration: "12 min",
            videoUrl: "https://www.youtube.com/embed/nXkgbmr3dRA",
            description: "Learn essential safety protocols and electrostatic discharge prevention techniques.",
            pdfUrl: null,
            completed: false
          },
          {
            id: 3,
            name: "Step-by-Step PC Assembly",
            duration: "25 min",
            videoUrl: "https://www.youtube.com/embed/BL4DCEp7blY",
            description: "Complete guide to assembling a computer from individual components.",
            pdfUrl: null,
            completed: false
          },
          {
            id: 4,
            name: "BIOS Setup & Configuration",
            duration: "18 min",
            videoUrl: "https://www.youtube.com/embed/ezubjTO7rRI",
            description: "Configure BIOS settings for optimal system performance.",
            pdfUrl: null,
            completed: false
          }
        ]
      },
      {
        id: 2,
        title: "Operating System Installation",
        lessons: [
          {
            id: 5,
            name: "Creating Bootable Installation Media",
            duration: "10 min",
            videoUrl: "https://www.youtube.com/embed/wmqX1-kQKa0",
            description: "Learn how to create bootable USB drives for operating system installation.",
            pdfUrl: null,
            completed: false
          },
          {
            id: 6,
            name: "Windows Installation Guide",
            duration: "20 min",
            videoUrl: "https://www.youtube.com/embed/bP03Y-l9NOM",
            description: "Complete walkthrough of Windows installation process.",
            pdfUrl: null,
            completed: false
          },
          {
            id: 7,
            name: "Linux Installation (Ubuntu)",
            duration: "18 min",
            videoUrl: "https://www.youtube.com/embed/mXyN1aJYefc",
            description: "Step-by-step guide to installing Ubuntu Linux.",
            pdfUrl: null,
            completed: false
          },
          {
            id: 8,
            name: "Driver Installation & Updates",
            duration: "15 min",
            videoUrl: "https://www.youtube.com/embed/mUCCvdtY34U",
            description: "Install and update essential system drivers.",
            pdfUrl: null,
            completed: false
          }
        ]
      },
      {
        id: 3,
        title: "Network Configuration",
        lessons: [
          {
            id: 9,
            name: "Networking Fundamentals",
            duration: "20 min",
            videoUrl: "https://www.youtube.com/embed/3QhU9jd03a0",
            description: "Understanding basic networking concepts and protocols.",
            pdfUrl: null,
            completed: false
          },
          {
            id: 10,
            name: "Cable Termination & Testing",
            duration: "15 min",
            videoUrl: "https://www.youtube.com/embed/lullzS740wI",
            description: "Learn proper cable termination techniques and testing procedures.",
            pdfUrl: null,
            completed: false
          },
          {
            id: 11,
            name: "Router & Switch Configuration",
            duration: "22 min",
            videoUrl: "https://www.youtube.com/embed/eMamgWllRFY",
            description: "Configure routers and switches for network connectivity.",
            pdfUrl: null,
            completed: false
          },
          {
            id: 12,
            name: "Network Troubleshooting",
            duration: "18 min",
            videoUrl: "https://www.youtube.com/embed/1i3XdhC2ZAs",
            description: "Diagnose and resolve common network issues.",
            pdfUrl: null,
            completed: false
          }
        ]
      },
      {
        id: 4,
        title: "Preventive Maintenance",
        lessons: [
          {
            id: 13,
            name: "System Cleaning & Thermal Management",
            duration: "12 min",
            videoUrl: "https://www.youtube.com/embed/Y51yZE18qus",
            description: "Proper cleaning techniques and thermal paste application.",
            pdfUrl: null,
            completed: false
          },
          {
            id: 14,
            name: "Disk Maintenance & Optimization",
            duration: "15 min",
            videoUrl: "https://www.youtube.com/embed/XSvOfu2PfXk",
            description: "Optimize disk performance and maintain storage health.",
            pdfUrl: null,
            completed: false
          },
          {
            id: 15,
            name: "Backup & Recovery Procedures",
            duration: "18 min",
            videoUrl: "https://www.youtube.com/embed/07EHsPuKXc0",
            description: "Implement effective backup strategies and recovery procedures.",
            pdfUrl: null,
            completed: false
          },
          {
            id: 16,
            name: "Security Updates & Malware Prevention",
            duration: "16 min",
            videoUrl: "https://www.youtube.com/embed/inWWhr5tnEA",
            description: "Keep systems secure with updates and malware prevention.",
            pdfUrl: null,
            completed: false
          }
        ]
      }
    ]
  };

  // State management
  const [modules, setModules] = useState(courseLessons.modules);
  const [currentLesson, setCurrentLesson] = useState(modules[0].lessons[0]);
  const [expandedModules, setExpandedModules] = useState([1]);
  const [assignments, setAssignments] = useState(assignmentsData);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [submissionFile, setSubmissionFile] = useState(null);
  const videoRef = useRef(null);

  // Get assignments for current lesson
  const getCurrentLessonAssignments = () => {
    return assignments.filter(a => a.lessonId === currentLesson.id);
  };

  // Get module assignments
  const getCurrentModuleAssignments = () => {
    const currentModule = modules.find(m => 
      m.lessons.some(l => l.id === currentLesson.id)
    );
    return assignments.filter(a => a.moduleId === currentModule?.id);
  };

  // Get general course assignments
  const getGeneralAssignments = () => {
    return assignments.filter(a => a.type === 'general');
  };

  // Calculate progress statistics
  const calculateProgress = () => {
    const allLessons = modules.flatMap(m => m.lessons);
    const completedCount = allLessons.filter(l => l.completed).length;
    const totalCount = allLessons.length;
    const percentage = Math.round((completedCount / totalCount) * 100);
    
    const completedDuration = allLessons
      .filter(l => l.completed)
      .reduce((total, lesson) => {
        const minutes = parseInt(lesson.duration);
        return total + minutes;
      }, 0);
    
    const hours = Math.floor(completedDuration / 60);
    const mins = completedDuration % 60;
    
    return {
      completedCount,
      totalCount,
      percentage,
      duration: `${hours}h ${mins}min`
    };
  };

  const progress = calculateProgress();

  // Toggle module expansion
  const toggleModule = (moduleId) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  // Mark lesson as complete
  const markLessonComplete = (lessonId) => {
    setModules(prevModules => 
      prevModules.map(module => ({
        ...module,
        lessons: module.lessons.map(lesson => 
          lesson.id === lessonId ? { ...lesson, completed: true } : lesson
        )
      }))
    );

    if (currentLesson.id === lessonId) {
      setCurrentLesson(prev => ({ ...prev, completed: true }));
    }
  };

  // Change current lesson
  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
  };

  // Open assignment modal
  const openAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setShowAssignmentModal(true);
    setSubmissionText('');
    setSubmissionFile(null);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSubmissionFile(e.target.files[0]);
    }
  };

  // Submit assignment
  const submitAssignment = () => {
    if (!selectedAssignment) return;

    const submission = {
      submittedAt: new Date().toISOString(),
      type: selectedAssignment.submissionType,
      content: selectedAssignment.submissionType === 'text' ? submissionText : null,
      file: selectedAssignment.submissionType === 'file' ? submissionFile : null,
    };

    setAssignments(prev => 
      prev.map(a => 
        a.id === selectedAssignment.id 
          ? { ...a, status: 'submitted', studentSubmission: submission }
          : a
      )
    );

    setShowAssignmentModal(false);
    alert('Assignment submitted successfully!');
  };

  // Calculate module completion percentage
  const getModuleCompletion = (module) => {
    const completed = module.lessons.filter(l => l.completed).length;
    const total = module.lessons.length;
    return Math.round((completed / total) * 100);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#f59e0b';
      case 'submitted': return '#3b82f6';
      case 'graded': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="course-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <a href="/course" className="breadcrumb-link">Courses</a>
        <span className="breadcrumb-separator"> › </span>
        <span className="breadcrumb-current">Computer Systems Servicing NC II</span>
      </nav>

      <div className="course-layout">
        {/* Left Section - Course Info */}
        <div className="course-main">
          <h1 className="course-title">Computer Systems Servicing NC II</h1>

          <p className="course-description">
            This comprehensive course prepares you for the TESDA National Certificate II in Computer Systems 
            Servicing. You'll learn everything from basic hardware assembly to advanced network configuration, with 
            hands-on practice using real equipment and simulated environments.
          </p>

          {/* Meta Information */}
          <div className="course-stats">
            <div className="stat-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <span>280 hours</span>
            </div>

            <div className="stat-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span>2,500 students</span>
            </div>

            <div className="stat-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFA726">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>4.9 rating</span>
            </div>

            <div className="stat-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              <span>16 lessons</span>
            </div>
          </div>
        </div>

        {/* Right Section - Progress Card */}
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
                <div className="stat-icon blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{progress.completedCount}/{progress.totalCount}</div>
                  <div className="stat-label">Lessons Done</div>
                </div>
              </div>

              <div className="progress-stat">
                <div className="stat-icon orange">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{progress.duration}</div>
                  <div className="stat-label">Total Duration</div>
                </div>
              </div>

              <div className="progress-stat">
                <div className="stat-icon green">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6m-6-9h6m6 0h6"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">4</div>
                  <div className="stat-label">Modules</div>
                </div>
              </div>

              <div className="progress-stat">
                <div className="stat-icon yellow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="7"/>
                    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{progress.percentage === 100 ? 'Ready' : 'Pending'}</div>
                  <div className="stat-label">Certificate</div>
                </div>
              </div>
            </div>
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
          {/* Left - Video and Lesson Info */}
          <div className="lesson-main">
            {/* Video Player */}
            <div className="video-container">
              <iframe
                ref={videoRef}
                key={currentLesson.id}
                width="100%"
                height="100%"
                src={`${currentLesson.videoUrl}?enablejsapi=1`}
                title={currentLesson.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Lesson Info */}
            <div className="lesson-info">
              <h2 className="lesson-title">{currentLesson.name}</h2>
              <p className="lesson-description">{currentLesson.description}</p>
              <p className="lesson-duration">Duration: {currentLesson.duration}</p>
              
              {/* Action Buttons */}
              <div className="lesson-actions">
                {currentLesson.completed ? (
                  <button className="completed-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    Completed
                  </button>
                ) : (
                  <button 
                    className="mark-complete-btn"
                    onClick={() => markLessonComplete(currentLesson.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    Mark as Complete
                  </button>
                )}

                {currentLesson.pdfUrl ? (
                  <a 
                    href={currentLesson.pdfUrl} 
                    className="download-pdf-btn"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download PDF
                  </a>
                ) : (
                  <button className="download-pdf-btn disabled" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    No PDF Available
                  </button>
                )}
              </div>

              {/* Assignments Section */}
              {(getCurrentLessonAssignments().length > 0 || getCurrentModuleAssignments().length > 0) && (
                <div className="assignments-section">
                  <h3 className="assignments-heading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                    </svg>
                    Assignments
                  </h3>

                  {/* Lesson Assignments */}
                  {getCurrentLessonAssignments().map(assignment => (
                    <div key={assignment.id} className="assignment-card">
                      <div className="assignment-header">
                        <h4 className="assignment-title">{assignment.title}</h4>
                        <span 
                          className="assignment-status-badge"
                          style={{ backgroundColor: getStatusColor(assignment.status) }}
                        >
                          {assignment.status}
                        </span>
                      </div>
                      <p className="assignment-description">{assignment.description}</p>
                      <div className="assignment-meta">
                        <span className="assignment-due">Due: {formatDate(assignment.dueDate)}</span>
                        <span className="assignment-points">{assignment.points} points</span>
                      </div>
                      {assignment.status === 'graded' && (
                        <div className="assignment-grade">
                          <strong>Grade:</strong> {assignment.grade}/{assignment.points}
                          {assignment.feedback && <p className="assignment-feedback">{assignment.feedback}</p>}
                        </div>
                      )}
                      <button 
                        className="view-assignment-btn"
                        onClick={() => openAssignment(assignment)}
                      >
                        {assignment.status === 'pending' ? 'Submit Assignment' : 'View Submission'}
                      </button>
                    </div>
                  ))}

                  {/* Module Assignments */}
                  {getCurrentModuleAssignments().map(assignment => (
                    <div key={assignment.id} className="assignment-card module-assignment">
                      <div className="assignment-header">
                        <h4 className="assignment-title">
                          <span className="module-badge">Module</span>
                          {assignment.title}
                        </h4>
                        <span 
                          className="assignment-status-badge"
                          style={{ backgroundColor: getStatusColor(assignment.status) }}
                        >
                          {assignment.status}
                        </span>
                      </div>
                      <p className="assignment-description">{assignment.description}</p>
                      <div className="assignment-meta">
                        <span className="assignment-due">Due: {formatDate(assignment.dueDate)}</span>
                        <span className="assignment-points">{assignment.points} points</span>
                      </div>
                      {assignment.status === 'graded' && (
                        <div className="assignment-grade">
                          <strong>Grade:</strong> {assignment.grade}/{assignment.points}
                          {assignment.feedback && <p className="assignment-feedback">{assignment.feedback}</p>}
                        </div>
                      )}
                      <button 
                        className="view-assignment-btn"
                        onClick={() => openAssignment(assignment)}
                      >
                        {assignment.status === 'pending' ? 'Submit Assignment' : 'View Submission'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right - Course Sidebar */}
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
                  <svg 
                    className="module-toggle" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    style={{ transform: expandedModules.includes(module.id) ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                
                {expandedModules.includes(module.id) && (
                  <div className="module-lessons">
                    {module.lessons.map((lesson) => (
                      <div 
                        key={lesson.id} 
                        className={`lesson-item ${lesson.completed ? 'completed' : ''} ${currentLesson.id === lesson.id ? 'active' : ''}`}
                        onClick={() => handleLessonClick(lesson)}
                      >
                        {lesson.completed ? (
                          <svg className="lesson-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                          </svg>
                        ) : (
                          <svg className="lesson-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                          </svg>
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

      {/* Assignment Submission Modal */}
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
                      <textarea 
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                        placeholder="Type your answer here..."
                        rows="8"
                      />
                    </div>
                  )}

                  {selectedAssignment.submissionType === 'file' && (
                    <div className="form-group">
                      <label>Upload File:</label>
                      <input 
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      {submissionFile && (
                        <p className="file-selected">Selected: {submissionFile.name}</p>
                      )}
                    </div>
                  )}

                  {selectedAssignment.submissionType === 'quiz' && (
                    <div className="quiz-placeholder">
                      <p>Quiz interface will be displayed here</p>
                      <p className="quiz-note">(To be implemented by instructor)</p>
                    </div>
                  )}

                  <button 
                    className="submit-btn"
                    onClick={submitAssignment}
                    disabled={
                      (selectedAssignment.submissionType === 'text' && !submissionText) ||
                      (selectedAssignment.submissionType === 'file' && !submissionFile)
                    }
                  >
                    Submit Assignment
                  </button>
                </div>
              ) : (
                <div className="submission-view">
                  <h4>Your Submission</h4>
                  <p className="submitted-date">
                    Submitted: {selectedAssignment.studentSubmission?.submittedAt 
                      ? new Date(selectedAssignment.studentSubmission.submittedAt).toLocaleString()
                      : 'N/A'}
                  </p>
                  
                  {selectedAssignment.status === 'graded' && (
                    <div className="grade-display">
                      <h4>Grade: {selectedAssignment.grade}/{selectedAssignment.points}</h4>
                      {selectedAssignment.feedback && (
                        <div className="feedback-box">
                          <strong>Instructor Feedback:</strong>
                          <p>{selectedAssignment.feedback}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedAssignment.status === 'submitted' && (
                    <p className="waiting-grade">Waiting for instructor to grade...</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCSSNCII;