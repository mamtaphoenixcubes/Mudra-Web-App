"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { card, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import SiteContainer from "../../common/SiteContainer";

const benefits = [
  {
    title: "Radical Authenticity:",
    description:
      "No fluff. No superficial trends. We trace every protocol back to its pristine roots-from the Sankhya philosophy of the Vedas to the meditative lineages of Buddhism and Jin Shin Jyutsu.",
    bg: "bg-[#C8E8F5]",
    image: IMAGES.Energy,
    href: "/diet",
    action: "View Diet Tips",
  },
  {
    title: "Therapeutic Precision:",
    description:
      "We translate esoteric wisdom into biological facts. We teach you exactly how a hand gesture alters your elemental balance and how psychic sleep deactivates your fight-or-flight response.",
    bg: "bg-[#F8D4DC]",
    image: IMAGES.Target,
    href: "/nature",
    action: "Connect with Nature",
  },
  {
    title: "Accessible Mastery:",
    description:
      "True spiritual technology shouldn't require a mountain retreat. Our platform is designed to seamlessly integrate into the life of the modern, high-performing individual. True stillness belongs in the boardroom as much as the ashram.",
    bg: "bg-[#D4F5D4]",
    image: IMAGES.ReduceStress,
    href: "/immunity",
    action: "Learn More",
  },
];

function Card({ item, dark, textColor, index }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
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
      className="h-full"
      whileHover={{
        y: -6,
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        transition: { duration: 0.2 },
      }}
    >
      <Link href={item.href} className="block h-full">
        <div
          className={`
            ${item.bg} ${card.radius} ${card.hover}
            ${spacing.cardPadding}
            flex flex-col items-center text-center
            w-full h-full
            group
          `}
        >
          <motion.div
            className={`
              rounded-full flex items-center justify-center shrink-0
              ${card.benefitsIconBox} ${spacing.benefitsIconBoxMb}
            `}
            style={{
              backgroundColor: "#ffffff",
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

          <p
            className={`${typography.benefitsCardBody} mb-2`}
            style={{ color: dark ? "#000000" : "#4b5563" }}
          >
            {item.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function OurCorePillars() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05,
    margin: "-50px",
  });

  const isOdd = benefits.length % 2 !== 0;

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

  const headingText = "Our Core Pillars";
  const headingChars = headingText.split("");

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

  return (
    <motion.section
      ref={sectionRef}
      className="w-full flex justify-center"
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <SiteContainer>
        {/* Heading */}
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

        {/* Divider */}
        <motion.div
          className={typography.howToPractice.dividerWrapper}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.span
            className={typography.whySubscribe.dividerLine}
            style={{ backgroundColor: dark ? "#f5f5f5" : "#e5e7eb" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          <motion.div className={typography.howToPractice.lotusDivider}>
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
            style={{ backgroundColor: dark ? "#ffffff" : "#e5e7eb" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
        </motion.div>

        {/* Grid — items-stretch (default) + h-full chain → all cards match the tallest */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 items-stretch"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((item, i) => {
            const isLast = i === benefits.length - 1;
            const shouldCenter = isOdd && isLast;

            return (
              <div
                key={i}
                className={`
                  w-full h-full
                  ${shouldCenter ? "col-span-2 sm:col-span-1" : ""}
                  ${shouldCenter ? "max-w-[calc(50%-0.5rem)] sm:max-w-full" : ""}
                  ${shouldCenter ? "justify-self-center" : ""}
                `}
              >
                <Card
                  item={item}
                  dark={dark}
                  textColor={textColor}
                  index={i}
                />
              </div>
            );
          })}

          {benefits.length === 3 && (
            <>
              <div className="hidden lg:block" aria-hidden="true" />
              <div className="hidden lg:block" aria-hidden="true" />
            </>
          )}
        </motion.div>
      </SiteContainer>
    </motion.section>
  );
}