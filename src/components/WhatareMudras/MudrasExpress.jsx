"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { mudraService } from "../../services/apiService";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

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
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { dark, textColor } = useTheme();
  const [mudraTypes, setMudraTypes] = useState(FALLBACK_MUDRAS);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    async function fetchMudraTypes() {
      try {
        setLoading(true);
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
        // Keep using FALLBACK_MUDRAS
      } finally {
        setLoading(false);
      }
    }
    fetchMudraTypes();
  }, []);

  // Show loading state or fallback data
  if (loading) {
    // You can add a loading spinner here if needed
    // For now, we'll show the fallback data immediately
  }

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
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <p className={`${typography.sectionLabel} mb-2`} style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
            TYPE OF MUDRAS
          </p>
          <h2 className={`${typography.sectionHeading} mb-3`} style={{ color: textColor }}>
            Mudras Express in Many Ways
          </h2>
          <p className={`${typography.sectionMb} max-w-2xl mx-auto`} style={{ color: dark ? "#e5e7eb" : "#374151" }}>
            Mudras can be practiced through the hands, body, mind and energy locks.
          </p>
        </motion.div>

        {/* 4 Cards Grid - Fixed grid class */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {mudraTypes.map((item, i) => (
            <motion.div
              key={i}
              className="rounded-2xl p-6 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all"
              style={{ 
                backgroundColor: dark ? item.cardBg : item.cardBg,
                border: dark ? "1px solid #none" : "none"
              }}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* White Icon Circle */}
              <motion.div 
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-4 shadow-xs shrink-0"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
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
              </motion.div>

              {/* Title */}
              <h3 className={`${typography.benefitTitle} mb-2`} style={{ color: dark ? "#000000" : "#111827" }}>
                {item.title}
              </h3>

              {/* Description */}
              <p className={`${typography.benefitBody} max-w-[200px]`} style={{ color: dark ? "#363636" : "#4b5563" }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}