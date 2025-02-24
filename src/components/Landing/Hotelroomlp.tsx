"use client";
import Image from "next/image";
import Link from "next/link";

interface RoomType {
  id: string;
  title: string;
  imageUrl: string;
}

const rooms: RoomType[] = [
  {
    id: "twin",
    title: "Standard Twin Room",
    imageUrl: "/image/Landing/twin-room.jpg",
  },
  {
    id: "standard",
    title: "Standard Room",
    imageUrl: "/image/Landing/standard-room.jpg",
  },
  {
    id: "view",
    title: "Standard View Room",
    imageUrl: "/image/Landing/view-room.jpg",
  },
  {
    id: "deluxe",
    title: "Deluxe Room",
    imageUrl: "/image/Landing/deluxe-room.jpg",
  },
];

const RoomCard = ({ title, imageUrl }: RoomType) => (
  <div className="relative overflow-hidden rounded-lg shadow-lg h-64">
    <div className="absolute inset-0 w-full h-full">
      <Image src={imageUrl} alt={title} fill className="object-cover" />
    </div>
    <div className="absolute inset-0 bg-black/40" />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
      <h3 className="mb-4 text-2xl font-bold">{title}</h3>
      {/* ปุ่ม Check Rates */}
      <Link href="/rooms">
        <button className="rounded bg-[#D4B88C] px-6 py-2 text-white hover:bg-[#C4A87C] transition-colors">
          Check Rates
        </button>
      </Link>
    </div>
  </div>
);

const HotelRoomslp = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {rooms.map((room) => (
          <RoomCard key={room.id} {...room} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <h2 className="mb-6 text-2xl font-bold">Get a room already!</h2>
        {/* ปุ่ม Book Now */}
        <Link href="/rooms">
          <button className="rounded bg-[#D4B88C] px-8 py-3 text-white hover:bg-[#C4A87C] transition-colors">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HotelRoomslp;
