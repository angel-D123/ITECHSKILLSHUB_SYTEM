import React, { useState } from 'react';
import '../styles/Games.css';

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const games = [
    {
      id: 1,
      title: "PC Components Quiz",
      description: "Test your knowledge about computer hardware components",
      category: "quiz",
      difficulty: "Easy",
      duration: "5 min",
      image: "🖥️",
      link: "/games/pc-components-quiz"
    },
    {
      id: 2,
      title: "Network Troubleshooting Simulator",
      description: "Practice diagnosing and fixing network issues",
      category: "simulation",
      difficulty: "Medium",
      duration: "15 min",
      image: "🌐",
      link: "/games/network-simulator"
    },
    {
      id: 3,
      title: "Assembly Challenge",
      description: "Build a PC step-by-step in this interactive game",
      category: "simulation",
      difficulty: "Medium",
      duration: "10 min",
      image: "🔧",
      link: "/games/assembly-challenge"
    },
    {
      id: 4,
      title: "BIOS Configuration Quiz",
      description: "Master BIOS settings and configurations",
      category: "quiz",
      difficulty: "Hard",
      duration: "8 min",
      image: "⚙️",
      link: "/games/bios-quiz"
    },
    {
      id: 5,
      title: "Operating System Installation",
      description: "Step-by-step OS installation practice",
      category: "simulation",
      difficulty: "Easy",
      duration: "12 min",
      image: "💿",
      link: "/games/os-installation"
    },
    {
      id: 6,
      title: "Troubleshooting Trivia",
      description: "Quick-fire questions about common PC problems",
      category: "quiz",
      difficulty: "Medium",
      duration: "7 min",
      image: "🔍",
      link: "/games/troubleshooting-trivia"
    },
    {
      id: 7,
      title: "Cable Management Game",
      description: "Learn proper cable routing and organization",
      category: "simulation",
      difficulty: "Easy",
      duration: "6 min",
      image: "🔌",
      link: "/games/cable-management"
    },
    {
      id: 8,
      title: "Security Best Practices Quiz",
      description: "Test your cybersecurity knowledge",
      category: "quiz",
      difficulty: "Medium",
      duration: "10 min",
      image: "🔒",
      link: "/games/security-quiz"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Games', icon: '🎮' },
    { id: 'quiz', name: 'Quizzes', icon: '❓' },
    { id: 'simulation', name: 'Simulations', icon: '🎯' }
  ];

  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="games-page">
      {/* Hero Section */}
      <div className="games-hero">
        <div className="games-hero-content">
          <h1 className="games-hero-title">
            <span className="games-icon">🎮</span>
            Learning Games
          </h1>
          <p className="games-hero-subtitle">
            Practice your skills through interactive games, quizzes, and simulations
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="games-container">
        {/* Category Filters */}
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="stats-banner">
          <div className="stat-item">
            <div className="stat-value">{games.length}</div>
            <div className="stat-label">Total Games</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{games.filter(g => g.category === 'quiz').length}</div>
            <div className="stat-label">Quizzes</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{games.filter(g => g.category === 'simulation').length}</div>
            <div className="stat-label">Simulations</div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="games-grid">
          {filteredGames.map(game => (
            <div key={game.id} className="game-card">
              <div className="game-image">
                <div className="game-emoji">{game.image}</div>
                <div 
                  className="difficulty-badge"
                  style={{ backgroundColor: getDifficultyColor(game.difficulty) }}
                >
                  {game.difficulty}
                </div>
              </div>
              
              <div className="game-content">
                <h3 className="game-title">{game.title}</h3>
                <p className="game-description">{game.description}</p>
                
                <div className="game-meta">
                  <span className="game-duration">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    {game.duration}
                  </span>
                  <span className="game-category">
                    {game.category === 'quiz' ? '❓ Quiz' : '🎯 Simulation'}
                  </span>
                </div>

                <button className="play-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="coming-soon-section">
          <h2 className="coming-soon-title">More Games Coming Soon!</h2>
          <p className="coming-soon-text">
            We're constantly adding new interactive learning experiences. Check back often!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Games;