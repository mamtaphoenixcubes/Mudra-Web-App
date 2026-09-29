"use client";

import { createContext, useContext, useState, useEffect } from "react";

// ─── Theme Context ─────────────────────────────────────────────────────────────
const ThemeContext = createContext(null);
export function useTheme() { return useContext(ThemeContext); }

// ─── Text Colors ──────────────────────────────────────────────────────────────
export const TEXT_COLORS = {
  charcoal: { hex: "#1f2937", bg: "#f3f4f6", label: "Charcoal" },
  blue:     { hex: "#9A85FE", bg: "#f5f3ff", label: "Blue"     },
  teal:     { hex: "#0d9488", bg: "#f0fdfa", label: "Teal"     },
  rose:     { hex: "#e11d48", bg: "#fff1f2", label: "Rose"     },
  indigo:   { hex: "#4f46e5", bg: "#eef2ff", label: "Indigo"   },
  amber:    { hex: "#b45309", bg: "#fffbeb", label: "Amber"    },
};

export const TEXT_COLOR_OPTIONS = [
  { id: "charcoal", label: "Charcoal", hex: "#1f2937", bg: "#f3f4f6" },
  { id: "blue",     label: "Blue",     hex: "#9A85FE", bg: "#f5f3ff" },
  { id: "teal",     label: "Teal",     hex: "#0d9488", bg: "#f0fdfa" },
  { id: "rose",     label: "Rose",     hex: "#e11d48", bg: "#fff1f2" },
  { id: "indigo",   label: "Indigo",   hex: "#4f46e5", bg: "#eef2ff" },
  { id: "amber",    label: "Amber",    hex: "#b45309", bg: "#fffbeb" },
];

export const THEME_MODES = [
  { id: "light", label: "Light", icon: "☀️" },
  { id: "dark",  label: "Dark",  icon: "🌙" },
];

