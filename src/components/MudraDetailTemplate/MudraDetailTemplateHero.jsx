"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Share2 } from "lucide-react";

import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

import Container from "../../common/Container";
import Section from "../../common/Section";
import SiteContainer from "../../common/SiteContainer";

export default function MudraDetailHero({
  mudra,
  category: propCategory = "Mudras",
  title: propTitle = "Gyan Mudra",
  tags: propTags = ["Mind", "Clarity", "Awareness"],
  description: propDescription = "Gyan Mudra is the mudra of knowledge. It enhances concentration, sharpens memory, and brings clarity of thought. Regular practice helps in calming the mind and improving focus.",
  onPracticeClick,
  onBenefitsClick,
  onLikeClick,
  onShareClick,
  isLiked = false,
}) {
  const IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1337";

  const category = mudra?.categories?.[0]?.Name || propCategory;
  const title = mudra?.name || propTitle;

  const intentionsList = mudra?.intentions?.map((t) => t.name) || [];
  const tags = intentionsList.length > 0 ? intentionsList : propTags;

  const description =
    mudra?.web?.HeroSection?.Description ||
    mudra?.description ||
    propDescription;

  const heroImageUrl = mudra?.web?.HeroSection?.HeroImage?.url
    ? `${IMAGE_BASE_URL}${mudra.web.HeroSection.HeroImage.url}`
    : null;

  const { dark } = useTheme();

  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Section
      className={`mudra-detail-hero w-full py-10 sm:py-12 md:py-16 px-6 sm:px-10 lg:px-16`}
      sx={{
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
    >
      <SiteContainer
        sx={{
          width: "100%",
          maxWidth: "1600px",
          py: 0,
        }}
      >
        <Container
          className="mudra-detail-hero-container"
          sx={{
            width: "100%",
            maxWidth: "100%",
            px: 0,
          }}
        >
          <motion.div
            ref={sectionRef}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
            style={{
              width: "100%",
              maxWidth: "100%",
            }}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* LEFT: Text content */}
            <motion.div
              className="flex flex-col items-start min-w-0"
              variants={fadeInLeft}
            >
              {/* Breadcrumb */}
              <motion.nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-xs sm:text-sm mb-4 font-normal"
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Link
                  href="/Home"
                  className="hover:text-[#9A85FE] transition-colors cursor-pointer"
                  style={{ color: dark ? "#9ca3af" : "#0F0F0F99" }}
                >
                  Home
                </Link>

                <span
                  className="select-none"
                  style={{ color: dark ? "#4b5563" : "#0F0F0F99" }}
                >
                  &gt;
                </span>

                <Link
                  href="/MudraLibrary"
                  className="hover:text-[#9A85FE] transition-colors cursor-pointer"
                  style={{ color: dark ? "#9ca3af" : "#0F0F0F99" }}
                >
                  Mudras
                </Link>

                <span
                  className="select-none"
                  style={{ color: dark ? "#4b5563" : "#0F0F0F99" }}
                >
                  &gt;
                </span>

                <span
                  className="font-medium"
                  style={{ color: dark ? "#e5e7eb" : "#0F0F0F99" }}
                >
                  {title}
                </span>
              </motion.nav>

              {/* Heading */}
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#9A85FE] tracking-tight mb-3"
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 15 }
                }
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {title}
              </motion.h1>

              {/* Tag pill badge */}
              <motion.div
                className="inline-flex items-center font-medium text-xs sm:text-sm rounded-full px-4 py-1.5 mb-5"
                style={{
                  backgroundColor: dark ? "#2e1065" : "#EDE9FE",
                  color: "#00000080",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {tags.join(" • ")}
              </motion.div>

              {/* Description text */}
              <motion.p
                className="text-sm sm:text-base leading-relaxed mb-6 max-w-xl"
                style={{ color: dark ? "#9ca3af" : "#0F0F0F" }}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {description}
              </motion.p>

              {/* CTA Action Buttons */}
              <motion.div
                className="flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.button
                  onClick={onPracticeClick}
                  className="bg-[#9A85FE] hover:bg-[#8B5CF6] text-white font-medium text-sm rounded-lg px-5 py-2.5 transition-colors shadow-xs"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  How to Practice
                </motion.button>

                <motion.button
                  onClick={onBenefitsClick}
                  className="font-medium text-sm rounded-lg px-5 py-2.5 transition-colors shadow-2xs border"
                  style={{
                    backgroundColor: dark ? "#1f2937" : "#ffffff",
                    borderColor: dark ? "#374151" : "#e5e7eb",
                    color: dark ? "#e5e7eb" : "#374151",
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: dark ? "#374151" : "#f9fafb",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Benefits
                </motion.button>

                <motion.button
                  onClick={onLikeClick}
                  className={`flex items-center gap-2 border font-medium text-sm rounded-lg px-4 py-2.5 transition-colors shadow-2xs ${
                    isLiked ? "border-red-200 bg-red-50 text-red-600" : ""
                  }`}
                  style={
                    !isLiked
                      ? {
                          backgroundColor: dark ? "#1f2937" : "#ffffff",
                          borderColor: dark ? "#374151" : "#e5e7eb",
                          color: dark ? "#e5e7eb" : "#374151",
                        }
                      : undefined
                  }
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart
                    size={16}
                    fill={isLiked ? "currentColor" : "none"}
                    className={isLiked ? "text-red-500" : ""}
                    style={
                      !isLiked
                        ? { color: dark ? "#9ca3af" : "#6b7280" }
                        : undefined
                    }
                  />
                  <span>{isLiked ? "Liked" : "Like"}</span>
                </motion.button>

                <motion.button
                  onClick={onShareClick}
                  className="flex items-center gap-2 font-medium text-sm rounded-lg px-4 py-2.5 transition-colors shadow-2xs border"
                  style={{
                    backgroundColor: dark ? "#1f2937" : "#ffffff",
                    borderColor: dark ? "#374151" : "#e5e7eb",
                    color: dark ? "#e5e7eb" : "#374151",
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: dark ? "#374151" : "#f9fafb",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2
                    size={16}
                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                  />
                  <span>Share</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* RIGHT: Hero Photo */}
            <motion.div
              className="w-full flex justify-center md:justify-end min-w-0"
              variants={fadeInRight}
            >
              <motion.div
                className="w-full max-w-[540px] aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border relative"
                style={{
                  width: "100%",
                  borderColor: dark ? "#374151" : "#f3f4f6",
                  backgroundColor: dark ? "#1f2937" : "#f9fafb",
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: dark
                    ? "0 8px 30px rgba(0,0,0,0.3)"
                    : "0 8px 30px rgba(0,0,0,0.08)",
                  transition: { duration: 0.3 },
                }}
              >
                {heroImageUrl ? (
                  <img
                    src={heroImageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                ) : IMAGES.MudraDetailTemplate ? (
                  <Image
                    src={IMAGES.MudraDetailTemplate}
                    alt={title}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover"
                    priority
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: dark
                        ? "linear-gradient(to bottom right, #1f2937, #2e1065)"
                        : "linear-gradient(to bottom right, #fffbeb, #faf5ff)",
                    }}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{ color: dark ? "#6b7280" : "#9ca3af" }}
                    >
                      {title}
                    </span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </SiteContainer>
    </Section>
  );
}