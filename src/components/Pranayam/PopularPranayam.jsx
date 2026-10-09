"use client";

import { useRouter } from "next/navigation";
import { IMAGES } from "../../assets/assets";

const pastelPalette = [
  "bg-[#FEF9C3]",
  "bg-[#F3E8FF]",
  "bg-[#BFDDF2]",
  "bg-[#FCE7F3]",
  "bg-[#DCFCE7]",
  "bg-[#FEF9C3]",
];

// ✅ Static pranayama data — no API needed
const PRANAYAMAS = [
  {
    id: 1,
    title: "Anulom Vilom",
    duration: "5 min",
    level: "Beginner",
    description:
      "Alternate nostril breathing that balances the left and right energy channels, calms the mind, and improves focus.",
    tag: "Balance",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Anulom Vilom",
    bg: pastelPalette[0],
  },
  {
    id: 2,
    title: "Kapal Bhati",
    duration: "6 min",
    level: "Intermediate",
    description:
      "Skull-shining breath — a forceful exhalation practice that detoxifies the body, energizes the mind, and clears the respiratory tract.",
    tag: "Detox",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Kapal Bhati",
    bg: pastelPalette[1],
  },
  {
    id: 3,
    title: "Bhastrika",
    duration: "4 min",
    level: "Intermediate",
    description:
      "Bellows breath — rapid, rhythmic inhalation and exhalation that builds heat, expands lung capacity, and boosts vitality.",
    tag: "Energy",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Bhastrika",
    bg: pastelPalette[2],
  },
  {
    id: 4,
    title: "Bhramari",
    duration: "5 min",
    level: "Beginner",
    description:
      "Humming bee breath — a soothing practice that calms the nervous system, releases tension, and induces mental clarity.",
    tag: "Calm",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Bhramari",
    bg: pastelPalette[3],
  },
  {
    id: 5,
    title: "Ujjayi",
    duration: "7 min",
    level: "Beginner",
    description:
      "Ocean breath — a gentle, constricted-throat breathing technique that builds internal heat and steadies the flow of prana.",
    tag: "Focus",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Ujjayi",
    bg: pastelPalette[4],
  },
  {
    id: 6,
    title: "Sitali",
    duration: "4 min",
    level: "Beginner",
    description:
      "Cooling breath — a curled-tongue inhalation that reduces body heat, soothes the mind, and calms emotional turbulence.",
    tag: "Cooling",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Sitali",
    bg: pastelPalette[5],
  },
];

function PranayamCard({ pranayama }) {
  const router = useRouter();

  // ✅ Navigate to PranayamSessionDetail with the pranayama id
  const handleCardClick = () => {
    router.push(`/PranayamSessionDetail?id=${pranayama.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`
        ${pranayama.bg} rounded-2xl p-4 flex flex-row gap-4
        cursor-pointer shadow-2xs transition-transform hover:-translate-y-1 w-full h-full
      `}
    >
      {/* Left: Square thumbnail */}
      <div className="relative shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100">
        <img
          src={pranayama.imgSrc?.src || pranayama.imgSrc}
          alt={pranayama.imgAlt}
          className="w-full h-full object-cover"
        />

        {/* Duration Badge */}
        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-md font-medium leading-none">
          {pranayama.duration}
        </span>
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-0.5 truncate">
            {pranayama.title}
          </h3>
          <p className="text-xs text-gray-500 font-medium mb-1.5">
            {pranayama.duration} • {pranayama.level}
          </p>
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
            {pranayama.description}
          </p>
        </div>

        {/* Tag Pill */}
        <span className="mt-3 self-start inline-block bg-white text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow-2xs">
          {pranayama.tag}
        </span>
      </div>
    </div>
  );
}

export default function PopularPranayam() {
  const router = useRouter();

  // ✅ Navigate to the full pranayama list
  const handleViewMore = () => {
    router.push("/Pranayam");
  };

  return (
    <section className="w-full bg-white py-12 md:py-16 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9A85FE] mb-2">
            Popular Pranayama
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Explore the pranayama techniques our community practices most — find your breath.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PRANAYAMAS.map((pranayama) => (
            <PranayamCard key={pranayama.id} pranayama={pranayama} />
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <button
            onClick={handleViewMore}
            className="bg-[#9A85FE] text-white font-semibold text-sm px-8 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
          >
            View More Pranayama
          </button>
        </div>

      </div>
    </section>
  );
}