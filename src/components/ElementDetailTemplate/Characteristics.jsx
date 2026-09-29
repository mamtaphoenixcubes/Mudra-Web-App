"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const benefits = [
  { title: "Stability", description: "Provides strength, structure, and endurance.", image: IMAGES.EarthIcon, bgColor: "bg-benefit-1" },
  { title: "Nourishment", description: "Supports growth, healing, and physical well-being.", image: IMAGES.LeafOutline, bgColor: "bg-benefit-2" },
  { title: "Grounding", description: "Brings a sense of safety, security, and presence.", image: IMAGES.ShieldTick, bgColor: "bg-benefit-3" },
  { title: "Patience", description: "Encourages calmness, steadfastness, and perseverance.", image: IMAGES.IconYogaNidra, bgColor: "bg-benefit-4" },
  { title: "Abundance", description: "Connected to prosperity, material comfort, and generosity.", image: IMAGES.EmotionalBalance, bgColor: "bg-benefit-5" },
];

export default function Characteristics({ characteristics = [] }) {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px"
  });

  const finalCharacteristics = characteristics.length > 0
    ? characteristics.map((c, idx) => ({
        title: c.Title || c.title || c.Name || c.name || "",
        description: c.Description || c.description || "",
        image: c.Icon?.url ? (c.Icon.url.startsWith("http") ? c.Icon.url : `http://192.168.1.14:1337${c.Icon.url}`) : IMAGES.EarthIcon,
        bgColor: c.IconBG || `bg-benefit-${(idx % 5) + 1}`
      }))
    : benefits;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Character animation for heading
  const charVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.06,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headingText = "Characteristics";
  const headingChars = headingText.split("");

  return (
    <motion.section 
      ref={sectionRef}
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY} flex justify-center`} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-7xl sm:max-w-[90%] md:max-w-[1100px] lg:max-w-[1200px] xl:max-w-[1300px] 2xl:max-w-[2100px] mx-auto">

        {/* Heading - Character by character */}
        <motion.h2 
          className={typography.howToPractice.heading} 
          style={{ color: textColor }}
        >
          {headingChars.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={charVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h2>

        {/* Divider with lotus image */}
        <motion.div 
          className={typography.howToPractice.dividerWrapper}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.span 
            className={typography.whySubscribe.dividerLine} 
            style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          <motion.div 
            className={typography.howToPractice.lotusDivider}
          >
            <Image
              src={IMAGES.Energy}
              alt="Lotus divider"
              width={40}
              height={40}
              className="w-full h-full object-contain"
              style={{
                filter: dark ? "brightness(0.8) invert(1)" : "none",
              }}
            />
          </motion.div>
          <motion.span 
            className={typography.whySubscribe.dividerLine} 
            style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
        </motion.div>

        {/* Items */}
        <motion.div 
          className="grid grid-cols-2 sm:flex sm:flex-row sm:items-start relative gap-x-4 gap-y-8 sm:gap-0"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {finalCharacteristics.map((item, i) => {
            const isLastOdd = finalCharacteristics.length % 2 !== 0 && i === finalCharacteristics.length - 1;
            const isHexBg = item.bgColor?.startsWith("#");
            return (
              <motion.div
                key={i}
                className={`relative flex-1 ${isLastOdd ? "col-span-2 sm:col-span-1" : ""}`}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 }
                }}
              >
                <div className={`flex flex-col items-center text-center ${spacing.benefitItemGap} w-full ${spacing.benefitItemPad}`}>

                  {/* Circle image */}
                  <motion.div 
                    className={`${spacing.benefitCircle} rounded-full flex items-center justify-center ${isHexBg ? "" : item.bgColor}`} 
                    style={{
                      backgroundColor: isHexBg ? item.bgColor : (dark ? undefined : undefined),
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={64}
                        height={64}
                        className={`${spacing.benefitImgInner} object-contain`}
                        unoptimized={true}
                      />
                    )}
                  </motion.div>

                  <motion.h3 
                    className={`${typography.benefitTitle}`} 
                    style={{ color: textColor }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {item.title}
                  </motion.h3>
                  <p className={`${typography.benefitBody} ${spacing.benefitDescMaxW}`} style={{ color: dark ? "#ffffff" : "#6b7280" }}>
                    {item.description}
                  </p>
                </div>

                {/* Vertical divider */}
                {i < finalCharacteristics.length - 1 && (
                  <motion.div 
                    className={`hidden sm:block absolute top-1/2 -translate-y-1/2 right-0 w-px ${spacing.featureDividerH}`} 
                    style={{
                      backgroundColor: dark ? "#fafafa" : "var(--features-divider-vertical)",
                    }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 + 0.3 }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </motion.section>
  );
}