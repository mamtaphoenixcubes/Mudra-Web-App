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

// ✅ Static meditation data — no API needed
const MEDITATIONS = [
  {
    id: 1,
    title: "Mindful Breathing",
    duration: "5 min",
    level: "Beginner",
    description:
      "A foundational breath-awareness practice that calms the nervous system and anchors you in the present moment.",
    tag: "Breathwork",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Mindful Breathing",
    bg: pastelPalette[0],
  },
  {
    id: 2,
    title: "Body Scan Relaxation",
    duration: "8 min",
    level: "Beginner",
    description:
      "A guided body scan that releases tension from head to toe while cultivating deep relaxation and self-awareness.",
    tag: "Relaxation",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Body Scan Relaxation",
    bg: pastelPalette[1],
  },
  {
    id: 3,
    title: "Loving-Kindness",
    duration: "6 min",
    level: "Intermediate",
    description:
      "Metta meditation — opens the heart, cultivates compassion, and fosters a sense of connection with yourself and others.",
    tag: "Compassion",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Loving-Kindness",
    bg: pastelPalette[2],
  },
  {
    id: 4,
    title: "Focused Attention",
    duration: "7 min",
    level: "Beginner",
    description:
      "A concentration practice that trains the mind to stay anchored on a single point, improving clarity and focus.",
    tag: "Focus",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Focused Attention",
    bg: pastelPalette[3],
  },
  {
    id: 5,
    title: "Yoga Nidra",
    duration: "10 min",
    level: "Intermediate",
    description:
      "Yogic sleep — a deep guided relaxation that rests the body while keeping the mind awake and aware.",
    tag: "Deep Rest",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Yoga Nidra",
    bg: pastelPalette[4],
  },
  {
    id: 6,
    title: "Gratitude Meditation",
    duration: "4 min",
    level: "Beginner",
    description:
      "A gentle gratitude practice that shifts attention to what's going well, lifting mood and fostering contentment.",
    tag: "Gratitude",
    imgSrc: IMAGES.YogaNidraImage,
    imgAlt: "Gratitude Meditation",
    bg: pastelPalette[5],
  },
];

function MeditationCard({ meditation }) {
  const router = useRouter();

  // ✅ Navigate to MeditationSessionDetail with the meditation id
  const handleCardClick = () => {
    router.push(`/MeditationDetail?id=${meditation.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`
        ${meditation.bg} rounded-2xl p-4 flex flex-row gap-4
        cursor-pointer shadow-2xs transition-transform hover:-translate-y-1 w-full h-full
      `}
    >
      {/* Left: Square thumbnail */}
      <div className="relative shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100">
        <img
          src={meditation.imgSrc?.src || meditation.imgSrc}
          alt={meditation.imgAlt}
          className="w-full h-full object-cover"
        />

        {/* Duration Badge */}
        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-md font-medium leading-none">
          {meditation.duration}
        </span>
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-0.5 truncate">
            {meditation.title}
          </h3>
          <p className="text-xs text-gray-500 font-medium mb-1.5">
            {meditation.duration} • {meditation.level}
          </p>
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
            {meditation.description}
          </p>
        </div>

        {/* Tag Pill */}
        <span className="mt-3 self-start inline-block bg-white text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow-2xs">
          {meditation.tag}
        </span>
      </div>
    </div>
  );
}

export default function PopularMeditation() {
  const router = useRouter();

  // ✅ Navigate to the full meditations list
  const handleViewMore = () => {
    router.push("/Meditations");
  };

  return (
    <section className="w-full bg-white py-12 md:py-16 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9A85FE] mb-2">
            Popular Meditation
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Explore the meditations our community practices most — find your calm.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {MEDITATIONS.map((meditation) => (
            <MeditationCard key={meditation.id} meditation={meditation} />
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <button
            onClick={handleViewMore}
            className="bg-[#9A85FE] text-white font-semibold text-sm px-8 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
          >
            View More Meditations
          </button>
        </div>

      </div>
    </section>
  );
}