"use client";

import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { spacing, typography } from "../../theme";

const solutions = [
  {
    title: "Mudras",
    description: "Simple hand gestures to activate energy, restore balance and enhance well-being.",
    iconBg: "bg-[#DCFCE7]",
    icon: IMAGES.Mudras,
  },
  {
    title: "Yoga Nidra",
    description: "Guided deep relaxation for stress relief, healing and restful sleep.",
    iconBg: "bg-[#FCE7F3]",
    icon: IMAGES.YogaNidra,
  },
  {
    title: "Elements",
    description: "Balance the five elements within to bring harmony to your life.",
    iconBg: "bg-[#E0F2FE]",
    icon: IMAGES.Elements,
  },
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
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function SolutionSection() {
  const { dark, textColor } = useTheme();

  return (
    <section className={`${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`} style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}>
      <div className="max-w-9xl mx-auto">

        {/* Heading */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className={`${typography.sectionLabel} mb-2`} style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
            THE SOLUTION
          </p>
          <h2 className={`${typography.sectionHeading} mb-3`} style={{ color: textColor }}>
            Ancient Practices. Holistic Balance.
          </h2>
          <p className={`${typography.sectionMb} max-w-2xl mx-auto`} style={{ color: dark ? "#e5e7eb" : "#374151" }}>
            Mudras + Yoga Nidra + Elements work together to restore
            <br className="hidden sm:inline" />
            balance to your body, mind and energy.
          </p>
        </motion.div>

        {/* 3 Items Row */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {solutions.map((item, i) => (
            <motion.div 
              key={i} 
              className="relative flex items-center gap-4 px-4"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              {/* Icon Circle */}
              <motion.div 
                className={`w-16 h-16 sm:w-20 sm:h-20 md:w-25 md:h-25 rounded-full flex items-center justify-center shrink-0 ${item.iconBg}`}
                whileHover={{ 
                  scale: 1.15,
                  rotate: [0, -10, 10, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={36}
                  height={36}
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-15 md:h-15 object-contain"
                />
              </motion.div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className={`${typography.solutionTitle} mb-1`} style={{ color: dark ? "#f3f4f6" : "#111827" }}>
                  {item.title}
                </h3>
                <p className={`${typography.playerAboutBody}`} style={{ color: dark ? "#9ca3af" : "#4b5563" }}>
                  {item.description}
                </p>
              </div>

              {/* Vertical line divider for desktop */}
              {i < solutions.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16" style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }} />
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}