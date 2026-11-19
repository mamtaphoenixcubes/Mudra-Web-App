
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { card, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { wellnessCategoriesService } from "../../services/apiService";

const CARD_BG_CLASSES = [
  "bg-benefit-1",
  "bg-benefit-2",
  "bg-benefit-3",
  "bg-benefit-4",
  "bg-benefit-5",
  "bg-benefit-3",
  "bg-benefit-2",
  "bg-benefit-5",
  "bg-problem-3",
  "bg-benefit-1",
];

function ClaimCard({ item, dark, textColor, index, onClick }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={`
        ${item.bg}
        ${card.radius}
        ${card.hover}
        ${spacing.cardPadding}
        ${spacing.benefitsCardMinH}
        flex flex-col items-center justify-center
        text-center w-full h-full cursor-pointer
      `}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        y: -6,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      onClick={onClick}
    >
      {/* Title */}
      <motion.h3
        className={`
          ${typography.benefitsCardTitle}
          ${spacing.cardTitleMb}
        `}
        style={{ color: dark ? "#000000" : "#1f2937" }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 },
        }}
      >
        {item.label}
      </motion.h3>

      {/* Description */}
      <p
        className={typography.benefitsCardBody}
        style={{
          color: dark ? "#000000" : "#4b5563",
        }}
      >
        {item.description}
      </p>

      {/* Click to see more */}
      <motion.div
        className="mt-auto pt-4 flex items-center justify-center gap-2 font-semibold text-sm"
        style={{
          color: dark ? "#111827" : "#374151",
        }}
        whileHover={{
          x: 4,
          transition: { duration: 0.2 },
        }}
      >
        <span>Click to see more</span>
        <ArrowRight size={16} />
      </motion.div>
    </motion.div>
  );
}

export default function MudrasMayHelp() {
  const { dark, textColor } = useTheme();
  const router = useRouter();
  const [wellnessCategories, setWellnessCategories] = useState([]);

  const sectionRef = useRef(null);

  const handleBenefitClick = (path) => {
    router.push(path);
  };

  useEffect(() => {
    const fetchWellnessCategories = async () => {
      try {
        const response = await wellnessCategoriesService.getAllWellnessCategories();
        const categories = Array.isArray(response?.data) ? response.data : [];
        console.log("Wellness categories response:", response);
        setWellnessCategories(categories);
      } catch (error) {
        console.error("Error fetching wellness categories:", error);
        setWellnessCategories([]);
      }
    };

    fetchWellnessCategories();
  }, []);

  const cards = wellnessCategories.length
    ? wellnessCategories.map((item, index) => {
        const label = item?.Title || item?.title || "Wellness Category";
        const benefitSlug = label
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");

        return {
          label,
          description: item?.Description || item?.description || "",
          bg: CARD_BG_CLASSES[index % CARD_BG_CLASSES.length],
          path: `/ListofBenefits?benefit=${encodeURIComponent(benefitSlug)}&type=howmudramayhelp`,
        };
      })
    : [];

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "-50px",
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`${spacing.container}`}>

        {/* Heading */}
        <motion.div
          className={`text-center ${spacing.headingBlockMb}`}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p
            className={typography.benefitsSectionLabel}
            style={{ color: dark ? "#ffffff" : "#9ca3af" }}
          >
            MUDRA CLAIMS
          </p>

          <h2
            className={`
              ${typography.benefitsSectionHeading}
              ${spacing.labelMt}
            `}
            style={{ color: textColor }}
          >
            What Mudras May Help With
          </h2>

          <p
            className={`${typography.sectionMbBody} mt-2`}
            style={{ color: dark ? "#ffffff" : "#6b7280" }}
          >
            Mudras can be supportive for a wide range of conditions and imbalances.
          </p>
        </motion.div>

        {/* MOBILE */}
        <motion.div
          className="sm:hidden"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className={`grid grid-cols-2 ${spacing.cardGapSm}`}>
            {cards.map((item, index) => (
              <ClaimCard
                key={`${item.label}-${index}`}
                item={item}
                dark={dark}
                textColor={textColor}
                index={index}
                onClick={() => handleBenefitClick(item.path)}
              />
            ))}
          </div>
        </motion.div>

        {/* TABLET / DESKTOP */}
        <motion.div
          className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5 xl:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {cards.map((item, index) => (
            <ClaimCard
              key={`${item.label}-${index}`}
              item={item}
              dark={dark}
              textColor={textColor}
              index={index}
              onClick={() => handleBenefitClick(item.path)}
            />
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}
