"use client";

import { useRouter } from "next/navigation";
import { IMAGES } from "../../assets/assets";
import { useEffect, useState } from "react";
import { asanaService } from "../../services/apiService";
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1337";

const pastelPalette = [
  "bg-[#FEF9C3]",
  "bg-[#F3E8FF]",
  "bg-[#BFDDF2]",
  "bg-[#FCE7F3]",
  "bg-[#DCFCE7]",
  "bg-[#FEF9C3]",
];

const getApiImageUrl = (url) => {
  if (!url) return IMAGES.YogaNidraImage;
  if (url.startsWith("http") || url.startsWith("data:")) return url;
  return `${IMAGE_BASE_URL}${url}`;
};

function AsanaCard({ asana }) {
  const router = useRouter();

  const cardData = {
    id: asana.documentId || asana.id,
    title: asana.name || asana.title || "Asana",
    duration: asana.duration ? `${asana.duration} min` : "5 min",
    level: asana.level || "Beginner",
    description:
      asana.introCard?.introCardText ||
      asana.description ||
      "A grounded, mindful movement practice for balance and wellbeing.",
    tag: asana.type || asana.element || "Wellbeing",
    imgAlt: asana.name || asana.title || "Asana",
    bg: pastelPalette[(Number(asana.id || 1) - 1) % pastelPalette.length],
    imgSrc:
      getApiImageUrl(
        asana.introCard?.introCardImage?.url ||
          asana.thumbnail?.url ||
          asana.image?.[0]?.url ||
          asana.bannerImage?.url
      ),
  };

  const handleCardClick = () => {
    router.push(`/AsanasSessionDetail?id=${cardData.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`
        ${cardData.bg} rounded-2xl p-4 flex flex-row gap-4
        cursor-pointer shadow-2xs transition-transform hover:-translate-y-1 w-full h-full
      `}
    >
      <div className="relative shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100">
        <img
          src={cardData.imgSrc?.src || cardData.imgSrc}
          alt={cardData.imgAlt}
          className="w-full h-full object-cover"
        />

        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-md font-medium leading-none">
          {cardData.duration}
        </span>
      </div>

      <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-0.5 truncate">
            {cardData.title}
          </h3>
          <p className="text-xs text-gray-500 font-medium mb-1.5">
            {cardData.duration} • {cardData.level}
          </p>
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
            {cardData.description}
          </p>
        </div>

        <span className="mt-3 self-start inline-block bg-white text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow-2xs">
          {cardData.tag}
        </span>
      </div>
    </div>
  );
}

export default function PopularAsanas() {
  const [asanaList, setAsanaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAsanas = async () => {
      try {
        const response = await asanaService.getAllAsanas();
        console.log("All Asanas API response:", response);

        const normalized =
          Array.isArray(response)
            ? response
            : Array.isArray(response?.data)
              ? response.data
              : Array.isArray(response?.data?.data)
                ? response.data.data
                : [];

        setAsanaList(normalized);
      } catch (error) {
        console.error("Error fetching asanas:", error);
        setAsanaList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAsanas();
  }, []);

  return (
    <section className="w-full bg-white py-12 md:py-16 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9A85FE] mb-2">
            Popular Asanas
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Explore the asanas our community practices most — find your flow.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center gap-3 text-[#9A85FE] font-medium">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#9A85FE] border-t-transparent" />
              Loading asanas...
            </div>
          </div>
        ) : asanaList.length === 0 ? (
          <div className="flex justify-center items-center py-16">
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-8 py-10 text-center max-w-md">
              <p className="text-lg font-semibold text-gray-800">No asana found</p>
              <p className="mt-2 text-sm text-gray-500">Try again later or check the backend response.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {asanaList.map((asana) => (
              <AsanaCard key={asana.documentId || asana.id} asana={asana} />
            ))}
          </div>
        )}

        {!isLoading && asanaList.length > 0 && (
          <div className="flex justify-center">
            <button className="bg-[#9A85FE] text-white font-semibold text-sm px-8 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-xs cursor-pointer">
              View More Asanas
            </button>
          </div>
        )}
      </div>
    </section>
  );
}