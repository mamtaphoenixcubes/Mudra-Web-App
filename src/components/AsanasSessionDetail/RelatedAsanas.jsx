"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";

const staticRelated = [
  {
    title: "Chin Mudra",
    description: "Enhances mental clarity and concentration.",
    bg: "bg-[#FEF9C3]",
    image: IMAGES.Mind,
    isRemote: false,
  },
  {
    title: "Dhyana Mudra",
    description: "Promotes meditation and inner peace.",
    bg: "bg-[#F3E8FF]",
    image: IMAGES.ManaMudras,
    isRemote: false,
  },
  {
    title: "Prana Mudra",
    description: "Boosts vitality and immunity.",
    bg: "bg-[#BFDDF2]",
    image: IMAGES.HolisticWellbeing,
    isRemote: false,
  },
  {
    title: "Vayu Mudra",
    description: "Helps balance the air element.",
    bg: "bg-[#FCE7F3]",
    image: IMAGES.KayaMudras,
    isRemote: false,
  },
];

function Card({ item }) {
  const isHex = item.bg?.startsWith("#");

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
            alt={item.title}
            className="w-7 h-7 object-contain"
          />
        ) : (
          <Image
            src={item.image}
            alt={item.title}
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
        )}
      </div>

      <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1.5">
        {item.title}
      </h3>

      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
        {item.description}
      </p>

      {/* Static "View Mudra →" label (no navigation) */}
      <div className="mt-auto">
        <span className="text-xs sm:text-sm font-semibold text-gray-800 inline-flex items-center gap-1 cursor-default select-none">
          View Mudra &rarr;
        </span>
      </div>
    </div>
  );
}

export default function RelatedAsanas() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05,
    margin: "-50px",
  });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-12 md:py-16 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[#9A85FE] mb-2">
          Related Mudras
        </h2>

        {/* Lotus Divider */}
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

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {staticRelated.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: i * 0.07,
              }}
            >
              <Card item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}