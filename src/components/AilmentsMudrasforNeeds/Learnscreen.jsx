"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { spacing } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const iconBgs = [
  "bg-[#FEF3C7]",
  "bg-[#DCC2F2]",
  "bg-[#BFDDF2]",
  "bg-[#D8EBC6]",
  "bg-[#EECAD9]",
  "bg-[#FFF6BF]",
  "bg-[#EBCFFF]",
  "bg-[#DAEEFF]",
  "bg-[#FFDBE7]",
  "bg-[#E9FFDB]",
];

function CheckIcon({ textColor }) {
  return (
    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5" style={{
      borderColor: textColor,
    }}>
      <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5 sm:w-3 sm:h-3">
        <path
          d="M2 6l3 3 5-5"
          stroke={textColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function CategoryTab({ cat, bg, isActive, onClick, dark, textColor, index }) {
  const tabVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.04,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Get image src
  let imageSrc = IMAGES.Mind;
  if (cat.icon?.url) {
    imageSrc = cat.icon.url.startsWith("http") ? cat.icon.url : `http://192.168.1.14:1337${cat.icon.url}`;
  } else {
    // Fallback based on name matches
    const nameLower = cat.Name?.toLowerCase() || "";
    if (nameLower.includes("stress")) imageSrc = IMAGES.Mind;
    else if (nameLower.includes("sleep")) imageSrc = IMAGES.YogaNidra;
    else if (nameLower.includes("energy")) imageSrc = IMAGES.Body;
    else if (nameLower.includes("immunity")) imageSrc = IMAGES.Holistic;
    else if (nameLower.includes("digest")) imageSrc = IMAGES.digestion;
    else if (nameLower.includes("heart")) imageSrc = IMAGES.EmotionalBalance;
    else if (nameLower.includes("focus")) imageSrc = IMAGES.focus;
    else if (nameLower.includes("hormon")) imageSrc = IMAGES.HolisticWellbeing;
    else if (nameLower.includes("emotion")) imageSrc = IMAGES.KayaMudras;
    else if (nameLower.includes("detox")) imageSrc = IMAGES.detox;
  }

  return (
    <motion.button
      onClick={onClick}
      className={
        "flex flex-col items-center gap-1.5 " +
        "w-[72px] sm:w-[80px] md:flex-1 md:min-w-0 md:w-auto " +
        "shrink-0 md:shrink " +
        "pt-3 pb-2.5 border-b-2 transition-colors cursor-pointer bg-transparent " +
        (isActive ? "border-primary" : "border-transparent hover:border-gray-200")
      }
      variants={tabVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      {/* icon circle */}
      <motion.div
        className={
          bg +
          " w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 " +
          "rounded-full flex items-center justify-center overflow-hidden shrink-0"
        }
        whileHover={{
          scale: 1.12,
          rotate: 5,
          transition: { duration: 0.2 }
        }}
      >
        <Image
          src={imageSrc}
          alt={cat.Name || "Category"}
          width={36}
          height={36}
          className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 object-contain"
          unoptimized={true}
        />
      </motion.div>

      {/* label */}
      <motion.span
        className={
          "text-[9px] sm:text-[10px] lg:text-[11px] text-center font-medium " +
          "leading-tight whitespace-pre-wrap break-words w-full px-0.5 " +
          (isActive ? "text-gray-900" : "text-gray-500")
        }
        style={{
          color: isActive ? (dark ? "#ffffff" : "#111827") : (dark ? "#b8b4b4" : "#6b7280"),
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        {cat.Name}
      </motion.span>
    </motion.button>
  );
}

export default function Learnscreen({ needs = [], activeNeedId = null, setActiveNeedId = () => {}, selectedDetail = null, loading = false }) {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.05,
    margin: "-50px"
  });

  const [activeToc, setActiveToc] = useState("understanding");

  const needName = selectedDetail?.Name || "Stress & Anxiety";

  const tocLinks = [
    { id: "understanding", label: `Understanding ${needName}` },
    { id: "how-mudras",    label: "How Mudras Help" },
    { id: "best-mudras",   label: `Best Mudras for ${needName}` },
    { id: "practice",      label: "How to Practice" },
    { id: "lifestyle",     label: "Lifestyle Tips" },
    { id: "faq",           label: "Frequently Asked Questions" },
  ];

  // Dynamic content details
  const dynamicDescription = selectedDetail?.Web?.MudraForNeed?.NeedDescription || "Stress and anxiety are common yet manageable. Through mudras, breathwork, and mindful practices, you can restore calm, balance your nervous system, and build resilience for daily life.";
  const dynamicHowMudras = selectedDetail?.Web?.MudraForNeed?.HowMudraHelps || "Mudras influence the flow of prana (life energy) in the body. Certain mudras activate the parasympathetic nervous system, reduce cortisol levels, calm racing thoughts and create emotional stability.";
  
  // Dynamic benefits structure
  const rawBenefits = selectedDetail?.Web?.MudraForNeed?.Benefits || [];
  const finalBenefits = rawBenefits.length > 0 ? rawBenefits.map(b => ({
    title: b.title || b.Name || "",
    description: b.description || b.Description || ""
  })) : [
    { title: "Calms the Mind", description: "Quiets racing thoughts and worry." },
    { title: "Reduces Stress", description: "Lowers cortisol levels and promotes inner peace." },
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  // Staggered TOC items
  const tocVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.06 + 0.3,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  // Staggered benefits
  const benefitVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08 + 0.3,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Character animation for heading
  const charVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <motion.div 
      ref={sectionRef}
      className="w-full" 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* ── Category tab bar ── */}
      <motion.div 
        className="border rounded-2xl mx-2 sm:mx-6 md:mx-12 lg:mx-[50px] xl:mx-[190px] overflow-hidden" 
        style={{
          borderColor: dark ? "#ffffff" : "#e5e7eb",
        }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex flex-row md:w-full px-1">
            {needs.map((cat, i) => (
              <CategoryTab
                key={cat.documentId}
                cat={cat}
                bg={iconBgs[i % iconBgs.length]}
                isActive={activeNeedId === cat.documentId}
                onClick={() => setActiveNeedId(cat.documentId)}
                dark={dark}
                textColor={textColor}
                index={i}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Body: sidebar + content ── */}
      <motion.div
        className={
          spacing.sectionPaddingX +
          " mt-6 sm:mt-8 md:mt-10 flex flex-col md:flex-row gap-5 md:gap-6 lg:gap-8 xl:gap-10 items-start"
        }
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {/* ── Sidebar TOC ── */}
        <motion.aside 
          className="w-full md:w-[210px] lg:w-[230px] xl:w-[250px] shrink-0 rounded-2xl p-4 sm:p-5 md:sticky md:top-6" 
          style={{
            backgroundColor: dark ? "#E3DDFF" : "#E3DDFF",
          }}
          variants={slideInLeft}
          whileHover={{
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            transition: { duration: 0.3 }
          }}
        >
          <motion.h3 
            className="text-sm sm:text-base font-semibold mb-3 sm:mb-4" 
            style={{ color: textColor }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            On This Page
          </motion.h3>
          <ul className="flex flex-col gap-2.5">
            {tocLinks.map((link, i) => (
              <motion.li 
                key={link.id}
                custom={i}
                variants={tocVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveToc(link.id);
                    const el = document.getElementById(link.id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className={
                    "text-left w-full cursor-pointer bg-transparent border-0 p-0 block " +
                    "text-[12px] sm:text-[13px] lg:text-sm leading-snug transition-colors " +
                    (activeToc === link.id ? "font-semibold" : "")
                  }
                  style={{
                    color: activeToc === link.id ? textColor : (dark ? "#030303" : "#6b7280"),
                  }}
                  whileHover={{
                    x: 5,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  {link.label}
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </motion.aside>

        {/* ── Article content ── */}
        <motion.article 
          className="flex-1 min-w-0 pb-12"
          variants={slideInRight}
        >
          {loading ? (
            <div className="flex flex-col gap-4 animate-pulse">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>
          ) : (
            <>
              {/* Heading */}
              <motion.h1 
                id="understanding"
                className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight mb-2 sm:mb-3" 
                style={{ color: textColor }}
              >
                {needName.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={charVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{ display: "inline-block" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p 
                className="text-sm sm:text-base font-medium mb-3 sm:mb-4" 
                style={{ color: dark ? "#ffffff" : "#4b5563" }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Find calm, Restore balance, Reclaim peace.
              </motion.p>

              <motion.p 
                className="text-[13px] sm:text-sm md:text-[14px] lg:text-base leading-relaxed mb-6 sm:mb-8 whitespace-pre-line" 
                style={{ color: dark ? "#ffffff" : "#4b5563" }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {dynamicDescription}
              </motion.p>

              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <Link
                  href={`/AilmentDetailTemplate?id=${activeNeedId}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold rounded-xl px-5 py-2.5 transition-colors border"
                  style={{
                    backgroundColor: textColor,
                    borderColor: textColor,
                    color: "#ffffff"
                  }}
                >
                  View In-Depth Guide & Symptoms →
                </Link>
              </motion.div>

              <motion.h2
                id="how-mudras"
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 pt-6" 
                style={{ color: textColor }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                How Mudras Help
              </motion.h2>
              <motion.p 
                className="text-[13px] sm:text-sm md:text-[14px] lg:text-base leading-relaxed mb-6 sm:mb-8" 
                style={{ color: dark ? "#ffffff" : "#4b5563" }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {dynamicHowMudras}
              </motion.p>

              <motion.h2
                id="best-mudras"
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 pt-6" 
                style={{ color: textColor }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Benefits of Mudras for {needName}
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                {finalBenefits.map((b, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-start gap-2.5"
                    custom={i}
                    variants={benefitVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.03,
                      x: 3,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <CheckIcon textColor={textColor} />
                    <div className="flex flex-col gap-0.5">
                      {b.title && <span className="text-xs sm:text-sm font-semibold" style={{ color: dark ? "#ffffff" : "#111827" }}>{b.title}</span>}
                      <span className="text-[11px] sm:text-xs md:text-[12px] lg:text-sm leading-snug" style={{ color: dark ? "#b8b4b4" : "#4b5563" }}>
                        {b.description}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.article>
      </motion.div>
    </motion.div>
  );
}