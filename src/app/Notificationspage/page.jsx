"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { spacing } from "../../theme";
import { useTheme, ThemeProvider } from "../../context/ThemeContext";

// ─── Mock data ────────────────────────────────────────────────────────────────
const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    type: "streak",
    title: "21-day streak! 🔥",
    body: "You've practised every day for 21 days. Keep the momentum going.",
    time: "Just now",
    read: false,
    category: "Achievement",
  },
  {
    id: "n2",
    type: "session",
    title: "Yoga Nidra · Deep Rest starts soon",
    body: "Your scheduled session begins in 30 minutes. Prepare your space.",
    time: "29 min ago",
    read: false,
    category: "Reminder",
  },
  {
    id: "n3",
    type: "xp",
    title: "You earned 120 XP",
    body: "Gyan Mudra · Clarity Flow completed. Your Ether element is strengthening.",
    time: "2 hrs ago",
    read: false,
    category: "Achievement",
  },
  {
    id: "n4",
    type: "new",
    title: "New mudra added: Hakini Mudra",
    body: "A new brain-balancing mudra has been added to your Ether collection.",
    time: "Yesterday",
    read: true,
    category: "New Content",
  },
  {
    id: "n5",
    type: "session",
    title: "Surya Mudra · Vitality is scheduled",
    body: "Confirmed for Friday at 7:00 AM with Vikram Sharma.",
    time: "Yesterday",
    read: true,
    category: "Reminder",
  },
  {
    id: "n6",
    type: "tip",
    title: "Practice tip for Water element",
    body: "Evening Yoga Nidra sessions work best on an empty stomach — at least 2 hours after eating.",
    time: "2 days ago",
    read: true,
    category: "Tip",
  },
  {
    id: "n7",
    type: "xp",
    title: "Level up — Practitioner II",
    body: "You've crossed 500 XP. New sessions and advanced mudras are now unlocked.",
    time: "3 days ago",
    read: true,
    category: "Achievement",
  },
  {
    id: "n8",
    type: "new",
    title: "Instructor Meera Iyer posted a note",
    body: "\"Remember to release the mudra slowly and sit quietly for 2 minutes after each practice.\"",
    time: "4 days ago",
    read: true,
    category: "New Content",
  },
  {
    id: "n9",
    type: "tip",
    title: "Weekly insight: Ether element",
    body: "Ether governs space and sound. Gyan and Akash mudras are most potent during dawn and dusk.",
    time: "5 days ago",
    read: true,
    category: "Tip",
  },
  {
    id: "n10",
    type: "streak",
    title: "7-day streak milestone",
    body: "One full week of consistent practice. Your Ether balance score increased by 12%.",
    time: "2 weeks ago",
    read: true,
    category: "Achievement",
  },
];

const FILTER_TABS = ["All", "Achievement", "Reminder", "New Content", "Tip"];

// ─── Type config ──────────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  streak: { icon: "🔥", dot: "bg-orange-400" },
  session: { icon: "🧘", dot: "bg-sky-400" },
  xp: { icon: "✦", dot: "bg-violet-400" },
  new: { icon: "✦", dot: "bg-teal-400" },
  tip: { icon: "◇", dot: "bg-amber-400" },
};

