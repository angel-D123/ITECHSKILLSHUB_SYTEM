const InstructorDashboard = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "120px",
        background: "#ffffff",
      }}
    >
      <h1>Instructor Dashboard</h1>
      <p>Welcome, Instructor.</p>

      <ul style={{ marginTop: "20px" }}>
        <li>Upload PDF</li>
        <li>Upload Video</li>
        <li>Create Assignment</li>
        <li>View Submissions</li>
      </ul>
    </div>
  );
};

export default InstructorDashboard;
