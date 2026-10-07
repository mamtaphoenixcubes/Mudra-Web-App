"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";

const staticBenefits = [
  {
    title: "Improves Concentration",
    description: "Enhances focus and improves memory.",
    bg: "bg-[#FEF9C3]",
    image: IMAGES.Mind,
    isRemote: false,
  },
  {
    title: "Calms the Mind",
    description: "Reduces stress, anxiety, and mental chaos.",
    bg: "bg-[#F3E8FF]",
    image: IMAGES.ManaMudras,
    isRemote: false,
  },
  {
    title: "Enhances Learning",
    description: "Supports better understanding and retention.",
    bg: "bg-[#BFDDF2]",
    image: IMAGES.HolisticWellbeing,
    isRemote: false,
  },
  {
    title: "Promotes Inner Peace",
    description: "Brings a sense of calm, balance, and harmony.",
    bg: "bg-[#FCE7F3]",
    image: IMAGES.KayaMudras,
    isRemote: false,
  },
  {
    title: "Boosts Energy",
    description: "Balances the flow of energy in the body.",
    bg: "bg-[#DCFCE7]",
    image: IMAGES.focus,
    isRemote: false,
  },
];

// Rotating fallback background palette used when API doesn't supply CardBg
const FALLBACK_BGS = [
  "bg-[#FEF9C3]",
  "bg-[#F3E8FF]",
  "bg-[#BFDDF2]",
  "bg-[#FCE7F3]",
  "bg-[#DCFCE7]",
];

const FALLBACK_ICONS = [
  IMAGES.Mind,
  IMAGES.ManaMudras,
  IMAGES.HolisticWellbeing,
  IMAGES.KayaMudras,
  IMAGES.focus,
];

function Card({ item, index }) {
  const isHex = item.bg?.startsWith("#");
  const imageAlt = item.title || "Asana benefit";

  return (
    <div
      className={`
        ${isHex ? "" : item.bg} rounded-2xl p-6
        min-h-[220px] flex flex-col items-center text-center
        w-full h-full shadow-2xs transition-transform hover:-translate-y-1
      `}
      style={{
        backgroundColor: isHex ? item.bg : undefined,
      }}
    >
      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 mb-4 shadow-2xs overflow-hidden">
        {item.isRemote ? (
          <img
            src={item.image}
            alt={imageAlt}
            className="w-7 h-7 object-contain"
          />
        ) : (
          <Image
            src={item.image}
            alt={imageAlt}
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
        )}
      </div>

      <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1.5">
        {item.title || "Benefit"}
      </h3>

      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
        {item.description || ""}
      </p>
    </div>
  );
}

export default function AsanasSessionBenefits({
  // Accept either an asana or mudra object
  asana = null,
  mudra = null,
  // Optional override array (e.g. passed directly from parent)
  benefits: propBenefits = null,
}) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05,
    margin: "-50px",
  });

  const IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
    "http://192.168.1.14:1337";

  // Prefer asana, fall back to mudra
  const data = asana || mudra || null;
  const actualData = data?.data || data;

  // Try multiple API locations for benefits
  const rawBenefits =
    propBenefits ||
    actualData?.web?.Benefits ||
    actualData?.WebDetailsPage?.BenefitsWeb ||
    actualData?.WebDetailsPage?.Benefits ||
    actualData?.benefits ||
    [];

  const apiBenefits = Array.isArray(rawBenefits)
    ? rawBenefits.map((b, index) => {
        const iconUrl =
          b?.Icon?.url ||
          b?.icon?.url ||
          b?.Icon?.[0]?.url ||
          b?.image?.url ||
          null;

        return {
          title: b?.title || b?.Title || b?.name || "",
          description: b?.description || b?.Description || "",
          bg:
            b?.CardBg ||
            b?.cardBg ||
            FALLBACK_BGS[index % FALLBACK_BGS.length],
          image: iconUrl
            ? iconUrl.startsWith("http")
              ? iconUrl
              : `${IMAGE_BASE_URL}${iconUrl}`
            : FALLBACK_ICONS[index % FALLBACK_ICONS.length],
          isRemote: !!iconUrl,
        };
      })
    : [];

  const benefits =
    apiBenefits.length > 0 ? apiBenefits : staticBenefits;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-12 md:py-16 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[#9A85FE] mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Benefits
        </motion.h2>

        {/* Divider with lotus icon */}
        <div className="flex items-center justify-center gap-4 max-w-xs mx-auto mb-10">
          <div className="flex-1 h-[1px] bg-gray-200" />
          <Image
            src={IMAGES.Energy}
            alt="Lotus vector"
            width={24}
            height={24}
            className="w-6 h-6 object-contain opacity-75"
          />
          <div className="flex-1 h-[1px] bg-gray-200" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: i * 0.06,
              }}
            >
              <Card item={item} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}