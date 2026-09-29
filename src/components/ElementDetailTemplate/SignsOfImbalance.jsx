"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spacing, typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const defaultExcess = {
  icon: IMAGES.LeafOutline,
  title: "Excess Earth",
  points: [
    "Lethargy and sluggishness",
    "Over-attachment to material things",
    "Weight gain or feeling heavy",
    "Stubbornness and resistance to change",
  ],
};

const defaultDeficient = {
  icon: IMAGES.DeficientEarth,
  title: "Deficient Earth",
  points: [
    "Feeling ungrounded or insecure",
    "Lack of focus and direction",
    "Physical weakness or fatigue",
    "Anxiety and instability",
  ],
};

function LotusDivider({ dark }) {
  return (
    <motion.div 
      className="flex items-center justify-center gap-4 mb-12"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.span 
        className="h-px w-20 sm:w-32 md:w-40" 
        style={{ backgroundColor: dark ? "#ffffff" : "#d1d5db" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />
      <motion.div>
        {IMAGES.HolisticWellbeing ? (
          <Image
            src={IMAGES.HolisticWellbeing}
            alt="Lotus divider"
            width={40}
            height={40}
            className="object-contain shrink-0"
            style={{
              filter: dark ? "brightness(0.8) invert(1)" : "none",
            }}
          />
        ) : (
          <div className="w-5 h-5 shrink-0" />
        )}
      </motion.div>
      <motion.span 
        className="h-px w-20 sm:w-32 md:w-40" 
        style={{ backgroundColor: dark ? "#f7f7f7" : "#d1d5db" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />
    </motion.div>
  );
}

function IconCircle({ src, alt, dark }) {
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div 
      className="rounded-full w-16 h-16 flex items-center justify-center shrink-0 shadow-sm" 
      style={{
        backgroundColor: dark ? "#fcfcfc" : "#ffffff",
      }}
      variants={iconVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        scale: 1.1,
        rotate: 5,
        transition: { duration: 0.2 }
      }}
    >
      {src ? (
        <Image src={src} alt={alt} width={28} height={28} className="object-contain" />
      ) : (
        <div className="w-7 h-7 rounded-full" style={{ backgroundColor: dark ? "#4b5563" : "#e5e7eb" }} />
      )}
    </motion.div>
  );
}

function ImbalanceColumn({ icon, title, points, dark, textColor, side }) {
  // Character animation for title
  const charVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.04 + 0.2,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Staggered point variants
  const pointVariants = {
    hidden: { opacity: 0, x: side === "left" ? -10 : 10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08 + 0.3,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  // Column slide variants
  const columnVariants = {
    hidden: { opacity: 0, x: side === "left" ? -30 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1,
      },
    },
  };

  const titleChars = title.split("");

  return (
    <motion.div 
      className="flex items-start gap-5"
      variants={columnVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <IconCircle src={icon} alt={title} dark={dark} />
      <div>
        <motion.h3 
          className="text-sm md:text-xs lg:text-base font-semibold mb-2" 
          style={{ color: textColor }}
        >
          {titleChars.map((char, i) => (
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
        </motion.h3>
        <ul className="flex flex-col gap-1.5">
          {points.map((point, i) => (
            <motion.li
              key={i}
              className="text-xs md:text-[10px] lg:text-sm flex items-start gap-2"
              style={{ color: dark ? "#f2f4f7" : "#4b5563" }}
              custom={i}
              variants={pointVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                x: 3,
                transition: { duration: 0.2 }
              }}
            >
              <motion.span 
                className="mt-0.5" 
                style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                whileHover={{
                  scale: 1.5,
                  transition: { duration: 0.2 }
                }}
              >
                •
              </motion.span>
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function SignsOfImbalance({
  heading = "Signs of Imbalance",
  excess = null,
  deficient = null,
  cardBackground = null,
}) {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.05,
    margin: "-50px"
  });

  const finalExcess = excess
    ? {
        title: excess.Title || excess.title || "Excess Element",
        points: excess.points || [],
        icon: excess.Icon?.url ? (excess.Icon.url.startsWith("http") ? excess.Icon.url : `http://192.168.1.14:1337${excess.Icon.url}`) : IMAGES.LeafOutline
      }
    : defaultExcess;

  const finalDeficient = deficient
    ? {
        title: deficient.Title || deficient.title || "Deficient Element",
        points: deficient.points || [],
        icon: deficient.Icon?.url ? (deficient.Icon.url.startsWith("http") ? deficient.Icon.url : `http://192.168.1.14:1337${deficient.Icon.url}`) : IMAGES.DeficientEarth
      }
    : defaultDeficient;

  // Character animation for heading
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

  const headingText = heading;
  const headingChars = headingText.split("");

  const finalBgColor = cardBackground || (dark ? "#374151" : "#FFF5E6");
  const isHexBg = finalBgColor.startsWith("#");

  return (
    <motion.section 
      ref={sectionRef}
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={spacing.container}>
        
        {/* Heading - Character by character */}
        <motion.h2 
          className={`${typography.heroHeading} text-center mb-3`} 
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

        <LotusDivider dark={dark} />

        {/* Card */}
        <motion.div 
          className={`rounded-3xl p-8 md:p-10 ${isHexBg ? "" : finalBgColor}`} 
          style={{
            backgroundColor: isHexBg ? finalBgColor : undefined,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{
            boxShadow: dark 
              ? "0 8px 30px rgba(0,0,0,0.3)"
              : "0 8px 30px rgba(0,0,0,0.06)",
            transition: { duration: 0.3 }
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0">
            <motion.div 
              className="md:pr-10 md:border-r" 
              style={{
                borderColor: dark ? "#fafafa" : "#E8D5C4",
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ImbalanceColumn {...finalExcess} dark={dark} textColor={textColor} side="left" />
            </motion.div>
            <motion.div 
              className="md:pl-10"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ImbalanceColumn {...finalDeficient} dark={dark} textColor={textColor} side="right" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}