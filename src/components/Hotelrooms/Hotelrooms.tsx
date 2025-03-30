"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

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

  const handleBooking = async (room: RoomType) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first.");
      router.push("/login");
      return;
    }

    try {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      await axios.post(
        "http://localhost:8000/api/book",
        {
          roomId: room.Room_id,
          quantity: 1,
          checkIn: today.toISOString(),
          checkOut: tomorrow.toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Booking successful!");
      router.push("/my-bookings");
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Booking failed!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 mt-24 pb-32">
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
              <div className="relative w-full h-[250px]">
                <Image
                  src={room.Picture_id}
                  alt={room.Room_type}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mt-4">{room.Room_type}</h3>
              <p className="text-gray-400 mt-2">{room.Description}</p>

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
