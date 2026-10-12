"use client";

import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { motion } from "framer-motion";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const features = [
  {
    title: "Mudra Library",
    description: "Learn and practice powerful mudras for every need.",
    image: IMAGES.MudraLibrary
  },
  {
    title: "Yoga Nidra",
    description: "Guided sessions for sleep, healing, stress relief and more.",
    image: IMAGES.YogaNidraFeature
  },
  {
    title: "Element Tracker",
    description: "Tracker and balance the five elements within you.",
    image: IMAGES.ElementTracker
  },
  {
    title: "Personalized plans",
    description: "Customized routines based on your goals and needs.",
    image: IMAGES.PersonalizedPlans
  },
  {
    title: "Daily Guidance",
    description: "Mudra of the day and reminders to stay consistent.",
    image: IMAGES.DailyGuidance
  },
  {
    title: "Track Progress",
    description: "Monitor your journey and transformation over time.",
    image: IMAGES.TrackProgress
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function FeaturesSection() {
  const { dark, textColor } = useTheme();

  return (
    <section className={`${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`} style={{ backgroundColor: dark ? "#111827" : "#EDE9FE" }}>
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
            KEY FEATURES
          </p>
          <h2 className={`${typography.sectionSbHeading} mb-4`} style={{ color: textColor }}>
            Everything You Need For Inner Balance
          </h2>
        </motion.div>

        {/* 6 Features Row */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((item, i) => (
            <motion.div 
              key={i} 
              className="relative flex flex-col items-center text-center px-2"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              {/* Thumbnail */}
              <motion.div 
                className="w-20 h-20 md:w-14 md:h-14 lg:w-24 lg:h-24 rounded-xl overflow-hidden mb-3 bg-white/70 shadow-xs border border-purple-100 shrink-0"
                style={{ borderColor: dark ? "#4b5563" : "#e9d5ff" }}
                whileHover={{ 
                  scale: 1.08,
                  rotate: [0, -3, 3, 0],
                  transition: { duration: 0.4 }
                }}
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
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

              {/* Vertical divider */}
              {i < features.length - 1 && (
                <div className="hidden md:block absolute right-[-10] top-1/2 -translate-y-1/2 w-px h-38" style={{ backgroundColor: dark ? "#374151" : "#c4b5fd" }} />
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}