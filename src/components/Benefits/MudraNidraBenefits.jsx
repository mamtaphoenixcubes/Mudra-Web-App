"use client";

import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { card, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const benefits = [
  {
    title: "Reduces Stress",
    description: "Calm the nervous system and promotes relaxation.",
    bg: "bg-problem-1",
    image: IMAGES.Energy,
    path: "/ListofBenefits" // Add path for navigation
  },
  {
    title: "Improves Sleep",
    description: "Supports deep, restful sleep and reduces insomnia.",
    bg: "bg-problem-2",
    image: IMAGES.YogaNidra,
    path: "/ListofBenefits?benefit=sleep"
  },
  {
    title: "Enhances Focus",
    description: "Improves concentration, memory and mental clarity.",
    bg: "bg-problem-3",
    image: IMAGES.Mind,
    path: "/ListofBenefits?benefit=focus"
  },
  {
    title: "Emotional Balance",
    description: "Helps regulate emotions and supports inner stability.",
    bg: "bg-problem-4",
    image: IMAGES.EmotionalBalance,
    path: "/ListofBenefits?benefit=emotional"
  },
  {
    title: "Boosts Immunity",
    description: "Supports the body's natural defence mechanisms.",
    bg: "bg-problem-5",
    image: IMAGES.Holistic,
    path: "/ListofBenefits?benefit=immunity"
  },
  {
    title: "Increases Energy",
    description: "Balances energy levels and reduces fatigue.",
    bg: "bg-problem-1",
    image: IMAGES.Increases,
    path: "/ListofBenefits?benefit=energy"
  },
  {
    title: "Supports Healing",
    description: "Aids recovery and promotes overall well-being.",
    bg: "bg-problem-2",
    image: IMAGES.KayaMudras,
    path: "/ListofBenefits?benefit=healing"
  },
];

function Card({ item, dark, textColor, index, onClick }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={`
        ${item.bg} ${card.radius} ${card.hover}
        ${spacing.cardPadding} ${spacing.benefitsCardMinH}
        flex flex-col items-center text-center
        w-full h-full cursor-pointer
      `}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        y: -6,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      onClick={onClick} // Add click handler
    >
      {/* Icon circle */}
      <motion.div
        className={`
          rounded-full flex items-center justify-center shrink-0
          ${card.benefitsIconBox} ${spacing.benefitsIconBoxMb}
        `}
        style={{
          backgroundColor: dark ? "#ffffff" : "#ffffff",
        }}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.2 },
        }}
      >
        <Image
          src={item.image}
          alt={item.title}
          width={40}
          height={40}
          className={`${card.benefitsIconInner} object-contain`}
        />
      </motion.div>

      <motion.h3 
        className={`${typography.benefitsCardTitle} ${spacing.cardTitleMb}`} 
        style={{ color: textColor }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 },
        }}
      >
        {item.title}
      </motion.h3>
      <p className={`${typography.benefitsCardBody}`} style={{ color: dark ? "#000000" : "#4b5563" }}>
        {item.description}
      </p>
    </motion.div>
  );
}

export default function MudraNidraBenefits() {
  const { dark, textColor } = useTheme();
  const router = useRouter();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px"
  });

  const pairs = benefits.slice(0, 6);
  const last = benefits[6];

  // Navigation handler
  const handleBenefitClick = (path) => {
    router.push(path);
  };

  // Fade up variants for header
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  // Container variants for stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.section 
      ref={sectionRef}
      className={`w-full ${spacing.sectionPadding}`} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-[1400px] lg:max-w-[1600px] xl:max-w-[1800px] 2xl:max-w-[2100px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Heading */}
        <motion.div 
          className={`text-center ${spacing.headingBlockMb}`}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className={`${typography.benefitsSectionLabel}`} style={{ color: dark ? "#ffffff" : "#9ca3af" }}>
            KEY BENEFITS
          </p>
          <h2 className={`${typography.benefitsSectionHeading} ${spacing.labelMt}`} style={{ color: textColor }}>
            How Mudras Can Support You
          </h2>
          <p className={`${typography.sectionMbBody} mt-2`} style={{ color: dark ? "#ffffff" : "#6b7280" }}>
            Experience the potential benefits of consistent mudra practice.
          </p>
        </motion.div>

        {/* MOBILE (< sm): 2-col grid + centred 7th card */}
        <motion.div 
          className="sm:hidden"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className={`grid grid-cols-2 ${spacing.cardGapSm}`}>
            {pairs.map((item, i) => (
              <Card 
                key={i} 
                item={item} 
                dark={dark} 
                textColor={textColor} 
                index={i}
                onClick={() => handleBenefitClick(item.path)}
              />
            ))}
          </div>
          <div className="flex justify-center mt-3">
            <div className="w-[calc(50%-6px)]">
              <Card 
                item={last} 
                dark={dark} 
                textColor={textColor} 
                index={6}
                onClick={() => handleBenefitClick(last.path)}
              />
            </div>
          </div>
        </motion.div>

        {/* TABLET / DESKTOP (sm+): 7 columns in one row */}
        <motion.div 
          className={`hidden ${spacing.mubraclaims}`}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((item, i) => (
            <Card 
              key={i} 
              item={item} 
              dark={dark} 
              textColor={textColor} 
              index={i}
              onClick={() => handleBenefitClick(item.path)}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}