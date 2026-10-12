"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const pillars = [
  {
    title: "Rooted in Tradition",
    description: "Practices from ancient India, passed down for thousands of years.",
    image: IMAGES.RootedInTradition,
  },
  {
    title: "Backed by Science",
    description: "Supported by modern research and holistic understanding.",
    image: IMAGES.BackedByScience,
  },
  {
    title: "Designed for Today",
    description: "Simple, practical tools that fit into your modern lifestyle.",
    image: IMAGES.DesignedForToday,
  },
  {
    title: "For Everyone",
    description: "No matter where you are on your journey, balance is within your reach.",
    image: IMAGES.ForEveryone,
  },
];

export default function OurPhilosophy() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { dark, textColor } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.section
      id="our-philosophy"
      ref={sectionRef}
      className={`
        w-full
        ${spacing.sectionPaddingX}
        ${spacing.sectionPaddingY}
        bg-philosophy-bg
      `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto">

        {/* Heading */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <p className={`${typography.sectionLabel} mb-2`} style={{ color: dark ? "#44484e" : "#44484e" }}>
            OUR PHILOSOPHY
          </p>
          <h2 className={`${typography.sectionHeading} mb-3`} style={{ color: textColor }}>
            Ancient Wisdom. Modern Life. Real Transformation.
          </h2>
          <p className={`${typography.sectionMb} max-w-2xl mx-auto`} style={{ color: dark ? "#000000" : "#374151" }}>
            We believe true well-being comes from aligning body, mind, and
            <br className="hidden sm:inline" />
            energy. Mudras, Yoga Nidra and the five elements work together to
            <br className="hidden sm:inline" />
            help you live a balanced, mindful and fulfilling life
          </p>
        </motion.div>

        {/* 4 Pillars Row */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {pillars.map((item, i) => (
            <motion.div 
              key={i} 
              className="relative flex flex-col items-center text-center px-4"
              variants={itemVariants}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 }
              }}
            >
              {/* Circular Photo */}
              <motion.div 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-4 shrink-0 bg-white shadow-xs border border-purple-100"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                )}
              </motion.div>

              {/* Title */}
              <h3 className={`${typography.benefitTitle} text-gray-900 mb-2`}>
                {item.title}
              </h3>

              {/* Text */}
              <p className={`${typography.benefitBody} text-gray-600/90 max-w-[200px]`}>
                {item.description}
              </p>

              {/* Vertical divider */}
              {i < pillars.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-32 bg-purple-300/50" />
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}