"use client";

import { Check, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets";

// ─── Config ─────────────────────────────────────────────────────────────────
const WEEK_DAYS = [
  { id: "mon", letter: "M", completed: true },
  { id: "tue", letter: "T", completed: true },
  { id: "wed", letter: "W", completed: true },
  { id: "thu", letter: "T", completed: true },
  { id: "fri", letter: "F", completed: true },
  { id: "sat", letter: "S", completed: false },
  { id: "sun", letter: "S", completed: false },
];

// ─── Day Circle ─────────────────────────────────────────────────────────────
function DayCircle({ day, dark, textColor, onToggle, isInView }) {
  return (
    <motion.div 
      className="flex flex-col items-center gap-1.5 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onToggle(day.id)}
    >
      <span className="text-xs font-medium" style={{ color: textColor }}>
        {day.letter}
      </span>
      <motion.span
        className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300"
        style={{
          borderColor: dark ? "#4b5563" : "#374151",
          backgroundColor: day.completed ? "#9A85FE" : "transparent",
          boxShadow: day.completed ? "0 0 20px rgba(154, 133, 254, 0.3)" : "none",
        }}
      >
        {day.completed && (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <Check size={15} strokeWidth={2.5} style={{ color: "#ffffff" }} />
          </motion.div>
        )}
      </motion.span>
    </motion.div>
  );
}

// ─── Consistency ────────────────────────────────────────────────────────────
export default function Consistency() {
  const { dark, textColor } = useTheme();
  const [weekDays, setWeekDays] = useState(WEEK_DAYS);
  const router = useRouter();
  
  // Create ref for the component
  const consistencyRef = useRef(null);
  const cardRef = useRef(null);
  
  // Check if sections are in view
  const consistencyInView = useInView(consistencyRef, { once: true, margin: "-50px" });
  const cardInView = useInView(cardRef, { once: true, margin: "-50px" });

  // Calculate streak count from completed days
  const streakCount = weekDays.filter(day => day.completed).length;
  
  // Check if all days are completed
  const allCompleted = weekDays.every(day => day.completed === true);

  // Toggle day completion
  const handleToggleDay = (dayId) => {
    setWeekDays(prevDays =>
      prevDays.map(day =>
        day.id === dayId ? { ...day, completed: !day.completed } : day
      )
    );
  };

  // Toggle all days to completed or missed
  const toggleAllDays = (completed) => {
    setWeekDays(prevDays =>
      prevDays.map(day => ({ ...day, completed }))
    );
  };

  // Handle navigation to DailyStreak
  const handleViewCalendar = () => {
    router.push('/DailyStreak');
  };

  return (
    <div 
      ref={consistencyRef}
      className={`${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`} 
      style={{
        backgroundColor: dark ? "#000000" : "#ffffff",
        borderColor: dark ? "#ffffff" : "#EDEAE1",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          animate={consistencyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="text-[14px] sm:text-[15px] font-semibold" 
          style={{ color: textColor }}
        >
          2. Consistency
        </motion.h3>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={consistencyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-[12px] sm:text-[13px] font-medium underline underline-offset-2 cursor-pointer hover:opacity-80 transition-opacity"
          style={{ color: "#9A85FE" }}
          onClick={handleViewCalendar}
        >
          View Calendar
          <ChevronRight size={13} className="inline-block ml-0.5 -mt-0.5" />
        </motion.button>
      </div>

      {/* Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="rounded-[20px] border px-4 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        style={{
          backgroundColor: dark ? "#ffffff1f" : "#F7F6F3",
          borderColor: dark ? "#374151" : "#9b9b9b",
        }}
      >
        {/* Current Streak */}
        <motion.div 
          className="flex flex-col items-center text-center flex-1"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={cardInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <p className="text-[13px] sm:text-[14px] font-semibold mb-2" style={{ color: textColor }}>
            Current Streak
          </p>
          <motion.div
            className="w-24 h-24 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-500"
            style={{ 
              borderColor: dark ? "#ffffff" : "#d1d5db",
              backgroundColor: streakCount >= 5 ? "rgba(154, 133, 254, 0.1)" : "transparent",
              boxShadow: streakCount >= 5 ? "0 0 30px rgba(154, 133, 254, 0.2)" : "none",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ 
                scale: (streakCount >= 5 && cardInView) ? [1, 1.2, 1] : 1,
              }}
              transition={{ 
                duration: 1,
                repeat: (streakCount >= 5 && cardInView) ? Infinity : 0,
                repeatDelay: 2
              }}
            >
              <Image 
                src={IMAGES.FireIcon} 
                alt="Fire" 
                width={20} 
                height={20}
                style={{ 
                  filter: streakCount >= 5 
                    ? "brightness(0) saturate(100%) invert(47%) sepia(76%) saturate(1236%) hue-rotate(222deg) brightness(96%) contrast(92%)" 
                    : dark 
                      ? "brightness(0) invert(1)" 
                      : "brightness(0) saturate(100%) invert(33%) sepia(0%) saturate(0%) brightness(50%) contrast(100%)",
                  transition: "filter 0.3s ease"
                }} 
              />
            </motion.div>
            <motion.p 
              key={streakCount}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={cardInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="text-[22px] sm:text-[24px] font-bold leading-none" 
              style={{ color: textColor }}
            >
              {streakCount}
            </motion.p>
            <p className="text-[10px] sm:text-[11px]" style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
              {streakCount === 1 ? "Day" : "Days"}
            </p>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div
          className="w-px h-12 sm:h-16 hidden sm:block"
          style={{ backgroundColor: dark ? "#374151" : "#d1d5db" }}
        />
        <div
          className="w-full h-px sm:hidden"
          style={{ backgroundColor: dark ? "#374151" : "#d1d5db" }}
        />

        {/* Week Progress */}
        <motion.div 
          className="flex-1 w-full"
          initial={{ opacity: 0, x: 20 }}
          animate={cardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <p className="text-[13px] sm:text-[14px] font-semibold text-center sm:text-left mb-3" style={{ color: textColor }}>
            Your Practice This Week
          </p>

          <div className="flex items-center justify-between gap-1 sm:gap-2 max-w-xs mx-auto sm:mx-0">
            {weekDays.map((day, index) => (
              <motion.div
                key={day.id}
                initial={{ opacity: 0, y: 20 }}
                animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
              >
                <DayCircle 
                  day={day} 
                  dark={dark} 
                  textColor={textColor}
                  onToggle={handleToggleDay}
                  isInView={cardInView}
                />
              </motion.div>
            ))}
          </div>

          {/* Legend - Clickable */}
          <div className="flex items-center justify-center sm:justify-start gap-6 mt-3">
            <motion.div 
              className="flex items-center gap-1.5 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleAllDays(true)}
              initial={{ opacity: 0 }}
              animate={cardInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
                style={{ 
                  borderColor: "#9A85FE",
                  backgroundColor: allCompleted ? "#9A85FE" : "transparent",
                  transition: "background-color 0.3s ease"
                }}
              >
                {allCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={cardInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <Check size={10} strokeWidth={3} style={{ color: "#ffffff", fontWeight: "bold" }} />
                  </motion.div>
                )}
              </span>
              <span className="text-[11px] sm:text-[12px]" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                Complete All
              </span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-1.5 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleAllDays(false)}
              initial={{ opacity: 0 }}
              animate={cardInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.35 }}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border-2"
                style={{ 
                  borderColor: dark ? "#4b5563" : "#374151",
                  backgroundColor: "transparent"
                }}
              />
              <span className="text-[11px] sm:text-[12px]" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                Reset All
              </span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}