"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ ใช้ useMemo เพื่อเก็บค่าของ Query Params และลดการ re-render
  const title = useMemo(() => searchParams.get("title") || "Room", [searchParams]);
  const price = useMemo(() => searchParams.get("price") || "0", [searchParams]);
  const description = useMemo(() => searchParams.get("description") || "No description available.", [searchParams]);

  const [isPaying, setIsPaying] = useState(false);

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      router.push("/success"); // ✅ ไปหน้า Success หลังจากกดจ่าย
    }, 2000); // ✅ จำลองการจ่ายเงิน 2 วินาที
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6 py-12">
      <div className="bg-[#2D2921] p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-[#D4B88C] tracking-wide">
          Confirm Payment
        </h1>

        {/* ✅ รายละเอียดห้อง */}
        <div className="border-b border-gray-600 pb-4 mb-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-gray-300 text-sm mt-2">{description}</p>
        </div>

        <p className="text-2xl font-semibold text-yellow-400">${price}</p>

        <button
          onClick={handlePayment}
          className={`mt-6 px-6 py-3 text-lg font-semibold text-white rounded-lg w-full transition duration-300 ${
            isPaying
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#D4B88C] hover:bg-[#C4A87C] transform hover:scale-105"
          }`}
          disabled={isPaying}
        >
          {isPaying ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
