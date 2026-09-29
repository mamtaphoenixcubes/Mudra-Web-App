"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { spacing, btn } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme, ThemeProvider } from "../../context/ThemeContext";

// ─── Mock data ────────────────────────────────────────────────────────────────
const SESSIONS = [
  { id: "s1", title: "Gyan Mudra · Clarity Flow", category: "Mudra", duration: 18, status: "in-progress", progress: 62, element: "Ether", instructor: "Priya Nair", thumbnailGradient: "from-violet-500 to-purple-700", mudraSymbol: "✦", xp: 120 },
  { id: "s2", title: "Yoga Nidra · Deep Rest", category: "Yoga Nidra", duration: 35, status: "upcoming", scheduledAt: "Tomorrow · 6:30 AM", element: "Water", instructor: "Arjun Rao", thumbnailGradient: "from-teal-400 to-cyan-700", mudraSymbol: "▽", xp: 200 },
  { id: "s3", title: "Prana Vayu Mudra", category: "Mudra", duration: 12, status: "completed", completedAt: "Today · 7:14 AM", element: "Air", instructor: "Meera Iyer", thumbnailGradient: "from-sky-400 to-blue-600", mudraSymbol: "◇", xp: 80, streak: 3 },
  { id: "s4", title: "Nadi Shodhana · Balance", category: "Pranayama", duration: 20, status: "completed", completedAt: "Yesterday · 6:45 AM", element: "Ether", instructor: "Priya Nair", thumbnailGradient: "from-violet-400 to-indigo-600", mudraSymbol: "✦", xp: 140 },
  { id: "s5", title: "Agni Sara · Fire Activation", category: "Meditation", duration: 25, status: "saved", element: "Fire", instructor: "Vikram Sharma", thumbnailGradient: "from-orange-400 to-red-600", mudraSymbol: "△", xp: 160 },
  { id: "s6", title: "Prithvi Mudra · Grounding", category: "Mudra", duration: 15, status: "completed", completedAt: "2 days ago", element: "Earth", instructor: "Lakshmi Devi", thumbnailGradient: "from-green-400 to-emerald-700", mudraSymbol: "□", xp: 90 },
  { id: "s7", title: "Yoga Nidra · Sankalpa", category: "Yoga Nidra", duration: 45, status: "saved", element: "Water", instructor: "Arjun Rao", thumbnailGradient: "from-cyan-400 to-teal-700", mudraSymbol: "▽", xp: 250 },
  { id: "s8", title: "Surya Mudra · Vitality", category: "Mudra", duration: 10, status: "upcoming", scheduledAt: "Friday · 7:00 AM", element: "Fire", instructor: "Vikram Sharma", thumbnailGradient: "from-amber-400 to-orange-600", mudraSymbol: "△", xp: 60 },
];

const FILTER_TABS = ["All", "In Progress", "Upcoming", "Completed", "Saved"];

const CATEGORY_COLORS = {
  Mudra:      "bg-violet-50 text-violet-600 border-violet-200",
  "Yoga Nidra": "bg-teal-50 text-teal-600 border-teal-200",
  Pranayama:  "bg-sky-50 text-sky-600 border-sky-200",
  Meditation: "bg-orange-50 text-orange-600 border-orange-200",
};

