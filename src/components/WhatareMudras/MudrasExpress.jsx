"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { IMAGES } from "../../assets/assets";
import { mudraService } from "../../services/apiService";

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1337";

const FALLBACK_MUDRAS = [
  { 
    title: "Hasta Mudras", 
    icon: IMAGES.HastaMudras, 
    description: "Hand gestures that direct energy flow and influence the mind and body.", 
    cardBg: "#FEF9C3",
  },
  { 
    title: "Kaya Mudras", 
    icon: IMAGES.KayaMudras, 
    description: "Body postures that create stability, focus and energetic alignment.", 
    cardBg: "#F3E8FF",
  },
  { 
    title: "Mana Mudras", 
    icon: IMAGES.ManaMudras, 
    description: "Mental or symbolic gestures that refine thoughts and elevate consciousness.", 
    cardBg: "#E0F2FE",
  },
  { 
    title: "Bandha Mudras", 
    icon: IMAGES.BandhaMudras, 
    description: "Energy locks that seals and directs prana for higher awakening.", 
    cardBg: "#FCE7F3",
  },
];

const getBgForMudraType = (title, index) => {
  const t = title.toLowerCase();
  if (t.includes("hasta")) return "#FEF9C3";
  if (t.includes("kaya")) return "#F3E8FF";
  if (t.includes("mana")) return "#E0F2FE";
  if (t.includes("bandha")) return "#FCE7F3";
  const bgs = ["#FEF9C3", "#F3E8FF", "#E0F2FE", "#FCE7F3"];
  return bgs[index % bgs.length];
};

const getLocalIconForMudraType = (title) => {
  const t = title.toLowerCase();
  if (t.includes("hasta")) return IMAGES.HastaMudras;
  if (t.includes("kaya")) return IMAGES.KayaMudras;
  if (t.includes("mana")) return IMAGES.ManaMudras;
  if (t.includes("bandha")) return IMAGES.BandhaMudras;
  return IMAGES.HastaMudras;
};

export default function MudrasExpress() {
  const [mudraTypes, setMudraTypes] = useState(FALLBACK_MUDRAS);

  useEffect(() => {
    async function fetchMudraTypes() {
      try {
        const data = await mudraService.getTypeOfMudras();
        if (data.success && data.data && Array.isArray(data.data.data)) {
          const mapped = data.data.data.map((item, index) => {
            const cardBg = getBgForMudraType(item.title, index);
            const iconUrl = item.icon?.url 
              ? `${IMAGE_BASE_URL}${item.icon.url}`
              : null;
            return {
              title: item.title,
              description: item.description,
              cardBg: cardBg,
              iconUrl: iconUrl,
              icon: getLocalIconForMudraType(item.title),
              isRemote: !!item.icon?.url
            };
          });
          setMudraTypes(mapped);
        }
      } catch (err) {
        console.warn("Error fetching type-of-mudras from API, using fallback data:", err);
      }
    }
    fetchMudraTypes();
  }, []);

  return (
    <section className="w-full py-16 md:py-20 bg-white px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            TYPE OF MUDRAS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3" style={{ color: "#9A85FE" }}>
            Mudras Express in Many Ways
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-semibold leading-relaxed">
            Mudras can be practiced through the hands, body, mind and energy locks.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
          {mudraTypes.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all"
              style={{ backgroundColor: item.cardBg }}
            >
              {/* White Icon Circle */}
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-4 shadow-xs shrink-0">
                {item.isRemote && item.iconUrl ? (
                  <img
                    src={item.iconUrl}
                    alt={item.title}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                ) : (
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}