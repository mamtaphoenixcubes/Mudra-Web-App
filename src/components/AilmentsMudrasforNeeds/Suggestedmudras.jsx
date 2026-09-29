"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { typography, spacing, btn } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const fallbackBgs = [
  "bg-[#FEF9C3]",
  "bg-[#F3E8FF]",
  "bg-[#BFDDF2]",
  "bg-[#FCE7F3]",
  "bg-[#DCFCE7]",
];

// ── Mudra card ─────────────────────────────────────────────────
function MudraCard({ mudra, dark, textColor, index }) {
  // Determine image source
  let imgUrl = IMAGES.gyanMudra;
  if (mudra.image && mudra.image.length > 0 && mudra.image[0]?.url) {
    const url = mudra.image[0].url;
    imgUrl = url.startsWith("http") ? url : `http://192.168.1.14:1337${url}`;
  }

  const bgClass = fallbackBgs[index % fallbackBgs.length];

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
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
      className={`${bgClass} rounded-2xl ${spacing.cardPadding} flex flex-col items-center text-center transition-transform duration-200 hover:scale-[1.02] hover:shadow-md`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        y: -6,
        boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 }
      }}
    >
      {/* ── Image circle ── */}
      <motion.div 
        className={`${spacing.cardIconBox} rounded-full shadow-sm ${spacing.cardIconBoxMb} shrink-0 overflow-hidden flex items-center justify-center`} 
        style={{
          backgroundColor: "#ffffff",
        }}
        whileHover={{
          scale: 1.12,
          rotate: 5,
          transition: { duration: 0.2 }
        }}
      >
        <Image
          src={imgUrl}
          alt={mudra.name || "Mudra"}
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-full"
          unoptimized={true}
        />
      </motion.div>

      {/* ── Name ── */}
      <motion.h3 
        className={`${typography.cardTitle} ${spacing.yogaNidraCard} leading-tight font-bold mb-1`} 
        style={{ color: textColor }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        {mudra.name}
      </motion.h3>

      {/* ── Description ── */}
      <p className={`${typography.cardBody} leading-relaxed mb-3 flex-1`} style={{ color: dark ? "#000000" : "#4b5563" }}>
        {mudra.introCard?.introCardText || mudra.description || "Soothing energy alignment gesture."}
      </p>

      <motion.span 
        className="inline-block border text-[10px] lg:text-xs font-medium rounded-full px-3 py-1 mb-2 leading-tight" 
        style={{
          backgroundColor: dark ? "#1f2937" : "rgba(255,255,255,0.6)",
          borderColor: dark ? "#4b5563" : "#e5e7eb",
          color: dark ? "#e5e7eb" : "#6b7280",
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        {mudra.element || "Universal"}
      </motion.span>

      {/* ── Learn More ── */}
      <Link 
        href={`/MudraDetailTemplate?id=${mudra.documentId || mudra.id}`}
        className={`mt-auto w-fit rounded-lg cursor-pointer ${spacing.btnMdPaddingX} ${typography.btnTextMd} transition-colors py-1.5 px-3 text-[10px] sm:text-xs block text-center font-medium`} 
        style={{
          backgroundColor: textColor,
          color: "#ffffff",
        }}
      >
        Learn More
      </Link>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────
export default function PopularMudras({ mudras = [], activeNeedId = null, activeNeedName = "" }) {
  const { dark, textColor } = useTheme();
  const router = useRouter();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.05,
    margin: "-50px"
  });

  const [search, setSearch] = useState("");

  const filtered = mudras.filter((m) => {
    const q = search.toLowerCase();
    if (q && !m.name?.toLowerCase().includes(q) && !m.introCard?.introCardText?.toLowerCase().includes(q)) return false;
    return true;
  });

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

  const headingText = "Suggested Mudras";
  const headingChars = headingText.split("");

  return (
    <motion.section 
      id="best-mudras"
      ref={sectionRef}
      className={`${spacing.sectionPaddingX} py-8 md:py-10 lg:py-14`} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={spacing.container}>

        {/* ── Heading ── */}
        <motion.div 
          className={`text-center ${spacing.headingBlockMb}`}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Heading - Character by character */}
          <motion.h2 
            className="font-semibold text-xl sm:text-2xl md:text-3xl mb-2" 
            style={{ color: textColor }}
          >
            {headingChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants => ({
                  hidden: { opacity: 0, y: 20, rotateX: -10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: {
                      delay: i * 0.04,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }
                })}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p 
            className={`${typography.sectionMbBody} mb-8`} 
            style={{ color: dark ? "#ffffff" : "#6b7280" }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Practices that can help you manage {activeNeedName || "stress and anxiety"} naturally.
          </motion.p>
        </motion.div>

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <motion.div 
            className={`${typography.sectionBody} text-center py-20`} 
            style={{ color: dark ? "#6b7280" : "#9ca3af" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            No mudras match your filters.
          </motion.div>
        ) : (
          <>
            {/* Desktop / Tablet */}
            <motion.div 
              className={`hidden md:grid md:grid-cols-3 lg:grid-cols-5 ${spacing.cardGap}`}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {filtered.map((m, i) => (
                <MudraCard key={m.documentId || m.id} mudra={m} dark={dark} textColor={textColor} index={i} />
              ))}
            </motion.div>
            {/* Mobile */}
            <motion.div 
              className={`md:hidden grid grid-cols-2 ${spacing.cardMbGap}`}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {filtered.map((m, i) => (
                <MudraCard key={m.documentId || m.id} mudra={m} dark={dark} textColor={textColor} index={i} />
              ))}
            </motion.div>
          </>
        )}

        {/* ── Bottom CTA ── */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button 
            onClick={() => router.push("/MudraLibrary")}
            className={btn.primary} 
            style={{
              backgroundColor: textColor,
            }}
            whileHover={{
              scale: 1.05,
              opacity: 0.85,
              boxShadow: `0 8px 30px ${textColor}40`,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explore More Mudras
          </motion.button>
        </motion.div>

      </div>
    </motion.section>
  );
}