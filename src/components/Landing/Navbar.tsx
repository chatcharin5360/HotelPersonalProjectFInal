"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // ✅ Import AuthContext
import Link from "next/link";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // ถ้าไม่มี user ให้ไปหน้า login
    }
  }, [user, loading, router]);

  return (
    <nav className="bg-transparent p-4 text-white h-16 flex justify-between items-center">
      <div className="flex items-center">
        <div className="bg-primary ml-8 p-6 rounded-b-3xl flex flex-col cormorant-font justify-center items-center mt-5">
          <h1 className="text-xl font-bold tracking-widest">LUXURY</h1>
          <h2 className="text-[10px] tracking-widest">HOTELS</h2>
        </div>
      </div>

      <ul className="flex space-x-4 gap-16 roboto-font">
        <li>
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link href="/facility" className="hover:text-gray-400">
            Facility
          </Link>
        </li>
        <li>
          <Link href="/rooms" className="hover:text-gray-400">
            Rooms
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-gray-400">
            Contact
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              href="/account"
              className="hover:text-gray-400 bg-[#d2a679] transition-colors text-white px-6 py-2 rounded"
            >
              Account
            </Link>
            <button
              onClick={logout}
              className="hover:text-gray-400 bg-red-600 transition-colors text-white px-6 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="hover:text-gray-400 bg-[#d2a679] transition-colors text-white px-6 py-2 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
