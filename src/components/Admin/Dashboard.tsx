"use client";

import { useState } from "react";
import {
  Home,
  BarChart2,
  LogOut,
  Clipboard,
  Calendar,
  Users,
  Building2,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [rooms, setRooms] = useState(10);

  const handleAddRoom = () => setRooms((prev) => prev + 1);
  const handleRemoveRoom = () => setRooms((prev) => (prev > 0 ? prev - 1 : 0));

  // Overview data
  const bookingData = [
    { day: "Sunday", checkIn: 50, checkOut: 20 },
    { day: "Monday", checkIn: 30, checkOut: 10 },
    { day: "Tuesday", checkIn: 15, checkOut: 25 },
    { day: "Wednesday", checkIn: 45, checkOut: 30 },
    { day: "Thursday", checkIn: 25, checkOut: 20 },
    { day: "Friday", checkIn: 35, checkOut: 15 },
    { day: "Saturday", checkIn: 50, checkOut: 20 },
  ];

  const roomData = [
    { name: "Single", value: 734, color: "#4CAF50" },
    { name: "Double", value: 567, color: "#FF9800" },
    { name: "King", value: 464, color: "#F44336" },
    { name: "Apartments", value: 300, color: "#607D8B" },
  ];

  // Monthly data
  const monthlyData = [
    { month: "Jan", guests: 30 },
    { month: "Feb", guests: 45 },
    { month: "Mar", guests: 60 },
    { month: "Apr", guests: 50 },
    { month: "May", guests: 80 },
    { month: "Jun", guests: 90 },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Luxury Hotel Admin</h2>
        <nav>
          <ul>
            <li
              className={`mb-4 flex items-center gap-2 cursor-pointer ${
                activeTab === "dashboard" ? "text-yellow-400" : ""
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <Home size={20} /> Dashboard
            </li>
            <li
              className={`mb-4 flex items-center gap-2 cursor-pointer ${
                activeTab === "manage" ? "text-yellow-400" : ""
              }`}
              onClick={() => setActiveTab("manage")}
            >
              <Building2 size={20} /> Manage Rooms
            </li>
            <li
              className={`mb-4 flex items-center gap-2 cursor-pointer ${
                activeTab === "reports" ? "text-yellow-400" : ""
              }`}
              onClick={() => setActiveTab("reports")}
            >
              <BarChart2 size={20} /> Reports
            </li>
            <li className="mt-10 flex items-center gap-2 text-red-400 cursor-pointer hover:text-red-600">
              <LogOut size={20} /> Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100 text-black overflow-y-auto">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Hi, Welcome back!</h1>
            <p className="text-gray-600 mb-6">Royal Dashboard</p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                icon={<Clipboard size={20} />}
                title="Total Booking"
                value="1,245"
                color="purple"
              />
              <StatCard
                icon={<Building2 size={20} />}
                title="Rooms Available"
                value="287"
                color="orange"
              />
              <StatCard
                icon={<Users size={20} />}
                title="New Customers"
                value="1,532"
                color="blue"
              />
              <StatCard
                icon={<Calendar size={20} />}
                title="Today Bookings"
                value="42"
                color="green"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Booking Status */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Booking Status</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={bookingData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="checkIn" fill="#4CAF50" name="Check In" />
                    <Bar dataKey="checkOut" fill="#F44336" name="Check Out" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Room Booking Chart */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Room Booking Chart</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={roomData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                    >
                      {roomData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {roomData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <p>
                        {entry.name}: {entry.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "manage" && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Manage Rooms</h1>
            <p className="mb-4 text-gray-600">
              Adjust the number of available rooms in the hotel.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
              <h2 className="text-xl font-semibold mb-4">
                Total Rooms: {rooms}
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={handleAddRoom}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  + Add Room
                </button>
                <button
                  onClick={handleRemoveRoom}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  - Remove Room
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Reports</h1>
            <p className="mb-4 text-gray-600">Monthly guests statistics.</p>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="guests" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// StatCard Component
type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: "purple" | "orange" | "blue" | "green";
};

const StatCard = ({ icon, title, value, color }: StatCardProps) => {
  const colorClass = {
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
  }[color];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
      <div
        className={`w-12 h-12 flex items-center justify-center text-white text-xl rounded-lg ${colorClass}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
};

export default Dashboard;
