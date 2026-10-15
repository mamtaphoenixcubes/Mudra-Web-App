"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const approaches = [
  {
    id: "mudras",
    title: "Mudras",
    description:
      "Sacred hand gestures that channel energy, balance the elements, and activate your body's natural healing abilities",
    bullets: [
      "Sacred hand gestures that channel energy.",
      "Sacred hand gestures that channel energy.",
      "Sacred hand gestures that channel energy.",
    ],
    image: IMAGES.MudrasAbout || IMAGES.Mudras,
    imageAlt: "Mudras",
  },
  {
    id: "yoga-nidra",
    title: "Yoga Nidra",
    description:
      "A guided state of conscious relaxation that calms the mind, heals the body, and restores inner harmony.",
    bullets: [
      "A guided state of conscious relaxation.",
      "A guided state of conscious relaxation.",
      "A guided state of conscious relaxation.",
    ],
    image: IMAGES.YogaNidraAbout || IMAGES.YogaNidra,
    imageAlt: "Yoga Nidra",
  },
];

export default function ApproachSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { dark, textColor } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className={`
        w-full
        ${spacing.sectionPaddingX}
        ${spacing.sectionPaddingY}
      `}
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className=" mx-auto">

        {/* Heading */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <p className={`${typography.sectionLabel} mb-2`} style={{ color: dark ? "#9ca3af" : "#0F0F0F99" }}>
            OUR APPROACH
          </p>
          <h2 className={`${typography.sectionHeading} mb-3`} style={{ color: textColor }}>
            Intro to Mudras & Yoga Nidra
          </h2>
          <p className={`${typography.sectionMb} max-w-2xl mx-auto`} style={{ color: dark ? "#e5e7eb" : "#0F0F0FCC" }}>
            Ancient practices. Holistic healing. Everyday transformation.
          </p>
        </motion.div>

        {/* 2 Columns Row */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {approaches.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="relative flex items-start gap-5 px-4"
              variants={itemVariants}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 }
              }}
            >
              {/* Circular Photo */}
              <motion.div 
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 border"
                style={{
                  backgroundColor: dark ? "#374151" : "#f3f4f6",
                  borderColor: dark ? "#4b5563" : "#e5e7eb"
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <h3 className={`${typography.cardTitle} mb-1`} style={{ color: dark ? "#f9fafb" : "#0F0F0FCC" }}>
                  {item.title}
                </h3>
                <p className={`${typography.cardBody} mb-3 leading-relaxed`} style={{ color: dark ? "#d1d5db" : "#0F0F0F80" }}>
                  {item.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5">
                  {item.bullets.map((b, i) => (
                    <li key={i} className={`${typography.cardBody} flex items-start gap-2 leading-tight`} style={{ color: dark ? "#d1d5db" : "#0F0F0F80" }}>
                      <span className="font-bold" style={{ color: dark ? "#9ca3af" : "#9ca3af" }}>•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vertical line divider for desktop */}
              {index === 0 && (
                <div 
                  className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-46"
                  style={{ 
                    backgroundColor: dark ? "#374151" : "#00000066"
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}