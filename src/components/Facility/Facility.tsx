
import Image from "next/image";

interface FacilityType {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

const facilities: FacilityType[] = [
  {
    id: "gym",
    title: "THE GYM",
    imageUrl: "/image/Facility/gym.jpg",
    description:
      "We want you to stay fit even when you travel. As such we have specially curated all of your needs to ensure your training.",
  },
  {
    id: "pool",
    title: "SWIMMING POOL",
    imageUrl: "/image/Facility/pool.jpg",
    description:
      "Take a dip in our infinity pool and enjoy the beautiful sunset.",
  },
  {
    id: "restaurant",
    title: "RESTAURANT",
    imageUrl: "/image/Facility/restaurant.jpg",
    description: "Enjoy our world-class cuisine prepared by master chefs.",
  },
  {
    id: "spa",
    title: "SPA",
    imageUrl: "/image/Facility/spa.jpg",
    description: "Full-service spa available.",
  },
];

const FacilityCard = ({ title, imageUrl }: FacilityType) => (
  <div className="flex flex-col items-center w-full max-w-3xl mx-auto space-y-2">
    <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg">
      <Image src={imageUrl} alt={title} fill className="object-cover" />
    </div>
    <h3 className="text-lg font-bold uppercase tracking-widest bg-[#3b3b2e] px-4 py-2 shadow-md">
      {title}
    </h3>
  </div>
);

const Facilities = () => {
  return (
    <div className="relative container mx-auto px-4 py-8">
      <h2 className="text-3xl font-light mb-8 uppercase text-center mt-24">
        Facilities
      </h2>
      <p className="text-center max-w-2xl mx-auto text-gray-600 mb-12">
        We want your stay at our hotel to be nothing short of extraordinary.
        That’s why we’ve curated an array of premier facilities to enhance your
        experience, ensuring a perfect balance of relaxation and adventure.
      </p>
      <div className="flex flex-col items-center space-y-12">
        {facilities.map((facility) => (
          <FacilityCard key={facility.id} {...facility} />
        ))}
      </div>
    </div>
  );
};

export default Facilities;
