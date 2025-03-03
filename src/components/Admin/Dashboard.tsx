"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // ใช้เพื่อเปลี่ยนเส้นทาง

const Dashboard = () => {
  const [data, setData] = useState({
    totalRooms: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalPayments: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login"); // หากไม่มี token ให้ไปที่หน้า login
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/admin/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data); // ตั้งค่าข้อมูลที่ดึงมา
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#3D392D] to-[#2D2921] p-8 pt-24">
      {" "}
      {/* เพิ่ม pt-24 ที่นี่ */}
      <h1 className="text-3xl text-white font-bold mb-8 text-center">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Rooms */}
        <div className="bg-[#C4A36B] p-6 rounded-lg shadow-md text-white text-center">
          <h2 className="text-lg font-semibold">Total Rooms</h2>
          <p className="text-2xl">{data.totalRooms}</p>
        </div>

        {/* Total Users */}
        <div className="bg-[#C4A36B] p-6 rounded-lg shadow-md text-white text-center">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl">{data.totalUsers}</p>
        </div>

        {/* Total Bookings */}
        <div className="bg-[#C4A36B] p-6 rounded-lg shadow-md text-white text-center">
          <h2 className="text-lg font-semibold">Total Bookings</h2>
          <p className="text-2xl">{data.totalBookings}</p>
        </div>

        {/* Total Payments */}
        <div className="bg-[#C4A36B] p-6 rounded-lg shadow-md text-white text-center">
          <h2 className="text-lg font-semibold">Total Payments</h2>
          <p className="text-2xl">{data.totalPayments}</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => router.push("/account")}
          className="bg-[#AD8C5A] text-white py-2 px-6 rounded-lg hover:bg-[#C4A36B] transition-colors"
        >
          Go to Account Settings
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
