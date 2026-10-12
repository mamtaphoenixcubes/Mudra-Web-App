"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

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

// Card entrance + hover animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function Card({ item, index, isInView, dark }) {
  const isHex = item.bg?.startsWith("#");

  return (
    <motion.div
      className={`
        ${isHex ? "" : item.bg} rounded-2xl p-6
        min-h-[220px] flex flex-col items-center text-center
        w-full h-full shadow-2xs
      `}
      style={{
        backgroundColor: isHex ? item.bg : undefined,
      }}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        y: -6,
        boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
        transition: { duration: 0.25 },
      }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 mb-4 shadow-2xs overflow-hidden"
        whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
      >
        {item.isRemote ? (
          <img
            src={item.image}
            alt={item.title || "Benefit icon"}
            className="w-7 h-7 object-contain"
          />
        ) : (
          <Image
            src={item.image}
            alt={item.title || "Benefit icon"}
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
        )}
      </motion.div>

      <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1.5">
        {item.title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  );
}

export default function Benefits({ mudra }) {
  const { dark } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05,
    margin: "-50px",
  });

  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1337";

  const apiBenefits = mudra?.web?.Benefits?.map((b, index) => ({
    title: b.Title,
    description: b.Description,
    bg: b.CardBg || ["bg-[#FEF9C3]", "bg-[#F3E8FF]", "bg-[#BFDDF2]", "bg-[#FCE7F3]", "bg-[#DCFCE7]"][index % 5],
    image: b.Icon?.url ? `${IMAGE_BASE_URL}${b.Icon.url}` : IMAGES.Mind,
    isRemote: !!b.Icon?.url,
  })) || [];

  let benefits = apiBenefits;
  if (benefits.length === 0) {
    benefits = staticBenefits;
  }

  return (
    <motion.section
      ref={sectionRef}
      className={`w-full ${spacing.sectionPaddingX} py-8 md:py-10 lg:py-14`}
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[#9A85FE] mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Benefits
        </motion.h2>

        {/* Lotus Icon Graphic Divider */}
        <motion.div
          className="flex items-center justify-center gap-4 max-w-xs mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <motion.div
            className="flex-1 h-[1px]"
            style={{ backgroundColor: dark ? "#374151" : "#e5e7eb", originX: 1 }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.div
            className="w-6 h-6 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Image
              src={IMAGES.Energy}
              alt="Lotus decorative icon"
              width={24}
              height={24}
              className="w-9 h-9 object-contain opacity-75"
              style={{
                filter: dark ? "brightness(0) invert(1)" : "brightness(0)",
              }}
              priority={false}
            />
          </motion.div>
          <motion.div
            className="flex-1 h-[1px]"
            style={{ backgroundColor: dark ? "#374151" : "#e5e7eb", originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4 lg:gap-5">
          {benefits.map((item, i) => (
            <Card key={i} item={item} index={i} isInView={isInView} dark={dark} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}