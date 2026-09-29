"use client";

import Link from 'next/link';
import { typography, spacing } from '../../theme';
import { useTheme } from '../../context/ThemeContext';

export default function NotFoundHero() {
  const { dark, textColor } = useTheme();

  return (
    <div className={`flex flex-col items-center justify-center text-center px-4 ${spacing.sectionPaddingY}`} style={{
      backgroundColor: dark ? "#111827" : "#ffffff",
    }}>
      
      {/* 404 Number */}
      <h1 className="text-[120px] sm:text-[160px] lg:text-[200px] font-bold leading-none" style={{ color: textColor }}>
        404
      </h1>

      {/* Title */}
      <h2 className={`${typography.sectionSbHeading} mt-2 mb-3`} style={{ color: textColor }}>
        Page Not Found
      </h2>

      {/* Decorative Line - Responsive width for all screens */}
      <div className="w-25 sm:w-20 md:w-35 lg:w-40 xl:w-58 h-0.5 rounded-full mb-4 sm:mb-5 md:mb-6" style={{ backgroundColor: textColor }} />

      {/* Description */}
      <p className={`${typography.sectionMb} max-w-xs sm:max-w-sm md:max-w-md leading-relaxed mb-6 sm:mb-7 md:mb-8`} style={{ color: dark ? "#ffffff" : "#313235" }}>
        Oops! The page you're looking for doesn't exist or may have been moved.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="text-white text-sm font-medium px-5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-colors flex items-center gap-2"
        style={{
          backgroundColor: textColor,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.85";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
      >
        ← Back to Home
      </Link>

    </div>
  );
}