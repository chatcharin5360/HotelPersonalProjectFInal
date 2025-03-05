"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [input, setInput] = useState({ Email: "", Password: "" });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingToast = toast.loading("Logging in...");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        input
      );

      toast.dismiss(loadingToast);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        router.push("/account");

        setTimeout(() => {
          window.location.reload();
        }, 300);
      } else {
        toast.error("Login failed! Please try again.");
      }
    } catch (error: any) {
      toast.dismiss(loadingToast);
      console.error("❌ Login Error:", error);
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-[#3D392D] p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Login
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
            Login
          </button>
        </form>

        <p className="text-center text-gray-300 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-[#C4A36B] hover:underline cursor-pointer"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
