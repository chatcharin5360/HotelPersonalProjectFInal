"use client";

import {
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
} from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Account = () => {
  const { user } = useUser();
  const router = useRouter();
  const { getToken } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const [input, setInput] = useState({
    FirstName: user?.firstName,
    LastName: user?.lastName,
    Email: user?.emailAddresses[0].emailAddress,
    Phone: user?.phoneNumbers[0].phoneNumber,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Token = await getToken();
    console.log(Token);
    console.log(input);
    const response = await axios.post("http://localhost:8000/api/user/profile", input,{
      headers: {Authorization: `Bearer ${Token}`}
    })
    console.log(response);
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-20 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          Account Details
        </h2>

        <SignedIn>
          <form
            className="flex flex-col gap-2 text-black"
            onSubmit={handleSubmit}
          >
            <label>
              FirstName
              <input
                type="text"
                name="FirstName"
                value={input.FirstName}
                className="border border-black"
                onChange={handleChange}
              />
            </label>
            <label>
              LastName
              <input
                type="text"
                name="LastName"
                value={input.LastName}
                className="border border-black"
                onChange={handleChange}
              />
            </label>
            <label>
              Email
              <input
                type="text"
                name="Email"
                value={input.Email}
                className="border border-black"
                onChange={handleChange}
              />
            </label>
            <label>
              Phone
              <input
                type="text"
                name="Phone"
                value={input.Phone}
                className="border border-black"
                onChange={handleChange}
              />
            </label>
            <button className="border border-black">Submit</button>
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
