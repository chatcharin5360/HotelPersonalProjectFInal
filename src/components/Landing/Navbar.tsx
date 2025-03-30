"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState<{ Role: "ADMIN" | "USER" } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="bg-transparent p-4 text-white h-16 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <div className="flex items-center">
        <div className="bg-primary ml-8 p-6 rounded-b-3xl flex flex-col cormorant-font justify-center items-center mt-5">
          <h1 className="text-xl font-bold tracking-widest">LUXURY</h1>
          <h2 className="text-[10px] tracking-widest">HOTELS</h2>
        </div>
      </div>

      <ul className="flex space-x-4 gap-16 roboto-font">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/facility">Facility</Link>
        </li>
        <li>
          <Link href="/rooms">Rooms</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/my-bookings">My Bookings</Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            {user.Role === "ADMIN" && (
              <Link
                href="/admin/dashboard"
                className="bg-white text-black px-6 py-2 rounded"
              >
                Admin
              </Link>
            )}
            <Link
              href="/account"
              className="bg-[#d2a679] text-white px-6 py-2 rounded"
            >
              Account
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-6 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-[#d2a679] text-white px-6 py-2 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
