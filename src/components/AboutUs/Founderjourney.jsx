"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import SiteContainer from "../../common/SiteContainer";

/* ---------- animated text helpers ---------- */
function AnimatedHeading({
  text,
  isInView,
  charVariants,
  className,
  style,
  as: Tag = "h3",
}) {
  return (
    <Tag className={className} style={style}>
      {text.split("").map((char, i) => (
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
    </Tag>
  );
}

function AnimatedBody({ words, isInView, wordVariants, className, style }) {
  return (
    <p className={className} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

/* ---------- full-width divider (edge to edge) ---------- */
function Divider({ color }) {
  return (
    <motion.div
      className="w-full"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ transformOrigin: "left" }}
    >
      <hr className={`border-t w-full ${color}`} />
    </motion.div>
  );
}

export default function FounderJourney() {
  const { dark, textColor } = useTheme();

  const block1Ref = useRef(null);
  const block2Ref = useRef(null);
  const block3Ref = useRef(null);
  const block4Ref = useRef(null);

  const block1InView = useInView(block1Ref, { once: true, amount: 0.2 });
  const block2InView = useInView(block2Ref, { once: true, amount: 0.2 });
  const block3InView = useInView(block3Ref, { once: true, amount: 0.2 });
  const block4InView = useInView(block4Ref, { once: true, amount: 0.2 });

  /* ---------- animation variants ---------- */
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const charVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.03, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    }),
  };
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.02, duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    }),
  };
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
    },
  };

  /* ---------- text content ---------- */
  const block1 = {
    heading: "The Intersection of Two Worlds",
    bodies: [
      "Amitabha Bhatia's journey belongs to two distinct worlds: the high-velocity landscape of modern business and consultancy, and the timeless, disciplined realms of traditional wellness. Amitabha spent decades navigating the demands of corporate structures, strategic branding, and technological ecosystems.",
      "But while the world saw an analytical entrepreneur, Amitabha's internal compass was fixed on a deeper study of the mathematical, energetic, and philosophical foundations of ancient science.",
      "With years of immersive study in classical yoga philosophy, energetic anatomy, and traditional environmental principles, Amitabha recognized a critical flaw in the modern wellness industry: it was ignoring the subtle mechanics of human chemistry.",
    ],
  };
  const block2 = {
    heading: "The Catalyst: The Burnout of a Connected World",
    bodies: [
      "The inspiration for Yoga Mudra Nidra did not come from a place of quiet isolation; it came from observing the profound exhaustion of the modern professional.",
      "Amitabha watched as brilliant minds burned out, trapped in a state of perpetual physiological stress. They were trying to solve their exhaustion with high-intensity workouts or generic mindfulness apps that only scratched the surface.",
      "He realized the missing link: the ancient sages didn't rely on exhausting physical postures to alter their state of consciousness or heal their bodies. They used Mudras to close the body's circuit boards and Yoga Nidra to access the deep, restorative state of dreamless sleep while remaining fully aware. They were hacking their biology thousands of years before the word 'bio-hacking' existed.",
    ],
  };
  const block3 = {
    heading: "The Vision for Yoga Mudra Nidra",
    bodies: [
      "Amitabha created Yoga Mudra Nidra to serve as a bridge. He wanted to strip away the gatekeeping around these advanced practices and build a rigorous, uncompromised, and beautifully designed digital encyclopedia.",
      "By cataloging not just Vedic gestures but also parallel traditions like Buddhist mudras and the Japanese art of Jin Shin Jyutsu, Amitabha has built a global sanctuary for energetic healing.",
      "Under his vision, Yoga Mudra Nidra is more than an app or a website. It is a roadmap to help you reclaim your focus, master your internal elements, and experience the profound, life-altering power of conscious rest.",
    ],
  };
  const block4 = {
    heading: "Expanding the Horizon",
    bodies: [
      "Amitabha's work spans across holistic wellness, strategic consulting, and personal transformation systems.",
      "To explore the full ecosystem of his work, philosophies, and other professional ventures, visit",
    ],
  };

  /* ---------- shared styles ---------- */
  const bodyColor = { color: dark ? "#e5e7eb" : "#4b5563" };
  const headingColor = { color: textColor };
  const softPanelBg = dark ? "#374151" : "#f3f4f6";
  const dividerColor = dark ? "border-gray-700" : "border-gray-200";

  return (
    <motion.section
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ───────────────────────────── 01 ───────────────────────────── */}
      <motion.div
        ref={block1Ref}
        className={spacing.journeySection.blockWrapper}
        variants={fadeUp}
        initial="hidden"
        animate={block1InView ? "visible" : "hidden"}
      >
        <SiteContainer>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <motion.div
              className="flex-1 order-2 md:order-1"
              variants={slideInLeft}
              initial="hidden"
              animate={block1InView ? "visible" : "hidden"}
            >
              <div className={spacing.journeySection.badgeHeadingRow}>
                <div className={spacing.journeySection.badgeWrapper}>
                  <span className={typography.journeySection.badge} style={headingColor}>
                    01
                  </span>
                  <span
                    className={spacing.journeySection.badgeUnderline}
                    style={{ backgroundColor: textColor }}
                  />
                </div>
                <AnimatedHeading
                  as="h2"
                  text={block1.heading}
                  isInView={block1InView}
                  charVariants={charVariants}
                  className={typography.journeySection.heading}
                  style={headingColor}
                />
              </div>
              {block1.bodies.map((body, idx) => (
                <AnimatedBody
                  key={idx}
                  words={body.split(" ")}
                  isInView={block1InView}
                  wordVariants={wordVariants}
                  className={typography.journeySection.body}
                  style={bodyColor}
                />
              ))}
            </motion.div>

            <motion.div
              className="flex-1 order-1 md:order-2"
              variants={imageVariants}
              initial="hidden"
              animate={block1InView ? "visible" : "hidden"}
            >
              <div className={spacing.journeySection.imagePairWrapper}>
                {[
                  { src: IMAGES.ITlife, alt: "Looking out at the city skyline" },
                  { src: IMAGES.Peacefull, alt: "Looking out at the mountains" },
                ].map((img, i) => (
                  <motion.div
                    key={i}
                    className={spacing.journeySection.imagePairItemWrapper}
                    style={{ backgroundColor: softPanelBg }}
                    whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={300}
                      height={400}
                      className={spacing.journeySection.imagePairItem}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </SiteContainer>
      </motion.div>

      <Divider color={dividerColor} />

      {/* ───────────────────────────── 02 ───────────────────────────── */}
      <motion.div
        ref={block2Ref}
        className={spacing.journeySection.blockWrapperAlt}
        variants={fadeUp}
        initial="hidden"
        animate={block2InView ? "visible" : "hidden"}
      >
        <SiteContainer>
          <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12">
            <motion.div
              className="flex-1 order-1 md:order-2"
              variants={imageVariants}
              initial="hidden"
              animate={block2InView ? "visible" : "hidden"}
            >
              <motion.div
                className={spacing.journeySection.imageWrapper}
                style={{ backgroundColor: softPanelBg }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <Image
                  src={IMAGES.journeySunset}
                  alt="Person standing in silhouette at sunset"
                  width={400}
                  height={500}
                  className={spacing.journeySection.image}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="flex-1 order-2 md:order-1"
              variants={slideInRight}
              initial="hidden"
              animate={block2InView ? "visible" : "hidden"}
            >
              <div className={spacing.journeySection.badgeHeadingRow}>
                <div className={spacing.journeySection.badgeWrapper}>
                  <span className={typography.journeySection.badgeAlt} style={headingColor}>
                    02
                  </span>
                  <span
                    className={spacing.journeySection.badgeUnderline}
                    style={{ backgroundColor: textColor }}
                  />
                </div>
                <AnimatedHeading
                  as="h2"
                  text={block2.heading}
                  isInView={block2InView}
                  charVariants={charVariants}
                  className={typography.journeySection.heading}
                  style={headingColor}
                />
              </div>
              {block2.bodies.map((body, idx) => (
                <AnimatedBody
                  key={idx}
                  words={body.split(" ")}
                  isInView={block2InView}
                  wordVariants={wordVariants}
                  className={typography.journeySection.body}
                  style={bodyColor}
                />
              ))}
            </motion.div>
          </div>
        </SiteContainer>
      </motion.div>

      <Divider color={dividerColor} />

      {/* ───────────────────────────── 03 ───────────────────────────── */}
      <motion.div
        ref={block3Ref}
        className={spacing.journeySection.blockWrapper}
        variants={fadeUp}
        initial="hidden"
        animate={block3InView ? "visible" : "hidden"}
      >
        <SiteContainer>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <motion.div
              className="flex-1 order-2 md:order-1"
              variants={slideInLeft}
              initial="hidden"
              animate={block3InView ? "visible" : "hidden"}
            >
              <div className={spacing.journeySection.badgeHeadingRow}>
                <div className={spacing.journeySection.badgeWrapper}>
                  <span className={typography.journeySection.badge} style={headingColor}>
                    03
                  </span>
                  <span
                    className={spacing.journeySection.badgeUnderline}
                    style={{ backgroundColor: textColor }}
                  />
                </div>
                <AnimatedHeading
                  as="h2"
                  text={block3.heading}
                  isInView={block3InView}
                  charVariants={charVariants}
                  className={typography.journeySection.heading}
                  style={headingColor}
                />
              </div>
              {block3.bodies.map((body, idx) => (
                <AnimatedBody
                  key={idx}
                  words={body.split(" ")}
                  isInView={block3InView}
                  wordVariants={wordVariants}
                  className={typography.journeySection.body}
                  style={bodyColor}
                />
              ))}
            </motion.div>

            <motion.div
              className="flex-1 order-1 md:order-2"
              variants={imageVariants}
              initial="hidden"
              animate={block3InView ? "visible" : "hidden"}
            >
              <motion.div
                className={spacing.journeySection.imageWrapper}
                style={{ backgroundColor: softPanelBg }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <Image
                  src={IMAGES.journeyReflection}
                  alt="Person practicing yoga reflected in water"
                  width={400}
                  height={500}
                  className={spacing.journeySection.image}
                />
              </motion.div>
            </motion.div>
          </div>
        </SiteContainer>
      </motion.div>

      <Divider color={dividerColor} />

      {/* ───────────────────────────── 04 ───────────────────────────── */}
      <motion.div
        ref={block4Ref}
        className={spacing.journeySection.blockWrapper}
        variants={fadeUp}
        initial="hidden"
        animate={block4InView ? "visible" : "hidden"}
      >
        <SiteContainer>
          <motion.div
            className={spacing.journeySection.expandCard}
            style={{
              backgroundColor: dark ? "#1f2937" : "#E3DDFF",
              borderColor: dark ? "#374151" : "#e5e7eb",
            }}
            whileHover={{
              boxShadow: dark
                ? "0 8px 30px rgba(0,0,0,0.3)"
                : "0 8px 30px rgba(0,0,0,0.06)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              <motion.div
                className="w-full md:w-1/3 order-1 md:order-1"
                variants={imageVariants}
                initial="hidden"
                animate={block4InView ? "visible" : "hidden"}
              >
                <motion.div
                  className={spacing.journeySection.expandImageWrapper}
                  style={{ backgroundColor: softPanelBg }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <Image
                    src={IMAGES.journeyHorizon}
                    alt="Sunrise over green fields"
                    width={300}
                    height={200}
                    className={spacing.journeySection.expandImage}
                  />
                </motion.div>
              </motion.div>

              <div className="w-full md:w-2/3 order-2 md:order-2">
                <div className={spacing.journeySection.badgeHeadingRow}>
                  <div className={spacing.journeySection.badgeWrapper}>
                    <span className={typography.journeySection.badge} style={headingColor}>
                      04
                    </span>
                    <span
                      className={spacing.journeySection.badgeUnderline}
                      style={{ backgroundColor: textColor }}
                    />
                  </div>
                  <AnimatedHeading
                    as="h2"
                    text={block4.heading}
                    isInView={block4InView}
                    charVariants={charVariants}
                    className={typography.journeySection.heading}
                    style={headingColor}
                  />
                </div>

                <AnimatedBody
                  words={block4.bodies[0].split(" ")}
                  isInView={block4InView}
                  wordVariants={wordVariants}
                  className={typography.journeySection.body}
                  style={bodyColor}
                />

                <p className={typography.journeySection.body} style={bodyColor}>
                  {block4.bodies[1].split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={wordVariants}
                      initial="hidden"
                      animate={block4InView ? "visible" : "hidden"}
                      style={{ display: "inline-block", marginRight: "0.25em" }}
                    >
                      {word}
                    </motion.span>
                  ))}{" "}
                  <motion.a
                    href="https://theamitabha.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline"
                    style={{ color: textColor }}
                    whileHover={{
                      scale: 1.05,
                      opacity: 0.7,
                      transition: { duration: 0.2 },
                    }}
                  >
                    theamitabha.com
                  </motion.a>
                </p>
              </div>

              <motion.div
                className="order-3 md:order-3"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 },
                }}
              >
                <Image
                  src={IMAGES.HolisticWellbeing}
                  alt="Lotus icon"
                  width={58}
                  height={52}
                />
              </motion.div>
            </div>
          </motion.div>
        </SiteContainer>
      </motion.div>
    </motion.section>
  );
}