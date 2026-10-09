"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "next/navigation";

// ── Feature list icons (Images) ───────────────────────────
const features = [
  {
    icon: IMAGES.MudraIcon,
    title: "100+ Mudras with complete details",
    desc: "Benefits, how to do, precautions.",
  },
  {
    icon: IMAGES.Body,
    title: "Personalized Recommendations",
    desc: "For your body, mind and lifestyle.",
  },
  {
    icon: IMAGES.BellIcon,
    title: "Practice Tools & Reminders",
    desc: "Track progress and stay consistent.",
  },
  {
    icon: IMAGES.LeafIcon,
    title: "Guided Sessions",
    desc: "Integrated with Yoga Nidra.",
  },
];

// ── Component ──────────────────────────────────────────────────
export default function FullPowerofMeditation() {
  const { dark, textColor } = useTheme();
  const router = useRouter();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px"
  });

  // Fade up variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  // Staggered feature item variants
  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Character animation for heading
  const charVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headingText = "Unlock the Full Power of Mudras";
  const headingChars = headingText.split("");

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
      <div className={spacing.container}>

        <motion.div 
          className={`bg-[#FFE4EC] ${spacing.fullpower}`}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{
            boxShadow: dark 
              ? "0 8px 30px rgba(0,0,0,0.3)"
              : "0 8px 30px rgba(0,0,0,0.08)",
            transition: { duration: 0.3 }
          }}
        >
          {/* ── Col 1: Image ── */}
          <motion.div 
            className="w-full md:w-[22%] lg:w-[20%] xl:w-[18%] aspect-[4/3] md:aspect-auto rounded-xl overflow-hidden shrink-0 self-stretch" 
            style={{
              backgroundColor: dark ? "#374151" : "#e5e7eb",
            }}
            variants={slideInLeft}
          >
            <motion.div
              className="w-full h-full"
              whileHover={{
                scale: 1.08,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
            >
              {IMAGES.Honorenergy ? (
                <Image
                  src={IMAGES.Honorenergy}
                  alt="Mudra practice at sunset"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-200 to-pink-200" />
              )}
            </motion.div>
          </motion.div>

          {/* ── Col 2: Text + buttons ── */}
          <motion.div 
            className="flex flex-col justify-center flex-1 md:max-w-[38%] lg:max-w-[36%]"
            variants={slideInRight}
          >
            {/* Heading - Character by character */}
            <motion.h2 
              className={`font-bold leading-tight mb-2 ${typography.textfull} md:mb-3`} 
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

            <motion.p 
              className="text-[11px] sm:text-xs md:text-sm lg:text-[15px] leading-relaxed mb-4 md:mb-5 lg:mb-6" 
              style={{ color: dark ? "#000000" : "#4b5563" }}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Get detailed benefits, step-by-step guidance, personalized recommendations and practice reminders.
            </motion.p>

            {/* Buttons */}
            <div className="flex flex-row items-center gap-2 sm:gap-3 flex-wrap">
              <motion.button 
                className={`
                  ${typography.btnText}
                  ${spacing.btnPaddingX}
                  ${spacing.btnHeight}
                  rounded-lg 
                  transition-colors 
                  cursor-pointer 
                  whitespace-nowrap 
                  shadow-[7.19px_8.13px_2.65px_0px_rgba(0,0,0,0.06)]
                `} 
                style={{
                  backgroundColor: textColor,
                  color: "#ffffff",
                }}
                whileHover={{
                  scale: 1.05,
                  opacity: 0.85,
                  boxShadow: `0 8px 30px ${textColor}40`,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/AppDownload")}
              >
                Explore the Mudras App
              </motion.button>
              
              <motion.button 
                className={`
                  bg-white text-gray-900 
                  ${typography.btnText}
                  ${spacing.btnPaddingX}
                  ${spacing.btnHeight}
                  rounded-lg 
                  border border-gray-200 
                  hover:bg-gray-50 
                  transition-colors 
                  cursor-pointer 
                  whitespace-nowrap 
                  shadow-[7.19px_8.13px_2.65px_0px_rgba(0,0,0,0.06)]
                `}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* ── Vertical divider (md+) ── */}
          <motion.div 
            className="hidden md:flex items-stretch"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-px self-stretch" style={{
              backgroundColor: dark ? "#374151" : "#f9c8d8",
            }} />
          </motion.div>

          {/* ── Horizontal divider (mobile) ── */}
          <motion.div 
            className="md:hidden h-px w-full" 
            style={{
              backgroundColor: dark ? "#374151" : "#f9c8d8",
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />

          {/* ── Col 3: Feature list ── */}
          <div className="flex flex-col justify-center gap-3 md:gap-3.5 lg:gap-4 md:flex-1 md:pl-2 lg:pl-3">
            {features.map((f, i) => (
              <motion.div 
                key={i} 
                className="flex items-start gap-2.5 md:gap-3"
                custom={i}
                variants={featureVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{
                  x: 5,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Icon circle */}
                <motion.div 
                  className="w-8 h-8 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center shrink-0 overflow-hidden" 
                  style={{
                    backgroundColor: dark ? "#ffffff" : "rgba(255,255,255,0.7)",
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  {f.icon ? (
                    <Image
                      src={f.icon}
                      alt={f.title}
                      width={32}
                      height={32}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <span className="w-4 h-4 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5" style={{ color: dark ? "#6b7280" : "#374151" }} />
                  )}
                </motion.div>
                {/* Text */}
                <div>
                  <motion.p 
                    className="text-[11px] sm:text-xs md:text-[11px] lg:text-xs xl:text-sm font-semibold leading-tight" 
                    style={{ color: textColor }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {f.title}
                  </motion.p>
                  <p className="text-[10px] sm:text-[10px] md:text-[10px] lg:text-[11px] leading-snug mt-0.5" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </motion.section>
  );
}