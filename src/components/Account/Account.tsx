"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const Account = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first.");
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    await toast.promise(
      axios.post(
        "http://localhost:8000/api/user/update",
        { FirstName: user.FirstName, LastName: user.LastName },
        { headers: { Authorization: `Bearer ${token}` } }
      ),
      {
        loading: "Updating profile...",
        success: "Profile updated successfully!",
        error: "Update failed!",
      }
    );

    setEditMode(false);
  };

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
            >
              Save Changes
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
