"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RoomType {
  Room_id: number;
  Room_type: string;
  Picture_id: string;
  Description: string;
  Price_per_night: number;
}

const HotelRooms = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/rooms");
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleBooking = (room: RoomType) => {
    router.push(
      `/payment?id=${room.Room_id}&title=${encodeURIComponent(
        room.Room_type
      )}&price=${room.Price_per_night}&description=${encodeURIComponent(
        room.Description
      )}`
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 mt-24 pb-32">
      {/* ✅ เพิ่ม mt-24 ให้ Available Rooms ลงมาเท่ากับ Facilities และ pb-32 กันทับ Footer */}

      <h1 className="text-4xl font-bold text-center mb-8">Available Rooms</h1>

      {rooms.length === 0 ? (
        <p className="text-center text-gray-400">No rooms available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {rooms.map((room) => (
            <div
              key={room.Room_id}
              className="bg-[#2D2921] p-6 rounded-lg shadow-lg"
            >
              <div className="relative w-full h-56">
                <Image
                  src={room.Picture_id}
                  alt={room.Room_type}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold mt-4">{room.Room_type}</h3>
              <p className="text-gray-400 mt-2">{room.Description}</p>

              {/* ✅ ปุ่ม Book Now อยู่ขวา และราคาฝั่งซ้าย */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-semibold text-yellow-400">
                  ${room.Price_per_night} per night
                </p>
                <button
                  onClick={() => handleBooking(room)}
                  className="bg-[#D4B88C] text-white py-2 px-6 rounded-lg hover:bg-[#C4A87C] transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelRooms;
