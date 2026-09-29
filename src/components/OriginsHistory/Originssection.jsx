"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { maxW, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

// ── Data ──────────────────────────────────────────────────────
const timelineItems = [
  {
    id: 1,
    title: "Buddhist Mudras",
    period: "~5th century BCE onwards",
    body: "Mudras were an integral part of Buddhist teachings representing states of mind, blessings and spiritual insights.",
    bullets: [
      "The Buddha's hand gestures conveyed teachings without words.",
      "Common mudras Abhaya (protection), Dhyana (meditation), Bhumisparsha (witnessing).",
      "Seen in stupas, monasteries and sculptures.",
    ],
    image: IMAGES.BuddhistMudras,
    bgColor: "bg-[#F5F3FF]",
  },
  {
    id: 2,
    title: "Gandhara References",
    period: "~1st century BCE–5th century CE",
    body: "Mudras are beautifully depicted in Gandhara art, showing the cultural exchange and spiritual depth of the time.",
    bullets: [
      "Greco-Buddhist sculptures show detailed mudra depictions.",
      "Reflects the universal language of gesture.",
      "A bridge between East and West.",
    ],
    image: IMAGES.GandharaReferences,
    bgColor: "bg-[#F5F3FF]",
  },
  {
    id: 3,
    title: "Hatha Yoga Tradition",
    period: "~9th –15th century",
    body: "Mudras became an essential part of Hatha Yoga texts and practices to awaken energy and support sadhana.",
    bullets: [
      "Described in texts like Hatha Yoga Pradipika, Gheranda Samhita.",
      "Used to balance prana, awaken chakras and stabilize the mind.",
      "Integrated with asana, pranayama and bandha.",
    ],
    image: IMAGES.HathaYoga,
    bgColor: "bg-[#F5F3FF]",
  },
  {
    id: 4,
    title: "Satyananda & Bihar School",
    period: "20th Century",
    body: "Swami Satyananda Saraswati revived and systematised the ancient wisdom of mudras, making them accessible to modern seekers.",
    bullets: [
      "Codified mudras for healing transformation and self-mastery.",
      "Taught globally through Bihar School of Yoga.",
      "Emphasis on holistic well-being.",
    ],
    image: IMAGES.Satyananda,
    bgColor: "bg-[#F5F3FF]",
  },
  {
    id: 5,
    title: "Tantra & Nyasa",
    period: "Ancient Tantric Roots",
    body: "In Tantra, mudras and nyasa (sacred touch) are used to invoke divine energy, purify the body and awaken higher consciousness.",
    bullets: [
      "Nyasa: Placing awareness in different body parts with mantras.",
      "Mudras seal energy and connect microcosm with the macrocosm.",
      "Powerful tools in rituals and meditation.",
    ],
    image: IMAGES.TantraNyasa,
    bgColor: "bg-[#F5F3FF]",
  },
];

// ── Sub-components ────────────────────────────────────────────

/** Numbered circle — sits on top of the continuous spine line */
function StepNumber({ n, textColor }) {
  return (
    <motion.div 
      className="flex items-center justify-center"
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        delay: n * 0.1 
      }}
    >
      <div className="flex items-center justify-center shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 rounded-full border text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-medium bg-white relative z-10" style={{
        borderColor: textColor,
        color: textColor,
      }}>
        {n}
      </div>
    </motion.div>
  );
}

