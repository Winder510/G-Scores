import TopStudents from "../../components/TopStudents";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold dark:text-amber-50">Dashboard</h1>
      <TopStudents />
    </div>
  );
};

export default Dashboard;