const STATUS_CONFIG = {
  "in-progress": { label: "In progress",  dot: "bg-amber-400" },
  upcoming:      { label: "Upcoming",     dot: "bg-sky-400"   },
  completed:     { label: "Completed",    dot: "bg-emerald-400" },
  saved:         { label: "Saved",        dot: "bg-gray-300"   },
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const Ic = {
  back:    () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  play:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  clock:   () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  bolt:    () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  flame:   () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  check:   () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  search:  () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  bookmark: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  calendar: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
};

// ─── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, value, label, accent }) {
  const { dark, textColor } = useTheme();
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { 
    once: true, 
    amount: 0.5,
    margin: "-50px"
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div 
      ref={cardRef}
      className={`flex-1 min-w-[72px] rounded-2xl p-3.5 border ${accent} flex flex-col gap-1 ${dark ? "bg-gray-800 border-gray-700" : ""}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        y: -4,
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        transition: { duration: 0.2 }
      }}
    >
      <motion.span 
        className="opacity-60"
        whileHover={{
          scale: 1.2,
          rotate: 5,
          transition: { duration: 0.2 }
        }}
      >
        {icon}
      </motion.span>
      <motion.span 
        className="text-lg font-bold leading-tight" 
        style={{ color: textColor }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        {value}
      </motion.span>
      <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{label}</span>
    </motion.div>
  );
}

// ─── Session card ─────────────────────────────────────────────────────────────
function SessionCard({ session, index }) {
  const { dark, textColor } = useTheme();
  const status = STATUS_CONFIG[session.status];
  const catColor = CATEGORY_COLORS[session.category];
  const isInProgress = session.status === "in-progress";
  const isUpcoming   = session.status === "upcoming";
  const isCompleted  = session.status === "completed";
  const textPrimary = dark ? "#f9fafb" : "#111827";
  const textSecondary = dark ? "#6b7280" : "#9ca3af";

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div 
      className={`rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        y: -2,
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex gap-0">
        {/* Thumbnail strip */}
        <motion.div 
          className={`w-2 bg-gradient-to-b ${session.thumbnailGradient} shrink-0`}
          whileHover={{
            scaleX: 1.5,
            transition: { duration: 0.3 }
          }}
        />

        <div className="flex-1 p-4 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <div className="flex-1 min-w-0">
              {/* Category + status row */}
              <motion.div 
                className="flex items-center gap-1.5 mb-1.5 flex-wrap"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
              >
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${catColor}`}>{session.category}</span>
                <span className="flex items-center gap-1 text-[10px] font-medium">
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  <span style={{ color: textSecondary }}>{status.label}</span>
                </span>
              </motion.div>
              <motion.h3 
                className="text-sm font-bold leading-snug truncate" 
                style={{ color: textColor }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                {session.title}
              </motion.h3>
              <p className="text-[11px] mt-0.5" style={{ color: textSecondary }}>{session.instructor}</p>
            </div>

            {/* Mudra symbol */}
            <motion.div 
              className={`w-9 h-9 rounded-xl bg-gradient-to-br ${session.thumbnailGradient} flex items-center justify-center text-white text-base font-bold shrink-0 shadow-sm`}
              whileHover={{
                scale: 1.15,
                rotate: 10,
                transition: { duration: 0.2 }
              }}
            >
              {session.mudraSymbol}
            </motion.div>
          </div>

          {/* Progress bar (in-progress only) */}
          {isInProgress && session.progress !== undefined && (
            <motion.div 
              className="mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-amber-500 font-semibold">In progress</span>
                <span className="text-[10px] font-medium" style={{ color: textSecondary }}>{session.progress}%</span>
              </div>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${session.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
                />
              </div>
            </motion.div>
          )}

          {/* Meta row */}
          <motion.div 
            className="flex items-center justify-between flex-wrap gap-1.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 + 0.3, duration: 0.3 }}
          >
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1 text-[11px]" style={{ color: textSecondary }}>
                <Ic.clock /> {session.duration} min
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: textColor }}>
                <Ic.bolt /> +{session.xp} XP
              </span>
              {isCompleted && session.streak && (
                <span className="flex items-center gap-1 text-[11px] text-orange-400 font-semibold">
                  <Ic.flame /> {session.streak}× streak
                </span>
              )}
            </div>

            {/* CTA */}
            {isInProgress && (
              <motion.button 
                className="flex items-center gap-1.5 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-colors" 
                style={{ backgroundColor: textColor }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 4px 20px ${textColor}40`,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Ic.play /> Resume
              </motion.button>
            )}
            {isUpcoming && (
              <span className="flex items-center gap-1 text-[10px] font-semibold bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-lg" style={{ color: dark ? "#38bdf8" : "#0ea5e9" }}>
                <Ic.calendar /> {session.scheduledAt}
              </span>
            )}
            {isCompleted && (
              <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-semibold">
                <Ic.check /> {session.completedAt}
              </span>
            )}
            {session.status === "saved" && (
              <motion.button 
                className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors" 
                style={{ color: textColor, borderColor: textColor + "50", borderWidth: "1px", borderStyle: "solid" }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: textColor + "10",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Ic.play /> Start
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ tab }) {
  const { dark } = useTheme();
  const msgs = {
    "All":         { headline: "No sessions yet",       sub: "Explore mudras and begin your first practice." },
    "In Progress": { headline: "Nothing in progress",   sub: "Resume a saved session to continue your practice." },
    "Upcoming":    { headline: "Nothing scheduled",     sub: "Book a session to see it here." },
    "Completed":   { headline: "No completed sessions", sub: "Finish your first practice to build your history." },
    "Saved":       { headline: "Nothing saved",         sub: "Bookmark a session to come back to it anytime." },
  };
  const { headline, sub } = msgs[tab] || msgs["All"];
  const textPrimary = dark ? "#f9fafb" : "#111827";
  const textSecondary = dark ? "#6b7280" : "#9ca3af";
  
  return (
    <motion.div 
      className={`flex flex-col items-center justify-center py-16 text-center px-4 ${dark ? "bg-gray-800" : "bg-white"} rounded-2xl border ${dark ? "border-gray-700" : "border-gray-100"}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-2xl ${dark ? "bg-gray-700 border border-gray-600" : "bg-holistic-bg border border-purple-100"}`}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.2 }
        }}
      >
        ✦
      </motion.div>
      <p className="text-sm font-bold mb-1" style={{ color: textPrimary }}>{headline}</p>
      <p className="text-xs max-w-[220px] leading-relaxed" style={{ color: textSecondary }}>{sub}</p>
    </motion.div>
  );
}

