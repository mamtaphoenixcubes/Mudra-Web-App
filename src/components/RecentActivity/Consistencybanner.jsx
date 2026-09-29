"use client";

import Image from "next/image";
import { typography, spacing } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets";
import { motion } from "framer-motion";

export default function ConsistencyBanner({ onViewProgress }) {
    const { dark } = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className={`w-full ${spacing.sectionPaddingX} p-5`}
        >
            <div
                className={typography.whySubscribe.privacyBanner}
                style={{
                    backgroundColor: dark ? "#2a2440" : "var(--holistic-bg)",
                }}
            >
                {/* Left: icon + text */}
                <div className={typography.whySubscribe.searchLeftSection}>
                    <div
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white flex items-center justify-center shrink-0"
                    >
                        <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                            <Image
                                src={IMAGES.calendar}
                                alt="Practice calendar"
                                fill
                                sizes="24px"
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <div className={typography.whySubscribe.searchTextWrapper}>
                        <p
                            className="text-[15px] sm:text-base font-semibold"
                            style={{ color: dark ? "#f3f4f6" : "#111827" }}
                        >
                            Keep practicing consistently!
                        </p>
                        <p
                            className="text-[13px] sm:text-sm"
                            style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                        >
                            Regular practice brings lasting transformation.
                        </p>
                    </div>
                </div>

                {/* Right: action */}
                <motion.button
                    type="button"
                    onClick={onViewProgress}
                    className="bg-white text-[13px] sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-sm hover:shadow transition-shadow cursor-pointer shrink-0"
                    style={{ color: dark ? "#1f2937" : "#111827" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    View Progress
                </motion.button>
            </div>
        </motion.div>
    );
}