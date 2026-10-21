"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

// ✅ common components
import Section from "../../common/Section";
import SiteContainer from "../../common/SiteContainer";

export default function MudraLibraryHero() {
  const { dark } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    // ✅ Section = outer <section>, forwards ref + className + sx
    //    Section handles: background + vertical padding + min-height only
    <Section
      ref={sectionRef}
      className="mudra-library-hero"
      sx={{
        backgroundColor: dark ? "#111827" : "#ffffff",
        minHeight: { md: "90vh" },
        pt: { xs: "40px", md: "80px" },
        pb: { xs: "40px", md: "80px" },
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ display: "contents" }}
      >
        {/* ✅ SiteContainer = max-width + horizontal padding + 2-col grid */}
        <SiteContainer
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr" },
            alignItems: "center",
            gap: { xs: 4, lg: 6 },
            py: 0, // Section already handles vertical padding
          }}
        >
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {/* Main Title */}
            <Typography
              component="h1"
              sx={{
                color: "#9A85FE",
                fontFamily:
                  '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
                fontWeight: 500,
                fontSize: {
                  xs: "2rem",
                  sm: "3rem",
                  lg: "64px",
                },
                lineHeight: 1.2,
                mb: 1,
              }}
            >
              Mudra Library
            </Typography>

            {/* Underline accent */}
            <Box
              sx={{
                width: 64,
                height: "3px",
                backgroundColor: "#9A85FE",
                mb: 2.5,
                borderRadius: "999px",
              }}
            />

            {/* Subtitle */}
            <Typography
              component="p"
              sx={{
                color: dark ? "#ffffff" : "#111827",
                fontWeight: 600,
                fontSize: { xs: "0.875rem", sm: "1rem", lg: "1.125rem" },
                lineHeight: 1.6,
                mb: 3,
                maxWidth: 512,
              }}
            >
              Explore powerful hand gestures.
              <br />
              Simple to learn. Profound in effect.
            </Typography>

            {/* Info Card Banner */}
            <Box
              sx={{
                borderRadius: 1.5,
                p: { xs: 2, sm: 2.5 },
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                backgroundColor: "#EDE9FE",
                maxWidth: 448,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#9A85FE",
                }}
              >
                <Image
                  src={IMAGES.MudraIcon || IMAGES.Energy}
                  alt="Lotus icon"
                  width={36}
                  height={36}
                  style={{
                    width: 32,
                    height: 32,
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  color: "#111827",
                  fontWeight: 500,
                  lineHeight: 1.6,
                }}
              >
                <p>This is a simplified library.</p>
                <p>For complete details, guided practices</p>
                <p>and personalization, try the Mudras App.</p>
              </Box>
            </Box>
          </motion.div>

          {/* RIGHT COLUMN — Lotus illustration */}
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
                      <div className="relative w-full max-w-[440px] lg:max-w-[800px]">
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