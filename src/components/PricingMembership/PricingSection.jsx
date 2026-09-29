"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { typography, spacing, card, maxW } from "../../theme";
import { Check } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const plans = [
  {
    name: "Free",
    tagline: "Explore the basics",
    monthly: 0,
    yearly: 0,
    suffix: "/ forever",
    billedNote: null,
    features: [
      "Limited mudra library",
      "Basic mudra information",
      "Yoga Nidra session previews",
      "Articles & guides",
      "Community access",
    ],
    cta: "Get Started Free",
  },
  {
    name: "Premium",
    tagline: "Deepen your daily practice",
    monthly: 4.99,
    yearly: 3.99,
    suffix: "/ month",
    billedNote: "Billed monthly",
    features: [
      "Full mudra library",
      "Detailed mudra information",
      "Guided mudra practices",
      "Full Yoga Nidra library",
      "Favorites & notes",
      "Articles & guides",
      "Community access",
    ],
    cta: "Start 7-Day Free Trail",
  },
  {
    name: "Premium Plus",
    tagline: "Transform your well-being",
    monthly: 7.99,
    yearly: 6.39,
    suffix: "/ month",
    billedNote: "Billed monthly",
    features: [
      "All Premium features",
      "Personalized recommendations",
      "Practice reminders",
      "Custom collections",
      "Offline access",
      "Priority support",
    ],
    cta: "Start 7-Day Free Trail",
  },
  {
    name: "Lifetime",
    tagline: "One-time payment",
    monthly: 129.99,
    yearly: 129.99,
    suffix: "One-time payment",
    billedNote: null,
    features: [
      "All Premium Plus features",
      "Lifetime access",
      "All future update",
      "Exclusive content",
      "Priority support",
    ],
    cta: "Get Lifetime Access",
  },
];

