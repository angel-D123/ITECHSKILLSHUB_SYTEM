import React, { useState } from 'react';
import '../styles/Blog.css';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: "Complete Guide to PC Building in 2026",
      excerpt: "Everything you need to know about building your first custom PC, from choosing components to cable management.",
      category: "Hardware",
      author: "Prof. Maria Santos",
      date: "Feb 8, 2026",
      readTime: "8 min read",
      image: "🖥️",
      featured: true
    },
    {
      id: 2,
      title: "TESDA CSS NC II: What You Need to Know",
      excerpt: "A comprehensive overview of the Computer Systems Servicing NC II certification and how to prepare for it.",
      category: "Certification",
      author: "Admin Team",
      date: "Feb 5, 2026",
      readTime: "5 min read",
      image: "📜",
      featured: true
    },
    {
      id: 3,
      title: "Common Network Issues and How to Fix Them",
      excerpt: "Troubleshooting guide for the most common network problems you'll encounter as a technician.",
      category: "Networking",
      author: "John Dela Cruz",
      date: "Feb 3, 2026",
      readTime: "6 min read",
      image: "🌐",
      featured: false
    },
    {
      id: 4,
      title: "Understanding BIOS Settings: A Beginner's Guide",
      excerpt: "Learn about essential BIOS configurations and settings every computer technician should know.",
      category: "Tutorials",
      author: "Prof. Maria Santos",
      date: "Jan 30, 2026",
      readTime: "7 min read",
      image: "⚙️",
      featured: false
    },
    {
      id: 5,
      title: "Windows 11 Installation: Step-by-Step",
      excerpt: "Complete walkthrough of installing Windows 11 including driver setup and initial configuration.",
      category: "Software",
      author: "Tech Support Team",
      date: "Jan 28, 2026",
      readTime: "10 min read",
      image: "💻",
      featured: false
    },
    {
      id: 6,
      title: "Best Practices for Computer Maintenance",
      excerpt: "Keep your systems running smoothly with these preventive maintenance tips and schedules.",
      category: "Maintenance",
      author: "John Dela Cruz",
      date: "Jan 25, 2026",
      readTime: "5 min read",
      image: "🔧",
      featured: false
    },
    {
      id: 7,
      title: "Cybersecurity Basics for Beginners",
      excerpt: "Essential security practices every computer user and technician should implement.",
      category: "Security",
      author: "Security Expert",
      date: "Jan 22, 2026",
      readTime: "9 min read",
      image: "🔒",
      featured: false
    },
    {
      id: 8,
      title: "Router Configuration 101",
      excerpt: "Learn how to properly configure routers for optimal network performance and security.",
      category: "Networking",
      author: "Prof. Maria Santos",
      date: "Jan 20, 2026",
      readTime: "8 min read",
      image: "📡",
      featured: false
    }
  ];

  const categories = [
    'all',
    'Hardware',
    'Software',
    'Networking',
    'Security',
    'Certification',
    'Tutorials',
    'Maintenance'
  ];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <div className="blog-hero">
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">
            <span className="blog-icon">📚</span>
            Tech Blog
          </h1>
          <p className="blog-hero-subtitle">
            Tutorials, guides, and insights from industry experts
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="blog-container">
        {/* Featured Posts */}
        <div className="featured-section">
          <h2 className="section-title">
            <span className="title-icon">⭐</span>
            Featured Articles
          </h2>
          <div className="featured-grid">
            {featuredPosts.map(post => (
              <div key={post.id} className="featured-card">
                <div className="featured-image">
                  <div className="featured-emoji">{post.image}</div>
                  <div className="featured-badge">Featured</div>
                </div>
                <div className="featured-content">
                  <span className="post-category">{post.category}</span>
                  <h3 className="featured-title">{post.title}</h3>
                  <p className="featured-excerpt">{post.excerpt}</p>
                  <div className="post-meta">
                    <span className="post-author">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      {post.author}
                    </span>
                    <span className="post-date">{post.date}</span>
                    <span className="post-read-time">{post.readTime}</span>
                  </div>
                  <button className="read-btn">Read Article →</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="blog-filters">
          <h3 className="filter-title">Filter by Category</h3>
          <div className="category-tags">
            {categories.map(category => (
              <button
                key={category}
                className={`category-tag ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>

        {/* All Posts */}
        <div className="posts-section">
          <h2 className="section-title">
            <span className="title-icon">📄</span>
            {selectedCategory === 'all' ? 'All Articles' : `${selectedCategory} Articles`}
          </h2>
          <div className="posts-grid">
            {filteredPosts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-image">
                  <div className="post-emoji">{post.image}</div>
                </div>
                <div className="post-content">
                  <span className="post-category">{post.category}</span>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-meta">
                    <span className="post-author">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      {post.author}
                    </span>
                    <span className="post-date">{post.date}</span>
                  </div>
                  <div className="post-footer">
                    <span className="post-read-time">{post.readTime}</span>
                    <button className="read-link">Read →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Stay Updated</h2>
            <p className="newsletter-text">
              Subscribe to our newsletter and get the latest tech tutorials delivered to your inbox
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;