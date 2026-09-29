"use client";

import Image from "next/image";
import { spacing, typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const BENEFITS = [
    {
        iconBg: "var(--journey-card)",
        title: "Expert Insights",
        desc: "Get expert insights on mudras, yoga nidra, and holistic wellness.",
        icon: IMAGES.mudras || IMAGES.mudras || "/images/expert-insights.svg",
        alt: "Expert Insights Icon",
    },
    {
        iconBg: "var(--benefit-2)",
        title: "Wellness Tips",
        desc: "Practical tips and guidance for a balanced lifestyle.",
        icon: IMAGES.IconYogaNidra || IMAGES.IconYogaNidra || "/images/wellness-tips.svg",
        alt: "Wellness Tips Icon",
    },
    {
        iconBg: "var(--problem-3)",
        title: "Exclusive Content",
        desc: "Access exclusive content, resources, and offers.",
        icon: IMAGES.IconPractice || IMAGES.IconPractice || "/images/exclusive-content.svg",
        alt: "Exclusive Content Icon",
    },
    {
        iconBg: "var(--about-card)",
        title: "Latest Updates",
        desc: "Stay updated with the latest news and events.",
        icon: IMAGES.OngoingStudies || IMAGES.OngoingStudies || "/images/latest-updates.svg",
        alt: "Latest Updates Icon",
    },
    {
        iconBg: "var(--benefit-3)",
        title: "New Feature",
        desc: "Description for new feature.",
        icon: IMAGES.OfflineAccess || IMAGES.OfflineAccess || "/images/latest-updates.svg",
        alt: "New Feature Icon",
    },
];

// Replace LotusIcon with Image
function LotusDivider() {
    const { dark, textColor } = useTheme();

    return (
        <div className="w-10 h-10 relative">
            <Image
                src={IMAGES.Energy || "/images/lotus-divider.svg"}
                alt="Lotus divider"
                width={52}
                height={50}
                className="w-full h-full object-contain"
                style={{
                    filter: dark ? "brightness(0.8) invert(1)" : "none",
                }}
            />
            {/* Color overlay - only in light mode */}
            {!dark && (
                <div
                    className="absolute inset-0 mix-blend-multiply"
                    style={{
                        backgroundColor: textColor,
                        opacity: 0.3,
                    }}
                />
            )}
        </div>
    );
}


export default function Lookingforsomething() {
    const { dark, textColor } = useTheme();

    // Calculate the primary color with opacity for inline style
    const primaryColor = "#9A85FE";
    const primaryWithOpacity = `${primaryColor}20`;

    return (
        <section className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`} style={{
            backgroundColor: dark ? "#111827" : "#ffffff",
        }}>
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 sm:gap-10">

                {/* Heading */}
                <div className="flex flex-col items-center gap-3">
                    <h2 className={typography.whySubscribe.heading} style={{ color: textColor }}>
                        Looking for something
                    </h2>
                    {/* Divider with lotus image */}
                    <div className="flex items-center gap-3">
                        <div className={typography.whySubscribe.dividerLine} style={{ backgroundColor: dark ? "#ffffff" : "#e5e7eb" }} />
                        <LotusDivider />
                        <div className={typography.whySubscribe.dividerLine} style={{ backgroundColor: dark ? "#ffffff" : "#e5e7eb" }} />
                    </div>
                </div>

                {/* Responsive Benefits Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 w-full place-items-center">
                    {BENEFITS.map((item, idx) => {
                        const isLastOddItem = BENEFITS.length % 2 !== 0 && idx === BENEFITS.length - 1;
                        return (
                            <div
                                key={idx}
                                className={`flex flex-col items-center text-center max-w-[180px] ${isLastOddItem ? 'col-span-2 sm:col-span-1' : ''}`}
                            >
                                {/* Icon circle with image */}
                                <div
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-3"
                                    style={{ backgroundColor: dark ? item.iconBg : item.iconBg }}
                                >
                                    <Image
                                        src={item.icon}
                                        alt={item.alt}
                                        width={36}
                                        height={36}
                                        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain"
                                    />
                                </div>
                                {/* Title */}
                                <p className="text-sm sm:text-base font-semibold mb-1" style={{ color: textColor }}>
                                    {item.title}
                                </p>
                                {/* Desc */}
                                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: dark ? "#ffffff" : "#6b7280" }}>
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Search banner */}
                <div className={typography.whySubscribe.searchBanner}>
                    {/* Left: icon + text */}
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                            backgroundColor: dark ? "#ffffff" : "#ffffff",
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={dark ? "#030303" : "#6b7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm sm:text-base font-medium" style={{ color: dark ? "#000000" : "#374151" }}>
                                Still can&apos;t find what you&apos;re looking for?
                            </p>
                            <p className="text-xs sm:text-sm" style={{ color: dark ? "#2b2c2e" : "#6b7280" }}>
                                Try searching our website for what you need.
                            </p>
                        </div>
                    </div>

                    {/* Right: search input */}
                    <div className="relative w-full sm:w-auto sm:min-w-[200px]">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 pr-10 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/30"
                            style={{
                                backgroundColor: dark ? "#1f2937" : "#ffffff",
                                color: dark ? "#e5e7eb" : "#374151",
                                border: dark ? "1px solid #ffffff" : "1px solid #e5e7eb",
                            }}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dark ? "#ffffff" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-1/2 -translate-y-1/2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </div>
                </div>

            </div>
        </section>
    );
}