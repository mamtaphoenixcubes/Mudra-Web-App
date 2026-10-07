"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import type { MouseEvent as ReactMouseEvent } from "react";
import { IMAGES } from "../../assets/assets";
import { useState, useRef, useEffect } from "react";
import { spacing, typography, btn } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface User {
  name: string;
  email: string;
  avatar: string | null;
  initials: string;
  notificationCount: number;
  profileImage?: any;
  googleProfileImage?: string | null;
}

interface NavItem {
  label: string;
  path: string;
}

interface AvatarProps {
  user: User | null;
  size?: number;
  dark: boolean;
  textColor: string;
}

interface NavLinkProps {
  item: NavItem;
  dark: boolean;
  textColor: string;
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
  isMobile?: boolean;
}

const HOW_IT_WORKS_SUBMENU: NavItem[] = [
  { label: "What are Mudras", path: "/WhatareMudras" },
  { label: "What is Yoga Nidra", path: "/whatisyoganidra" },
];

interface ProfileDropdownProps {
  user: User;
  onClose: () => void;
  onLogout: () => void;
  inline?: boolean;
}

interface ProfileButtonProps {
  user: User;
  onLogout: () => void;
}

const NAV_ACCENT = "#9A85FE";
const NAV_ACCENT_HOVER = "#8068E8";

// ─── Real auth state check ─────────────────────────────────────────────────
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const isLoggedInStorage = localStorage.getItem("isLoggedIn");
        const userData = localStorage.getItem("user");
        
        if (isLoggedInStorage === "true" && userData) {
          const parsedUser = JSON.parse(userData);
          setIsLoggedIn(true);
 const imageBaseUrl =
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";

const profileImage =
  parsedUser.profileImage?.formats?.medium?.url
    ? `${imageBaseUrl}${parsedUser.profileImage.formats.medium.url}`
    : parsedUser.profileImage?.formats?.small?.url
      ? `${imageBaseUrl}${parsedUser.profileImage.formats.small.url}`
      : parsedUser.profileImage?.url
        ? `${imageBaseUrl}${parsedUser.profileImage.url}`
        : null;

const avatar =
  profileImage ||
  parsedUser.googleProfileImage ||
  null;

const displayName =
  parsedUser.fullName ||
  parsedUser.username ||
  parsedUser.name ||
  "User";

setUser({
  name: displayName,
  email: parsedUser.email || "",
  avatar,
  initials: displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase(),
  notificationCount: 0,
  profileImage: parsedUser.profileImage,
  googleProfileImage: parsedUser.googleProfileImage || null,
});
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("userPreferences");
    setIsLoggedIn(false);
    setUser(null);
  };

  return { isLoggedIn, user, loading, logout };
};

// ─── Navigation Items ──────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: "About", path: "/about" },
  { label: "How It Works", path: "/WhatareMudras" },
  { label: "Features", path: "/Home#features" },
  { label: "Elements", path: "/FiveElements" },
  { label: "Blog", path: "/BlogLearning" }
];

const FEATURE_SUBMENU: NavItem[] = [
  { label: "Asanas", path: "/Asanas" },
  { label: "Meditation", path: "/feature-four" },
  { label: "Pranayam", path: "/feature-five" },
  { label: "Yoga Mudra", path: "/MudraLibrary" },
  { label: "Yoga Nidra", path: "/YogaNidraLibrary" },
];

const STATIC_PAGES = [
  { label: "Ailments / Mudras for Needs", path: "/AilmentsMudrasforNeeds" },
  { label: "Five Elements", path: "/FiveElements" },
  { label: "Origins & History", path: "/originshistory" },
  { label: "Traditions Beyond Yoga", path: "/TraditionsBeyondYoga" },
  { label: "Therapeutic Effects", path: "/TherapeuticEffects" },
  { label: "About Science (About Us)", path: "/AboutUs" },
  { label: "FAQ", path: "/FAQ" },
  { label: "Disclaimer", path: "/DisclaimerPage" },
  { label: "Privacy Policy", path: "/PrivacyPolicy" },
  { label: "Terms & Conditions", path: "/TermsConditions" },
];

