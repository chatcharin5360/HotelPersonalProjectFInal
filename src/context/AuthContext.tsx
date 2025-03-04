"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  User_id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Role: "ADMIN" | "USER"; // ✅ เพิ่ม Role
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean; // ✅ เช็ค Role
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchUser(storedToken);
    } else {
      setLoading(false);
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

      console.log("✅ User Data from API:", response.data); // ✅ Debug เช็ค Role
      setUser(response.data);
    } catch (error) {
      console.error("❌ Error fetching user data", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    fetchUser(token);
    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAdmin: user?.Role === "ADMIN", login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
