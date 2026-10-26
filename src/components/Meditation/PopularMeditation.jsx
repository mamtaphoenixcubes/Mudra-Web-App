"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { IMAGES } from "../../assets/assets";
import useAuthStore from "../../store/useAuthStore";

const pastelPalette = [
  "bg-[#FEF9C3]",
  "bg-[#F3E8FF]",
  "bg-[#BFDDF2]",
  "bg-[#FCE7F3]",
  "bg-[#DCFCE7]",
  "bg-[#FEF9C3]",
];

const normalizeMeditation = (meditation, index) => {
  const introCard = meditation?.introCard || {};
  const imageUrl =
    introCard?.introCardImage?.url ||
    meditation?.thumbnail?.url ||
    meditation?.bannerImage?.url ||
    meditation?.image?.[0]?.url ||
    null;

  const resolvedImage = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1337"}${imageUrl}`
    : IMAGES.YogaNidraImage?.src || IMAGES.YogaNidraImage;

  return {
    id: meditation?.documentId || meditation?.id,
    title: meditation?.name || "Meditation",
    duration: meditation?.duration || "5 min",
    level: meditation?.level || "Beginner",
    description:
      introCard?.introCardText ||
      meditation?.description ||
      "A guided meditation for calming the mind and body.",
    tag:
      meditation?.intentions?.[0]?.name ||
      meditation?.categories?.[0]?.Name ||
      "Mindfulness",
    imgSrc: resolvedImage,
    imgAlt: meditation?.name || "Meditation",
    bg: pastelPalette[index % pastelPalette.length],
  };
};

function MeditationCard({ meditation }) {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  const handleCardClick = () => {
    if (!isLoggedIn) {
      router.push("/Login");
      return;
    }

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
      <div className="relative shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={meditation.imgSrc?.src || meditation.imgSrc}
          alt={meditation.imgAlt}
          width={128}
          height={128}
          className="w-full h-full object-cover"
        />

        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-md font-medium leading-none">
          {meditation.duration}
        </span>
      </div>

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

        <span className="mt-3 self-start inline-block bg-white text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow-2xs">
          {meditation.tag}
        </span>
      </div>
    </div>
  );
}

export default function PopularMeditation({ meditations = [] }) {
  const router = useRouter();

  const handleViewMore = () => {
    router.push("/Meditations");
  };

  const mappedMeditations = Array.isArray(meditations)
    ? meditations.slice(0, 6).map(normalizeMeditation)
    : [];

  return (
    <section className="w-full bg-white py-12 md:py-16 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9A85FE] mb-2">
            Popular Meditation
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Explore the meditations our community practices most — find your calm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {mappedMeditations.map((meditation) => (
            <MeditationCard key={meditation.id} meditation={meditation} />
          ))}
        </div>

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