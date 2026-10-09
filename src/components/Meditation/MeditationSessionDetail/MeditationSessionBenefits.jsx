"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../../assets/assets";

const staticBenefits = [
  {
    title: "Deep Relaxation",
    description: "Releases tension and calms the nervous system.",
    bg: "bg-[#FEF9C3]",
    image: IMAGES.HolisticWellbeing,
    isRemote: false,
  },
  {
    title: "Reduces Stress",
    description: "Lowers cortisol and eases anxiety and worry.",
    bg: "bg-[#F3E8FF]",
    image: IMAGES.Mind,
    isRemote: false,
  },
  {
    title: "Improves Focus",
    description: "Trains attention and strengthens concentration.",
    bg: "bg-[#BFDDF2]",
    image: IMAGES.focus,
    isRemote: false,
  },
  {
    title: "Emotional Balance",
    description: "Cultivates calm, patience, and inner steadiness.",
    bg: "bg-[#FCE7F3]",
    image: IMAGES.Mind,
    isRemote: false,
  },
  {
    title: "Mindful Awareness",
    description: "Anchors you in the present moment with clarity.",
    bg: "bg-[#DCFCE7]",
    image: IMAGES.HolisticWellbeing,
    isRemote: false,
  },
];

function Card({ item, index }) {
  const isHex = item.bg?.startsWith("#");
  const imageAlt = item.title || "Meditation benefit";

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

export default function MeditationSessionBenefits({
  // Accept a meditation object (not required for rendering)
  meditation = null,
}) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05,
    margin: "-50px",
  });

  const benefits = staticBenefits;

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