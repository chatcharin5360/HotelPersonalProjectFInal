import Image from "next/image";
import HotelRoomslp from "@/components/Landing/Hotelroomlp";
import Text from "@/components/Landing/Text";
import SecondaryNavbar from "@/components/Landing/SecoundNav";
export default function Home() {
  return (
    <div>
      {/* Landingpage section */}
      <main className="flex flex-col min-h-screen ">
        <section className="relative">
          <div className="h-[100vh]">
            <Image
              src="/image/landing/landing.jpg"
              alt="Luxury Hotel"
              fill
              priority
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 ">
              <Text />
            </div>
          </div>

          <div className="w-full p-4 absolute bottom-0 bg-[#3b3b2e]">
            <SecondaryNavbar />
          </div>
        </section>
        {/* Hotel Rooms Section */}
        <section className="container mx-auto px-4 py-16">
          <HotelRoomslp />
        </section>
      </main>
    </div>
  );
}