interface MorePagesDropdownProps {
  dark: boolean;
  textColor: string;
}

function MorePagesDropdown({ dark, textColor }: MorePagesDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { 
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); 
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1 font-semibold text-sm hover:opacity-100 transition-opacity cursor-pointer py-1.5 focus:outline-none"
        style={{ color: textColor, opacity: 0.9 }}
      >
        <span>Explore Pages</span>
        <svg
          width="12" height="12"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute left-0 mt-3 w-60 rounded-2xl shadow-xl border z-50 overflow-hidden max-h-[350px] overflow-y-auto ${
            dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
          }`}
          style={{ animation: "dropdownIn 0.18s ease" }}
        >
          <div className="py-2">
            {STATIC_PAGES.map((page, idx) => (
              <Link
                key={page.label}
                href={page.path}
                onClick={() => setOpen(false)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="block w-full px-4 py-2.5 text-sm transition-colors text-left font-medium"
                style={{
                  color: hoveredIdx === idx ? textColor : (dark ? "#e5e7eb" : "#374151"),
                  backgroundColor: hoveredIdx === idx ? (dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)") : "transparent"
                }}
              >
                {page.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FeaturesDropdown({ dark }: { dark: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = FEATURE_SUBMENU.some((item) => pathname === item.path || pathname.startsWith(`${item.path}/`));

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="relative flex items-center gap-0.5" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={`${typography.navLink} whitespace-nowrap border-b-2 transition-all duration-200 ${isActive ? "border-[#9A85FE]" : "border-transparent hover:border-[#9A85FE]"} focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9A85FE]`}
        style={{ color: NAV_ACCENT, fontSize: "clamp(0.78rem, 1.05vw, 1.05rem)", paddingBottom: "4px", opacity: isActive ? 1 : undefined }}
      >
        Features
      </button>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Toggle Features submenu"
        aria-expanded={open}
        className="rounded p-1 text-[#9A85FE] transition-colors hover:bg-[#F1EDFF] hover:text-[#8068E8] dark:hover:bg-[#9A85FE]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9A85FE]"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className={`absolute left-0 top-full mt-6 w-40 overflow-hidden rounded-2xl border py-2 shadow-xl z-50 ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
          {FEATURE_SUBMENU.map((feature) => (
            <Link
              key={feature.label}
              href={feature.path}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-[#9A85FE] transition-colors hover:bg-[#F1EDFF] hover:text-[#8068E8] dark:hover:bg-[#9A85FE]/15"
            >
              {feature.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function HowItWorksDropdown({ dark, onNavigate }: { dark: boolean; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = HOW_IT_WORKS_SUBMENU.some((item) => pathname === item.path);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="relative flex items-center gap-0.5" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={`${typography.navLink} whitespace-nowrap border-b-2 transition-all duration-200 ${isActive ? "border-[#9A85FE]" : "border-transparent hover:border-[#9A85FE]"} focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9A85FE]`}
        style={{ color: NAV_ACCENT, fontSize: "clamp(0.78rem, 1.05vw, 1.05rem)", paddingBottom: "4px", opacity: isActive ? 1 : undefined }}
      >
        How It Works
      </button>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Toggle How It Works submenu"
        aria-expanded={open}
        className="rounded p-1 text-[#9A85FE] transition-colors hover:bg-[#F1EDFF] hover:text-[#8068E8] dark:hover:bg-[#9A85FE]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9A85FE]"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className={`absolute left-0 top-full mt-3 w-52 overflow-hidden rounded-2xl border py-2 shadow-xl z-50 ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
          {HOW_IT_WORKS_SUBMENU.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => { setOpen(false); onNavigate?.(); }}
              aria-current={pathname === item.path ? "page" : undefined}
              className={`block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#F1EDFF] hover:text-[#8068E8] dark:hover:bg-[#9A85FE]/15 ${pathname === item.path ? "text-[#8068E8]" : "text-[#9A85FE]"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


// ─── Avatar component ─────────────────────────────────────────────────────────
function Avatar({ user, size = 36, dark, textColor }: AvatarProps) {
  if (!user) return null;
  
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 overflow-hidden"
      style={{
        width: size, 
        height: size, 
        fontSize: size * 0.35,
        backgroundColor: textColor || (dark ? "#4b5563" : "#7c3aed")
      }}
    >
      {user.avatar ? (
        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
      ) : (
        user.initials || "U"
      )}
    </div>
  );
}

// ─── NavLink Component ──────────────────────────────────────────────────────
function NavLink({ item, dark, textColor, onClick, isMobile = false }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === item.path ||
    (item.label === "How It Works" && HOW_IT_WORKS_SUBMENU.some((subItem) => pathname === subItem.path)) ||
    (item.path === "/Home#features" && pathname === "/Home");

  return (
    <Link
      href={item.path}
      className={`${typography.navLink} whitespace-nowrap transition-all duration-200 ${
        isMobile ? "py-2" : ""
      } ${isActive && !isMobile ? "border-b-2 border-[#9A85FE]" : isMobile ? "border-l-[3px]" : "border-b-2 border-transparent hover:border-[#9A85FE]"}`}
      aria-current={isActive ? "page" : undefined}
      style={{
        color: textColor, // Always apply theme color
        borderLeft: isMobile ? `3px solid ${isActive || isHovered ? textColor : "transparent"}` : "none",
        paddingLeft: isMobile ? "12px" : "10px",
        paddingRight: isMobile ? "12px" : "10px",
        paddingBottom: isMobile ? "2px" : "4px",
        fontWeight: "500",
        fontSize: isMobile ? undefined : "clamp(0.78rem, 1.05vw, 1.05rem)",
        opacity: isActive ? 1 : 0.9,
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {item.label}
    </Link>
  );
}

// ─── Profile Dropdown ─────────────────────────────────────────────────────────
function ProfileDropdown({ user, onClose, onLogout, inline = false }: ProfileDropdownProps) {
  const router = useRouter();
  const { dark, textColor } = useTheme();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const menuItems = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      label: "Edit Profile",
      path: "/Editprofilepage",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      ),
      label: "Settings",
      path: "/ProfileSettings",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      label: "My Sessions",
      path: "/Mysessionspage",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
      label: "Notifications",
      path: "/Notificationspage",
      badge: user?.notificationCount || 0,
    },
  ];

  return (
    <div
      className={`${inline ? "w-full rounded-xl" : "absolute right-0 top-[calc(100%+12px)] w-64 rounded-2xl shadow-xl z-50"} border overflow-hidden ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
      style={inline ? undefined : { animation: "dropdownIn 0.18s ease" }}
    >
      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* User header */}
      {inline ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${dark ? "hover:bg-gray-700" : "hover:bg-[#F8F6FF]"}`}
        >
          <Avatar user={user} size={40} dark={dark} textColor={textColor} />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold leading-normal" style={{ color: NAV_ACCENT }}>{user?.name}</span>
            <span className="block truncate text-xs" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>{user?.email}</span>
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} style={{ color: NAV_ACCENT }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      ) : (
        <div className={`flex items-center gap-3 px-4 py-4 border-b ${dark ? "bg-gray-700 border-gray-600" : "bg-holistic-bg border-gray-100"}`}>
          <Avatar user={user} size={40} dark={dark} textColor={textColor} />
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-normal truncate" style={{ color: NAV_ACCENT }}>{user?.name}</p>
            <p className="text-xs truncate" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{user?.email}</p>
          </div>
        </div>
      )}

      {/* Menu items */}
      {(!inline || expanded) && <>
      <div className="py-2 border-t" style={{ borderColor: dark ? "#374151" : "#f3f4f6" }}>
        {menuItems.map(({ icon, label, path, badge }) => (
          <button
            key={label}
            onClick={() => { router.push(path); onClose(); }}
            onMouseEnter={() => setHoveredItem(label)}
            onMouseLeave={() => setHoveredItem(null)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors text-left"
            style={{
              color: hoveredItem === label ? NAV_ACCENT_HOVER : NAV_ACCENT,
              backgroundColor: hoveredItem === label ? (dark ? "rgba(154,133,254,0.16)" : "#F1EDFF") : "transparent",
            }}
          >
            <span className="text-current">{icon}</span>
            <span className="flex-1">{label}</span>
            {badge > 0 && (
              <span className="text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center" style={{ backgroundColor: textColor }}>
                {badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className={`border-t py-2 ${dark ? "border-gray-700" : "border-gray-100"}`}>
        <button
          onClick={() => { onLogout(); onClose(); }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log out
        </button>
      </div>
      </>}
    </div>
  );
}

// ─── Profile Button (desktop) ─────────────────────────────────────────────────
function ProfileButton({ user, onLogout }: ProfileButtonProps) {
  const { dark, textColor } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { 
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); 
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className={`font-sans flex items-center gap-2 rounded-full pl-1 pr-3 py-1 border transition-all ${dark ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-primary hover:shadow-sm"}`}
        style={{ borderColor: open ? NAV_ACCENT : undefined }}
      >
        <Avatar user={user} size={32} dark={dark} textColor={textColor} />
        <span
          className={`font-sans text-sm font-medium leading-normal hidden lg:block max-w-[120px] truncate ${dark ? "text-gray-300" : "text-primary-700"}`}
          style={{ fontSize: "clamp(0.65rem, 1vw, 1rem)", color: NAV_ACCENT }}
        >
          {user?.name?.split(" ")[0] || "User"}
        </span>
        {user?.notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 text-white text-[9px] font-bold rounded-full flex items-center justify-center" style={{ backgroundColor: textColor }}>
            {user.notificationCount}
          </span>
        )}
        <svg
          width="12" height="12"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`${dark ? "text-gray-400" : "text-gray-400"} transition-transform ${open ? "rotate-180" : ""}`}
          style={{ stroke: open ? textColor : undefined }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ProfileDropdown
          user={user}
          onClose={() => setOpen(false)}
          onLogout={onLogout}
        />
      )}
    </div>
  );
}

// ─── Navbar Content ─────────────────────────────────────────────────────────
function NavbarContent() {
  const router = useRouter();
  const pathname = usePathname();
  const { dark, textColor } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  const [mobileHowItWorksOpen, setMobileHowItWorksOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [getStartedHovered, setGetStartedHovered] = useState(false);
  const { isLoggedIn, user, loading, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navBg = dark ? "bg-gray-900" : "bg-white";
  const borderColor = dark ? "border-gray-700" : "border-gray-200";

  if (loading) {
    return (
      <div className={`sticky top-0 z-40 w-full border-b ${navBg} ${borderColor}`}>
        <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded animate-pulse ${dark ? "bg-gray-700" : "bg-gray-200"}`} />
            <div className={`w-20 h-6 rounded animate-pulse ${dark ? "bg-gray-700" : "bg-gray-200"}`} />
          </div>
          <div className={`w-24 h-10 rounded animate-pulse ${dark ? "bg-gray-700" : "bg-gray-200"}`} />
        </nav>
      </div>
    );
  }

  return (
    <div className={`sticky top-0 z-40 w-full border-b ${navBg} ${borderColor}`}>
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <nav className={`hidden lg:flex w-full max-w-[1440px] mx-auto items-center justify-between gap-2 px-3 lg:px-6 2xl:px-12 py-2 lg:py-3 relative z-40 ${navBg}`}>
        {/* Logo */}
        <Link href="/Home" className="flex items-center gap-1 shrink-0 group">
          <Image src={IMAGES.hero} alt="Mudra Hand" width={44} height={36} className="lg:w-[56px] lg:h-[46px]" />
          <span 
            className={typography.navBrand} 
            style={{
              color: NAV_ACCENT,
              fontSize: "clamp(1.1rem, 1.6vw, 1.75rem)",
            }}
          >
            MUDRAS
          </span>
        </Link>


        {/* Nav links */}
        <div className="flex min-w-0 items-center gap-2 lg:gap-4">
          <div className="flex min-w-0 items-center gap-1 lg:gap-2">
            {NAV_ITEMS.map((item) => (
              item.label === "How It Works" ? (
                <HowItWorksDropdown key={item.label} dark={dark} />
              ) : item.label === "Features" ? (
                <FeaturesDropdown key={item.label} dark={dark} />
              ) : (
                <NavLink
                  key={item.label}
                  item={item}
                  dark={dark}
                  textColor={NAV_ACCENT}
                />
              )
            ))}
            {/* <MorePagesDropdown dark={dark} textColor={NAV_ACCENT} /> */}
          </div>

          {/* Auth area */}
          {isLoggedIn && user ? (
            <ProfileButton user={user} onLogout={handleLogout} />
          ) : (
            <button 
              className={`${btn.primary} !h-9 !px-4 !text-sm text-white transition-colors duration-200 hover:bg-[#8068E8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A85FE]`}
              onClick={() => router.push("/Login")}
              onMouseEnter={() => setGetStartedHovered(true)}
              onMouseLeave={() => setGetStartedHovered(false)}
              style={{
                backgroundColor: getStartedHovered ? NAV_ACCENT_HOVER : NAV_ACCENT,
                color: "#ffffff",
              }}
            >
              Get Started
            </button>
          )}
        </div>
      </nav>

      {/* ── MOBILE NAVBAR ── */}
      <nav className={`lg:hidden flex w-full max-w-[1440px] mx-auto items-center justify-between px-4 py-3 relative z-40 ${navBg}`}>
        <Link href="/Home" className="flex items-center gap-2">
          <Image src={IMAGES.hero} alt="Mudra Hand" width={40} height={32} />
          <span 
            className={typography.navBrand} 
            style={{
              color: NAV_ACCENT,
            }}
          >
            MUDRAS
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Hamburger */}
          <button
            onClick={() => setIsMenuOpen((p) => !p)}
            className="flex flex-col gap-1.5 p-2"
          >
            <span 
              className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} 
              style={{ backgroundColor: textColor }} 
            />
            <span 
              className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} 
              style={{ backgroundColor: textColor }} 
            />
            <span 
              className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} 
              style={{ backgroundColor: textColor }} 
            />
          </button>
        </div>
      </nav>

      {/* ── MOBILE: Nav Dropdown ── */}
      {isMenuOpen && (
        <div 
          className={`lg:hidden fixed top-[57px] left-0 right-0 border-b shadow-lg z-50 px-4 py-4 max-h-[calc(100dvh-57px)] overflow-y-auto ${navBg} ${borderColor}`}
          style={{
            animation: "slideDown 0.3s ease"
          }}
        >
          <style>{`
            @keyframes slideDown {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div className={`flex flex-col ${spacing.cardGap}`}>

            {NAV_ITEMS.map((item) => (
              item.label === "How It Works" ? (
                <div key={item.label}>
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setMobileHowItWorksOpen((value) => !value)}
                      aria-expanded={mobileHowItWorksOpen}
                      className="flex-1 py-2 pl-3 text-left font-medium border-l-[3px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9A85FE]"
                      style={{
                        color: NAV_ACCENT,
                        borderLeftColor: HOW_IT_WORKS_SUBMENU.some((subItem) => pathname === subItem.path) ? NAV_ACCENT : "transparent",
                        fontSize: "clamp(0.78rem, 1.05vw, 1.05rem)",
                      }}
                    >
                      How It Works
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileHowItWorksOpen((value) => !value)}
                      aria-label="Toggle How It Works submenu"
                      aria-expanded={mobileHowItWorksOpen}
                      className="rounded p-2 text-[#9A85FE] transition-colors hover:bg-[#F1EDFF] hover:text-[#8068E8] dark:hover:bg-[#9A85FE]/15"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-200 ${mobileHowItWorksOpen ? "rotate-180" : ""}`}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </div>
                  {mobileHowItWorksOpen && (
                    <div className="ml-4 mt-1 flex flex-col border-l border-[#9A85FE]/30 pl-3">
                      {HOW_IT_WORKS_SUBMENU.map((subItem) => (
                        <Link key={subItem.path} href={subItem.path} onClick={() => { setIsMenuOpen(false); setMobileHowItWorksOpen(false); }} className="rounded-md px-3 py-2 text-sm font-medium text-[#9A85FE] transition-colors hover:bg-[#F1EDFF] hover:text-[#8068E8] dark:hover:bg-[#9A85FE]/15">
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.label === "Features" ? (
                <div key={item.label}>
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setMobileFeaturesOpen((value) => !value)}
                      aria-expanded={mobileFeaturesOpen}
                      className="flex-1 py-2 pl-3 text-left font-medium border-l-[3px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9A85FE]"
                      style={{
                        color: NAV_ACCENT,
                        borderLeftColor: mobileFeaturesOpen || FEATURE_SUBMENU.some((feature) => pathname === feature.path || pathname.startsWith(`${feature.path}/`)) ? NAV_ACCENT : "transparent",
                        fontSize: "clamp(0.78rem, 1.05vw, 1.05rem)",
                      }}
                    >
                      Features
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileFeaturesOpen((value) => !value)}
                      aria-label="Toggle Features submenu"
                      aria-expanded={mobileFeaturesOpen}
                      className="rounded p-2 text-[#9A85FE] transition-colors hover:bg-[#F1EDFF] hover:text-[#8068E8] dark:hover:bg-[#9A85FE]/15"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-200 ${mobileFeaturesOpen ? "rotate-180" : ""}`}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </div>
                  {mobileFeaturesOpen && (
                    <div className="ml-4 mt-1 flex flex-col border-l border-[#9A85FE]/30 pl-3">
                      {FEATURE_SUBMENU.map((feature) => (
                        <Link
                          key={feature.label}
                          href={feature.path}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setMobileFeaturesOpen(false);
                          }}
                          className="rounded-md px-3 py-2 text-sm font-medium text-[#9A85FE] transition-colors hover:bg-[#F1EDFF] hover:text-[#8068E8] dark:hover:bg-[#9A85FE]/15"
                        >
                          {feature.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  item={item}
                  dark={dark}
                  textColor={NAV_ACCENT}
                  isMobile={true}
                  onClick={() => setIsMenuOpen(false)}
                />
              )
            ))}

            <div className="flex flex-col border-t border-gray-150 dark:border-gray-800 pt-2">
              <button
                onClick={() => setMobileExploreOpen(!mobileExploreOpen)}
                className="flex items-center justify-between py-2 text-sm font-semibold transition-colors focus:outline-none"
                style={{
                  color: NAV_ACCENT,
                }}
              >
                <span>Explore Pages</span>
                <svg
                  width="12" height="12"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className={`transition-transform duration-200 ${mobileExploreOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {mobileExploreOpen && (
                <div className="flex flex-col pl-4 mt-1 gap-2 border-l border-gray-200 dark:border-gray-700 ml-1">
                  {STATIC_PAGES.map((page) => (
                    <Link
                      key={page.label}
                      href={page.path}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMobileExploreOpen(false);
                      }}
                      className="py-1.5 text-xs font-semibold hover:opacity-100 transition-opacity block"
                      style={{ color: NAV_ACCENT, opacity: 0.9 }}
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {isLoggedIn && user && (
              <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
                <ProfileDropdown
                  user={user}
                  inline
                  onClose={() => setIsMenuOpen(false)}
                  onLogout={handleLogout}
                />
              </div>
            )}
            {!isLoggedIn && (
              <div className="flex justify-center pt-1">
                <button
                  className={`${btn.primary} !h-10 !px-5 !text-sm text-white transition-colors duration-200 hover:bg-[#8068E8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A85FE]`}
                  onMouseEnter={() => setGetStartedHovered(true)}
                  onMouseLeave={() => setGetStartedHovered(false)}
                  style={{
                    backgroundColor: getStartedHovered ? NAV_ACCENT_HOVER : NAV_ACCENT,
                    color: "#ffffff",
                  }}
                  onClick={() => { setIsMenuOpen(false); router.push("/Login"); }}
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </>
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  return <NavbarContent />;
}
