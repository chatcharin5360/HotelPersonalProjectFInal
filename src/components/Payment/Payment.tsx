"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Payment = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [bookingId, setBookingId] = useState<string>("");
  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    const id = searchParams.get("bookingId") || "";
    setBookingId(id);
  }, [searchParams]);

  const handleMockPayment = async () => {
    if (!card.name || !card.number || !card.expiry || !card.cvv) {
      alert("Please fill in all card details");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8000/api/pay/${bookingId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Payment successful!");
      router.push("/success");
    } catch (error) {
      console.error("Payment failed", error);
      toast.error("Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 pt-24 pb-32">
      <div className="bg-[#2D2921] p-8 rounded-lg max-w-lg w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment</h2>

        <h3 className="text-lg font-semibold mb-2">Mock Credit Card</h3>

        <input
          type="text"
          placeholder="Cardholder Name"
          value={card.name}
          onChange={(e) => setCard({ ...card, name: e.target.value })}
          className="w-full p-2 rounded bg-white text-black mb-2"
        />
        <input
          type="text"
          placeholder="Card Number"
          value={card.number}
          onChange={(e) => setCard({ ...card, number: e.target.value })}
          className="w-full p-2 rounded bg-white text-black mb-2"
          maxLength={16}
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="MM/YY"
            value={card.expiry}
            onChange={(e) => setCard({ ...card, expiry: e.target.value })}
            className="w-1/2 p-2 rounded bg-white text-black mb-2"
          />
          <input
            type="text"
            placeholder="CVV"
            value={card.cvv}
            onChange={(e) => setCard({ ...card, cvv: e.target.value })}
            className="w-1/2 p-2 rounded bg-white text-black mb-2"
            maxLength={3}
          />
        </div>

        <button
          onClick={handleMockPayment}
          className="bg-[#D4B88C] text-white px-6 py-2 rounded w-full hover:bg-[#C4A87C] transition mt-4"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
