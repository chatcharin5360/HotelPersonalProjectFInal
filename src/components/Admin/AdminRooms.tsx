"use client";
import { useEffect, useState, useCallback } from "react";
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

const AdminRooms = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [newRoom, setNewRoom] = useState({
    Room_type: "",
    Picture_id: "",
    Description: "",
    Price_per_night: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first.");
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.Role !== "ADMIN") {
          toast.error("Access Denied! Admin only.");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const fetchRooms = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/rooms", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data) throw new Error("Failed to load rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error("Failed to load rooms");
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleAddRoom = async () => {
    if (
      !newRoom.Room_type ||
      !newRoom.Picture_id ||
      !newRoom.Description ||
      !newRoom.Price_per_night
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/rooms",
        newRoom,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRooms([...rooms, response.data]);
      setNewRoom({
        Room_type: "",
        Picture_id: "",
        Description: "",
        Price_per_night: "",
      });
      toast.success("Room added successfully!");
    } catch (error) {
      console.error("Error adding room:", error);
      toast.error("Failed to add room");
    }
  };

  const handleDeleteRoom = async (roomId: number) => {
    try {
      const token = localStorage.getItem("token");
      await toast.promise(
        axios.delete(`http://localhost:8000/api/rooms/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        {
          loading: "Deleting room...",
          success: "Room deleted successfully!",
          error: "Failed to delete room.",
        }
      );

      setRooms(rooms.filter((room) => room.Room_id !== roomId));
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black pt-24 pb-32">
      <div className="w-full max-w-3xl bg-[#3D392D] p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl text-white font-bold mb-6 text-center">
          Admin Room Management
        </h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="bg-[#AD8C5A] text-white py-2 px-6 rounded-lg hover:bg-[#C4A36B] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-[#2D2921] p-6 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-4 text-white">Add New Room</h3>
          <input
            type="text"
            placeholder="Room Type"
            value={newRoom.Room_type}
            onChange={(e) =>
              setNewRoom({ ...newRoom, Room_type: e.target.value })
            }
            className="border border-gray-700 p-2 mb-2 w-full text-black placeholder-gray-500 focus:outline-none rounded-md"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newRoom.Picture_id}
            onChange={(e) =>
              setNewRoom({ ...newRoom, Picture_id: e.target.value })
            }
            className="border border-gray-700 p-2 mb-2 w-full text-black placeholder-gray-500 focus:outline-none rounded-md"
          />
          <input
            type="text"
            placeholder="Description"
            value={newRoom.Description}
            onChange={(e) =>
              setNewRoom({ ...newRoom, Description: e.target.value })
            }
            className="border border-gray-700 p-2 mb-2 w-full text-black placeholder-gray-500 focus:outline-none rounded-md"
          />
          <input
            type="number"
            placeholder="Price per Night"
            value={newRoom.Price_per_night}
            onChange={(e) =>
              setNewRoom({ ...newRoom, Price_per_night: e.target.value })
            }
            className="border border-gray-700 p-2 mb-2 w-full text-black placeholder-gray-500 focus:outline-none rounded-md"
          />
          <button
            onClick={handleAddRoom}
            className="bg-[#AD8C5A] text-white p-2 w-full mt-2 rounded-md hover:bg-[#C4A36B] transition"
          >
            Add Room
          </button>
        </div>

        <div className="bg-[#2D2921] p-6 rounded-lg">
          <table className="table-auto w-full text-left text-white">
            <thead>
              <tr className="bg-[#5C5A52]">
                <th className="p-2">Image</th>
                <th className="p-2">Room Type</th>
                <th className="p-2">Description</th>
                <th className="p-2">Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.Room_id} className="border-b border-gray-600">
                  <td className="p-2">
                    <img
                      src={room.Picture_id}
                      alt={room.Room_type}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="p-2">{room.Room_type}</td>
                  <td className="p-2">{room.Description}</td>
                  <td className="p-2">${room.Price_per_night}</td>
                  <td className="p-2">
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition"
                      onClick={() => handleDeleteRoom(room.Room_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRooms;
