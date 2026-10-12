"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

export default function GyanMudraCard({ mudra }) {
  const { dark } = useTheme();
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1337";

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "-50px"
  });

  const headingText = mudra?.name ? `What is ${mudra.name}?` : "What is Gyan Mudra?";
  const descriptionText = mudra?.web?.IntroCardWeb?.Description || mudra?.description || "Gyan Mudra, also known as Chin Mudra, is one of the most popular and powerful mudras in yoga and meditation practices. It is believed to stimulate the root of knowledge within and connect individual consciousness to universal consciousness.";

  const introImageUrl = mudra?.web?.IntroCardWeb?.IntrocardImage?.url
    ? `${IMAGE_BASE_URL}${mudra.web.IntroCardWeb.IntrocardImage.url}`
    : null;

  // Word-by-word animation for the description
  const descWords = descriptionText.split(" ");
  const wordVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.015 + 0.4,
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <motion.section
      ref={sectionRef}
      className="w-full py-8 sm:py-10 px-6 sm:px-10 lg:px-16 flex justify-center"
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-7xl rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6"
        style={{
          backgroundColor: dark ? "#2e1065" : "#EDE9FE",
        }}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{
          boxShadow: dark
            ? "0 8px 30px rgba(0,0,0,0.35)"
            : "0 8px 30px rgba(0,0,0,0.08)",
          transition: { duration: 0.3 },
        }}
      >
        {/* Icon Circle with Image */}
        <motion.div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shrink-0 shadow-2xs overflow-hidden"
          style={{
            backgroundColor: dark ? "#1f2937" : "#ffffff",
          }}
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1, rotate: 0 }
              : { opacity: 0, scale: 0.5, rotate: -15 }
          }
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.2 },
          }}
        >
          {introImageUrl ? (
            <img
              src={introImageUrl}
              alt={headingText}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Image
              src={IMAGES.KayaMudras}
              alt="Lotus decorative icon"
              width={24}
              height={24}
              className="w-9 h-9 object-contain opacity-75"
              style={{
                filter: dark ? "brightness(0) invert(1)" : "brightness(0)",
              }}
              priority={false}
            />
          )}
        </motion.div>

        {/* Content */}
        <div className="flex-1 text-center sm:text-left">
          <motion.h3
            className="font-bold text-xl sm:text-2xl mb-2"
            style={{ color: dark ? "#f3f4f6" : "#111827" }}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {headingText}
          </motion.h3>

          <p
            className="text-sm sm:text-base leading-relaxed"
            style={{ color: dark ? "#d1d5db" : "#4b5563" }}
          >
            {descWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ display: "inline-block", marginRight: "0.28em" }}
              >
                {word}
              </motion.span>
            ))}
          </p>
        </div>

      </motion.div>
    </motion.section>
  );
}