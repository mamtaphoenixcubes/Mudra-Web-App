"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { IMAGES } from "../../assets/assets";
import { mudraService } from "../../services/apiService";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import Section from "../../common/Section";
import SiteContainer from "../../common/SiteContainer";
import SectionHeader from "../../common/SectionHeader";

const FIGMA_CARDS = [
  {
    key: "stress",
    title: "Stress & Anxiety",
    description: "Constant stress drains your energy and peace of mind.",
    bg: "#FEF9C3",
    image: IMAGES.StressRelief || IMAGES.StressAnxiety,
  },
  {
    key: "mental",
    title: "Mental Overload",
    description: "Too much thinking, too little clarity and focus.",
    bg: "#F3E8FF",
    image: IMAGES.HealingRecovery || IMAGES.Meditation,
  },
  {
    key: "sleep",
    title: "Poor Sleep",
    description: "Restless nights lead to tired mornings and low energy.",
    bg: "#E0F2FE",
    image: IMAGES.SleepDeep || IMAGES.RestfulSleep,
  },
  {
    key: "emotional",
    title: "Emotional Imbalance",
    description: "Unmanaged emotions affect your well-being and relationships.",
    bg: "#FCE7F3",
    image: IMAGES.EmotionalBalance || IMAGES.Relaxation,
  },
  {
    key: "disconnected",
    title: "Disconnected Self",
    description: "You feel out of balance and far from your true self.",
    bg: "#DCFCE7",
    image: IMAGES.PeacefulSleep || IMAGES.MeditationBeach,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ProblemSection() {
  const { dark, textColor } = useTheme();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        const response = await mudraService.getCategories();
        let list = [];
        if (response && response.success && response.data) {
          if (Array.isArray(response.data)) {
            list = response.data;
          } else if (Array.isArray(response.data.data)) {
            list = response.data.data;
          }
        }

        if (list.length > 0) {
          const mapped = list.map((item, index) => {
            const defaultCard = FIGMA_CARDS[index % FIGMA_CARDS.length];
            let img = defaultCard.image;
            if (item.icon?.url) {
              const url = item.icon.url;
              const assetBase =
                process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
                "http://192.168.1.14:1337";
              if (url.includes("/uploads/")) {
                img = `${assetBase}${url.substring(url.indexOf("/uploads/"))}`;
              } else if (url.startsWith("http")) {
                img = url;
              } else {
                img = `${assetBase}${url}`;
              }
            }

            return {
              id: item.id,
              documentId: item.documentId,
              title: item.Name || defaultCard.title,
              description:
                item.cardText ||
                item.shortDescription ||
                defaultCard.description,
              bg: defaultCard.bg,
              image: img,
            };
          });
          setCards(mapped);
        } else {
          setCards(FIGMA_CARDS);
        }
      } catch (err) {
        console.warn("Using fallback cards due to API error:", err);
        setCards(FIGMA_CARDS);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  return (
    <Section
      sx={{
        backgroundColor: dark ? "#111827" : "#ffffff",
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        overflow: "visible", // allow card hover lift to show
      }}
    >
      <SiteContainer>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            title="Life Feels Overwhelming"
            subtitle="Stress, anxiety, poor sleep, emotional imbalance and constant overload keep you away from your best self."
            align="center"
            sx={{
              "& .MuiTypography-root": {
                color: dark ? "#e5e7eb" : undefined,
              },
              mb: { xs: 4, sm: 5, md: 6 },
            }}
          />
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "var(--font-redhat)",
              fontWeight: 600,
              fontSize: { xs: "12px", sm: "13px" },
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: dark ? "#9ca3af" : "#6b7280",
              mb: 1,
              mt: -4,
            }}
          >
            The Problem
          </Typography>
        </motion.div>

        {/* Cards */}
        {loading ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(5, 1fr)",
                lg: "repeat(5, 1fr)",
              },
              gap: { xs: 2, md: 2.5 },
            }}
          >
            {[1, 2, 3, 4, 5].map((idx) => (
              <Box
                key={idx}
                sx={{
                  p: 2,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 180,
                  borderRadius: "24px",
                  backgroundColor: dark ? "#1f2937" : "#f3f4f6",
                  border: "1px solid",
                  borderColor: dark ? "#374151" : "#e5e7eb",
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "16px",
                    mb: 1.5,
                    backgroundColor: dark ? "#374151" : "#e5e7eb",
                  }}
                />
                <Box
                  sx={{
                    height: 16,
                    width: 96,
                    borderRadius: "6px",
                    mb: 1,
                    backgroundColor: dark ? "#374151" : "#e5e7eb",
                  }}
                />
                <Box
                  sx={{
                    height: 10,
                    width: "100%",
                    borderRadius: "4px",
                    mb: 0.5,
                    backgroundColor: dark ? "#374151" : "#e5e7eb",
                  }}
                />
                <Box
                  sx={{
                    height: 10,
                    width: "80%",
                    borderRadius: "4px",
                    backgroundColor: dark ? "#374151" : "#e5e7eb",
                  }}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
            }}
            className="problem-cards-grid"
          >
            {cards.map((card, i) => (
              <motion.div
                key={card.documentId || card.key || i}
                variants={cardVariants}
              >
                <ProblemCard card={card} dark={dark} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </SiteContainer>

      {/* Responsive grid override for md+ (5 columns) */}
      <style jsx global>{`
        @media (min-width: 900px) {
          .problem-cards-grid {
            grid-template-columns: repeat(5, 1fr) !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </Section>
  );
}

function ProblemCard({ card, dark }) {
  const content = (
    <motion.div
      className="problem-card"
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
      style={{
        height: "100%",
        borderRadius: "24px",
        padding: "16px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 180,
        backgroundColor: card.bg,
        color: "#111827",
      }}
    >
      {/* Thumbnail */}
      <motion.div
        whileHover={{
          scale: 1.1,
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.4 },
        }}
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 12,
          flexShrink: 0,
          backgroundColor: "rgba(255,255,255,0.4)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        {typeof card.image === "string" ? (
          <img
            src={card.image}
            alt={card.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Image
            src={card.image}
            alt={card.title}
            width={56}
            height={56}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </motion.div>

      {/* Title */}
      <Typography
        component="h3"
        sx={{
          fontFamily: "var(--font-redhat)",
          fontWeight: 600,
          fontSize: { xs: "14px", sm: "15px", md: "16px" },
          color: "#111827",
          mb: 0.75,
          textAlign: "center",
        }}
      >
        {card.title}
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          fontFamily: "var(--font-redhat)",
          fontWeight: 400,
          fontSize: { xs: "12px", sm: "13px" },
          color: "rgba(17, 24, 39, 0.7)",
          maxWidth: 180,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        {card.description}
      </Typography>
    </motion.div>
  );

  if (card.documentId) {
    return (
      <Link
        href={`/AilmentDetailTemplate?id=${card.documentId}`}
        style={{ display: "block", height: "100%", textDecoration: "none" }}
      >
        {content}
      </Link>
    );
  }

  return content;
}