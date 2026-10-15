"use client";

import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { spacing, typography } from "../../theme";

const BENEFITS = [
  { title: "Reduce Stress", description: "Clam your mind and release daily stress and tension.", image: IMAGES.ReduceStress, bgColor: "bg-problem-1" },
  { title: "Sleep Better", description: "Experience deep, restorative sleep naturally.", image: IMAGES.SleepBetter, bgColor: "bg-problem-2" },
  { title: "Improve Focus", description: "Enhance clarity, focus and mental performance.", image: IMAGES.ImproveFocus, bgColor: "bg-problem-3" },
  { title: "Emotional Balance", description: "Manage emotions and cultivate inner peace.", image: IMAGES.EmotionalBalance, bgColor: "bg-problem-4" },
  { title: "Holistic Well-being", description: "Balance body, mind and energy for lasting well-being.", image: IMAGES.HolisticWellbeing, bgColor: "bg-problem-5" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function BenefitsSection() {
  const { dark, textColor } = useTheme();

  return (
    <section className={`${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`} style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}>
      <div>

        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className={`${typography.sectionLabel} mb-2`} style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
            BENEFITS
          </p>
          <h2 className={`${typography.sectionSbHeading} mb-4`} style={{ color: textColor }}>
            Transform Your Life. Naturally.
          </h2>
        </motion.div>

        {/* 5 Items Row - Grid approach */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {BENEFITS.map((item, i) => (
            <motion.div
              key={i}
              className={`flex flex-col items-center text-center ${
                // Center the last card (index 4) only on mobile
                i === 4 ? 'col-span-2 sm:col-span-1 md:col-span-1 max-w-[300px] mx-auto sm:mx-0' : ''
              }`}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              {/* Circle Icon */}
              <motion.div
                className={`w-16 h-16 sm:w-19 sm:h-19 rounded-full flex items-center justify-center mb-4 shrink-0 ${item.bgColor}`}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
                style={{
                  backgroundColor: dark ? "#374151" : undefined,
                }}
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={36}
                    height={36}
                    className="w-8 h-8 sm:w-8 sm:h-10 object-contain"
                  />
                )}
              </motion.div>

              {/* Title */}
              <h3 className={`${typography.fingerName} mb-1`} style={{ color: dark ? "#f3f4f6" : "#111827" }}>
                {item.title}
              </h3>

              {/* Text */}
              <p className={`${typography.playerAboutBody}`} style={{ color: dark ? "#9ca3af" : "#4b5563" }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}