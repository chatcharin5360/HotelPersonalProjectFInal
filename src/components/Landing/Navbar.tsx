import React from "react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="bg-transparent p-4 text-white h-16 items-center flex ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo session */}
        <div className="bg-primary p-6 rounded-b-3xl flex flex-col cormorant-font justify-center items-center mt-5">
          <h1 className="text-xl font-bold tracking-widest">LUXURY</h1>
          <h2 className="text-[10px] tracking-widest">HOTELS</h2>
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
          <li>
            <div className="hover:text-gray-400">
              <SignedOut>
                <SignInButton mode="modal">Login</SignInButton>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/account"
                  className="group-hover:block hover:text-gray-400 ml-4"
                >
                  Account
                </Link>
                <span className="group-hover:block hover:text-gray-400 ml-4">
                <SignOutButton>Logout</SignOutButton>
                </span>
              </SignedIn>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