export default function PricingSection() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.05,
    margin: "-50px"
  });

  const [yearly, setYearly] = useState(false);
  const [selected, setSelected] = useState(2); // Premium Plus highlighted by default

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  // Container variants for stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Plan card variants
  const planVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Toggle switch animation
  const toggleVariants = {
    left: { x: 0 },
    right: { x: 20 },
  };

  return (
    <motion.section 
      ref={sectionRef}
      className={`${spacing.sectionPaddingY}`} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={maxW.sectionBody}>
        {/* Toggle */}
        <motion.div 
          className="flex items-center justify-center gap-3 mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span 
            className={`${typography.cardTitle}`} 
            style={{ color: textColor }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Monthly
          </motion.span>
          <motion.button
            onClick={() => setYearly(!yearly)}
            className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
              yearly ? "bg-primary" : "bg-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform`}
              animate={yearly ? "right" : "left"}
              variants={toggleVariants}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          </motion.button>
          <motion.span 
            className={`${typography.cardTitle}`} 
            style={{ color: textColor }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Yearly
          </motion.span>
          <motion.span 
            className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
          >
            Save 20%
          </motion.span>
        </motion.div>

        {/* Cards */}
        <motion.div 
          className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-2 -mx-4 px-4 md:mx-0 pt-8 sm:pt-10 md:pt-1 md:px-0 md:grid md:grid-cols-4 md:overflow-visible md:gap-2 lg:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => {
            const isSelected = selected === index;
            const price = yearly ? plan.yearly : plan.monthly;

            return (
              <motion.div
                key={plan.name}
                onClick={() => setSelected(index)}
                className={`${card.radius} border p-6 md:p-3 lg:p-6 flex flex-col relative cursor-pointer transition-colors shrink-0 w-[80%] sm:w-[45%] md:w-auto snap-center ${
                  isSelected
                    ? "border-primary"
                    : "border-gray-200"
                }`}
                style={{
                  backgroundColor: isSelected ? "#9A85FE" : (dark ? "#1f2937" : "#ffffff"),
                  borderColor: isSelected ? "#9A85FE" : (dark ? "#374151" : "#e5e7eb"),
                }}
                variants={planVariants}
                whileHover={{
                  y: -6,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {isSelected && (
                  <motion.span 
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] md:text-[9px] lg:text-xs font-semibold px-3 md:px-2 py-1 rounded-full whitespace-nowrap" 
                    style={{ color: textColor }}
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    Most Popular
                  </motion.span>
                )}

                <motion.h3
                  className={`${typography.cardTitle} text-base md:text-xs lg:text-base font-semibold text-center mb-1`}
                  style={{ color: textColor }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {plan.name}
                </motion.h3>
                <p
                  className={`text-xs md:text-[9px] lg:text-xs text-center mb-4 md:mb-2 lg:mb-4`}
                  style={{ color: isSelected ? "rgba(255,255,255,0.8)" : (dark ? "#ffffff" : "#000000") }}
                >
                  {plan.tagline}
                </p>

                <div className="text-center mb-1">
                  <motion.span
                    className={`text-3xl md:text-xl lg:text-3xl font-bold`}
                    style={{ color: isSelected ? "#ffffff" : (dark ? "#e5e7eb" : "#111827") }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    ${price.toFixed(2)}
                  </motion.span>
                  {plan.suffix.startsWith("/") && (
                    <span
                      className={`text-sm md:text-[10px] lg:text-sm`}
                      style={{ color: textColor }}
                    >
                      {" "}
                      {plan.suffix}
                    </span>
                  )}
                </div>
                {plan.billedNote && (
                  <p
                    className={`text-xs md:text-[9px] lg:text-xs text-center mb-4 md:mb-2 lg:mb-4`}
                    style={{ color: isSelected ? "rgba(255,255,255,0.8)" : (dark ? "#9ca3af" : "#6b7280") }}
                  >
                    {plan.billedNote}
                  </p>
                )}
                {!plan.suffix.startsWith("/") && (
                  <p
                    className={`text-xs md:text-[9px] lg:text-xs text-center mb-4 md:mb-2 lg:mb-4`}
                    style={{ color: isSelected ? "rgba(255,255,255,0.8)" : (dark ? "#9ca3af" : "#6b7280") }}
                  >
                    {plan.suffix}
                  </p>
                )}

                <ul className="flex flex-col gap-2.5 md:gap-1 lg:gap-2.5 mb-6 md:mb-3 lg:mb-6">
                  {plan.features.map((feature, idx) => (
                    <motion.li 
                      key={feature} 
                      className="flex items-center gap-2 md:gap-1 lg:gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
                    >
                      <span
                        className={`flex items-center justify-center w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 rounded-full shrink-0`}
                        style={{
                          backgroundColor: isSelected ? "rgba(255,255,255,0.2)" : (dark ? "#374151" : "#f3f4f6"),
                          color: isSelected ? "#ffffff" : (dark ? "#9ca3af" : "#6b7280"),
                        }}
                      >
                        <Check size={10} className="md:!size-[6px] lg:!size-[10px]" strokeWidth={3} />
                      </span>
                      <span
                        className={`text-xs md:text-[8px] lg:text-xs`}
                        style={{ color: textColor }}
                      >
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  className={`w-full py-2.5 md:py-1.5 lg:py-2.5 rounded-lg text-sm md:text-[10px] lg:text-sm font-medium transition-colors cursor-pointer`}
                  style={{
                    backgroundColor: isSelected ? "#ffffff" : (dark ? "#374151" : "#ffffff"),
                    color: isSelected ? "#9A85FE" : (dark ? "#e5e7eb" : "#374151"),
                    border: isSelected ? "none" : (dark ? "1px solid #374151" : "1px solid #e5e7eb"),
                  }}
                  whileHover={{
                    scale: 1.05,
                    opacity: isSelected ? 0.9 : 1,
                    backgroundColor: isSelected ? "#ffffff" : (dark ? "#4b5563" : "#f9fafb"),
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}