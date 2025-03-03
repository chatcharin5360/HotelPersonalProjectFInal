"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [input, setInput] = useState({ Email: "", Password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      router.push("/account"); // ถ้ามี token ให้ไปหน้า account เลย
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Logging in...");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        input
      );
      localStorage.setItem("token", response.data.token);
      toast.dismiss();
      toast.success("Login successful!");
      router.push("/account");

      // รีเฟรชหน้าหลังจาก login
      window.location.reload();
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
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
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-[#C4A36B] hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
