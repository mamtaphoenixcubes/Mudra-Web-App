"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import Section from "../../common/Section";
import SiteContainer from "../../common/SiteContainer";
import Container from "../../common/Container";

const staticBenefits = [
  {
    title: "Improves Concentration",
    description: "Enhances focus and improves memory.",
    bg: "bg-[#FEF9C3]",
    image: IMAGES.Mind,
    isRemote: false,
  },
  {
    title: "Calms the Mind",
    description: "Reduces stress, anxiety, and mental chaos.",
    bg: "bg-[#F3E8FF]",
    image: IMAGES.ManaMudras,
    isRemote: false,
  },
  {
    title: "Enhances Learning",
    description: "Supports better understanding and retention.",
    bg: "bg-[#BFDDF2]",
    image: IMAGES.HolisticWellbeing,
    isRemote: false,
  },
  {
    title: "Promotes Inner Peace",
    description: "Brings a sense of calm, balance, and harmony.",
    bg: "bg-[#FCE7F3]",
    image: IMAGES.KayaMudras,
    isRemote: false,
  },
  {
    title: "Boosts Energy",
    description: "Balances the flow of energy in the body.",
    bg: "bg-[#DCFCE7]",
    image: IMAGES.focus,
    isRemote: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function BenefitCard({ item, index, isInView }) {
  const isHex = item.bg?.startsWith("#");

  return (
    <motion.div
      className={`
        ${isHex ? "" : item.bg}
        flex h-full min-h-[220px] w-full min-w-0
        flex-col items-center rounded-2xl p-6 text-center shadow-2xs
      `}
      style={{
        backgroundColor: isHex ? item.bg : undefined,
      }}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        y: -6,
        boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
        transition: { duration: 0.25 },
      }}
    >
      <motion.div
        className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-2xs"
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.2 },
        }}
      >
        {item.isRemote ? (
          <img
            src={item.image}
            alt={item.title || "Benefit icon"}
            className="h-7 w-7 object-contain"
          />
        ) : (
          <Image
            src={item.image}
            alt={item.title || "Benefit icon"}
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
        )}
      </motion.div>

      <h3 className="mb-1.5 text-base font-bold text-gray-900 sm:text-lg">
        {item.title}
      </h3>

      <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
        {item.description}
      </p>
    </motion.div>
  );
}

export default function Benefits({ mudra }) {
  const { dark } = useTheme();
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05,
    margin: "-50px",
  });

  const IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
    "http://192.168.1.14:1337";

  const apiBenefits =
    mudra?.web?.Benefits?.map((benefit, index) => ({
      title: benefit.Title,
      description: benefit.Description,
      bg:
        benefit.CardBg ||
        [
          "bg-[#FEF9C3]",
          "bg-[#F3E8FF]",
          "bg-[#BFDDF2]",
          "bg-[#FCE7F3]",
          "bg-[#DCFCE7]",
        ][index % 5],
      image: benefit.Icon?.url
        ? `${IMAGE_BASE_URL}${benefit.Icon.url}`
        : IMAGES.Mind,
      isRemote: !!benefit.Icon?.url,
    })) || [];

  const benefits =
    apiBenefits.length > 0 ? apiBenefits : staticBenefits;

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
          <motion.div
            ref={sectionRef}
            className={`w-full ${spacing.sectionPaddingX} py-8 md:py-10 lg:py-14`}
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
              className="mb-2 text-center text-3xl font-bold text-[#9A85FE] sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Benefits
            </motion.h2>

            {/* Lotus Icon Graphic Divider */}
            <motion.div
              className="mx-auto mb-10 flex max-w-xs items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <motion.div
                className="h-px flex-1"
                style={{
                  backgroundColor: dark ? "#374151" : "#e5e7eb",
                  originX: 1,
                }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />

              <motion.div
                className="flex h-6 w-6 items-center justify-center"
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
                  className="h-12 w-12 object-contain opacity-75"
                  style={{
                    filter: dark
                      ? "brightness(0) invert(1)"
                      : "brightness(0)",
                  }}
                  priority={false}
                />
              </motion.div>

              <motion.div
                className="h-px flex-1"
                style={{
                  backgroundColor: dark ? "#374151" : "#e5e7eb",
                  originX: 0,
                }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.div>

            {/* Responsive Benefits Grid */}
            <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-5">
              {benefits.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="h-full w-full min-w-0"
                >
                  <BenefitCard
                    item={item}
                    index={index}
                    isInView={isInView}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </SiteContainer>
    </Section>
  );
}
