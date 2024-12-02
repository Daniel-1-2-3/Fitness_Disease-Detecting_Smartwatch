import HeartRateCard from "../Components/HeartRateCard";

const Dashboard = () => (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-4">Statistics Dashboard</h2>
      <div className="w-2/3">
        <HeartRateCard /> 
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Monthly Sales</h3>
          <p className="text-2xl font-bold">$12,345</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Active Sessions</h3>
          <p className="text-2xl font-bold">567</p>
        </div>
      </div>
    </div>
);

export default Dashboard
