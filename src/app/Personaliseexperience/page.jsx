"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { btn, form, card, typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const GOALS = [
  { id: "reduce-stress", label: "Reduce Stress", icon: IMAGES.ReduceStress },
  { id: "boost-energy", label: "Boost Energy", icon: IMAGES.Energy },
  { id: "improve-health", label: "Improve Health", icon: IMAGES.ActivityHeart },
  { id: "improve-focus", label: "Improve Focus", icon: IMAGES.ImproveFocus },
];

const EXPERIENCE_LEVELS = [
  { id: "beginner", label: "Beginner", fill: "none" },
  { id: "some-experience", label: "Some Experience", fill: "half" },
  { id: "advanced", label: "Advanced", fill: "full" },
];

const TIME_OPTIONS = [
  { id: "5-10", label: "5-10 min" },
  { id: "10-20", label: "10-20 min" },
  { id: "20-30", label: "20-30 min" },
  { id: "30-plus", label: "30+ min" },
];

const AGE_RANGES = [
  { id: "18-25", label: "18-25", suffix: "Years" },
  { id: "26-35", label: "26-35", suffix: "Years" },
  { id: "36-45", label: "36-45", suffix: "Years" },
  { id: "45-plus", label: "45+", suffix: "Years" },
];

// ── Small presentational pieces ─────────────────────────────

function SectionLabel({ children, dark }) {
  return (
    <h2 className={`${typography.blogFilter.groupTitle} lg:text-base mb-3 lg:mb-4`} style={{ color: dark ? "#e5e7eb" : "#374151" }}>
      {children}
    </h2>
  );
}

function CheckBadge() {
  return (
    <motion.span 
      className="absolute top-2 right-2 w-4.5 h-4.5 lg:w-5 lg:h-5 rounded-full bg-primary flex items-center justify-center shadow-sm"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-2.5 h-2.5"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </motion.span>
  );
}

function OptionCard({ selected, onClick, children, className = "", dark }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "relative flex flex-col items-center justify-center gap-2 lg:gap-2.5",
        card.radius,
        "border px-2 py-4 lg:px-3 lg:py-5 text-center cursor-pointer",
        "transition-all duration-200",
        selected
          ? dark
            ? "border-gray-400 bg-gray-400 shadow-sm ring-1 ring-gray-400/30" // Grey when selected in dark mode
            : "border-gray-400 bg-gray-400 shadow-sm ring-1 ring-gray-400/30" // Grey when selected in light mode
          : dark 
            ? "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-sm" // White default in dark mode
            : "border-gray-700 bg-gray-800 hover:border-gray-600 hover:bg-gray-700 hover:-translate-y-0.5 hover:shadow-sm", // Dark default in light mode
        className,
      ].join(" ")}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {selected && <CheckBadge />}
      {children}
    </motion.button>
  );
}

function IconChip({ src, selected, size = 18, dark }) {
  return (
    <motion.span
      className={[
        "w-9 h-9 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-colors",
        selected 
          ? "bg-gray-500" // Grey when selected
          : dark 
            ? "bg-gray-100" // Light chip on white card in dark mode
            : "bg-gray-600", // Dark chip on dark card in light mode
      ].join(" ")}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className={`lg:w-5 lg:h-5 object-contain ${selected ? "opacity-100" : "opacity-80"}`}
      />
    </motion.span>
  );
}

function ExperienceDot({ fill, selected, dark }) {
  const fillColor = selected 
    ? "bg-gray-500" // Grey when selected
    : dark 
      ? "bg-gray-300" // Light grey on white card in dark mode
      : "bg-gray-500"; // Dark grey on dark card in light mode
  
  const borderColor = selected 
    ? "border-gray-500 ring-4 ring-gray-500/20"
    : dark 
      ? "border-gray-300" 
      : "border-gray-500";
  
  return (
    <motion.span
      className={[
        "w-9 h-9 lg:w-11 lg:h-11 rounded-full border-2 flex items-center justify-center overflow-hidden transition-all",
        borderColor,
      ].join(" ")}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      {fill === "full" && <span className={`w-full h-full ${fillColor}`} />}
      {fill === "half" && (
        <span className={`w-full h-full ${fillColor} [clip-path:inset(0_50%_0_0)]`} />
      )}
    </motion.span>
  );
}

// ── Main component ───────────────────────────────────────────

