"use client";

import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

// ─── Config ─────────────────────────────────────────────────────────────────
// Swap these links for your real profiles/numbers.
const SOCIALS = [
  {
    name: "WhatsApp",
    href: "https://wa.me/910000000000",
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15-.2.29-.75.93-.92 1.12-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.6-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.08-.15-.65-1.56-.89-2.14-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.56-.01-.2 0-.51.07-.78.37-.26.29-1.02 1-1.02 2.43s1.05 2.82 1.19 3.01c.15.2 2.06 3.14 4.99 4.4.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.37-.07-.12-.26-.2-.55-.34z" />
        <path d="M12.02 2C6.5 2 2 6.48 2 11.98c0 1.87.5 3.62 1.44 5.13L2 22l5.02-1.4a10.03 10.03 0 004.99 1.32h.01c5.52 0 10-4.48 10-9.98C22.02 6.48 17.53 2 12.02 2zm0 18.06h-.01a8.06 8.06 0 01-4.12-1.13l-.3-.18-3.06.85.82-3-.19-.31a8.05 8.05 0 01-1.24-4.31c0-4.46 3.64-8.08 8.11-8.08 2.16 0 4.19.84 5.72 2.37a8.03 8.03 0 012.37 5.71c0 4.46-3.64 8.08-8.1 8.08z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/yourhandle",
    color: "#ba4ec4",
    icon: (
      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/yourpage",
    color: "#2c52ce",
    icon: (
      <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
        <path d="M13.5 21v-7.9h2.65l.4-3.08h-3.05V8.05c0-.89.25-1.5 1.52-1.5h1.63V3.86A21.8 21.8 0 0014.3 3.7c-2.27 0-3.83 1.39-3.83 3.93v2.4H8v3.08h2.47V21h3.03z" />
      </svg>
    ),
  },
];

// ─── Social Contact FAB ─────────────────────────────────────────────────────
export function SocialContactFab() {
  const { dark, textColor } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-7 z-40 flex flex-col items-center gap-3">
      <style>{`
        @keyframes social-pop {
          from { opacity: 0; transform: translateY(10px) scale(0.85); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* Social icons */}
      {open && (
        <div className="flex flex-col items-center gap-2.5">
          {SOCIALS.map((s, i) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              title={s.name}
              className="w-11 h-11 rounded-full shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
              style={{
                backgroundColor: dark ? "#1f2937" : "#ffffff",
                borderColor: dark ? "#374151" : "#E9E3D6",
                color: s.color,
                borderWidth: "1px",
                borderStyle: "solid",
                animation: `social-pop 0.25s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s backwards`,
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      )}

      {/* Toggle arrow */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Hide contact options" : "Show contact options"}
        className="relative w-12 h-12 rounded-full shadow-[0_10px_28px_-8px_rgba(47,74,63,0.55)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        style={{
          background: `linear-gradient(to bottom right, ${textColor}, ${textColor}dd)`,
          color: "#FBF7EF",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300"
          style={{ 
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: "#FBF7EF"
          }}
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
}

export default SocialContactFab;