"use client";

import { useState } from "react";

const SecondaryNavbar: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");

  const handleSearch = () => {
    console.log("Searching for:", { city, checkIn, checkOut });
  };

  return (
      <div>
        <div className="flex flex-wrap md:flex-nowrap gap-3 justify-center items-center">
          {/* City Dropdown */}
          <select
            className="p-2 rounded bg-white text-black min-w-[150px]"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select a City</option>
            <option value="bangkok">Bangkok</option>
            <option value="chiangmai">Chiang Mai</option>
            <option value="phuket">Phuket</option>
          </select>

          {/* Check In Input */}
          <div className="relative min-w-[150px]">
            <input
              type="date"
              className="p-2 rounded bg-white text-black w-full"
              value={checkIn}
              placeholder="Check In"
              onChange={(e) => setCheckIn(e.target.value)}
            />
            <div className="absolute left-3 top-2 text-gray-500 text-sm pointer-events-none">
              Check In
            </div>
          </div>

          {/* Check Out Input */}
          <div className="relative min-w-[150px]">
            <input
              type="date"
              className="p-2 rounded bg-white text-black w-full"
              value={checkOut}
              placeholder="Check Out"
              onChange={(e) => setCheckOut(e.target.value)}
            />
            <div className="absolute left-3 top-2 text-gray-500 text-sm pointer-events-none">
              Check Out
            </div>
          </div>

          {/* Check Availability Button */}
          <button
            onClick={handleSearch}
            className="bg-[#d2a679] hover:bg-[#c29669] transition-colors text-white px-6 py-2 rounded"
          >
            Check Availability
          </button>
        </div>
      </div>
  );
};

export default SecondaryNavbar;
