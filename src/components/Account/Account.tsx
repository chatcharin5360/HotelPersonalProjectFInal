"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const Account = () => {
  const router = useRouter();
  const [user, setUser] = useState({ FirstName: "", LastName: "", Email: "" });
  const [loading, setLoading] = useState(true); // Start with loading state
  const [updating, setUpdating] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [token, setToken] = useState("");

  // ดึง Token จาก localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      toast.error("Please login first.");
      router.push("/login");
      return;
    }
    setToken(storedToken);
    fetchUser(storedToken);
  }, []);

  // ดึงข้อมูลผู้ใช้จาก API
  const fetchUser = async (token: string) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` }, // เปลี่ยน URL เป็น /api/user/profile
        }
      );
      setUser(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch user data");
    } finally {
      setLoading(false); // End loading once data is fetched
    }
  };

  // ฟังก์ชันอัปเดตข้อมูลผู้ใช้
  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await axios.post(
        "http://localhost:8000/api/user/update", // เปลี่ยน URL เป็น /api/user/update
        { FirstName: user.FirstName, LastName: user.LastName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed!");
    } finally {
      setUpdating(false);
    }
  };

  // ฟังก์ชัน Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="bg-[#3D392D] p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Account
        </h2>

        <div className="flex flex-col gap-4">
          <label className="text-white">
            First Name
            <input
              type="text"
              value={user.FirstName}
              onChange={(e) => setUser({ ...user, FirstName: e.target.value })}
              disabled={!editMode}
              className={`border border-black p-2 rounded w-full text-black ${
                editMode ? "bg-white" : "bg-gray-300 cursor-not-allowed"
              }`}
            />
          </label>

          <label className="text-white">
            Last Name
            <input
              type="text"
              value={user.LastName}
              onChange={(e) => setUser({ ...user, LastName: e.target.value })}
              disabled={!editMode}
              className={`border border-black p-2 rounded w-full text-black ${
                editMode ? "bg-white" : "bg-gray-300 cursor-not-allowed"
              }`}
            />
          </label>

          <label className="text-white">
            Email
            <input
              type="email"
              value={user.Email}
              disabled
              className="border border-black p-2 rounded w-full bg-gray-300 text-black cursor-not-allowed"
            />
          </label>

          {editMode ? (
            <button
              onClick={handleUpdate}
              className="bg-[#C4A36B] text-white py-2 rounded-md hover:bg-[#AD8C5A] transition"
              disabled={updating}
            >
              {updating ? "Updating..." : "Save Changes"}
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-[#C4A36B] text-white py-2 rounded-md hover:bg-[#AD8C5A] transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
