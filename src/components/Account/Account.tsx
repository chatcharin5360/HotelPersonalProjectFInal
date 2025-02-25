"use client";

import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Account = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-20 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          Account Details
        </h2>

        <SignedIn>
          <div className="text-lg text-black">
            <p>
              <strong>First Name:</strong> {user?.firstName || "N/A"}
            </p>
            <p>
              <strong>Last Name:</strong> {user?.lastName || "N/A"}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {user?.primaryEmailAddress?.emailAddress || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              {user?.primaryPhoneNumber?.phoneNumber || "N/A"}
            </p>
            {/* <p>
              <strong>Role:</strong> {user?.publicMetadata.role || "USER"}
            </p> */}
          </div>

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
