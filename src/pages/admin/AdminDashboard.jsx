import { Users, BookOpen, GraduationCap, Award } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../components/common/StatCard';
import { adminStats } from '../../data/mockStats';
import './AdminDashboard.css';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Students"
          value={adminStats.totalStudents.toLocaleString()}
          icon={Users}
          trend={8.5}
          color="blue"
        />
        <StatCard
          title="Active Courses"
          value={adminStats.activeCourses}
          icon={BookOpen}
          trend={0}
          color="green"
        />
        <StatCard
          title="Instructors"
          value={adminStats.totalInstructors}
          icon={GraduationCap}
          trend={12.5}
          color="purple"
        />
        <StatCard
          title="Certificates Issued"
          value={adminStats.totalCertificates}
          icon={Award}
          trend={8.2}
          color="orange"
        />
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        {/* Enrollments Chart - VIOLET THEME */}
        <div className="chart-card">
          <h3>Recent Enrollments (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={adminStats.recentEnrollments}>
              <defs>
                <linearGradient id="colorEnrollment" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7B6BBD" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#7B6BBD" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
              <XAxis 
                dataKey="date" 
                stroke="#636e72"
                style={{ fontSize: '12px', fontWeight: '500' }}
              />
              <YAxis 
                stroke="#636e72"
                style={{ fontSize: '12px', fontWeight: '500' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#5B4A9E',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(91, 74, 158, 0.3)'
                }}
                labelStyle={{ color: 'white', fontWeight: '600' }}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#5B4A9E" 
                strokeWidth={3}
                dot={{ fill: '#5B4A9E', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, fill: '#7B6BBD', stroke: '#fff', strokeWidth: 2 }}
                fill="url(#colorEnrollment)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Course Completion Rates - VIOLET THEME */}
        <div className="chart-card">
          <h3>Course Completion Rates</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={adminStats.courseCompletionRates}>
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5B4A9E" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#7B6BBD" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
              <XAxis 
                dataKey="course" 
                stroke="#636e72"
                style={{ fontSize: '11px', fontWeight: '500' }}
              />
              <YAxis 
                stroke="#636e72"
                style={{ fontSize: '12px', fontWeight: '500' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#5B4A9E',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(91, 74, 158, 0.3)'
                }}
                labelStyle={{ color: 'white', fontWeight: '600' }}
                cursor={{ fill: 'rgba(91, 74, 158, 0.1)' }}
              />
              <Bar 
                dataKey="rate" 
                fill="url(#colorBar)"
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-card">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">👤</div>
            <div className="activity-content">
              <p><strong>Maria Santos</strong> completed <strong>PC Hardware Module 2</strong></p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📝</div>
            <div className="activity-content">
              <p><strong>Juan Dela Cruz</strong> submitted <strong>Network Lab Assignment</strong></p>
              <span className="activity-time">4 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">🎓</div>
            <div className="activity-content">
              <p><strong>5 new students</strong> enrolled in <strong>CSS NC II</strong></p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}