// ─── Page Content ─────────────────────────────────────────────────────────────
function MySessionsContent() {
  const router = useRouter();
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.05,
    margin: "-50px"
  });

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filterMap = {
    "All": null,
    "In Progress": "in-progress",
    "Upcoming":    "upcoming",
    "Completed":   "completed",
    "Saved":       "saved",
  };

  const filtered = SESSIONS.filter(s => {
    const statusMatch = filterMap[activeFilter] === null || s.status === filterMap[activeFilter];
    const searchMatch = search === "" || s.title.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()) || s.instructor.toLowerCase().includes(search.toLowerCase());
    return statusMatch && searchMatch;
  });

  const completedCount  = SESSIONS.filter(s => s.status === "completed").length;
  const totalXP         = SESSIONS.filter(s => s.status === "completed").reduce((a, s) => a + s.xp, 0);
  const inProgressCount = SESSIONS.filter(s => s.status === "in-progress").length;
  const totalMinutes    = SESSIONS.filter(s => s.status === "completed").reduce((a, s) => a + s.duration, 0);

  const pageBg = dark ? "#111827" : "#f9fafb";
  const headerBg = dark ? "rgba(17,24,39,0.95)" : "rgba(255,255,255,0.95)";
  const border = dark ? "border-gray-700" : "border-gray-100";
  const textPrimary = dark ? "#f9fafb" : "#111827";
  const textSecondary = dark ? "#6b7280" : "#9ca3af";

  // Character animation for heading
  const charVariants = {
    hidden: { opacity: 0, y: 15, rotateX: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headingText = "My Sessions";
  const headingChars = headingText.split("");

  return (
    <motion.div 
      ref={sectionRef}
      className="min-h-screen" 
      style={{ backgroundColor: pageBg }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .fade-in { animation: fadeUp 0.2s cubic-bezier(.22,1,.36,1) both; }
        .scrollbar-none::-webkit-scrollbar { display:none; }
        .scrollbar-none { -ms-overflow-style:none; scrollbar-width:none; }
      `}</style>

      {/* ── Sticky header ── */}
      <motion.div 
        className={`backdrop-blur-md border-b ${border} ${spacing.sectionPaddingX} py-3.5 flex items-center justify-between sticky top-0 z-30`} 
        style={{ backgroundColor: headerBg }}
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center gap-3">
          <motion.button 
            onClick={() => router.back()} 
            className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all ${border}`} 
            style={{ backgroundColor: dark ? "#1f2937" : "#fff", color: textPrimary }}
            whileHover={{
              scale: 1.05,
              borderColor: textColor,
              color: textColor,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Ic.back />
          </motion.button>
          <div>
            <motion.h1 className="text-sm font-bold leading-tight" style={{ color: textPrimary }}>
              {headingChars.map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={charVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p 
              className="text-[10px]" 
              style={{ color: textSecondary }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {completedCount} completed · {inProgressCount} in progress
            </motion.p>
          </div>
        </div>
        <motion.button 
          className="flex items-center gap-1.5 text-xs font-semibold border px-3.5 py-2 rounded-xl hover:bg-primary/5 transition-colors" 
          style={{ color: textColor, borderColor: textColor + "50" }}
          whileHover={{
            scale: 1.05,
            backgroundColor: textColor + "10",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Ic.bookmark /> Browse sessions
        </motion.button>
      </motion.div>

      <div className={`${spacing.sectionPaddingX} py-5`}>
        <motion.div 
          className="max-w-2xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* ── Stats row ── */}
          <div className="flex gap-2.5 overflow-x-auto scrollbar-none pb-0.5">
            <StatCard icon={<Ic.check />}   value={completedCount}    label="Completed"  accent={dark ? "border-gray-700" : "bg-emerald-50 border-emerald-100"} />
            <StatCard icon={<Ic.bolt />}    value={`${totalXP} XP`}  label="Earned"     accent={dark ? "border-gray-700" : "bg-violet-50 border-violet-100"}   />
            <StatCard icon={<Ic.clock />}   value={`${totalMinutes}m`} label="Practised" accent={dark ? "border-gray-700" : "bg-sky-50 border-sky-100"}         />
            <StatCard icon={<Ic.flame />}   value="21d"               label="Streak"     accent={dark ? "border-gray-700" : "bg-orange-50 border-orange-100"}   />
          </div>

          {/* ── In-progress highlight (if any) ── */}
          {inProgressCount > 0 && (
            <motion.div 
              className="fade-in rounded-2xl bg-gradient-to-r from-[#9A85FE] to-[#b8aaff] p-4 flex items-center justify-between gap-3 shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 30px rgba(154, 133, 254, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <div>
                <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-0.5">Continue where you left off</p>
                <p className="text-sm font-bold text-white">{SESSIONS.find(s => s.status === "in-progress")?.title}</p>
                <p className="text-[11px] text-white/70 mt-0.5">{SESSIONS.find(s => s.status === "in-progress")?.progress}% complete · {SESSIONS.find(s => s.status === "in-progress")?.duration} min</p>
              </div>
              <motion.button 
                className="shrink-0 bg-white text-primary text-xs font-bold px-4 py-2 rounded-xl hover:bg-white/90 transition-colors flex items-center gap-1.5" 
                style={{ color: textColor }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Ic.play /> Resume
              </motion.button>
            </motion.div>
          )}

          {/* ── Search ── */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: textSecondary }}><Ic.search /></span>
            <motion.input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search sessions, mudras, instructors…" 
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
              style={{ 
                borderColor: dark ? "#374151" : "#e5e7eb",
                color: textPrimary
              }}
              whileFocus={{
                scale: 1.02,
                borderColor: textColor,
                boxShadow: `0 0 0 3px ${textColor}30`,
                transition: { duration: 0.2 }
              }}
            />
          </motion.div>

          {/* ── Filter tabs ── */}
          <motion.div 
            className="flex gap-1.5 overflow-x-auto scrollbar-none pb-0.5"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {FILTER_TABS.map((tab, idx) => {
              const count = tab === "All" ? SESSIONS.length : SESSIONS.filter(s => s.status === filterMap[tab]).length;
              const isActive = activeFilter === tab;
              return (
                <motion.button 
                  key={tab} 
                  onClick={() => setActiveFilter(tab)} 
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border ${isActive ? "text-white shadow-sm" : dark ? "bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600 hover:text-gray-200" : "bg-white text-gray-500 border-gray-200 hover:border-primary/40 hover:text-primary"}`}
                  style={isActive ? { backgroundColor: textColor, borderColor: textColor } : {}}
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 + 0.3, duration: 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab}
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : dark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-400"}`}>{count}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* ── Session list ── */}
          <motion.div 
            className="space-y-2.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {filtered.length === 0
              ? <EmptyState tab={activeFilter} />
              : filtered.map((s, i) => (
                  <div key={s.id} className="fade-in" style={{ animationDelay: `${i * 40}ms` }}>
                    <SessionCard session={s} index={i} />
                  </div>
                ))
            }
          </motion.div>

          {/* ── Footer nudge ── */}
          {filtered.length > 0 && (
            <motion.p 
              className="text-center text-[11px] pb-6" 
              style={{ color: textSecondary }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {filtered.length} session{filtered.length !== 1 ? "s" : ""} shown · <motion.span 
                className="font-semibold cursor-pointer hover:underline" 
                style={{ color: textColor }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >Browse all practices</motion.span>
            </motion.p>
          )}

        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MySessionsPage() {
  return (
    <ThemeProvider>
      <MySessionsContent />
    </ThemeProvider>
  );
}