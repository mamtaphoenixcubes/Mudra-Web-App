"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import Section from "../../common/Section";
import SiteContainer from "../../common/SiteContainer";
import SectionHeader from "../../common/SectionHeader";

export default function WorksHero() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
  });

  return (
    <Section
      ref={sectionRef}
      className="works-hero"
      sx={{
        backgroundColor: dark ? "#111827" : "#FFFFFF",
        pt: { xs: "48px", md: "64px", lg: "80px" },
        pb: { xs: "48px", md: "64px", lg: "80px" },
      }}
    >
      <SiteContainer
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          alignItems: "center",
          columnGap: { xs: 4, md: 6, lg: 8 },
          rowGap: { xs: 5, md: 4 },
          py: 0, // Section handles vertical padding
        }}
      >
        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            minHeight: 444,
          }}
        >
          {/* Main Title */}
          <SectionHeader
            title="What Are Mudras?"
            align="left"
            sx={{
              mb: { xs: 2, md: 2.5 },
              width: "100%",
              "& h2": {
                fontFamily:
                  '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
                fontWeight: 500,
                fontSize: {
                  xs: "20px",
                  sm: "48px",
                  lg: "64px",
                },
                lineHeight: "120%",
                letterSpacing: "normal",
                color: textColor,
              },
            }}
          />

          {/* Subtitle */}
          <p className="text-[10px] sm:text-base lg:text-lg text-gray-900 font-semibold mb-6 max-w-md leading-relaxed">
            Mudras are sacred gestures, postures and locks that channel
            the body&apos;s energy to bring harmony to body, mind and spirit.
          </p>

          {/* Quote Card */}
          <div className="bg-[#EDE9FE] border-l-4 border-[#9A85FE] rounded-r-xl p-4 sm:p-5 max-w-md text-gray-800 font-medium text-[5px] sm:text-sm leading-relaxed shadow-xs">
            <p className="italic text-gray-700 mb-1">
              &quot;A mudra may be small in form, but its impact is vast.
            </p>

            <p className="italic text-gray-700">
              It is the language of energy. It transforms within.&quot;
            </p>
          </div>
        </motion.div>

        {/* RIGHT COLUMN — LOTUS ILLUSTRATION */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div className="relative w-full max-w-[440px] lg:max-w-[800px]">
              <Image
                src={IMAGES.hero}
                alt="Mudra Lotus Hand"
                width={800}
                height={800}
                priority
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 800px"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      </SiteContainer>
    </Section>
  );
}