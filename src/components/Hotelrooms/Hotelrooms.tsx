"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RoomType {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

const rooms: RoomType[] = [
  {
    id: "twin",
    title: "Standard Twin Room",
    imageUrl: "/image/Landing/twin-room.jpg",
    description:
      "A comfortable twin room with modern amenities, perfect for sharing.",
    price: 147,
  },
  {
    id: "standard",
    title: "Standard Room",
    imageUrl: "/image/Landing/standard-room.jpg",
    description:
      "A cozy standard room with a queen-sized bed and a beautiful city view.",
    price: 155,
  },
  {
    id: "view",
    title: "Standard View Room",
    imageUrl: "/image/Landing/view-room.jpg",
    description:
      "A stylish room offering breathtaking views of the surroundings.",
    price: 195,
  },
  {
    id: "deluxe",
    title: "Deluxe Room",
    imageUrl: "/image/Landing/deluxe-room.jpg",
    description:
      "A spacious deluxe room with premium furnishings and top-tier comfort.",
    price: 210,
  },
];

const RoomCard = ({ id, title, imageUrl, description, price }: RoomType) => {
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();

  const handleBooking = () => {
    const price =
      id === "deluxe"
        ? 250
        : id === "view"
        ? 220
        : id === "standard"
        ? 200
        : 195;
    router.push(
      `/payment?id=${id}&title=${encodeURIComponent(
        title
      )}&price=${price}&description=${encodeURIComponent(description)}`
    );
  };

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg flex flex-col items-center w-full max-w-lg p-4 bg-[#3b3b2e]">
      <div className="relative w-full h-64">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <h3 className="text-lg font-bold uppercase tracking-widest bg-black px-4 py-2 shadow-md text-center w-full">
        {title}
      </h3>
      <div className="flex items-center gap-4 mt-4">
        <button
          className={`px-4 py-2 rounded ${
            showDetails ? "bg-gray-700 text-white" : "bg-[#D4B88C] text-white"
          } hover:bg-[#C4A87C] transition`}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>
        <button
          onClick={handleBooking}
          className="px-4 py-2 bg-[#D4B88C] text-white rounded hover:bg-[#C4A87C] transition"
        >
          Book Now
        </button>
      </div>

      <div className="h-24 mt-2 transition-all duration-300">
        {showDetails && (
          <>
            <p className="text-white text-center">{description}</p>
            <p className="text-white font-semibold text-center mt-2">
              Price: ${price} per night
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const RoomsSection = () => {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <h2 className="text-3xl font-light mb-8 uppercase text-center mt-24">
        Rooms and Rates
      </h2>
      <p className="text-center max-w-2xl mx-auto text-gray-600 mb-12">
        Each of our hotel rooms comes with comprehensive guest amenities and a
        comfortable bed. Whether you seek a cozy retreat or a luxury experience,
        we have the perfect option for you.
      </p>
      <div className="flex flex-col items-center md:flex-row md:flex-wrap md:justify-center gap-12">
        {rooms.map((room) => (
          <RoomCard key={room.id} {...room} />
        ))}
      </div>
    </div>
  );
};

export default RoomsSection;
