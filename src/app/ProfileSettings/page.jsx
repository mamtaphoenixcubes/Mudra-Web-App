"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { spacing } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme, ThemeModal, THEME_MODES } from "../../context/ThemeContext";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import useAuthStore from "../../store/useAuthStore";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Ic = {
  back: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
  edit: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
};

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="8.5" strokeWidth="2.5"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="17" x2="13" y2="17"/>
    </svg>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ enabled, onChange }) {
  const { textColor } = useTheme();
  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={onChange}
      style={enabled ? { backgroundColor: textColor } : {}}
      className={`relative inline-flex items-center w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${!enabled ? "bg-gray-300 dark:bg-gray-600" : ""}`}
    >
      <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${enabled ? "translate-x-5" : "translate-x-0.5"}`}/>
    </button>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function SectionBlock({ title, subtitle, children }) {
  const { dark, textColor } = useTheme();
  return (
    <div className="space-y-2">
      <div>
        <p className="text-xs font-bold" style={{ color: textColor }}>{title}</p>
        {subtitle && <p className="text-[11px] mt-0.5" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{subtitle}</p>}
      </div>
      <div className={`rounded-2xl border shadow-sm overflow-hidden ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
        {children}
      </div>
    </div>
  );
}

// ─── Row ──────────────────────────────────────────────────────────────────────
function Row({ icon, label, subtitle, right, onClick, last }) {
  const { dark, textColor } = useTheme();
  const inner = (
    <div className={`flex items-center gap-3 px-4 py-3.5 ${onClick ? `cursor-pointer transition-colors ${dark ? "hover:bg-gray-700/50" : "hover:bg-gray-50"}` : ""}`}>
      <div
        className="w-9 h-9 rounded-xl border flex items-center justify-center shrink-0"
        style={{ 
          backgroundColor: textColor + "15", 
          borderColor: dark ? "#374151" : "#e5e7eb",
          color: textColor 
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold" style={{ color: dark ? "#f9fafb" : "#111827" }}>{label}</p>
        {subtitle && <p className="text-[10px] mt-0.5" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{subtitle}</p>}
      </div>
      {right}
    </div>
  );
  return (
    <div>
      {onClick ? <button onClick={onClick} className="w-full text-left">{inner}</button> : inner}
      {!last && <div className={`h-px mx-4 ${dark ? "bg-gray-700/50" : "bg-gray-100"}`}/>}
    </div>
  );
}

// ─── REMINDERS ────────────────────────────────────────────────────────────────
const DEFAULT_REMINDERS = [
  { id: 1, title: "Daily Practice Reminder", schedule: "Every day at 7:00 AM",   enabled: true  },
  { id: 2, title: "Evening Wind Down",        schedule: "Every day at 9:00 PM",   enabled: true  },
  { id: 3, title: "Weekly Reflection",        schedule: "Every Sunday at 8:00 PM",enabled: false },
];

function AddReminderModal({ isOpen, onClose, onAdd }) {
  const { dark, textColor } = useTheme();
  const [title, setTitle] = useState("");
  const [schedule, setSchedule] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !schedule.trim()) return;
    onAdd({ id: Date.now(), title: title.trim(), schedule: schedule.trim(), enabled: true });
    setTitle(""); setSchedule(""); onClose();
  };

  if (!isOpen) return null;
  const inputCls = `w-full px-3 py-2 border rounded-xl text-xs focus:outline-none transition ${dark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500" : "border-gray-200 text-gray-800"}`;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className={`rounded-2xl w-full max-w-sm shadow-xl ${dark ? "bg-gray-800" : "bg-white"}`} onClick={e => e.stopPropagation()}>
        <div className={`flex items-center justify-between px-5 py-4 border-b ${dark ? "border-gray-700" : "border-gray-100"}`}>
          <p className="text-sm font-bold" style={{ color: textColor }}>Add Reminder</p>
          <button onClick={onClose} className={`p-1 rounded-full transition-colors ${dark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100"}`}>
            <CloseIcon />
          </button>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <label className="text-[11px] font-semibold block mb-1" style={{ color: textColor }}>Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="e.g., Morning Meditation" 
              className={inputCls}
              style={{ color: dark ? "#f9fafb" : "#111827" }}
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold block mb-1" style={{ color: textColor }}>Schedule</label>
            <input 
              type="text" 
              value={schedule} 
              onChange={e => setSchedule(e.target.value)} 
              placeholder="e.g., Every day at 7:00 AM" 
              className={inputCls}
              style={{ color: dark ? "#f9fafb" : "#111827" }}
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button 
              onClick={onClose} 
              className={`flex-1 py-2.5 border rounded-xl text-xs font-semibold transition-colors ${dark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit} 
              style={{ backgroundColor: textColor }} 
              className="flex-1 py-2.5 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RemindersSection() {
  const { dark, textColor } = useTheme();
  const [reminders, setReminders] = useState(DEFAULT_REMINDERS);
  const [modalOpen, setModalOpen] = useState(false);
  const toggleReminder = id => setReminders(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  const addReminder = r => setReminders(prev => [...prev, r]);
  
  const clockIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );

  return (
    <>
      <SectionBlock title="Reminders" subtitle="Stay consistent with gentle nudges.">
        {reminders.map((r, i) => (
          <Row 
            key={r.id} 
            icon={clockIcon} 
            label={r.title} 
            subtitle={r.schedule}
            right={<Toggle enabled={r.enabled} onChange={() => toggleReminder(r.id)}/>}
            last={false}
          />
        ))}
        <div className={`h-px mx-4 ${dark ? "bg-gray-700/50" : "bg-gray-100"}`}/>
        <button 
          onClick={() => setModalOpen(true)} 
          className={`w-full flex items-center justify-between px-4 py-3.5 transition-colors ${dark ? "hover:bg-gray-700/50" : "hover:bg-gray-50"}`}
        >
          <p className="text-xs font-semibold" style={{ color: textColor }}>Add New Reminder</p>
          <span style={{ color: dark ? "#6b7280" : "#9ca3af" }}><PlusIcon /></span>
        </button>
      </SectionBlock>
      <AddReminderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onAdd={addReminder}/>
    </>
  );
}

// ─── PREFERENCES ─────────────────────────────────────────────────────────────
const PREF_ITEMS = [
  { id: "theme",            icon: "moon",     title: "Theme",               subtitle: "Light",                 type: "nav",    modal: "theme"    },
  { id: "sound",            icon: "sound",    title: "Sound & Music",       subtitle: "Ambient sound on",      type: "nav",    modal: "sound"    },
  { id: "language",         icon: "globe",    title: "Language",            subtitle: "English",               type: "nav",    modal: "language" },
  { id: "sessionReminders", icon: "clock",    title: "Session Reminders",   subtitle: "Remind before session", type: "toggle", defaultEnabled: true  },
  { id: "autoNext",         icon: "play",     title: "Auto Next Session",   subtitle: "Automatically play next", type: "toggle", defaultEnabled: false },
  { id: "wifiOnly",         icon: "download", title: "Download over Wi-Fi", subtitle: "Save mobile data",      type: "toggle", defaultEnabled: true  },
];

const SOUND_CONFIG = {
  title: "Sound & Music",
  options: [
    { id: "on",      label: "Sound On",    icon: "🔊" },
    { id: "off",     label: "Sound Off",   icon: "🔇" },
    { id: "ambient", label: "Ambient Only",icon: "🎵", badge: "Popular" },
  ],
  valueMap: { on: "Sound On", off: "Sound Off", ambient: "Ambient Only" },
};

const LANGUAGE_CONFIG = {
  title: "Select Language",
  options: [
    { id: "en", label: "English", icon: "🇬🇧" },
    { id: "es", label: "Spanish", icon: "🇪🇸" },
    { id: "fr", label: "French",  icon: "🇫🇷" },
    { id: "de", label: "German",  icon: "🇩🇪" },
    { id: "hi", label: "Hindi",   icon: "🇮🇳" },
    { id: "ja", label: "Japanese",icon: "🇯🇵" },
    { id: "zh", label: "Chinese", icon: "🇨🇳" },
    { id: "pt", label: "Portuguese", icon: "🇵🇹" },
  ],
  valueMap: { en: "English", es: "Spanish", fr: "French", de: "German", hi: "Hindi", ja: "Japanese", zh: "Chinese", pt: "Portuguese" },
};

function PickerModal({ isOpen, onClose, config, selected, onSelect }) {
  const { dark, textColor } = useTheme();
  const [search, setSearch] = useState("");
  if (!isOpen) return null;
  const opts = config.options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className={`rounded-2xl w-full max-w-sm shadow-xl max-h-[80vh] flex flex-col ${dark ? "bg-gray-800" : "bg-white"}`} onClick={e => e.stopPropagation()}>
        <div className={`flex items-center justify-between px-5 py-4 border-b shrink-0 ${dark ? "border-gray-700" : "border-gray-100"}`}>
          <p className="text-sm font-bold" style={{ color: dark ? "#f9fafb" : "#111827" }}>{config.title}</p>
          <button onClick={onClose} className={`p-1 rounded-full transition-colors ${dark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100"}`}>
            <CloseIcon />
          </button>
        </div>
        {config.options.length > 4 && (
          <div className={`px-5 py-3 border-b shrink-0 ${dark ? "border-gray-700" : "border-gray-100"}`}>
            <input
              type="text" 
              placeholder="Search…" 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              autoFocus
              className={`w-full px-3 py-2 border rounded-xl text-xs focus:outline-none transition ${dark ? "bg-gray-700 border-gray-600 placeholder-gray-500" : "border-gray-200"}`}
              style={{ color: dark ? "#f9fafb" : "#111827" }}
            />
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {opts.map(o => {
            const isSelected = selected === o.id;
            return (
              <button
                key={o.id}
                onClick={() => { onSelect(o.id); onClose(); }}
                style={isSelected ? { borderColor: textColor, backgroundColor: textColor + "10" } : {}}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${!isSelected ? (dark ? "border-gray-700 hover:border-gray-600 hover:bg-gray-700" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50") : ""}`}
              >
                <span className="text-xl">{o.icon}</span>
                <span className="text-xs font-semibold flex-1 text-left" style={isSelected ? { color: textColor } : { color: dark ? "#e5e7eb" : "#1f2937" }}>
                  {o.label}
                </span>
                {o.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: textColor + "20", color: textColor }}>
                    {o.badge}
                  </span>
                )}
                {isSelected && <span style={{ color: textColor }}><CheckIcon /></span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const PREF_ICONS = {
  moon:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  sound:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>,
  globe:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/></svg>,
  clock:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  play:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  download: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
};

function PreferencesSection() {
  const { dark, rawMode, setRawMode, textColor } = useTheme();
  const [toggles, setToggles] = useState(() =>
    Object.fromEntries(PREF_ITEMS.filter(i => i.type === "toggle").map(i => [i.id, i.defaultEnabled]))
  );
  const [themeOpen, setThemeOpen] = useState(false);
  const [soundVal, setSoundVal] = useState("ambient");
  const [soundOpen, setSoundOpen] = useState(false);
  const [langVal, setLangVal] = useState("en");
  const [langOpen, setLangOpen] = useState(false);

  const getSubtitle = item => {
    if (item.id === "theme")    return THEME_MODES.find(m => m.id === rawMode)?.label || "Light";
    if (item.id === "sound")    return SOUND_CONFIG.valueMap[soundVal] || "Ambient Only";
    if (item.id === "language") return LANGUAGE_CONFIG.valueMap[langVal] || "English";
    return item.subtitle;
  };

  const handleNavClick = id => {
    if (id === "theme")    setThemeOpen(true);
    if (id === "sound")    setSoundOpen(true);
    if (id === "language") setLangOpen(true);
  };

  return (
    <>
      <SectionBlock title="Preferences" subtitle="Customize your experience.">
        {PREF_ITEMS.map((item, i) => (
          <Row
            key={item.id}
            icon={PREF_ICONS[item.icon]}
            label={item.title}
            subtitle={getSubtitle(item)}
            onClick={item.type === "nav" ? () => handleNavClick(item.id) : undefined}
            right={item.type === "nav"
              ? <span style={{ color: dark ? "#6b7280" : "#9ca3af" }}><ChevronRightIcon /></span>
              : <Toggle enabled={toggles[item.id]} onChange={() => setToggles(p => ({ ...p, [item.id]: !p[item.id] }))}/>}
            last={i === PREF_ITEMS.length - 1}
          />
        ))}
      </SectionBlock>

      <ThemeModal
        isOpen={themeOpen}
        onClose={() => setThemeOpen(false)}
      />
      <PickerModal
        isOpen={soundOpen}
        onClose={() => setSoundOpen(false)}
        config={SOUND_CONFIG}
        selected={soundVal}
        onSelect={setSoundVal}
      />
      <PickerModal
        isOpen={langOpen}
        onClose={() => setLangOpen(false)}
        config={LANGUAGE_CONFIG}
        selected={langVal}
        onSelect={setLangVal}
      />
    </>
  );
}

// ─── MORE ─────────────────────────────────────────────────────────────────────
function DetailModal({ isOpen, onClose, item }) {
  const { dark, textColor } = useTheme();
  if (!isOpen || !item) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className={`rounded-2xl w-full max-w-sm shadow-xl max-h-[80vh] flex flex-col ${dark ? "bg-gray-800" : "bg-white"}`} onClick={e => e.stopPropagation()}>
        <div className={`flex items-center justify-between px-5 py-4 border-b shrink-0 ${dark ? "border-gray-700" : "border-gray-100"}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl border flex items-center justify-center" style={{ backgroundColor: textColor + "15", borderColor: dark ? "#374151" : "#e5e7eb", color: textColor }}>
              {item.icon}
            </div>
            <p className="text-sm font-bold" style={{ color: dark ? "#f9fafb" : "#111827" }}>{item.label}</p>
          </div>
          <button onClick={onClose} className={`p-1 rounded-full transition-colors ${dark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100"}`}>
            <CloseIcon />
          </button>
        </div>
        <div className={`flex-1 overflow-y-auto p-5`} style={{ color: dark ? "#e5e7eb" : "#374151" }}>
          {item.content}
        </div>
        <div className={`px-5 py-4 border-t shrink-0 ${dark ? "border-gray-700" : "border-gray-100"}`}>
          <button onClick={onClose} style={{ backgroundColor: textColor }} className="w-full py-2.5 text-white rounded-xl text-xs font-semibold transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function MoreSection({ onLogOut }) {
  const { dark, textColor } = useTheme();
  const [activeItem, setActiveItem] = useState(null);

  const MORE_ITEMS = [
    {
      id: "about",
      icon: <InfoIcon />,
      label: "About Mudras",
      content: (
        <div className="space-y-3 text-xs leading-relaxed">
          <p style={{ color: dark ? "#e5e7eb" : "#374151" }}>
            Mudras are ancient hand gestures used in yoga and meditation to channel energy and promote healing.
          </p>
          <div 
            className="rounded-xl p-3 space-y-1" 
            style={{ 
              backgroundColor: textColor + "15",
              color: dark ? "#e5e7eb" : "#374151"
            }}
          >
            <p className="font-semibold mb-1" style={{ color: textColor }}>Key Benefits</p>
            <p style={{ color: dark ? "#e5e7eb" : "#374151" }}>• Balance the body's energy flow</p>
            <p style={{ color: dark ? "#e5e7eb" : "#374151" }}>• Enhance meditation and focus</p>
            <p style={{ color: dark ? "#e5e7eb" : "#374151" }}>• Promote physical and mental healing</p>
          </div>
        </div>
      ),
    },
    {
      id: "help",
      icon: <HelpIcon />,
      label: "Help & Support",
      content: (
        <div className="space-y-2 text-xs">
          <div 
            className="rounded-xl p-3" 
            style={{ 
              backgroundColor: textColor + "15",
              color: dark ? "#e5e7eb" : "#374151"
            }}
          >
            <p className="font-semibold mb-0.5" style={{ color: textColor }}>Contact</p>
            <p style={{ color: dark ? "#e5e7eb" : "#374151" }}>support@mudras.com</p>
          </div>
          <div 
            className="rounded-xl p-3" 
            style={{ 
              backgroundColor: textColor + "15",
              color: dark ? "#e5e7eb" : "#374151"
            }}
          >
            <p className="font-semibold mb-0.5" style={{ color: textColor }}>Live Chat</p>
            <p style={{ color: dark ? "#e5e7eb" : "#374151" }}>Available 24/7</p>
          </div>
        </div>
      ),
    },
    {
      id: "privacy",
      icon: <ShieldIcon />,
      label: "Privacy Policy",
      content: (
        <div className="space-y-2 text-xs leading-relaxed">
          <p style={{ color: textColor }}>We take your privacy seriously.</p>
          <div 
            className="rounded-xl p-3 space-y-1" 
            style={{ 
              backgroundColor: textColor + "15",
              color: dark ? "#e5e7eb" : "#374151"
            }}
          >
            <p style={{ color: dark ? "#e5e7eb" : "#374151" }}>✓ We never share your data</p>
            <p style={{ color: dark ? "#e5e7eb" : "#374151" }}>✓ You can delete your data anytime</p>
            <p style={{ color: dark ? "#e5e7eb" : "#374151" }}>✓ All data is encrypted</p>
          </div>
        </div>
      ),
    },
    {
      id: "terms",
      icon: <DocumentIcon />,
      label: "Terms of Use",
      content: (
        <div className="space-y-2 text-xs leading-relaxed">
          <p style={{ color: textColor }}>By using Mudras, you agree to these terms.</p>
          <div 
            className="rounded-xl p-3 space-y-1" 
            style={{ 
              backgroundColor: textColor + "15",
              color: dark ? "#e5e7eb" : "#374151"
            }}
          >
            <p style={{ color: dark ? "#e5e7eb" : "#374151" }}>• You must be 13+ to use this app</p>
            <p style={{ color: dark ? "#e5e7eb" : "#374151" }}>• All content is for wellness purposes</p>
            <p style={{ color: dark ? "#e5e7eb" : "#374151" }}>• Your account is non-transferable</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <SectionBlock title="More">
        {MORE_ITEMS.map((item, i) => (
          <Row
            key={item.id}
            icon={item.icon}
            label={item.label}
            onClick={() => setActiveItem(item)}
            right={
              <span style={{ color: dark ? "#6b7280" : "#9ca3af" }}>
                <ChevronRightIcon />
              </span>
            }
            last={i === MORE_ITEMS.length - 1}
          />
        ))}
      </SectionBlock>
      <button
        onClick={onLogOut}
        style={{ backgroundColor: textColor }}
        className="w-full flex items-center justify-center gap-2 text-white rounded-2xl py-4 text-sm font-semibold transition-colors"
      >
        <LogOutIcon />
        Log Out
      </button>
      <DetailModal isOpen={!!activeItem} onClose={() => setActiveItem(null)} item={activeItem} />
    </>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ProfileHero({ user, onEditProfile, onLogOut }) {
  return (
    <ProfileContent user={user} onEditProfile={onEditProfile} onLogOut={onLogOut} />
  );
}
function ProfileContent({ onEditProfile, onLogOut }) {
  const router = useRouter();

  const { isLoggedIn } = useAuthStore();
 const sectionRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    if (!isLoggedIn) {
      setUserData(null);
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        setUserData(null);
      }
    }
  }, [isLoggedIn]);

  const user = isLoggedIn ? userData : null;

  const name = user?.fullName || "Guest";
  const email = user?.email || "";
  const tagline = user?.bio || "Inner balance, every day";

  const imageBaseUrl =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";

  const profileImage =
    user?.profileImage?.formats?.medium?.url
      ? `${imageBaseUrl}${user.profileImage.formats.medium.url}`
      : user?.profileImage?.formats?.small?.url
        ? `${imageBaseUrl}${user.profileImage.formats.small.url}`
        : user?.profileImage?.url
          ? `${imageBaseUrl}${user.profileImage.url}`
          : user?.googleProfileImage || null;

  const { dark, textColor } = useTheme();

  // Dynamic colors based on dark mode
  const pageBg = dark ? "#111827" : "#f9fafb";
  const cardBg = dark ? "#1f2937" : "#ffffff";
  const borderColor = dark ? "#374151" : "#f3f4f6";
  const headerBg = dark ? "rgba(17,24,39,0.95)" : "rgba(255,255,255,0.95)";
  const textPrimary = dark ? "#f9fafb" : "#111827";
  const textSecondary = dark ? "#6b7280" : "#9ca3af";
  
  // Set CSS variables for theme colors
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--theme-text-color', textColor);
      document.documentElement.style.setProperty('--theme-bg-color', pageBg);
    }
  }, [textColor, pageBg]);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  const slideDown = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

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

  const headingText = "Profile";
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
      `}</style>

      {/* ── Sticky header ── */}
      <motion.div
        className={`border-b ${spacing.sectionPaddingX} py-3.5 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md`}
        style={{ backgroundColor: headerBg, borderColor: borderColor }}
        variants={slideDown}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-xl border flex items-center justify-center transition-all"
            style={{ 
              borderColor: borderColor, 
              backgroundColor: dark ? "#1f2937" : "#fff", 
              color: dark ? "#e5e7eb" : "#111827" 
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
              Your account & preferences
            </motion.p>
          </div>
        </div>
        <motion.button
          onClick={onEditProfile}
          className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-all border"
          style={{ color: textColor, borderColor: textColor + "50" }}
          whileHover={{
            scale: 1.05,
            backgroundColor: textColor + "10",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Ic.edit/>
          Edit Profile
        </motion.button>
      </motion.div>

      <div className={`${spacing.sectionPaddingX} py-5 pb-10`}>
        <motion.div 
          className="max-w-2xl mx-auto space-y-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* ── Profile card ── */}
          <div className="fade-in rounded-2xl border shadow-sm p-5" style={{ backgroundColor: cardBg, borderColor: borderColor }}>
            <div className="flex items-center gap-4">
              <div
                className="relative w-16 h-16 rounded-2xl shrink-0 overflow-hidden flex items-center justify-center border"
                style={{ backgroundColor: textColor + "15", borderColor: textColor + "30" }}
              >
               <div className="relative w-full h-full">
  {profileImage ? (
    <Image
      src={`${profileImage}`}
      alt={name || "Profile"}
      fill
      className="object-cover"
      sizes="64px"
    />
  ) : (
    <Image
      src={IMAGES.HolisticWellbeing}
      alt="Profile placeholder"
      fill
      className="object-contain"
    />
  )}
</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-bold truncate" style={{ color: textPrimary }}>{name}</p>
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border"
                    style={{ backgroundColor: textColor + "15", color: textColor, borderColor: textColor + "40" }}>
                    Member
                  </span>
                </div>
                <p className="text-[11px] truncate mb-1" style={{ color: textSecondary }}>{email}</p>
              {isHydrated && !isLoggedIn && (
                <div className="mt-3">
                  <GoogleLoginButton
                      clientId={process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID}
                      className="w-full"
                      onSuccess={(response) => {
                          console.log("GOOGLE LOGIN SUCCESS");
                  
                          if (response.success && response.data) {
                              // Store the COMPLETE user object from API
                              const userObj = response.data.user;
                  
                              // Tokens
                              const token = response.data.accessToken;
                              const refreshToken = response.data.refreshToken;
                              const firebaseToken = response.data.firebaseToken;
                  
                              // Always use localStorage for Google login
                              localStorage.setItem(
                                  "isLoggedIn",
                                  "true"
                              );
                  
                              // Store COMPLETE user object
                              localStorage.setItem(
                                  "user",
                                  JSON.stringify(userObj)
                              );
                  
                              // Store access token
                              localStorage.setItem(
                                  "token",
                                  token
                              );
                  
                              // Store refresh token
                              localStorage.setItem(
                                  "refreshToken",
                                  refreshToken
                              );
                  
                              // Store Firebase token
                              if (firebaseToken) {
                                  localStorage.setItem(
                                      "firebaseToken",
                                      firebaseToken
                                  );
                              }
                  
                              // Clear sessionStorage so there is no stale auth data
                              sessionStorage.removeItem("isLoggedIn");
                              sessionStorage.removeItem("user");
                              sessionStorage.removeItem("token");
                              sessionStorage.removeItem("refreshToken");
                              sessionStorage.removeItem("firebaseToken");
                  
                              // Update Zustand
                              useAuthStore.setState({
                                  user: userObj,
                                  token: token,
                                  refreshToken: refreshToken,
                                  firebaseToken: firebaseToken || null,
                                  isLoggedIn: true,
                                  loading: false,
                                  error: null,
                              });
                  
                              // Notify other components
                              window.dispatchEvent(
                                  new Event("storage")
                              );
                  
                              // Redirect
                              router.push(redirectTo);
                          } else {
                              setLocalError(
                                  response.message ||
                                  "Google login failed"
                              );
                          }
                      }}
                      onError={(error) => {
                          console.error(
                              "GOOGLE LOGIN FAILED:",
                              error
                          );
                  
                          setLocalError(
                              error?.message ||
                              "Google login failed"
                          );
                      }}
                  />
                </div>
                )}
                <span className="inline-flex items-center gap-1 text-[10px]" style={{ color: textSecondary }}>
                  <span className="relative w-3 h-3 opacity-60 inline-block">
                    <Image src={IMAGES.HolisticWellbeing} alt="" fill className="object-contain"/>
                  </span>
                  <span style={{ color: textColor }}>{tagline}</span>
                </span>
              </div>
              
            </div>
          </div>

          {/* <RemindersSection /> */}
          <PreferencesSection />
          <MoreSection onLogOut={onLogOut} />

        </motion.div>
      </div>
    </motion.div>
  );
}