"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import Section from "../../common/Section";
import SiteContainer from "../../common/SiteContainer";
import Container from "../../common/Container";

export default function PracticeInfoGrid({ mudra }) {
  const { dark } = useTheme();
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "-50px",
  });

  const bestTime =
    mudra?.web?.AdviceAndMethod?.BestPracticeTime ||
    "Early morning (Brahma Muhurta) or during meditation sessions.";

  const precautions = mudra?.web?.AdviceAndMethod?.Precautions || [
    "Practice on an empty stomach.",
    "Keep your back straight while practicing.",
    "If you have any medical condition, consult your doctor.",
  ];

  const duration =
    mudra?.web?.AdviceAndMethod?.IdealDuration ||
    "15-30 minutes daily for best results.";

  const who =
    mudra?.web?.AdviceAndMethod?.WhoCanPractice ||
    "Anyone can practice Gyan Mudra. It is especially beneficial for students, professionals, and anyone seeking mental clarity.";

  const leftItems = [
    {
      icon: IMAGES.User,
      title: "Best Time to Practice",
      desc: bestTime,
    },
    {
      icon: IMAGES.ShieldTick,
      title: "Precautions",
      desc: precautions,
    },
  ];

  const rightItems = [
    {
      icon: IMAGES.HourGlass,
      title: "Ideal Duration",
      desc: duration,
    },
    {
      icon: IMAGES.ReduceStress,
      title: "Who Can Practice",
      desc: who,
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const renderInfoItem = (item, index, isPrecaution = false) => (
    <motion.div
      key={`${item.title}-${index}`}
      className="flex w-full min-w-0 items-start gap-4"
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        x: 5,
        transition: { duration: 0.2 },
      }}
    >
      <motion.div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-2xs"
        style={{
          backgroundColor: dark ? "#1f2937" : "#ffffff",
        }}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.2 },
        }}
      >
        <Image
          src={item.icon}
          alt={item.title}
          width={22}
          height={22}
          className="object-contain"
          style={{
            filter: dark ? "brightness(0) invert(1)" : "none",
          }}
        />
      </motion.div>

      <div className="min-w-0 flex-1">
        <h3
          className="mb-1 text-base font-bold sm:text-lg"
          style={{
            color: dark ? "#f3f4f6" : "#111827",
          }}
        >
          {item.title}
        </h3>

        {isPrecaution && Array.isArray(item.desc) ? (
          <ul
            className="list-disc space-y-1 pl-4 text-xs leading-relaxed sm:text-sm"
            style={{
              color: dark ? "#d1d5db" : "#4b5563",
            }}
          >
            {item.desc.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        ) : (
          <p
            className="break-words text-xs leading-relaxed sm:text-sm"
            style={{
              color: dark ? "#d1d5db" : "#4b5563",
            }}
          >
            {Array.isArray(item.desc)
              ? item.desc.join(" ")
              : item.desc}
          </p>
        )}
      </div>
    </motion.div>
  );

  return (
    <Section
      className="w-full"
      sx={{
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
    >
      <SiteContainer
        sx={{
          width: "100%",
          maxWidth: "1600px",
          mx: "auto",
          py: 0,
        }}
      >
        <Container
          className="w-full"
          sx={{
            width: "100%",
            maxWidth: "100%",
            mx: "auto",
            px: 0,
          }}
        >
          <div
            ref={sectionRef}
            className="w-full px-6 py-10 sm:px-10 sm:py-12 md:px-12 md:py-16 lg:px-16"
          >
            <motion.div
              className="relative mx-auto grid w-full grid-cols-1 gap-8 rounded-2xl p-6 sm:p-8 md:grid-cols-2 md:gap-12 lg:p-10"
              style={{
                width: "100%",
                maxWidth: "1600px",
                backgroundColor: dark ? "#2e1065" : "#EDE9FE",
              }}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 30, scale: 0.97 }
              }
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                boxShadow: dark
                  ? "0 8px 30px rgba(0,0,0,0.35)"
                  : "0 8px 30px rgba(0,0,0,0.08)",
                transition: { duration: 0.3 },
              }}
            >
              {/* Vertical Divider on Desktop */}
              <motion.div
                className="absolute bottom-8 left-1/2 top-8 hidden w-px -translate-x-1/2 md:block"
                style={{
                  backgroundColor: dark ? "#4c1d95" : "#e5e7eb",
                }}
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />

              {/* Left Column */}
              <div className="flex min-w-0 flex-col gap-8">
                {leftItems.map((item, index) =>
                  renderInfoItem(item, index, item.title === "Precautions")
                )}
              </div>

              {/* Right Column */}
              <div className="flex min-w-0 flex-col gap-8">
                {rightItems.map((item, index) =>
                  renderInfoItem(item, index + 2)
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </SiteContainer>
    </Section>
  );
}
