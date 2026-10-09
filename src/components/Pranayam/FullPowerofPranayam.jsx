"use client";

import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

// ── Feature list icons (Images) — Pranayama related ───────────
const features = [
  {
    icon: IMAGES.MudraIcon,
    title: "50+ Pranayama techniques with complete details",
    desc: "Benefits, how to do, precautions.",
  },
  {
    icon: IMAGES.Body,
    title: "Personalized Breath Recommendations",
    desc: "For your body, mind and lifestyle.",
  },
  {
    icon: IMAGES.BellIcon,
    title: "Practice Tools & Reminders",
    desc: "Track progress and stay consistent.",
  },
  {
    icon: IMAGES.LeafIcon,
    title: "Guided Breath Sessions",
    desc: "Integrated with Yoga Nidra.",
  },
];

// ── Component ──────────────────────────────────────────────────
export default function FullPowerofPranayam() {
  const { dark, textColor } = useTheme();

  return (
    <section
      className={`w-full ${spacing.sectionPaddingX} py-8 md:py-10 lg:py-14`}
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
    >
      <div className={spacing.container}>

        <div className={`bg-[#FFE4EC] ${spacing.fullpower}`}>

          {/* ── Col 1: Image ── */}
          <div
            className="w-full md:w-[22%] lg:w-[20%] xl:w-[18%] aspect-[4/3] md:aspect-auto rounded-xl overflow-hidden shrink-0 self-stretch"
            style={{
              backgroundColor: dark ? "#374151" : "#e5e7eb",
            }}
          >
            <div className="w-full h-full">
              {IMAGES.Honorenergy ? (
                <Image
                  src={IMAGES.Honorenergy}
                  alt="Pranayama practice at sunset"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-200 to-pink-200" />
              )}
            </div>
          </div>

          {/* ── Col 2: Text + buttons ── */}
          <div className="flex flex-col justify-center flex-1 md:max-w-[38%] lg:max-w-[36%]">

            {/* Heading */}
            <h2
              className={`font-bold leading-tight mb-2 ${typography.textfull} md:mb-3`}
              style={{ color: textColor }}
            >
              Unlock the Full Power of Pranayama
            </h2>

            <p
              className="text-[11px] sm:text-xs md:text-sm lg:text-[15px] leading-relaxed mb-4 md:mb-5 lg:mb-6"
              style={{ color: dark ? "#000000" : "#4b5563" }}
            >
              Get detailed benefits, step-by-step breathing guidance, personalized recommendations and practice reminders.
            </p>

            {/* Buttons */}
            <div className="flex flex-row items-center gap-2 sm:gap-3 flex-wrap">
              <button
                className={`
                  ${typography.btnText}
                  ${spacing.btnPaddingX}
                  ${spacing.btnHeight}
                  rounded-lg
                  transition-colors
                  cursor-pointer
                  whitespace-nowrap
                  shadow-[7.19px_8.13px_2.65px_0px_rgba(0,0,0,0.06)]
                `}
                style={{
                  backgroundColor: textColor,
                  color: "#ffffff",
                }}
              >
                Explore the Mudras App
              </button>

              <button
                className={`
                  bg-white text-gray-900
                  ${typography.btnText}
                  ${spacing.btnPaddingX}
                  ${spacing.btnHeight}
                  rounded-lg
                  border border-gray-200
                  hover:bg-gray-50
                  transition-colors
                  cursor-pointer
                  whitespace-nowrap
                  shadow-[7.19px_8.13px_2.65px_0px_rgba(0,0,0,0.06)]
                `}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* ── Vertical divider (md+) ── */}
          <div className="hidden md:flex items-stretch">
            <div
              className="w-px self-stretch"
              style={{
                backgroundColor: dark ? "#374151" : "#f9c8d8",
              }}
            />
          </div>

          {/* ── Horizontal divider (mobile) ── */}
          <div
            className="md:hidden h-px w-full"
            style={{
              backgroundColor: dark ? "#374151" : "#f9c8d8",
            }}
          />

          {/* ── Col 3: Feature list ── */}
          <div className="flex flex-col justify-center gap-3 md:gap-3.5 lg:gap-4 md:flex-1 md:pl-2 lg:pl-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-2.5 md:gap-3">
                {/* Icon circle */}
                <div
                  className="w-8 h-8 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
                  style={{
                    backgroundColor: dark ? "#ffffff" : "rgba(255,255,255,0.7)",
                  }}
                >
                  {f.icon ? (
                    <Image
                      src={f.icon}
                      alt={f.title}
                      width={32}
                      height={32}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <span
                      className="w-4 h-4 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5"
                      style={{ color: dark ? "#6b7280" : "#374151" }}
                    />
                  )}
                </div>
                {/* Text */}
                <div>
                  <p
                    className="text-[11px] sm:text-xs md:text-[11px] lg:text-xs xl:text-sm font-semibold leading-tight"
                    style={{ color: textColor }}
                  >
                    {f.title}
                  </p>
                  <p
                    className="text-[10px] sm:text-[10px] md:text-[10px] lg:text-[11px] leading-snug mt-0.5"
                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}