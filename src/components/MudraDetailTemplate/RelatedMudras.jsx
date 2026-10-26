"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { mudraService } from "../../services/apiService";
import { useTheme } from "../../context/ThemeContext";
import Section from "../../common/Section";
import SiteContainer from "../../common/SiteContainer";
import Container from "../../common/Container";

const staticRelated = [
  {
    title: "Chin Mudra",
    description: "Enhances mental clarity and concentration.",
    bg: "bg-[#FEF9C3]",
    image: IMAGES.Mind,
    isRemote: false,
    href: "/MudraDetailTemplate?id=1",
  },
  {
    title: "Dhyana Mudra",
    description: "Promotes meditation and inner peace.",
    bg: "bg-[#F3E8FF]",
    image: IMAGES.ManaMudras,
    isRemote: false,
    href: "/MudraDetailTemplate?id=2",
  },
  {
    title: "Prana Mudra",
    description: "Boosts vitality and immunity.",
    bg: "bg-[#BFDDF2]",
    image: IMAGES.HolisticWellbeing,
    isRemote: false,
    href: "/MudraDetailTemplate?id=3",
  },
  {
    title: "Vayu Mudra",
    description: "Helps balance the air element.",
    bg: "bg-[#FCE7F3]",
    image: IMAGES.KayaMudras,
    isRemote: false,
    href: "/MudraDetailTemplate?id=4",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function RelatedMudraCard({ item, index, isInView }) {
  const isHex = item.bg?.startsWith("#");

  return (
    <motion.div
      className={`
        ${isHex ? "" : item.bg}
        flex h-full min-h-[220px] w-full min-w-0
        flex-col items-center rounded-2xl p-6 text-center shadow-2xs
      `}
      style={{
        backgroundColor: isHex ? item.bg : undefined,
      }}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        y: -6,
        boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
        transition: { duration: 0.25 },
      }}
    >
      <motion.div
        className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-2xs"
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.2 },
        }}
      >
        {item.isRemote ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-7 w-7 object-contain"
          />
        ) : (
          <Image
            src={item.image}
            alt={item.title}
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
        )}
      </motion.div>

      <h3 className="mb-1.5 text-base font-bold text-gray-900 sm:text-lg">
        {item.title}
      </h3>

      <p className="mb-4 text-xs leading-relaxed text-gray-600 sm:text-sm">
        {item.description}
      </p>

      <div className="mt-auto">
        <Link
          href={item.href}
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-800 transition-colors hover:text-[#9A85FE] sm:text-sm"
        >
          View Mudra &rarr;
        </Link>
      </div>
    </motion.div>
  );
}

export default function RelatedMudras({ currentId }) {
  const { dark } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05,
    margin: "-50px",
  });

  const [related, setRelated] = useState([]);

  useEffect(() => {
    async function fetchRelated() {
      const IMAGE_BASE_URL =
        process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
        "http://192.168.1.14:1337";

      try {
        const json = await mudraService.getAllMudras();
        let rawList = [];

        if (Array.isArray(json)) {
          rawList = json;
        } else if (json?.success && Array.isArray(json.data)) {
          rawList = json.data;
        } else if (
          json?.success &&
          json.data &&
          Array.isArray(json.data.data)
        ) {
          rawList = json.data.data;
        }

        const filtered = rawList
          .filter(
            (item) =>
              String(item.id) !== String(currentId) &&
              String(item.documentId) !== String(currentId)
          )
          .slice(0, 4)
          .map((item, index) => {
            let iconUrl = null;

            if (item.web?.IntroCardWeb?.IntrocardImage?.url) {
              iconUrl = `${IMAGE_BASE_URL}${item.web.IntroCardWeb.IntrocardImage.url}`;
            } else if (item.thumbnail?.url) {
              iconUrl = `${IMAGE_BASE_URL}${item.thumbnail.url}`;
            }

            return {
              title: item.name,
              description:
                item.web?.IntroCardWeb?.Description ||
                item.description ||
                "Enhances mental clarity and concentration.",
              bg: [
                "bg-[#FEF9C3]",
                "bg-[#F3E8FF]",
                "bg-[#BFDDF2]",
                "bg-[#FCE7F3]",
              ][index % 4],
              image: iconUrl || IMAGES.Mind,
              isRemote: Boolean(iconUrl),
              href: `/MudraDetailTemplate?id=${item.documentId || item.id}`,
            };
          });

        if (filtered.length > 0) {
          setRelated(filtered);
        }
      } catch (err) {
        console.warn("Failed to fetch related mudras:", err);
      }
    }

    fetchRelated();
  }, [currentId]);

  const items = related.length > 0 ? related : staticRelated;

  return (
    <Section
      className="w-full"
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
          mx: "auto",
          py: 0,
        }}
      >
        <Container
          className="w-full"
          sx={{
            width: "100%",
            maxWidth: "100%",
            mx: "auto",
            px: 0,
          }}
        >
          <div
            ref={sectionRef}
            className="w-full px-6 py-12 sm:px-10 md:py-16 lg:px-16"
          >
            {/* Section Heading */}
            <motion.h2
              className="mb-2 text-center text-3xl font-bold text-[#9A85FE] sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Related Mudras
            </motion.h2>

            {/* Lotus Icon Divider */}
            <motion.div
              className="mx-auto mb-10 flex max-w-xs items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <motion.div
                className="h-px flex-1"
                style={{
                  backgroundColor: dark ? "#374151" : "#e5e7eb",
                  originX: 1,
                }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Image
                  src={IMAGES.Energy}
                  alt="Lotus vector"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain opacity-75"
                  style={{
                    filter: dark
                      ? "brightness(0) invert(1)"
                      : "brightness(0)",
                  }}
                />
              </motion.div>

              <motion.div
                className="h-px flex-1"
                style={{
                  backgroundColor: dark ? "#374151" : "#e5e7eb",
                  originX: 0,
                }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.div>

            {/* Responsive Related Mudras Grid */}
            <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {items.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="h-full w-full min-w-0"
                >
                  <RelatedMudraCard
                    item={item}
                    index={index}
                    isInView={isInView}
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </SiteContainer>
    </Section>
  );
}
