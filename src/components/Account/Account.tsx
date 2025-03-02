"use client";
import { useState, useEffect } from "react";
import {
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
} from "@clerk/nextjs";
import axios from "axios";
import { toast } from "react-hot-toast";

const Account = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [input, setInput] = useState({
    FirstName: user?.firstName || "",
    LastName: user?.lastName || "",
  });

  // ✅ ดึงข้อมูลจาก MySQL (เผื่อ Clerk มีการเปลี่ยนชื่อภายหลัง)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const Token = await getToken();
        if (!Token) return;

        const response = await axios.get(
          "http://localhost:8000/api/user/profile",
          {
            headers: { Authorization: `Bearer ${Token}` },
          }
        );

        setInput({
          FirstName: response.data.FirstName,
          LastName: response.data.LastName,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) fetchUserData();
  }, [user]);

  // ✅ อัปเดตทั้ง Clerk และ MySQL
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // อัปเดต Clerk ก่อน
      await user?.update({
        firstName: input.FirstName,
        lastName: input.LastName,
      });

      // อัปเดต MySQL ผ่าน Backend
      const Token = await getToken();
      await axios.post("http://localhost:8000/api/user/profile", input, {
        headers: { Authorization: `Bearer ${Token}` },
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          Account Details
        </h2>

        <SignedIn>
          <form
            className="flex flex-col gap-4 text-black"
            onSubmit={handleSubmit}
          >
            <label>
              First Name
              <input
                type="text"
                name="FirstName"
                value={input.FirstName}
                className="border border-black p-2 rounded w-full"
                onChange={(e) =>
                  setInput({ ...input, FirstName: e.target.value })
                }
              />
            </label>
            <label>
              Last Name
              <input
                type="text"
                name="LastName"
                value={input.LastName}
                className="border border-black p-2 rounded w-full"
                onChange={(e) =>
                  setInput({ ...input, LastName: e.target.value })
                }
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="Email"
                value={user?.primaryEmailAddress?.emailAddress || ""}
                className="border border-black p-2 rounded w-full"
                disabled
              />
            </label>
            <label>
              Phone
              <input
                type="text"
                name="Phone"
                value={user?.primaryPhoneNumber?.phoneNumber || "N/A"}
                className="border border-black p-2 rounded w-full"
                disabled
              />
            </label>
            <button className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Save Changes
            </button>
          </form>

          {user?.publicMetadata.role === "ADMIN" && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-semibold">You are an Admin!</p>
            </div>
          )}
        </SignedIn>

        <SignedOut>
          <p className="text-center text-gray-500 mt-4">
            You are not signed in.
          </p>
          <SignInButton mode="modal">
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Login
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default Account;
