"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets";
import { motion } from "framer-motion";

export default function DailyBanner({
    onExploreMudraLibrary,
    onBackToHome,
    onViewSessionHistory,
}) {
    const { dark, textColor } = useTheme();
    const router = useRouter();

    const handleExploreMudraLibrary = () => {
        if (onExploreMudraLibrary) {
            onExploreMudraLibrary();
        } else {
            router.push('/MudraLibrary');
        }
    };

    const handleBackToHome = () => {
        if (onBackToHome) {
            onBackToHome();
        } else {
            router.push('/');
        }
    };

    const handleViewSessionHistory = () => {
        if (onViewSessionHistory) {
            onViewSessionHistory();
        } else {
            router.push('/profile');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`w-full ${spacing.sectionPaddingX}`}
        >
            <div className={spacing.maxW.sectionBody}>
                <div className="flex flex-col gap-6 py-4">
                    {/* Encouragement banner */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="rounded-2xl border p-4 sm:p-5 flex items-start gap-3.5"
                        style={{
                            backgroundColor: dark ? "#1c1c1e" : "#f3f3f4",
                            borderColor: dark ? "#333333" : "#e5e5e5",
                        }}
                    >
                        <div
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center shrink-0 border"
                            style={{
                            borderColor: dark ? "#333333" : "#e5e5e5",
                        }}
                        >
                            <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                                <Image
                                    src={IMAGES.Consistency}
                                    alt="Heart"
                                    fill
                                    sizes="24px"
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div>
                            <h3
                                className="text-[16px] sm:text-[17px] mb-1"
                                style={{ color: dark ? "#f3f4f6" : "#111827" }}
                            >
                                Consistency is the bridge
                                 <br />
                                between intention and transformation.
                            </h3>
                            <p
                                className="text-[13.5px] sm:text-[14.5px] leading-relaxed"
                                style={{ color: dark ? "#9ca3af" : "#4b5563" }}
                            >
                               - Keep showing up for yourself.
                            </p>
                        </div>
                    </motion.div>

                    {/* Actions - increased width */}
                    <div className="flex flex-col items-center gap-3">
                        <motion.button
                            type="button"
                            onClick={handleExploreMudraLibrary}
                            className="w-full max-w-5xl flex items-center justify-center gap-2.5 rounded-2xl border py-3.5 text-[15px] sm:text-base font-medium transition-all duration-200 cursor-pointer hover:scale-[1.01]"
                            style={{
                                backgroundColor: dark ? "#1c1c1e" : "#f3f3f4",
                                borderColor: dark ? "#333333" : "#e5e5e5",
                                color: dark ? "#f3f4f6" : "#111827",
                            }}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                                <Image
                                    src={IMAGES.Share}
                                    alt="Share"
                                    fill
                                    sizes="24px"
                                    className="object-contain"
                                    style={{
                                        filter: dark ? 'brightness(0) invert(1)' : 'none'
                                    }}
                                />
                            </div>
                            Share My Streak
                        </motion.button>

                        <motion.button
                            type="button"
                            onClick={handleBackToHome}
                            className="w-full max-w-5xl flex items-center justify-center gap-2.5 rounded-2xl border py-3.5 text-[15px] sm:text-base font-medium transition-all duration-200 cursor-pointer hover:scale-[1.01]"
                            style={{
                                backgroundColor: dark ? "#1c1c1e" : "#f3f3f4",
                                borderColor: dark ? "#333333" : "#e5e5e5",
                                color: dark ? "#f3f4f6" : "#111827",
                            }}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                                <Image
                                    src={IMAGES.favourites}
                                    alt="Favourites"
                                    fill
                                    sizes="24px"
                                    className="object-contain"
                                    style={{
                                        filter: dark ? 'brightness(0) invert(1)' : 'none'
                                    }}
                                />
                            </div>
                            Back to Home
                        </motion.button>
                    </div>

                    {/* View session history link */}
                    <motion.button
                        type="button"
                        onClick={handleViewSessionHistory}
                        className="text-[14.5px] sm:text-[20px] font-medium underline underline-offset-4 mx-auto cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ color: textColor }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        View My Progress
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}