"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const Register = () => {
  const router = useRouter();
  const [input, setInput] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loadingToast = toast.loading("Signing up...");

    try {
      await axios.post("http://localhost:8000/api/register", input);

      toast.dismiss(loadingToast);
      toast.success("Registration successful! Please login.");

      router.push("/login");
    } catch (error: any) {
      console.error("❌ Registration Error:", error);

      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-[#3D392D] p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Register
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <label className="text-white">
            First Name
            <input
              type="text"
              name="FirstName"
              value={input.FirstName}
              onChange={(e) =>
                setInput({ ...input, FirstName: e.target.value })
              }
              className="border border-black p-2 rounded w-full bg-white text-black"
              required
            />
          </label>

          <label className="text-white">
            Last Name
            <input
              type="text"
              name="LastName"
              value={input.LastName}
              onChange={(e) => setInput({ ...input, LastName: e.target.value })}
              className="border border-black p-2 rounded w-full bg-white text-black"
              required
            />
          </label>

          <label className="text-white">
            Email
            <input
              type="email"
              name="Email"
              value={input.Email}
              onChange={(e) => setInput({ ...input, Email: e.target.value })}
              className="border border-black p-2 rounded w-full bg-white text-black"
              required
            />
          </label>

          <label className="text-white">
            Password
            <input
              type="password"
              name="Password"
              value={input.Password}
              onChange={(e) => setInput({ ...input, Password: e.target.value })}
              className="border border-black p-2 rounded w-full bg-white text-black"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-[#C4A36B] text-white py-2 rounded-md hover:bg-[#AD8C5A] transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-[#C4A36B] hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