export default function PersonaliseExperience({ onContinue, onSkip }) {
  const router = useRouter();
  const { dark, textColor } = useTheme();
  const [goal, setGoal] = useState(null);
  const [experience, setExperience] = useState(null);
  const [timePerDay, setTimePerDay] = useState(null);
  const [ageRange, setAgeRange] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const answeredCount = [goal, experience, timePerDay, ageRange].filter(
    Boolean
  ).length;

  const handleContinue = () => {
    setIsLoading(true);
    
    try {
      // Save user preferences to localStorage
      const preferences = { 
        goal, 
        experience, 
        timePerDay, 
        ageRange,
        completed: true,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem("userPreferences", JSON.stringify(preferences));
      
      // Make sure user is logged in
      const userData = localStorage.getItem("user");
      if (!userData) {
        // If no user data, redirect to signup
        router.push("/SignUp");
        return;
      }
      
      // Call the parent's onContinue callback if provided
      onContinue?.({ goal, experience, timePerDay, ageRange });
      
      // Navigate to the home page
      router.push("/Home");
    } catch (error) {
      console.error("Error saving preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    onSkip?.();
    router.push("/Home");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.1 }
    }
  };

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 py-10 w-full overflow-hidden"
      style={{
        backgroundColor: dark ? "#111827" : "#F7F7FA",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left column — image */}
        <motion.div 
          className="w-full md:w-1/2 flex justify-center md:justify-start md:-ml-1 lg:-ml-1 xl:-ml-16 2xl:-ml-20"
          variants={imageVariants}
        >
          <motion.div 
            className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px] lg:w-[580px] lg:h-[580px] xl:w-[650px] xl:h-[650px] 2xl:w-[750px] 2xl:h-[750px] rounded-3xl overflow-hidden shadow-xl"
            style={{
              backgroundColor: dark ? "#374151" : "#f3f4f6",
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={IMAGES.HapplyMudra}
              alt="Person practicing a hand mudra in a calm, plant-filled room"
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, (max-width: 1024px) 500px, (max-width: 1280px) 580px, 650px"
              priority
            />
            <motion.div 
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                background: `linear-gradient(to bottom, transparent 60%, ${dark ? 'rgba(17,24,39,0.3)' : 'rgba(255,255,255,0.1)'})`,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Right column — questions */}
        <motion.div 
          className="w-full md:w-1/2"
          variants={contentVariants}
        >
          {/* Eyebrow */}
          <motion.div 
            className="flex items-center justify-center md:justify-start gap-1.5 mb-3"
            variants={itemVariants}
          >
            <Image src={IMAGES.LeafIcon} alt="" width={13} height={13} />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">
              Quick setup
            </span>
          </motion.div>

          <motion.h1 
            className={`${form.heading} text-2xl lg:text-3xl text-center md:text-left`}
            style={{ color: textColor }}
            variants={itemVariants}
          >
            Personalise Your Experience
          </motion.h1>
          
          <motion.p 
            className={`${form.subheading} text-sm lg:text-base text-center md:text-left mb-6`}
            style={{ color: dark ? "#ffffff" : "#9ca3af" }}
            variants={itemVariants}
          >
            Help us understand you better to personalise your healing journey
          </motion.p>

          {/* Progress */}
          <motion.div 
            className="mb-6 lg:mb-8"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                {answeredCount} of 4 answered
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: dark ? "#374151" : "#f3f4f6" }}>
              <motion.div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${(answeredCount / 4) * 100}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${(answeredCount / 4) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Primary goal */}
          <motion.div 
            className="mb-6 lg:mb-8"
            variants={itemVariants}
          >
            <SectionLabel dark={dark}>What is your primary goal?</SectionLabel>
            <div className="grid grid-cols-4 gap-2 lg:gap-3">
              {GOALS.map(({ id, label, icon }) => {
                const selected = goal === id;
                return (
                  <OptionCard
                    key={id}
                    selected={selected}
                    onClick={() => setGoal(id)}
                    dark={dark}
                  >
                    <IconChip src={icon} selected={selected} dark={dark} />
                    <span
                      className={`text-[10px] lg:text-xs leading-tight font-medium ${
                        selected 
                          ? "text-white" // White text on grey card
                          : dark 
                            ? "text-gray-900" // Dark text on white card in dark mode
                            : "text-gray-100" // Light text on dark card in light mode
                      }`}
                    >
                      {label}
                    </span>
                  </OptionCard>
                );
              })}
            </div>
          </motion.div>

          {/* Mudra experience */}
          <motion.div 
            className="mb-6 lg:mb-8"
            variants={itemVariants}
          >
            <SectionLabel dark={dark}>What is your experience with Mudras?</SectionLabel>
            <div className="grid grid-cols-3 gap-2 lg:gap-3">
              {EXPERIENCE_LEVELS.map(({ id, label, fill }) => {
                const selected = experience === id;
                return (
                  <OptionCard
                    key={id}
                    selected={selected}
                    onClick={() => setExperience(id)}
                    className="py-5 lg:py-6"
                    dark={dark}
                  >
                    <ExperienceDot fill={fill} selected={selected} dark={dark} />
                    <span
                      className={`text-[11px] lg:text-sm font-medium ${
                        selected 
                          ? "text-white" // White text on grey card
                          : dark 
                            ? "text-gray-900" // Dark text on white card in dark mode
                            : "text-gray-100" // Light text on dark card in light mode
                      }`}
                    >
                      {label}
                    </span>
                  </OptionCard>
                );
              })}
            </div>
          </motion.div>

          {/* Daily time */}
          <motion.div 
            className="mb-6 lg:mb-8"
            variants={itemVariants}
          >
            <SectionLabel dark={dark}>How much time can you dedicate daily?</SectionLabel>
            <div className="grid grid-cols-4 gap-2 lg:gap-3">
              {TIME_OPTIONS.map(({ id, label }) => {
                const selected = timePerDay === id;
                return (
                  <OptionCard
                    key={id}
                    selected={selected}
                    onClick={() => setTimePerDay(id)}
                    dark={dark}
                  >
                    <IconChip src={IMAGES.Clock} selected={selected} size={16} dark={dark} />
                    <span
                      className={`text-[10px] lg:text-xs font-medium ${
                        selected 
                          ? "text-white" // White text on grey card
                          : dark 
                            ? "text-gray-900" // Dark text on white card in dark mode
                            : "text-gray-100" // Light text on dark card in light mode
                      }`}
                    >
                      {label}
                    </span>
                  </OptionCard>
                );
              })}
            </div>
          </motion.div>

          {/* Age range */}
          <motion.div 
            className="mb-8 lg:mb-10"
            variants={itemVariants}
          >
            <SectionLabel dark={dark}>What is your age range?</SectionLabel>
            <div className="grid grid-cols-4 gap-2 lg:gap-3">
              {AGE_RANGES.map(({ id, label, suffix }) => {
                const selected = ageRange === id;
                return (
                  <OptionCard
                    key={id}
                    selected={selected}
                    onClick={() => setAgeRange(id)}
                    dark={dark}
                  >
                    <span
                      className={`text-sm lg:text-base font-bold ${
                        selected 
                          ? "text-white" // White text on grey card
                          : dark 
                            ? "text-gray-900" // Dark text on white card in dark mode
                            : "text-gray-100" // Light text on dark card in light mode
                      }`}
                    >
                      {label}
                    </span>
                    <span
                      className={`text-[10px] lg:text-xs -mt-1 ${
                        selected 
                          ? "text-gray-200" // Light grey text on grey card
                          : dark 
                            ? "text-gray-600" 
                            : "text-gray-400"
                      }`}
                    >
                      {suffix}
                    </span>
                  </OptionCard>
                );
              })}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="
              mt-auto flex flex-col items-center gap-4
              lg:mt-0 lg:flex-row lg:justify-between lg:gap-8
            "
            variants={itemVariants}
          >
            <motion.button
              type="button"
              onClick={handleSkip}
              className="text-sm font-medium underline underline-offset-2 cursor-pointer order-2 lg:order-1"
              style={{ color: dark ? "#9ca3af" : "#6b7280" }}
              whileHover={{ scale: 1.05, color: dark ? "#e5e7eb" : "#374151" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              I&apos;ll do this later
            </motion.button>
            <motion.button
              type="button"
              onClick={handleContinue}
              disabled={isLoading}
              className={`w-full lg:w-auto !h-auto !text-sm rounded-full py-3.5 lg:px-12 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl order-1 lg:order-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              style={{
                backgroundColor: textColor,
                color: dark ? "#111827" : "#ffffff",
              }}
              whileHover={!isLoading ? { 
                scale: 1.02,
                opacity: 0.85,
                transition: { duration: 0.2 }
              } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <motion.span
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </motion.span>
              ) : (
                <>
                  Continue
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}