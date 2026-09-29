"use client";

import { motion } from "framer-motion";
import Image from "next/image"; // Add this import
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets"; // Add this import

export default function PremiumBanner() {
  const { dark, textColor } = useTheme();

  return (
    <section className={`w-full ${spacing.sectionPaddingX} py-6 sm:py-8`}>
      {/* Eyebrow line */}
      <motion.h1
        className={`${typography.sectionSbHeading} ${spacing.labelMt} text-center text-sm sm:text-base font-medium mb-4 sm:mb-5`} 
        style={{ color: textColor }}
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Unlock your full potential with Moodra Premium.
      </motion.h1>

      {/* Card */}
      <motion.div
        className="w-full rounded-2xl border flex flex-col sm:flex-row items-center gap-4 sm:gap-5 px-4 py-4 sm:px-6 sm:py-5"
        style={{
          backgroundColor: dark ? "#1f2937" : "#f3f4f6",
          borderColor: dark ? "#374151" : "#e5e7eb",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Energy Image */}
        <motion.div 
          className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center"
          whileHover={{ 
            scale: 1.1, 
            rotate: 10,
            transition: { duration: 0.3 }
          }}
        >
          <Image
            src={IMAGES.Energy}
            alt="Energy"
            width={56}
            height={56}
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
          />
        </motion.div>

        {/* Text */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Go Premium. Live Better.</h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
            Access all features, premium sessions and personalized insights.
          </p>
        </div>

        {/* CTA pill */}
        <motion.button
          className="shrink-0 flex items-center gap-2 text-white text-sm sm:text-[15px] font-medium px-4 sm:px-5 py-2.5 sm:py-3 rounded-full whitespace-nowrap cursor-pointer"
          style={{ backgroundColor: textColor }}
          whileHover={{ scale: 1.05, opacity: 0.9 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2 }}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85L10 1.5z" />
          </svg>
          7 Days Free Trial
        </motion.button>
      </motion.div>
    </section>
  );
}