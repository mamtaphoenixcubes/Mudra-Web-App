"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

import Container from "../../common/Container";
import Section from "../../common/Section";
import SiteContainer from "../../common/SiteContainer";

export default function HowToPractice({ mudra }) {
  const { dark } = useTheme();
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "-50px",
  });

  const IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
    "http://192.168.1.14:1337";

  const staticSteps = [
    {
      number: 1,
      bg: "bg-[#FEF9C3]",
      title: "Hand Position",
      desc: "Sit in a comfortable position with your spine straight. Rest your hands on your knees.",
    },
    {
      number: 2,
      bg: "bg-[#F3E8FF]",
      title: "Finger Placement",
      desc: "Touch the tip of your index finger with the tip of your thumb.",
    },
    {
      number: 4,
      bg: "bg-[#BFDDF2]",
      title: "Other Fingers",
      desc: "Keep the remaining three fingers extended but relaxed.",
    },
    {
      number: 5,
      bg: "bg-[#FCE7F3]",
      title: "Focus",
      desc: "Close your eyes, take deep breaths, and focus on your breath or a positive affirmation.",
    },
  ];

  const apiSteps =
    mudra?.web?.WebPracticeSteps?.PracticeSteps?.map(
      (step, index) => ({
        number: [1, 2, 4, 5][index] ?? index + 1,
        bg: [
          "bg-[#FEF9C3]",
          "bg-[#F3E8FF]",
          "bg-[#BFDDF2]",
          "bg-[#FCE7F3]",
        ][index % 4],
        title: step.nameOfTheSteps,
        desc: step.describeTheStep,
      })
    ) || [];

  const steps = apiSteps.length > 0 ? apiSteps : staticSteps;

  const practiceImageUrl =
    mudra?.web?.WebPracticeSteps?.StepImages?.[0]?.url
      ? `${IMAGE_BASE_URL}${mudra.web.WebPracticeSteps.StepImages[0].url}`
      : null;

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <Section
      className="w-full py-12 md:py-16 px-6 sm:px-10 lg:px-16"
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
          <motion.div
            ref={sectionRef}
            className="w-full"
            style={{
              width: "100%",
              maxWidth: "100%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Heading */}
            <motion.h2
              className="w-full text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[#9A85FE] mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              How to Practice
            </motion.h2>

            {/* Lotus Icon Graphic Divider */}
            <motion.div
              className="flex items-center justify-center gap-4 w-full max-w-xs mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <motion.div
                className="flex-1 h-[1px]"
                style={{
                  backgroundColor: dark ? "#374151" : "#0F0F0F99",
                  originX: 1,
                }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />

              <motion.div
                className="flex items-center justify-center shrink-0"
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Image
                  src={IMAGES.Energy}
                  alt="Lotus decorative icon"
                  width={24}
                  height={24}
                  className="w-9 h-9 object-contain opacity-75"
                  style={{
                    filter: dark
                      ? "brightness(0) invert(1)"
                      : "brightness(0)",
                  }}
                  priority={false}
                />
              </motion.div>

              <motion.div
                className="flex-1 h-[1px]"
                style={{
                  backgroundColor: dark ? "#374151" : "#0F0F0F99",
                  originX: 0,
                }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
              {/* Left: Steps List */}
              <div className="flex flex-col gap-6 min-w-0 w-full">
                {steps.map((step, i) => (
                  <motion.div
                    key={`${step.number}-${i}`}
                    className="flex items-start gap-4 w-full min-w-0"
                    custom={i}
                    variants={stepVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    whileHover={{
                      x: 5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {/* Step Circle Badge */}
                    <motion.div
                      className={`w-9 h-9 rounded-full ${step.bg} text-gray-900 font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {step.number}
                    </motion.div>

                    {/* Step Text */}
                    <div className="min-w-0 flex-1">
                      <h3
                        className="font-bold text-base sm:text-lg mb-0.5"
                        style={{
                          color: dark ? "#e5e7eb" : "#0F0F0F",
                        }}
                      >
                        {step.title}
                      </h3>

                      <p
                        className="text-xs sm:text-sm leading-relaxed"
                        style={{
                          color: dark ? "#9ca3af" : "#0F0F0F80",
                        }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right: Practice Photo */}
              <motion.div
                className="w-full min-w-0 flex justify-center md:justify-end"
                initial={{ opacity: 0, x: 40 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: 40 }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  className="w-full max-w-[540px] aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border relative"
                  style={{
                    width: "100%",
                    borderColor: dark ? "#374151" : "#f3f4f6",
                    backgroundColor: dark ? "#1f2937" : "#f9fafb",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: dark
                      ? "0 8px 30px rgba(0,0,0,0.3)"
                      : "0 8px 30px rgba(0,0,0,0.08)",
                    transition: { duration: 0.3 },
                  }}
                >
                  {practiceImageUrl ? (
                    <img
                      src={practiceImageUrl}
                      alt="Practicing Mudra"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={IMAGES.Practice}
                      alt="Practicing Gyan Mudra"
                      width={600}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </SiteContainer>
    </Section>
  );
}