/** Left content: image + title + body */
function ItemLeft({ item, dark, textColor, index }) {
  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.6, 
        delay: index * 0.1 + 0.2,
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  return (
    <motion.div 
      className="flex flex-row items-start gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8"
      variants={fadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Image */}
      <motion.div 
        className="shrink-0 rounded-lg overflow-hidden w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] xl:w-[140px] xl:h-[140px] 2xl:w-[180px] 2xl:h-[180px]"
        whileHover={{
          scale: 1.05,
          rotate: -2,
          transition: { duration: 0.3 }
        }}
      >
        <Image
          src={item.image}
          alt={item.title}
          width={180}
          height={180}
          className="w-full h-full object-cover"
          style={{ width: 'auto', height: 'auto' }}
        />
      </motion.div>

      {/* Title + period + body */}
      <div className="flex flex-col gap-0.5 sm:gap-1">
        <h3 className="text-[13px] sm:text-[15px] md:text-[16px] lg:text-[19px] xl:text-[22px] 2xl:text-[28px] font-semibold leading-tight" style={{ color: textColor }}>
          {item.title}
        </h3>
        <p className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs xl:text-sm 2xl:text-base font-medium" style={{ color: dark ? "#cac7c7" : "#6b7280" }}>
          {item.period}
        </p>
        <p className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[18px] leading-relaxed mt-1" style={{ color: dark ? "#ffffff" : "#4b5563" }}>
          {item.body}
        </p>
      </div>
    </motion.div>
  );
}

