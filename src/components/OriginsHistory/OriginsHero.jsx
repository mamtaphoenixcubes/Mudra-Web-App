"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { heroImage, maxW, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import SiteContainer from "../../common/SiteContainer";
import Section from "../../common/Section";
import SectionHeader from "../../common/SectionHeader";

export default function YogaNidraHero() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "-50px",
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <Section>
      <SiteContainer>
        <motion.section
          ref={sectionRef}
          // ✅ single-line className
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 sm:gap-8 md:gap-8 lg:gap-12 w-full"
          style={{ backgroundColor: "transparent" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* LEFT CONTENT */}
          <motion.div
            // ✅ single-line className
            className="flex flex-col w-full min-w-0 md:pr-2 lg:pr-4"
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className={`${spacing.contentColumn} w-full min-w-0`}>
              <SectionHeader
                title="Rooted in Ancient Wisdom. Alive in Every Gesture."
                align="left"
                sx={{
                  mb: { xs: 2, md: 3 },
                  "& h2": {
                    color: textColor,
                    fontSize: {
                      xs: "28px",
                      sm: "32px",
                      md: "38px",
                      lg: "44px",
                      xl: "50px",
                    },
                    lineHeight: 1.15,
                  },
                }}
              />

              {/* Underline accent */}
              <motion.div
                className="w-8 sm:w-10 lg:w-14 h-[2px] sm:h-[3px] mb-2 sm:mb-4"
                style={{ backgroundColor: textColor }}
                initial={{ width: 0 }}
                animate={isInView ? { width: "3.5rem" } : { width: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />

              {/* Description */}
              <motion.p
                className={`${typography.heroBody} ${maxW.heroMbBody} w-full`}
                style={{ color: dark ? "#ffffff" : "#0F0F0F" }}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: 0.2 }}
              >
                Mudras have been part of spiritual, healing and transformative
                practices for thousands of years. Their journey spans cultures,
                philosophies and traditions—evolving yet timeless.
              </motion.p>

              {/* Info Card */}
              <motion.div
                // ✅ single-line className
                className={`rounded-lg sm:rounded-xl ${spacing.buttonGroupMt} px-3 py-3 sm:px-4 sm:py-3 lg:px-5 lg:py-4 flex flex-row items-center gap-2 sm:gap-3 lg:gap-4 w-full ${maxW.yogaNidraCardW}`}
                style={{ backgroundColor: dark ? "#374151" : `${textColor}10` }}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
                >
                  <Image
                    src={IMAGES.Energy}
                    alt="Yoga Nidra icon"
                    width={48}
                    height={48}
                    className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 object-contain opacity-70"
                    style={{ filter: dark ? "brightness(0.8) invert(1)" : "none" }}
                  />
                </motion.div>

                <div className="flex flex-col min-w-0 gap-0 sm:gap-0.5">
                  <p className={typography.yogaNidraCard} style={{ color: dark ? "#ffffff" : "#0F0F0F" }}>
                    From ancient caves to modern classrooms,
                  </p>
                  <p className={typography.yogaNidraCard} style={{ color: dark ? "#ffffff" : "#0F0F0F" }}>
                    mudras continue to guide us inward
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT HERO IMAGE */}
          <motion.div
            // ✅ single-line className
            className={`${heroImage.wrapper} ${spacing.heroRightColW} w-full min-w-0 mt-0 md:mt-0 flex justify-center items-center`}
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              className="w-full flex justify-center"
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
              <Image
                src={IMAGES.hero}
                alt="Mudra Hand"
                priority
                width={800}
                height={800}
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 700px"
                className={`${heroImage.width} h-auto object-contain max-w-full`}
              />
            </motion.div>
          </motion.div>
        </motion.section>
      </SiteContainer>
    </Section>
  );
}