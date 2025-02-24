import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#3b3b2e] text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Contact Info */}
        <div className="flex flex-col">
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-bold tracking-widest">LUXURY</h1>
            <h2 className="text-[10px] tracking-widest">HOTELS</h2>
          </div>
          <p className="mt-4 font-bold">Bon Hotels Head Office</p>
          <p>+27 434 344 432</p>
          <p>info@bonhotels.com</p>
        </div>

        {/* Facility & Contact */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">Quick Link</h3>
          <Link href="/facility" className="hover:text-gray-400">
            Facility
          </Link>

          <Link href="/contact" className="hover:text-gray-400">
            Contact Us
          </Link>
        </div>

        {/* Subscribe Form */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold">Subscribe for Offers</h3>
          <input
            type="email"
            placeholder="Email Address"
            className="p-2 rounded text-black w-full"
          />
          <button className="bg-[#d2a679] text-white py-2 px-4 rounded-lg">
            Subscribe Now
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