/** Right bullets card */
function ItemRight({ item, dark, textColor, index }) {
  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.6, 
        delay: index * 0.1 + 0.3,
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  return (
    <motion.div 
      className="rounded-xl px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-4 lg:px-5 lg:py-4 xl:px-6 xl:py-5 2xl:px-8 2xl:py-7 flex flex-col gap-1.5 sm:gap-2 lg:gap-3 2xl:gap-4 h-full" 
      style={{
        backgroundColor: dark ? "#374151" : "#F5F3FF",
      }}
      variants={fadeInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 8px 30px ${textColor}20`,
        transition: { duration: 0.3 }
      }}
    >
      {item.bullets.map((b, i) => (
        <motion.div 
          key={i} 
          className="flex items-start gap-2 lg:gap-3"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.4, 
            delay: i * 0.05 + index * 0.1 + 0.4,
            ease: "easeOut"
          }}
        >
          <span className="mt-[3px] shrink-0 rounded-full w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] md:w-[6px] md:h-[6px] lg:w-[7px] lg:h-[7px] xl:w-[8px] xl:h-[8px] 2xl:w-[10px] 2xl:h-[10px]" style={{
            backgroundColor: textColor,
          }} />
          <span className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[18px] leading-snug" style={{ color: dark ? "#e5e7eb" : "#374151" }}>
            {b}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────

export default function OriginsSection() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px"
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

  // Spine line animation
  const spineVariants = {
    hidden: { scaleY: 0 },
    visible: { 
      scaleY: 1,
      transition: { 
        duration: 0.8, 
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className={`${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ── Section header ── */}
      <motion.div 
        className="flex flex-col items-center text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14 2xl:mb-16"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <p className={`${typography.sectionLabel} tracking-widest uppercase mb-2`} style={{ color: dark ? "#ffffff" : "#080808" }}>
          A Journey Through Time
        </p>

        <motion.h2 
          className="text-[22px] sm:text-[28px] md:text-[32px] lg:text-[42px] xl:text-[52px] 2xl:text-[64px] font-semibold leading-tight mb-2 sm:mb-3" 
          style={{ color: textColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Origins &amp; Evolution of Mudras
        </motion.h2>

        <motion.p 
          className={`text-[10px] sm:text-[13px] md:text-[15px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] font-medium ${spacing.PhilosophyBodyMb}`} 
          style={{ color: dark ? "#ffffff" : "#4b5563" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          A rich legacy woven through spirituality, art, yoga and healing traditions.
        </motion.p>
      </motion.div>

      {/* ── Timeline — desktop/tablet ── */}
      <div className={`hidden sm:block ${maxW.sectionBody}`}>
        <div className="relative">
          {/* Continuous spine line */}
          <motion.div 
            className="absolute top-3.5 bottom-3.5 left-[14px] sm:left-[15px] md:left-[17px] lg:left-[19px] xl:left-[23px] 2xl:left-[27px] w-px z-0 origin-top" 
            style={{
              backgroundColor: dark ? "#ffffff" : "#9ca3af",
            }}
            variants={spineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />

          {timelineItems.map((item, idx) => {
            const isLast = idx === timelineItems.length - 1;
            return (
              <div
                key={item.id}
                className="grid grid-cols-[28px_1fr_1fr] sm:grid-cols-[32px_1fr_1fr] md:grid-cols-[36px_1fr_1fr] lg:grid-cols-[40px_1fr_1fr] xl:grid-cols-[48px_1fr_1fr] 2xl:grid-cols-[56px_1fr_1fr] gap-x-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-6 xl:gap-x-8 2xl:gap-x-10"
              >
                <div className="flex flex-col items-center pt-1">
                  <StepNumber n={item.id} textColor={textColor} />
                </div>

                <div className={`pb-6 sm:pb-8 md:pb-10 lg:pb-12 xl:pb-14 2xl:pb-16 ${!isLast ? "border-b" : ""}`} style={{
                  borderColor: dark ? "#374151" : "#f3f4f6",
                }}>
                  <ItemLeft item={item} dark={dark} textColor={textColor} index={idx} />
                </div>

                <div className={`pb-6 sm:pb-8 md:pb-10 lg:pb-12 xl:pb-14 2xl:pb-16 ${!isLast ? "border-b" : ""}`} style={{
                  borderColor: dark ? "#374151" : "#f3f4f6",
                }}>
                  <ItemRight item={item} dark={dark} textColor={textColor} index={idx} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile timeline ── */}
      <motion.div 
        className="sm:hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative">
          <motion.div 
            className="absolute top-3 bottom-3 left-[11px] w-px z-0 origin-top" 
            style={{
              backgroundColor: dark ? "#374151" : "#d1d5db",
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <div className="flex flex-col gap-0">
            {timelineItems.map((item, idx) => {
              const isLast = idx === timelineItems.length - 1;
              return (
                <motion.div 
                  key={item.id} 
                  className="flex flex-row gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                >
                  <div className="flex flex-col items-center pt-0.5 shrink-0">
                    <motion.div 
                      className="flex items-center justify-center w-6 h-6 rounded-full border text-[9px] font-medium bg-white relative z-10" 
                      style={{
                        borderColor: textColor,
                        color: textColor,
                      }}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 15,
                        delay: idx * 0.1 + 0.4 
                      }}
                    >
                      {item.id}
                    </motion.div>
                  </div>

                  <div className={`flex-1 pb-6 ${!isLast ? "border-b" : ""}`} style={{
                    borderColor: dark ? "#374151" : "#f3f4f6",
                  }}>
                    <motion.div 
                      className="flex items-start gap-2 mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 + 0.4 }}
                    >
                      <motion.div 
                        className="shrink-0 w-[60px] h-[60px] rounded-md overflow-hidden" 
                        style={{
                          backgroundColor: dark ? "#374151" : "#f3f4f6",
                        }}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={60}
                          height={60}
                          className="w-full h-full object-cover"
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </motion.div>
                      <div>
                        <p className="text-[12px] font-semibold leading-tight" style={{ color: textColor }}>
                          {item.title}
                        </p>
                        <p className="text-[9px] font-medium" style={{ color: dark ? "#6b7280" : "#6b7280" }}>{item.period}</p>
                        <p className="text-[9px] leading-relaxed mt-0.5" style={{ color: dark ? "#9ca3af" : "#4b5563" }}>
                          {item.body}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="rounded-lg px-3 py-2 flex flex-col gap-1.5" 
                      style={{
                        backgroundColor: dark ? "#374151" : "#F5F3FF",
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 + 0.5 }}
                    >
                      {item.bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="mt-[4px] shrink-0 w-[5px] h-[5px] rounded-full" style={{
                            backgroundColor: textColor,
                          }} />
                          <span className="text-[9px] leading-snug" style={{ color: dark ? "#ffffff" : "#374151" }}>{b}</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}