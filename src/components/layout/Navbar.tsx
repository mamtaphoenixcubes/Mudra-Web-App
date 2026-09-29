"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  onClick?: () => void;
  isMobile?: boolean;
}

interface ProfileDropdownProps {
  user: User;
  onClose: () => void;
  onLogout: () => void;
}

interface ProfileButtonProps {
  user: User;
  onLogout: () => void;
}

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
  { label: "Mudra Library", path: "/MudraLibrary" },
  { label: "Yoga Nidra", path: "/YogaNidraLibrary" },
  { label: "Features", path: "/Home#features" },
  { label: "Benefits", path: "/Home#benefits" },
  { label: "Blog", path: "/BlogLearning" }
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

  return (
    <Link
      href={item.path}
      className={`${typography.navLink} whitespace-nowrap transition-all duration-200 ${
        isMobile ? "py-2" : ""
      }`}
      style={{
        color: textColor, // Always apply theme color
        borderBottom: isMobile ? "none" : `2px solid ${isHovered ? textColor : "transparent"}`,
        borderLeft: isMobile ? `3px solid ${isHovered ? textColor : "transparent"}` : "none",
        paddingLeft: isMobile ? "12px" : "0",
        fontWeight: "500",
        opacity: 0.9,
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
function ProfileDropdown({ user, onClose, onLogout }: ProfileDropdownProps) {
  const router = useRouter();
  const { dark, textColor } = useTheme();

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
      className={`absolute right-0 top-[calc(100%+12px)] w-64 rounded-2xl shadow-xl border z-50 overflow-hidden ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
      style={{ animation: "dropdownIn 0.18s ease" }}
    >
      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* User header */}
      <div className={`flex items-center gap-3 px-4 py-4 border-b ${dark ? "bg-gray-700 border-gray-600" : "bg-holistic-bg border-gray-100"}`}>
        <Avatar user={user} size={40} dark={dark} textColor={textColor} />
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: dark ? "#f9fafb" : "#111827" }}>{user?.name}</p>
          <p className="text-xs truncate" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{user?.email}</p>
        </div>
      </div>

      {/* Menu items */}
      <div className="py-2">
        {menuItems.map(({ icon, label, path, badge }) => (
          <button
            key={label}
            onClick={() => { router.push(path); onClose(); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left ${dark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-holistic-bg"}`}
            style={{ color: dark ? "#e5e7eb" : "#374151" }}
          >
            <span className={`${dark ? "text-gray-400" : "text-gray-400"}`}>{icon}</span>
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
        className={`flex items-center gap-2 rounded-full pl-1 pr-3 py-1 border transition-all ${dark ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-primary hover:shadow-sm"}`}
        style={{ borderColor: open ? textColor : undefined }}
      >
        <Avatar user={user} size={32} dark={dark} textColor={textColor} />
        <span className={`text-sm font-medium hidden lg:block max-w-[120px] truncate ${dark ? "text-gray-300" : "text-gray-700"}`}>
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
  const { dark, textColor } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  const { isLoggedIn, user, loading, logout } = useAuth();
console.log(isLoggedIn, user, loading);
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navBg = dark ? "bg-gray-900" : "bg-white";
  const borderColor = dark ? "border-gray-700" : "border-gray-200";

  if (loading) {
    return (
      <nav className={`flex items-center justify-between px-4 md:px-8 py-4 border-b ${navBg} ${borderColor}`}>
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded animate-pulse ${dark ? "bg-gray-700" : "bg-gray-200"}`} />
          <div className={`w-20 h-6 rounded animate-pulse ${dark ? "bg-gray-700" : "bg-gray-200"}`} />
        </div>
        <div className={`w-24 h-10 rounded animate-pulse ${dark ? "bg-gray-700" : "bg-gray-200"}`} />
      </nav>
    );
  }

  return (
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <nav className={`hidden xl:flex items-center justify-between gap-6 lg:gap-8 xl:gap-12 ${spacing.sectionPaddingX} py-4 border-b relative z-40 ${navBg} ${borderColor}`}>
        {/* Logo */}
        <Link href="/Home" className="flex items-center gap-2 lg:gap-0 group">
          <Image src={IMAGES.hero} alt="Mudra Hand" width={60} height={48} className="lg:w-[80px] lg:h-[64px]" />
          <span 
            className={typography.navBrand} 
            style={{ 
              color: textColor,
            }}
          >
            MUDRAS
          </span>
        </Link>


        {/* Nav links */}
        <div className={`flex items-center ${spacing.cardGap}`}>
          <div className="flex items-center gap-2 lg:gap-5 xl:gap-8">
            {NAV_ITEMS.map((item) => (
              <NavLink 
                key={item.label} 
                item={item} 
                dark={dark} 
                textColor={textColor}
              />
            ))}
            <MorePagesDropdown dark={dark} textColor={textColor} />
          </div>

          {/* Auth area */}
          {isLoggedIn && user ? (
            <ProfileButton user={user} onLogout={handleLogout} />
          ) : (
            <button 
              className={btn.primary} 
              onClick={() => router.push("/Login")}
              style={{ 
                backgroundColor: textColor,
              }}
            >
              Get Started
            </button>
          )}
        </div>
      </nav>

      {/* ── MOBILE NAVBAR ── */}
      <nav className={`xl:hidden flex items-center justify-between px-4 py-3 border-b relative z-40 ${navBg} ${borderColor}`}>
        <Link href="/Home" className="flex items-center gap-2">
          <Image src={IMAGES.hero} alt="Mudra Hand" width={40} height={32} />
          <span 
            className={typography.navBrand} 
            style={{ 
              color: textColor,
            }}
          >
            MUDRAS
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Mobile profile avatar (logged in) */}
          {isLoggedIn && user && (
            <button
              onClick={() => setMobileProfileOpen((p) => !p)}
              className="relative"
            >
              <Avatar user={user} size={34} dark={dark} textColor={textColor} />
              {user.notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-white text-[9px] font-bold rounded-full flex items-center justify-center" style={{ backgroundColor: textColor }}>
                  {user.notificationCount}
                </span>
              )}
            </button>
          )}

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
          className={`xl:hidden fixed top-[57px] left-0 right-0 border-b shadow-lg z-50 px-4 py-4 ${navBg} ${borderColor}`}
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
              <NavLink 
                key={item.label} 
                item={item} 
                dark={dark} 
                textColor={textColor} 
                isMobile={true}
                onClick={() => setIsMenuOpen(false)}
              />
            ))}

            <div className="flex flex-col border-t border-gray-150 dark:border-gray-800 pt-2">
              <button
                onClick={() => setMobileExploreOpen(!mobileExploreOpen)}
                className="flex items-center justify-between py-2 text-sm font-semibold transition-colors focus:outline-none"
                style={{
                  color: textColor,
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
                      style={{ color: textColor, opacity: 0.8 }}
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {!isLoggedIn && (
              <button
                className={`${btn.primary} w-full`}
                style={{ 
                  backgroundColor: textColor,
                }}
                onClick={() => { setIsMenuOpen(false); router.push("/Login"); }}
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── MOBILE: Profile Dropdown ── */}
      {mobileProfileOpen && isLoggedIn && user && (
        <div 
          className="xl:hidden fixed top-[57px] right-0 w-72 border shadow-xl z-50 rounded-bl-2xl overflow-hidden"
          style={{ 
            backgroundColor: dark ? "#1f2937" : "#fff", 
            borderColor: dark ? "#374151" : "#e5e7eb",
            animation: "slideDown 0.3s ease"
          }}
        >
          <ProfileDropdown
            user={user}
            onClose={() => setMobileProfileOpen(false)}
            onLogout={handleLogout}
          />
        </div>
      )}
    </>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  return <NavbarContent />;
}