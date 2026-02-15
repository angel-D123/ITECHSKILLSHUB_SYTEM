import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Users, BookOpen, FileText, BarChart3, 
  Settings, LogOut, Bell, Menu, X, User, Search, 
  ChevronDown, ChevronRight, Clock, Calendar,
  Star, HelpCircle, Sun, Moon, Pin, Plus
} from 'lucide-react';
import './DashboardLayout.css';
import Logo from '../assets/Logo1.svg';

export default function DashboardLayout({ userRole = 'admin' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [pinnedItems, setPinnedItems] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Assignment', message: 'John submitted homework', time: '2 min ago', unread: true },
    { id: 2, title: 'Course Update', message: 'React course has been updated', time: '1 hour ago', unread: true },
    { id: 3, title: 'System Alert', message: 'Scheduled maintenance tonight', time: '3 hours ago', unread: false },
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Handle sidebar resizing
  const startResizing = () => {
    setIsResizing(true);
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const resize = (e) => {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth >= 80 && newWidth <= 400) {
        setSidebarWidth(newWidth);
      }
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      // ? for keyboard shortcuts
      if (e.key === '?' && !showSearch) {
        e.preventDefault();
        setShowKeyboardShortcuts(!showKeyboardShortcuts);
      }
      // Escape to close modals
      if (e.key === 'Escape') {
        setShowSearch(false);
        setShowKeyboardShortcuts(false);
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [showSearch, showKeyboardShortcuts]);

  // Add event listeners for resizing
  useEffect(() => {
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResizing);
    return () => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing]);

  // Sidebar navigation items with badges and sub-menus
  const getNavigationItems = () => {
    if (userRole === 'admin') {
      return [
        { icon: Home, label: 'Dashboard', path: '/admin/dashboard', badge: null },
        { 
          icon: Users, 
          label: 'Users', 
          path: '/admin/users', 
          badge: '12',
          subMenu: [
            { label: 'All Users', path: '/admin/users/all' },
            { label: 'Instructors', path: '/admin/users/instructors' },
            { label: 'Students', path: '/admin/users/students' },
          ]
        },
        { 
          icon: BookOpen, 
          label: 'Courses', 
          path: '/admin/courses', 
          badge: 'New',
          subMenu: [
            { label: 'All Courses', path: '/admin/courses/all' },
            { label: 'Published', path: '/admin/courses/published' },
            { label: 'Drafts', path: '/admin/courses/drafts' },
          ]
        },
        { icon: FileText, label: 'Assignments', path: '/admin/assignments', badge: '5' },
        { icon: BarChart3, label: 'Analytics', path: '/admin/analytics', badge: null },
        { icon: Settings, label: 'Settings', path: '/admin/settings', badge: null },
      ];
    } else if (userRole === 'instructor') {
      return [
        { icon: Home, label: 'Dashboard', path: '/instructor/dashboard', badge: null },
        { icon: BookOpen, label: 'My Courses', path: '/instructor/courses', badge: '3' },
        { icon: Users, label: 'Students', path: '/instructor/students', badge: null },
        { icon: FileText, label: 'Assignments', path: '/instructor/assignments', badge: '8' },
        { icon: BarChart3, label: 'Reports', path: '/instructor/reports', badge: null },
      ];
    }
    return [];
  };

  const handleLogout = () => {
    navigate('/');
  };

  const toggleSubMenu = (label) => {
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const togglePinItem = (path) => {
    setPinnedItems(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark-mode');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const unreadCount = notifications.filter(n => n.unread).length;
  const isNarrow = sidebarWidth < 150;

  return (
    <div className={`premium-dashboard-layout ${darkMode ? 'dark-mode' : ''}`}>
      {/* Global Search Modal */}
      {showSearch && (
        <div className="search-overlay" onClick={() => setShowSearch(false)}>
          <div className="search-modal glass-effect" onClick={(e) => e.stopPropagation()}>
            <div className="search-header">
              <Search size={20} className="search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search anything... (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button className="search-close" onClick={() => setShowSearch(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="search-results">
              <div className="search-category">
                <h4>Quick Actions</h4>
                <div className="search-item">
                  <Home size={16} />
                  <span>Go to Dashboard</span>
                </div>
                <div className="search-item">
                  <Plus size={16} />
                  <span>Create New Course</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {showKeyboardShortcuts && (
        <div className="shortcuts-overlay" onClick={() => setShowKeyboardShortcuts(false)}>
          <div className="shortcuts-modal glass-effect" onClick={(e) => e.stopPropagation()}>
            <div className="shortcuts-header">
              <h3>Keyboard Shortcuts</h3>
              <button onClick={() => setShowKeyboardShortcuts(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="shortcuts-content">
              <div className="shortcut-item">
                <div className="shortcut-keys">
                  <kbd>Ctrl</kbd> + <kbd>K</kbd>
                </div>
                <span>Open Search</span>
              </div>
              <div className="shortcut-item">
                <div className="shortcut-keys">
                  <kbd>?</kbd>
                </div>
                <span>Show Shortcuts</span>
              </div>
              <div className="shortcut-item">
                <div className="shortcut-keys">
                  <kbd>Esc</kbd>
                </div>
                <span>Close Modals</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Sidebar */}
      <aside 
        className={`premium-sidebar ${sidebarOpen ? 'open' : 'closed'} ${isNarrow ? 'narrow' : ''}`}
        style={{ width: `${sidebarWidth}px` }}
      >
        {/* Shiny Background Effect */}
        <div className="sidebar-shine"></div>
        <div className="sidebar-gradient"></div>
        
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="logo-wrapper">
              <img src={Logo} alt="Logo" className="sidebar-logo" />
              <div className="logo-glow"></div>
            </div>
            {!isNarrow && (
              <h2 className="brand-text">
                <span className="brand-gradient">ITechSkillsHub</span>
              </h2>
            )}
          </div>
        </div>

        {/* Pinned Items Section */}
        {pinnedItems.length > 0 && !isNarrow && (
          <div className="pinned-section">
            <div className="section-title">
              <Star size={14} />
              <span>Pinned</span>
            </div>
            {getNavigationItems()
              .filter(item => pinnedItems.includes(item.path))
              .map((item, index) => (
                <Link
                  key={`pinned-${index}`}
                  to={item.path}
                  className="premium-nav-item pinned"
                >
                  <div className="nav-icon-wrapper">
                    <item.icon size={18} />
                  </div>
                  <span className="nav-label">{item.label}</span>
                </Link>
              ))
            }
          </div>
        )}

        <nav className="premium-sidebar-nav">
          {getNavigationItems().map((item, index) => (
            <div key={index} className="nav-item-container">
              <div className="nav-item-wrapper">
                <Link
                  to={item.path}
                  className={`premium-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                  title={isNarrow ? item.label : ''}
                >
                  <div className="nav-icon-wrapper">
                    <item.icon size={20} />
                    {location.pathname === item.path && <div className="icon-glow"></div>}
                  </div>
                  {!isNarrow && (
                    <>
                      <span className="nav-label">{item.label}</span>
                      {item.badge && (
                        <span className={`nav-badge ${item.badge === 'New' ? 'badge-new' : 'badge-count'}`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {location.pathname === item.path && <div className="active-indicator"></div>}
                </Link>
                
                {!isNarrow && (
                  <div className="nav-actions">
                    {item.subMenu && (
                      <button 
                        className="expand-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSubMenu(item.label);
                        }}
                      >
                        {expandedMenus[item.label] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              {/* Sub-menu */}
              {item.subMenu && expandedMenus[item.label] && !isNarrow && (
                <div className="sub-menu">
                  {item.subMenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className="sub-menu-item"
                    >
                      <div className="sub-menu-dot"></div>
                      <span>{subItem.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="premium-logout-btn ripple-effect" onClick={handleLogout} title="Logout">
            <div className="nav-icon-wrapper">
              <LogOut size={20} />
            </div>
            {!isNarrow && <span>Logout</span>}
          </button>
        </div>

        {/* Resize Handle */}
        <div 
          className="sidebar-resize-handle"
          onMouseDown={startResizing}
        >
          <div className="resize-indicator"></div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="premium-main-content" style={{ marginLeft: `${sidebarWidth}px` }}>
        {/* Premium Top Navigation */}
        <header className="premium-top-nav glass-effect">
          <div className="nav-shine"></div>
          
          <div className="top-nav-left">
            <button 
              className="mobile-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>

            {/* Breadcrumb Navigation */}
            <div className="breadcrumb">
              <span className="breadcrumb-item">Dashboard</span>
              <ChevronRight size={14} className="breadcrumb-separator" />
              <span className="breadcrumb-item active">Overview</span>
            </div>
          </div>

          <div className="top-nav-center">
            {/* Global Search Button - Centered */}
            <button 
              className="search-trigger-btn ripple-effect"
              onClick={() => setShowSearch(true)}
            >
              <Search size={18} />
              <span>Search...</span>
              <kbd className="kbd-hint">Ctrl K</kbd>
            </button>
          </div>

          <div className="top-nav-right">
            {/* Quick Actions */}
            <div className="quick-actions">
              <button 
                className="action-btn ripple-effect"
                title="Quick Add"
              >
                <Plus size={20} />
              </button>
              
              <button 
                className="action-btn ripple-effect"
                onClick={() => setShowKeyboardShortcuts(true)}
                title="Keyboard Shortcuts (?)"
              >
                <HelpCircle size={20} />
              </button>

              <button 
                className="action-btn ripple-effect"
                onClick={toggleDarkMode}
                title="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Clock & Date */}
            <div className="datetime-display">
              <div className="time">
                <Clock size={16} />
                <span>{formatTime(currentTime)}</span>
              </div>
              <div className="date">
                <Calendar size={16} />
                <span>{formatDate(currentTime)}</span>
              </div>
            </div>

            {/* Notifications */}
            <div className="notification-wrapper">
              <button 
                className="premium-notification-btn ripple-effect"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
                <div className="notification-glow"></div>
              </button>

              {showNotifications && (
                <div className="notifications-dropdown glass-effect">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    <button className="mark-all-read">Mark all as read</button>
                  </div>
                  <div className="notifications-list">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`notification-item ${notif.unread ? 'unread' : ''}`}>
                        <div className="notif-content">
                          <h4>{notif.title}</h4>
                          <p>{notif.message}</p>
                          <span className="notif-time">{notif.time}</span>
                        </div>
                        {notif.unread && <div className="unread-dot"></div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="user-menu-wrapper">
              <div 
                className="premium-user-menu ripple-effect"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="user-avatar-wrapper">
                  <img 
                    src="https://via.placeholder.com/40" 
                    alt="User" 
                    className="user-avatar"
                  />
                  <div className="avatar-ring"></div>
                  <div className="online-indicator"></div>
                </div>
                <div className="user-info">
                  <span className="user-name">Admin User</span>
                  <span className="user-role">{userRole}</span>
                </div>
                <ChevronDown size={16} className={`dropdown-arrow ${showProfileMenu ? 'rotated' : ''}`} />
              </div>

              {showProfileMenu && (
                <div className="profile-dropdown glass-effect">
                  <div className="profile-header">
                    <img src="https://via.placeholder.com/60" alt="Profile" />
                    <div>
                      <h3>Admin User</h3>
                      <p>admin@itechskills.com</p>
                    </div>
                  </div>
                  <div className="profile-menu">
                    <button className="profile-menu-item">
                      <User size={18} />
                      <span>My Profile</span>
                    </button>
                    <button className="profile-menu-item">
                      <Settings size={18} />
                      <span>Settings</span>
                    </button>
                    <button className="profile-menu-item">
                      <HelpCircle size={18} />
                      <span>Help & Support</span>
                    </button>
                    <div className="profile-divider"></div>
                    <button className="profile-menu-item logout" onClick={handleLogout}>
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content with Premium Background */}
        <main className="premium-page-content">
          <div className="content-shine"></div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}