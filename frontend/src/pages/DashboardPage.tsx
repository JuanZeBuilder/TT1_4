import Navbar from "../components/Navbar/Navbar";

const DashboardPage = () => {
  return (
    <>
      <Navbar path="dashboard" />
      <div className="content">
        <h1>Welcome to the Dashboard Page!</h1>
        <p>This is the content of your dashboard page.</p>
      </div>
    </>
  );
};
export default DashboardPage;