// ─── Theme Modal ──────────────────────────────────────────────────────────────
export function ThemeModal({ isOpen, onClose }) {
  const {
    dark,
    textColorKey,
    setTextColorKey,
    textColor,
    allTextColorOptions,
    addCustomTextColor,
    rawMode,
    setRawMode,
  } = useTheme();

  const [showPicker, setShowPicker] = useState(false);
  const [pickerHex,  setPickerHex]  = useState("#6d28d9");
  const [hexInput,   setHexInput]   = useState("#6d28d9");
  const [pickerName, setPickerName] = useState("");
  const [mounted,    setMounted]    = useState(false);

  useEffect(() => {
    if (isOpen) {
      const t = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(t);
    }
    setMounted(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const surface = dark ? "bg-gray-900" : "bg-white";
  const border  = dark ? "border-gray-700/50" : "border-gray-200/70";
  const subsurf = dark ? "bg-gray-800" : "bg-[#f6f4f0]";
  const muted   = dark ? "text-gray-400" : "text-gray-400";

  function handleHexInput(val) {
    setHexInput(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) setPickerHex(val);
  }

  function handleAdd() {
    const name = pickerName.trim() || "Custom";
    addCustomTextColor(pickerHex, name);
    setShowPicker(false);
    setPickerName("");
    setHexInput("#6d28d9");
    setPickerHex("#6d28d9");
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-colors duration-300 ${
        mounted ? "bg-black/40 backdrop-blur-sm" : "bg-black/0"
      }`}
      onClick={onClose}
    >
      <div
        className={`rounded-[28px] w-full max-w-sm border overflow-hidden shadow-xl transition-all duration-300 ease-out ${surface} ${border} ${
          mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-[0.97]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-0">
          <div>
            <p className={`text-[10px] font-medium uppercase tracking-[0.15em] ${muted}`}>Settings</p>
            <p className="text-lg font-semibold mt-0.5" style={{ color: textColor }}>Appearance</p>
          </div>
          <button
            onClick={onClose}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${border} ${subsurf} ${muted} hover:opacity-70`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-6 pt-6 pb-1 space-y-6">
          {/* Mode — sliding pill toggle */}
          <div>
            <p className={`text-[10px] font-medium uppercase tracking-[0.15em] mb-3 ${muted}`}>Mode</p>
            <div className={`relative grid grid-cols-2 p-1 rounded-full border ${border} ${subsurf}`}>
              <div
                className="absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: "calc(50% - 4px)",
                  left: rawMode === "dark" ? "calc(50% + 2px)" : "4px",
                  background: textColor,
                }}
              />
              {THEME_MODES.map((m) => {
                const sel = rawMode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setRawMode(m.id)}
                    className="relative z-10 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-[13px] font-medium transition-colors"
                    style={{ color: sel ? "#fff" : dark ? "#9ca3af" : "#6b7280" }}
                  >
                    <span className="text-sm leading-none">{m.icon}</span>
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Color — circular swatch row */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className={`text-[10px] font-medium uppercase tracking-[0.15em] ${muted}`}>Text color</p>
              <p className="text-[10px] font-mono" style={{ color: textColor }}>{textColor}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {allTextColorOptions.map((c) => {
                const sel = textColorKey === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setTextColorKey(c.id)}
                    title={c.label}
                    className="group flex flex-col items-center gap-1.5"
                  >
                    <span
                      className="relative w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                      style={{
                        background: c.bg,
                        boxShadow: sel ? `0 0 0 2px ${surface === "bg-gray-900" ? "#ffffff" : "#ffffff"}, 0 0 0 4px ${c.hex}` : "none",
                      }}
                    >
                      <span className="w-4 h-4 rounded-full" style={{ background: c.hex }} />
                      {sel && (
                        <svg
                          className="absolute -top-1 -right-1 bg-white rounded-full"
                          width="14" height="14" viewBox="0 0 24 24" fill={c.hex} stroke="#fff" strokeWidth="1"
                        >
                          <circle cx="12" cy="12" r="11" />
                          <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className={`text-[10px] leading-none ${sel ? "font-medium" : ""}`} style={{ color: sel ? c.hex : dark ? "#ffffff" : "#9ca3af" }}>
                      {c.label}
                    </span>
                  </button>
                );
              })}

              {/* Custom swatch button */}
              <button onClick={() => setShowPicker((p) => !p)} className="group flex flex-col items-center gap-1.5">
                <span
                  className={`w-11 h-11 rounded-full flex items-center justify-center border border-dashed transition-transform duration-200 group-hover:scale-105 ${
                    dark ? "border-gray-600" : "border-gray-300"
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={muted}>
                    {showPicker
                      ? <line x1="5" y1="12" x2="19" y2="12" />
                      : <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>}
                  </svg>
                </span>
                <span className={`text-[10px] leading-none ${muted}`}>{showPicker ? "Close" : "Custom"}</span>
              </button>
            </div>

            {/* Picker panel */}
            {showPicker && (
              <div className={`mt-4 p-4 rounded-2xl border space-y-3 ${border} ${subsurf}`}>
                <div className="flex gap-2">
                  <input
                    type="color" value={pickerHex}
                    onChange={(e) => { setPickerHex(e.target.value); setHexInput(e.target.value); }}
                    className="w-10 h-10 rounded-full border cursor-pointer p-0.5"
                    style={{ borderColor: dark ? "#374151" : "#e5e7eb", background: "transparent" }}
                  />
                  <input
                    type="text" value={hexInput} onChange={(e) => handleHexInput(e.target.value)}
                    maxLength={7} placeholder="#hex"
                    className={`flex-1 h-10 px-3.5 rounded-full border text-xs font-mono ${dark ? "border-gray-600 bg-gray-700 text-gray-100" : "border-gray-200 bg-white text-gray-800"}`}
                  />
                </div>
                <input
                  type="text" value={pickerName} onChange={(e) => setPickerName(e.target.value)}
                  placeholder="Name (e.g. Ocean)"
                  className={`w-full h-10 px-3.5 rounded-full border text-xs ${dark ? "border-gray-600 bg-gray-700 text-gray-100" : "border-gray-200 bg-white"}`}
                />
                <button
                  onClick={handleAdd} style={{ background: pickerHex }}
                  className="w-full h-10 rounded-full text-white text-xs font-medium transition-opacity hover:opacity-85"
                >
                  Add color
                </button>
              </div>
            )}

            {/* Live preview */}
            <div
              className={`mt-4 relative overflow-hidden rounded-2xl px-5 py-4 border ${border}`}
              style={{ background: dark ? "rgba(255,255,255,0.02)" : textColor + "08" }}
            >
              <span
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-25 transition-colors duration-300"
                style={{ background: textColor }}
              />
              <p className="relative text-sm font-medium" style={{ color: textColor }}>Inner balance, every day.</p>
              <p className="relative text-xs mt-1" style={{ color: textColor  }}>Your wellness journey starts here.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`flex gap-2.5 px-6 py-5 mt-2`}>
          <button
            onClick={onClose}
            className={`h-11 px-5 rounded-full text-sm font-medium transition-colors ${subsurf} ${dark ? "text-gray-300" : "text-gray-600"} hover:opacity-80`}
          >
            Cancel
          </button>
          <button
            onClick={onClose} style={{ background: textColor }}
            className="flex-1 h-11 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-85"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Theme Provider ──────────────────────────────────────────────────────────
export function ThemeProvider({ children }) {
  const [textColorKey, setTextColorKeyRaw] = useState("charcoal");
  const [customTextColors, setCustomTextColors] = useState([]);
  const [rawMode, setRawMode] = useState("light");
  const [sysDark, setSysDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme_preferences");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.textColorKey) setTextColorKeyRaw(parsed.textColorKey);
        if (parsed.rawMode) setRawMode(parsed.rawMode);
        if (parsed.customTextColors) setCustomTextColors(parsed.customTextColors);
      }
    } catch (e) {
      console.error("Failed to load theme preferences:", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("theme_preferences", JSON.stringify({
        textColorKey,
        rawMode,
        customTextColors,
      }));
    } catch (e) {
      console.error("Failed to save theme preferences:", e);
    }
  }, [textColorKey, rawMode, customTextColors, isLoaded]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSysDark(mq.matches);
    const handler = (e) => setSysDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const dark = rawMode === "dark" || (rawMode === "system" && sysDark);

  useEffect(() => {
    if (isLoaded) {
      if (dark) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.backgroundColor = '#111827';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.backgroundColor = '#f9fafb';
      }
    }
  }, [dark, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      const color = TEXT_COLORS[textColorKey]?.hex ??
        customTextColors.find((c) => c.id === textColorKey)?.hex ??
        "#1f2937";
      document.documentElement.style.setProperty('--theme-text-color', color);
    }
  }, [textColorKey, customTextColors, isLoaded]);

  const allTextColorOptions = [...TEXT_COLOR_OPTIONS, ...customTextColors];

  const textColor =
    TEXT_COLORS[textColorKey]?.hex ??
    customTextColors.find((c) => c.id === textColorKey)?.hex ??
    "#1f2937";

  function addCustomTextColor(hex, label) {
    const id = `custom_${Date.now()}`;
    setCustomTextColors((prev) => [...prev, { id, label, hex, bg: hex + "18" }]);
    setTextColorKeyRaw(id);
  }

  const value = {
    dark,
    rawMode,
    setRawMode,
    textColorKey,
    setTextColorKey: setTextColorKeyRaw,
    textColor,
    allTextColorOptions,
    addCustomTextColor,
    isLoaded,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}