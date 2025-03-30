"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Booking {
  Booking_id: number;
  Check_in_date: string;
  Check_out_date: string;
  Total_price: number;
  Booking_status: string;
  bookingonroom: {
    BookingOnRoom_id: number;
    Room_id: number;
    Quantity_room: number;
    room: {
      Room_type: string;
      Picture_id: string;
    };
  }[];
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const router = useRouter();

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first.");
      router.push("/login");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8000/api/my-bookings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to load bookings", error);
      toast.error("Failed to load bookings");
    }
  };

  const handlePayment = (bookingId: number) => {
    router.push(`/payment?bookingId=${bookingId}`);
  };

  const handleDelete = async (bookingId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking deleted successfully!");
      fetchBookings();
    } catch (error) {
      console.error("Failed to delete booking", error);
      toast.error("Failed to delete booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="pt-24 p-6 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-400">You have no bookings yet.</p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {bookings.map((booking) => (
            <div
              key={booking.Booking_id}
              className="bg-[#2D2921] p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-2">
                Room: {booking.bookingonroom[0]?.room.Room_type}
              </h2>
              <img
                src={booking.bookingonroom[0]?.room.Picture_id}
                alt="room"
                className="w-full h-48 object-cover rounded mb-3"
              />
              <p>
                Check-in: {new Date(booking.Check_in_date).toLocaleDateString()}
              </p>
              <p>
                Check-out:{" "}
                {new Date(booking.Check_out_date).toLocaleDateString()}
              </p>
              <p>Status: {booking.Booking_status}</p>
              <p>Total: ${booking.Total_price}</p>
              <div className="flex gap-4 mt-3">
                {booking.Booking_status === "PENDING" && (
                  <button
                    onClick={() => handlePayment(booking.Booking_id)}
                    className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
                  >
                    Pay Now
                  </button>
                )}
                <button
                  onClick={() => handleDelete(booking.Booking_id)}
                  className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
