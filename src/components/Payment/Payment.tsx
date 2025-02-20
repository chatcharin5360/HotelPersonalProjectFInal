"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "Selected Room";
  const price = searchParams.get("price") || "0";
  const description =
    searchParams.get("description") || "No description available.";
  const imageUrl = `/image/Landing/${searchParams.get("id")}-room.jpg`;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking confirmed for ${formData.firstName} ${formData.lastName}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-black p-6">
      {/* Form Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-xl text-black font-semibold mb-4">
          Guest Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-[#D4B88C] text-white py-3 rounded hover:bg-[#C4A87C] transition"
          >
            Booking Now
          </button>
        </form>
      </div>

      {/* Room Summary Section */}
      <div className="bg-white text-black shadow-lg rounded-lg p-6 w-full max-w-sm mt-6 md:mt-0 md:ml-8">
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
        <h3 className="text-lg font-semibold mt-4">{title}</h3>
        <p className=" my-4">{description}</p>
        <p className=" mt-1 font-bold">Summary</p>
        <p className="text-xl font-bold mt-2">{price} $</p>
      </div>
    </div>
  );
};

export default PaymentPage;
