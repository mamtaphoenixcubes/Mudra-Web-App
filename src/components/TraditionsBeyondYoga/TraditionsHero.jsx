"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { IMAGES } from "../../assets/assets";
import { heroImage, maxW, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

// ✅ Import common components
import Section from "../../common/Section";
import SiteContainer from "../../common/SiteContainer";

export default function TraditionsHero() {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.2,
        margin: "-50px",
    });

    // Animation variants
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    const bodyText =
        "Mudras are a universal language of hands and energy. They appear in many healing and spiritual traditions across cultures and time.";
    const bodyWords = bodyText.split(" ");

    return (
        // ✅ Section = outer <section>, forwards ref + className + sx
        <Section
            ref={sectionRef}
            className="therapeutic-hero"
            sx={{
                backgroundColor: dark ? "#111827" : "#f9fafb",
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                alignItems: "center",
                gap: { xs: 4, md: 6 },
                minHeight: { md: "80vh" },
                paddingTop: { xs: "40px", md: "80px" },
                paddingBottom: { xs: "40px", md: "80px" },
            }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{ display: "contents" }}
            >
                {/* ✅ SiteContainer wraps inner content for consistent max-width & padding */}
                <SiteContainer
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        alignItems: "center",
                        gap: { xs: 4, md: 6 },
                        py: 0, // Section already provides padding
                        gridColumn: { xs: "1", md: "1 / -1" },
                    }}
                >
                    {/* LEFT COLUMN */}
                    <motion.div
                        variants={fadeInLeft}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                maxWidth: { xs: "100%", md: "580px" },
                            }}
                        >
                            {/* Heading */}
                            <Typography
                                component="h1"
                                className={typography.MainHeading}
                                sx={{
                                    color: textColor,
                                    fontFamily: "var(--font-redhat)",
                                    fontWeight: 700,
                                    fontSize: {
                                        xs: "28px",
                                        sm: "34px",
                                        md: "40px",
                                        lg: "46px",
                                        xl: "50px",
                                    },
                                    lineHeight: 1.15,
                                }}
                            >
                                Traditions Beyond Yoga
                                <Box component="br" sx={{ display: { xs: "none", md: "block" } }} />
                                {" "}One Gesture. Many Paths.
                            </Typography>

                            {/* Underline */}
                            <Box
                                component={motion.div}
                                initial={{ width: 0 }}
                                animate={isInView ? { width: "3.5rem" } : { width: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                sx={{
                                    height: { xs: "2px", md: "3px" },
                                    backgroundColor: textColor,
                                    mt: { xs: 1, md: 2 },
                                    mb: { xs: 2, md: 4 },
                                }}
                            />

                            {/* Body — word by word */}
                            <Typography
                                component="p"
                                className={`${typography.heroBody} ${maxW.heroMbBody}`}
                                sx={{
                                    color: dark ? "#ffffff" : "#0F0F0F",
                                    mb: { xs: 3, md: 4 },
                                }}
                            >
                                {bodyWords.map((word, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={wordVariants}
                                        initial="hidden"
                                        animate={isInView ? "visible" : "hidden"}
                                        style={{
                                            display: "inline-block",
                                            marginRight: "0.25em",
                                        }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </Typography>

                            {/* Info Card */}
                            <Box
                                component={motion.div}
                                variants={fadeUp}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                transition={{ delay: 0.4 }}
                                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                sx={{
                                    borderRadius: { xs: 1, sm: 2 },
                                    px: { xs: 2, sm: 3, lg: 4 },
                                    py: { xs: 2, sm: 3, lg: 4 },
                                    display: "flex",
                                    alignItems: "center",
                                    gap: { xs: 2, sm: 3, lg: 4 },
                                    maxWidth: { xs: "100%", md: 480 },
                                    backgroundColor: dark ? `${textColor}10` : `${textColor}10`,
                                }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    style={{ flexShrink: 0 }}
                                >
                                    <Image
                                        src={IMAGES.Energy}
                                        alt="Yoga Nidra icon"
                                        width={48}
                                        height={48}
                                        style={{
                                            width: "100%",
                                            maxWidth: 48,
                                            height: "auto",
                                            objectFit: "contain",
                                            opacity: 0.7,
                                            filter: dark ? "brightness(0.8) invert(1)" : "none",
                                        }}
                                    />
                                </motion.div>

                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Typography
                                        className={typography.yogaNidraCard}
                                        sx={{ color: "#0F0F0F" }}
                                    >
                                        Different traditions, same wisdom hands
                                    </Typography>
                                    <Typography
                                        className={typography.yogaNidraCard}
                                        sx={{ color: "#0F0F0F" }}
                                    >
                                        that heal, connect and awaken
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </motion.div>

                    {/* RIGHT COLUMN — Hero Image */}
                       <motion.div
                              initial={{ opacity: 0 }}
                              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                              transition={{ duration: 0.6 }}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                              }}
                            >
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={
                                  isInView
                                    ? { opacity: 1, scale: 1 }
                                    : { opacity: 0, scale: 0.95 }
                                }
                                transition={{ duration: 0.7, delay: 0.2 }}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  width: "100%",
                                }}
                              >
                                <div className="relative w-full max-w-[440px] lg:max-w-[700px]">
                                  <Image
                                    src={IMAGES.hero}
                                    alt="Mudra Lotus Hand"
                                    width={800}
                                    height={800}
                                    priority
                                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 800px"
                                    className="w-full h-auto object-contain"
                                  />
                                </div>
                              </motion.div>
                            </motion.div>
                </SiteContainer>
            </motion.div>
        </Section>
    );
}