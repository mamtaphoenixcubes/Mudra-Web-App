"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { typography, spacing, btn } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import SiteContainer from "../../common/SiteContainer";
import Card from "../../common/Card";

const fallbackBgs = [
  "#FEF9C3",
  "#F3E8FF",
  "#BFDDF2",
  "#FCE7F3",
  "#DCFCE7",
];

// ── Mudra card (uses common <Card>, compact size) ──────────────
function MudraCard({ mudra, dark, textColor, index }) {
  let imgUrl = IMAGES.gyanMudra;
  if (mudra.image && mudra.image.length > 0 && mudra.image[0]?.url) {
    const url = mudra.image[0].url;
    imgUrl = url.startsWith("http") ? url : `http://192.168.1.14:1337${url}`;
  }

  const bgColor = fallbackBgs[index % fallbackBgs.length];

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
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        y: -6,
        boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 },
      }}
      style={{ height: "100%" }}
    >
      <Card
        sx={{
          backgroundColor: bgColor,
          borderRadius: "16px",
          // ── Compact card padding (matches PopularMudras) ──
          p: { xs: "12px", sm: "14px", md: "16px", lg: "20px" },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* ── Image circle (compact) ── */}
        <motion.div
          className="w-16 h-16 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full shadow-sm mb-2 shrink-0 overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: "#ffffff" }}
          whileHover={{
            scale: 1.12,
            rotate: 5,
            transition: { duration: 0.2 },
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

        {/* ── Name (compact) ── */}
        <motion.h3
          className="text-xs sm:text-sm font-bold leading-tight mb-1"
          style={{ color: textColor }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          {mudra.name}
        </motion.h3>

        {/* ── Description (compact) ── */}
        <p
          className="text-[10px] sm:text-[11px] leading-snug mb-2 flex-1"
          style={{ color: dark ? "#000000" : "#4b5563" }}
        >
          {mudra.introCard?.introCardText ||
            mudra.description ||
            "Soothing energy alignment gesture."}
        </p>

        {/* ── Element pill (compact) ── */}
        <motion.span
          className="inline-block border text-[9px] lg:text-[10px] font-medium rounded-full px-2.5 py-0.5 mb-1.5 leading-tight"
          style={{
            backgroundColor: dark ? "#1f2937" : "rgba(255,255,255,0.6)",
            borderColor: dark ? "#4b5563" : "#e5e7eb",
            color: dark ? "#e5e7eb" : "#6b7280",
          }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          {mudra.element || "Universal"}
        </motion.span>

        {/* ── Learn More (compact) ── */}
        <Link
          href={`/MudraDetailTemplate?id=${mudra.documentId || mudra.id}`}
          className="mt-auto w-fit rounded-lg cursor-pointer transition-colors py-1 px-2.5 text-[10px] sm:text-xs block text-center font-medium"
          style={{ backgroundColor: textColor, color: "#ffffff" }}
        >
          Learn More
        </Link>
      </Card>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────
export default function SuggestedMudras({
  mudras = [],
  activeNeedId = null,
  activeNeedName = "",
}) {
  const { dark, textColor } = useTheme();
  const router = useRouter();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05,
    margin: "-50px 0px",
  });

  const [search, setSearch] = useState("");

  const filtered = mudras.filter((m) => {
    const q = search.toLowerCase();
    if (
      q &&
      !m.name?.toLowerCase().includes(q) &&
      !m.introCard?.introCardText?.toLowerCase().includes(q)
    )
      return false;
    return true;
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headingText = "Suggested Mudras";
  const headingChars = headingText.split("");

  return (
    <motion.section
      id="best-mudras"
      ref={sectionRef}
      className="w-full"
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <SiteContainer>
        {/* ── Heading ── */}
        <motion.div
          className={`text-center ${spacing.headingBlockMb}`}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h1
            className="font-semibold text-xl sm:text-2xl md:text-5xl mb-2"
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
          </motion.h1>
          <motion.p
            className={`${typography.sectionMbBody} mb-8`}
            style={{ color: dark ? "#ffffff" : "#0F0F0FCC" }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Practices that can help you manage{" "}
            {activeNeedName || "stress and anxiety"} naturally.
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
                <MudraCard
                  key={m.documentId || m.id}
                  mudra={m}
                  dark={dark}
                  textColor={textColor}
                  index={i}
                />
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
                <MudraCard
                  key={m.documentId || m.id}
                  mudra={m}
                  dark={dark}
                  textColor={textColor}
                  index={i}
                />
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
            style={{ backgroundColor: textColor }}
            whileHover={{
              scale: 1.05,
              opacity: 0.85,
              boxShadow: `0 8px 30px ${textColor}40`,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explore More Mudras
          </motion.button>
        </motion.div>
      </SiteContainer>
    </motion.section>
  );
}