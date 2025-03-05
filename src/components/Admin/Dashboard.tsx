"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState({
    totalRooms: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalPayments: 0,
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.Role === "ADMIN") {
          setIsAdmin(true);
          fetchDashboardData(token);
        } else {
          toast.error("Access Denied! Admin only.");
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/login");
      }
    };

    const fetchDashboardData = async (token: string) => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/admin/dashboard",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchUser();
  }, [router]);

  if (!isAdmin) {
    return <div className="text-white text-center mt-10">Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#3D392D] to-[#2D2921] p-8 pt-24">
      <h1 className="text-3xl text-white font-bold mb-8 text-center">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#C4A36B] p-6 rounded-lg shadow-md text-white text-center">
          <h2 className="text-lg font-semibold">Total Rooms</h2>
          <p className="text-2xl">{data.totalRooms}</p>
        </div>
        <div className="bg-[#C4A36B] p-6 rounded-lg shadow-md text-white text-center">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl">{data.totalUsers}</p>
        </div>
        <div className="bg-[#C4A36B] p-6 rounded-lg shadow-md text-white text-center">
          <h2 className="text-lg font-semibold">Total Bookings</h2>
          <p className="text-2xl">{data.totalBookings}</p>
        </div>
        <div className="bg-[#C4A36B] p-6 rounded-lg shadow-md text-white text-center">
          <h2 className="text-lg font-semibold">Total Payments</h2>
          <p className="text-2xl">{data.totalPayments}</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => router.push("/admin/AdminRooms")}
          className="bg-[#AD8C5A] text-white py-2 px-6 rounded-lg hover:bg-[#C4A36B] transition-colors"
        >
          Go to Room Management
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
