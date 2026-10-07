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

// ✅ Static asana data — no API needed
const ASANAS = [
  {
    id: 1,
    title: "Tadasana",
    duration: "5 min",
    level: "Beginner",
    description:
      "Mountain Pose — a foundational standing asana that builds stability, posture, and grounding.",
    tag: "Standing",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Tadasana",
    bg: pastelPalette[0],
  },
  {
    id: 2,
    title: "Vrikshasana",
    duration: "8 min",
    level: "Beginner",
    description:
      "Tree Pose — improves balance, focus, and strengthens the legs while calming the mind.",
    tag: "Balance",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Vrikshasana",
    bg: pastelPalette[1],
  },
  {
    id: 3,
    title: "Bhujangasana",
    duration: "6 min",
    level: "Intermediate",
    description:
      "Cobra Pose — opens the chest, strengthens the spine, and relieves tension in the lower back.",
    tag: "Backbend",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Bhujangasana",
    bg: pastelPalette[2],
  },
  {
    id: 4,
    title: "Adho Mukha Svanasana",
    duration: "7 min",
    level: "Beginner",
    description:
      "Downward-Facing Dog — a full-body stretch that energizes the body and calms the mind.",
    tag: "Inversion",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Adho Mukha Svanasana",
    bg: pastelPalette[3],
  },
  {
    id: 5,
    title: "Virabhadrasana II",
    duration: "10 min",
    level: "Intermediate",
    description:
      "Warrior II — builds strength, stamina, and focus while opening the hips and chest.",
    tag: "Standing",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Virabhadrasana II",
    bg: pastelPalette[4],
  },
  {
    id: 6,
    title: "Balasana",
    duration: "4 min",
    level: "Beginner",
    description:
      "Child's Pose — a gentle resting asana that calms the nervous system and releases the back.",
    tag: "Restorative",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Balasana",
    bg: pastelPalette[5],
  },
];

function AsanaCard({ asana }) {
  const router = useRouter();

  // ✅ Navigate to AsanasSessionDetail with the asana id
  const handleCardClick = () => {
    router.push(`/AsanasSessionDetail?id=${asana.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`
        ${asana.bg} rounded-2xl p-4 flex flex-row gap-4
        cursor-pointer shadow-2xs transition-transform hover:-translate-y-1 w-full h-full
      `}
    >
      {/* Left: Square thumbnail */}
      <div className="relative shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100">
        <img
          src={asana.imgSrc?.src || asana.imgSrc}
          alt={asana.imgAlt}
          className="w-full h-full object-cover"
        />

        {/* Duration Badge */}
        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-md font-medium leading-none">
          {asana.duration}
        </span>
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-0.5 truncate">
            {asana.title}
          </h3>
          <p className="text-xs text-gray-500 font-medium mb-1.5">
            {asana.duration} • {asana.level}
          </p>
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
            {asana.description}
          </p>
        </div>

        {/* Tag Pill */}
        <span className="mt-3 self-start inline-block bg-white text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow-2xs">
          {asana.tag}
        </span>
      </div>
    </div>
  );
}

export default function PopularAsanas() {
  return (
    <section className="w-full bg-white py-12 md:py-16 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9A85FE] mb-2">
            Popular Asanas
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Explore the asanas our community practices most — find your flow.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {ASANAS.map((asana) => (
            <AsanaCard key={asana.id} asana={asana} />
          ))}
        </div>

        {/* View More Button (static, no handler) */}
        <div className="flex justify-center">
          <button className="bg-[#9A85FE] text-white font-semibold text-sm px-8 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-xs cursor-pointer">
            View More Asanas
          </button>
        </div>

      </div>
    </section>
  );
}