const AdminDashboard = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "120px",
        background: "#ffffff",
      }}
    >
      <h1>Admin Dashboard</h1>
      <p>System administration panel</p>

      <ul style={{ marginTop: "20px" }}>
        <li>Manage Instructors</li>
        <li>Manage Courses</li>
        <li>View Users</li>
        <li>System Reports</li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
