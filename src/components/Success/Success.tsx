"use client";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6 py-12">
      <div className="bg-[#2D2921] p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-[#D4B88C]">
          🎉 Payment Successful!
        </h1>
        <p className="text-gray-300 mb-6">
          Thank you for your booking! Your payment has been successfully
          processed.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-[#D4B88C] text-white py-3 px-6 rounded-lg hover:bg-[#C4A87C] transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