const CATEGORY_COLORS = {
  Achievement: "bg-violet-50 text-violet-600 border-violet-200",
  Reminder: "bg-sky-50 text-sky-600 border-sky-200",
  "New Content": "bg-teal-50 text-teal-600 border-teal-200",
  Tip: "bg-amber-50 text-amber-600 border-amber-200",
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const Ic = {
  back: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
  check: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  trash: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>,
  settings: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
};

// ─── Notification card ────────────────────────────────────────────────────────
function NotifCard({ notif, onRead, onDelete }) {
  const { dark, textColor } = useTheme();
  const cfg = TYPE_CONFIG[notif.type] || TYPE_CONFIG.tip;

  const cardBg = dark ? "bg-gray-800" : (notif.read ? "bg-white" : "bg-gray-50");
  const cardBorder = dark ? "border-gray-700" : (notif.read ? "border-gray-100" : "border-gray-200");

  const cardVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.97 },
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
      className={`relative flex gap-3.5 p-4 rounded-2xl border transition-all duration-200 ${cardBg} ${cardBorder}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        y: -2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        transition: { duration: 0.2 }
      }}
    >
      {/* Unread dot */}
      {!notif.read && <motion.span 
        className={`absolute top-4 right-4 w-2 h-2 rounded-full ${cfg.dot}`}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />}

      {/* Icon */}
      <motion.div 
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${notif.read ? (dark ? "bg-gray-700 border border-gray-600" : "bg-gray-50 border border-gray-100") : (dark ? "bg-gray-700 border border-gray-600" : "bg-gray-50 border border-gray-200")}`}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.2 }
        }}
      >
        {cfg.icon}
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          <motion.span 
            className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[notif.category] || ""}`}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            {notif.category}
          </motion.span>
          <span className="text-[10px]" style={{ color: textColor }}>{notif.time}</span>
        </div>
        <motion.p 
          className={`text-sm leading-snug mb-0.5 ${notif.read ? "font-medium" : "font-bold"}`} 
          style={{ color: textColor }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          {notif.title}
        </motion.p>
        <p className="text-[11px] leading-relaxed" style={{ color: dark ? "#6b7280" : "#6b7280" }}>{notif.body}</p>
      </div>

      {/* Actions */}
      <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        {!notif.read && (
          <motion.button 
            onClick={() => onRead(notif.id)} 
            title="Mark as read" 
            className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${dark ? "border-gray-600 bg-gray-700 text-gray-400 hover:text-emerald-400 hover:border-emerald-500" : "bg-white border-gray-200 text-gray-400 hover:text-emerald-500 hover:border-emerald-200"}`}
            whileHover={{
              scale: 1.15,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.9 }}
          >
            <Ic.check />
          </motion.button>
        )}
        <motion.button 
          onClick={() => onDelete(notif.id)} 
          title="Dismiss" 
          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${dark ? "border-gray-600 bg-gray-700 text-gray-400 hover:text-red-400 hover:border-red-500" : "bg-white border-gray-200 text-gray-400 hover:text-red-400 hover:border-red-200"}`}
          whileHover={{
            scale: 1.15,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Ic.trash />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ filter }) {
  const { dark } = useTheme();
  const msgs = {
    All: { headline: "All clear", sub: "No notifications right now. Keep practising." },
    Achievement: { headline: "No achievements yet", sub: "Complete sessions and build your streak to earn them." },
    Reminder: { headline: "No reminders", sub: "Schedule a session to get reminded before it starts." },
    "New Content": { headline: "Nothing new", sub: "New mudras and sessions will appear here." },
    Tip: { headline: "No tips yet", sub: "Practice tips from your instructors will show up here." },
  };
  const { headline, sub } = msgs[filter] || msgs.All;

  return (
    <motion.div 
      className={`flex flex-col items-center justify-center py-16 text-center px-4 ${dark ? "bg-gray-800" : "bg-white"} rounded-2xl border ${dark ? "border-gray-700" : "border-gray-100"}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-2xl ${dark ? "bg-gray-700 border border-gray-600" : "bg-gray-50 border border-gray-200"}`}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.2 }
        }}
      >
        🔔
      </motion.div>
      <p className="text-sm font-bold mb-1" style={{ color: dark ? "#f9fafb" : "#111827" }}>{headline}</p>
      <p className="text-xs max-w-[220px] leading-relaxed" style={{ color: dark ? "#6b7280" : "#6b7280" }}>{sub}</p>
    </motion.div>
  );
}

// ─── Preference toggle ────────────────────────────────────────────────────────
function PrefToggle({ label, desc, on, onChange }) {
  const { dark, textColor } = useTheme();

  return (
    <motion.div 
      className={`flex items-center justify-between gap-3 py-3 border-b ${dark ? "border-gray-700" : "border-gray-100"} last:border-0`}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <motion.p 
          className="text-xs font-semibold" 
          style={{ color: dark ? "#e5e7eb" : "#374151" }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          {label}
        </motion.p>
        <p className="text-[11px]" style={{ color: dark ? "#6b7280" : "#6b7280" }}>{desc}</p>
      </div>
      <motion.button
        onClick={() => onChange(!on)}
        className={`w-10 h-5 rounded-full flex items-center transition-colors duration-200 shrink-0 ${on ? "justify-end" : "justify-start"}`}
        style={on ? { backgroundColor: textColor } : { backgroundColor: dark ? "#374151" : "#d1d5db" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          className="w-4 h-4 rounded-full bg-white shadow mx-0.5 transition-all"
          animate={{ x: on ? 4 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </motion.div>
  );
}

// ─── Page Content ─────────────────────────────────────────────────────────────
function NotificationsContent() {
  const router = useRouter();
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.05,
    margin: "-50px"
  });

  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState({
    sessionReminders: true,
    achievements: true,
    newContent: true,
    tips: false,
    emailDigest: false,
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = notifications.filter(n =>
    activeFilter === "All" ? true : n.category === activeFilter
  );

  const handleRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const handleDelete = (id) => setNotifications(prev => prev.filter(n => n.id !== id));
  const handleReadAll = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const handleClearAll = () => setNotifications(prev => prev.filter(n => !n.read || activeFilter !== "All"));

  const setPref = (key, val) => setPrefs(p => ({ ...p, [key]: val }));

  // Group into Today / Earlier
  const todayLabels = ["Just now", "29 min ago", "2 hrs ago"];
  const todayItems = filtered.filter(n => todayLabels.includes(n.time));
  const earlierItems = filtered.filter(n => !todayLabels.includes(n.time));

  const pageBg = dark ? "#111827" : "#f9fafb";
  const headerBg = dark ? "rgba(17,24,39,0.95)" : "rgba(255,255,255,0.95)";
  const border = dark ? "border-gray-700" : "border-gray-100";
  const textPrimary = dark ? "#f9fafb" : "#111827";
  const textMuted = dark ? "#6b7280" : "#6b7280";

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

  const headingText = "Notifications";
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
        .group:hover .group-hover\\:opacity-100 { opacity: 1; }
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
            style={{
              backgroundColor: dark ? "#1f2937" : "#fff",
              color: dark ? "#e5e7eb" : "#111827",
              borderColor: dark ? "#374151" : "#e5e7eb"
            }}
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
            <div className="flex items-center gap-2">
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
              {unreadCount > 0 && (
                <motion.span 
                  className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full" 
                  style={{ backgroundColor: textColor }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  {unreadCount}
                </motion.span>
              )}
            </div>
            <motion.p 
              className="text-[10px]" 
              style={{ color: textMuted }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
            </motion.p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <motion.button
              onClick={handleReadAll}
              className="text-[11px] font-semibold hover:underline"
              style={{ color: textColor }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              Mark all read
            </motion.button>
          )}
          <motion.button
            onClick={() => setShowPrefs(s => !s)}
            className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all ${showPrefs ? "text-white" : ""}`}
            style={{
              backgroundColor: showPrefs ? textColor : (dark ? "#1f2937" : "#fff"),
              borderColor: showPrefs ? textColor : (dark ? "#374151" : "#e5e7eb"),
              color: showPrefs ? "#fff" : (dark ? "#9ca3af" : "#6b7280")
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Ic.settings />
          </motion.button>
        </div>
      </motion.div>

      <div className={`${spacing.sectionPaddingX} py-5`}>
        <motion.div 
          className="max-w-2xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* ── Preferences panel ── */}
          {showPrefs && (
            <motion.div 
              className={`fade-in rounded-2xl border shadow-sm p-5 ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: dark ? "#e5e7eb" : "#111827" }}>Notification preferences</p>
                <motion.button 
                  onClick={() => setShowPrefs(false)} 
                  className="text-[11px]" 
                  style={{ color: dark ? "#6b7280" : "#6b7280" }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Done
                </motion.button>
              </div>
              <PrefToggle label="Session reminders" desc="Alert 30 min before a scheduled session" on={prefs.sessionReminders} onChange={v => setPref("sessionReminders", v)} />
              <PrefToggle label="Achievements & XP" desc="Streaks, level-ups, and milestones" on={prefs.achievements} onChange={v => setPref("achievements", v)} />
              <PrefToggle label="New content" desc="New mudras, sessions, and instructor notes" on={prefs.newContent} onChange={v => setPref("newContent", v)} />
              <PrefToggle label="Practice tips" desc="Weekly insights from instructors" on={prefs.tips} onChange={v => setPref("tips", v)} />
              <PrefToggle label="Weekly email digest" desc="Summary of your week delivered by email" on={prefs.emailDigest} onChange={v => setPref("emailDigest", v)} />
            </motion.div>
          )}

          {/* ── Filter tabs ── */}
          <motion.div 
            className="flex gap-1.5 overflow-x-auto scrollbar-none pb-0.5"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {FILTER_TABS.map((tab, idx) => {
              const count = tab === "All"
                ? notifications.filter(n => !n.read).length
                : notifications.filter(n => n.category === tab && !n.read).length;
              const isActive = activeFilter === tab;
              return (
                <motion.button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border ${isActive ? "text-white shadow-sm" : (dark ? "bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600 hover:text-gray-200" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700")}`}
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
                  {count > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : (dark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600")}`}>{count}</span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* ── Today group ── */}
          {todayItems.length > 0 && (
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest px-1" style={{ color: textColor }}>Today</p>
              {todayItems.map((n, i) => (
                <div key={n.id} className="fade-in group" style={{ animationDelay: `${i * 40}ms` }}>
                  <NotifCard notif={n} onRead={handleRead} onDelete={handleDelete} />
                </div>
              ))}
            </motion.div>
          )}

          {/* ── Earlier group ── */}
          {earlierItems.length > 0 && (
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest px-1" style={{ color: textColor }}>Earlier</p>
              {earlierItems.map((n, i) => (
                <div key={n.id} className="fade-in group" style={{ animationDelay: `${i * 40}ms` }}>
                  <NotifCard notif={n} onRead={handleRead} onDelete={handleDelete} />
                </div>
              ))}
            </motion.div>
          )}

          {/* ── Empty state ── */}
          {filtered.length === 0 && <EmptyState filter={activeFilter} />}

          {/* ── Clear read ── */}
          {filtered.filter(n => n.read).length > 0 && (
            <motion.button
              onClick={handleClearAll}
              className="w-full text-center text-[11px] hover:text-red-400 transition-colors pb-6 pt-2"
              style={{ color: textColor }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              Clear {filtered.filter(n => n.read).length} read notification{filtered.filter(n => n.read).length !== 1 ? "s" : ""}
            </motion.button>
          )}

        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NotificationsPage() {
  return (
    <ThemeProvider>
      <NotificationsContent />
    </ThemeProvider>
  );
}