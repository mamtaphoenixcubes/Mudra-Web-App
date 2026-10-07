"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import {
  Heart,
  Share2,
  X,
  Check,
  Clock,
  BarChart2,
} from "lucide-react";

// ─── Brand SVG Icons ─────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkBrandIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function AsanasSessionHero({
  // Can accept either an asana or a mudra object
  asana = null,
  mudra = null,
  category: propCategory = "Asanas",
  title: propTitle = "Asanas Session",
  tags: propTags = ["Strength", "Balance", "Flexibility"],
  description: propDescription =
    "This asana practice helps build strength, improve balance, and increase flexibility. Regular practice supports overall physical and mental wellbeing.",
  onPracticeClick,
  onBenefitsClick,
  onLikeClick,
  onShareClick,
  isLiked = false,
}) {
  const IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
    "http://192.168.1.14:1337";

  // Prefer asana, fall back to mudra, otherwise null
  const data = asana || mudra || null;

  // Unwrap nested { data: ... } wrappers if present
  const actualData = data?.data || data;

  // ─── Dynamic data mappings ───────────────────────────────────────────────

  const category =
    actualData?.categories?.[0]?.Name ||
    actualData?.Category?.Name ||
    actualData?.category ||
    propCategory;

  const title =
    actualData?.name ||
    actualData?.title ||
    actualData?.Name ||
    propTitle;

  const intentionsList =
    actualData?.intentions?.map((t) => t.name) || [];

  const tags =
    intentionsList.length > 0
      ? intentionsList
      : Array.isArray(actualData?.tags) && actualData.tags.length > 0
        ? actualData.tags
        : propTags;

  const description =
    actualData?.web?.HeroSection?.Description ||
    actualData?.WebDetailsPage?.HeroSectionWeb?.HeroDescription ||
    actualData?.description ||
    actualData?.aboutSession ||
    propDescription;

  // Resolve hero image from multiple possible locations
  const rawHeroImage =
    actualData?.web?.HeroSection?.HeroImage?.url ||
    actualData?.WebDetailsPage?.HeroSectionWeb?.HeroImages?.[0]?.url ||
    actualData?.thumbnail?.url ||
    actualData?.ThumbnailImage?.[0]?.url ||
    actualData?.heroImage?.url ||
    null;

  const heroImageUrl = rawHeroImage
    ? rawHeroImage.startsWith("http")
      ? rawHeroImage
      : `${IMAGE_BASE_URL}${rawHeroImage}`
    : null;

  const level = actualData?.level || actualData?.Level || null;

  const durationMinutes =
    actualData?.duration ||
    actualData?.Duration ||
    (actualData?.durationInSeconds
      ? Math.floor(actualData.durationInSeconds / 60)
      : null);

  const { dark } = useTheme();
  const router = useRouter();

  const sectionRef = useRef(null);

  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "-50px",
  });

  // Current page URL
  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const shareText = `Check out ${title} - ${description}`;

  // ─── Practice navigation ───────────────────────────────────────────────────

  const handlePracticeClick = () => {
    // If a parent handler exists, use it
    if (onPracticeClick) {
      onPracticeClick();
      return;
    }

    // Otherwise navigate to the Asanas Session Detail page
    const sessionId =
      actualData?.documentId || actualData?.id || "";

    const query = sessionId
      ? `?id=${encodeURIComponent(sessionId)}`
      : "";

    router.push(`/AsanasPlaySession${query}`);
  };

  // ─── Share handlers ────────────────────────────────────────────────────────

  const handleShareClick = async () => {
    // Track share if parent supplies a handler
    if (onShareClick) {
      try {
        await onShareClick(actualData?.documentId || actualData?.id);
      } catch (e) {
        console.warn("Share tracking failed:", e);
      }
    }

    setShowShareModal(true);
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      `${shareText}\n\n${shareUrl}`
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleInstagramShare = async () => {
    // Instagram does not provide a standard web share URL
    // for sharing a website link.
    await handleCopyLink();

    window.open(
      "https://www.instagram.com/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        document.execCommand("copy");

        document.body.removeChild(textarea);
      }

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setCopied(false);
  };

  // ─── Animation variants ────────────────────────────────────────────────────

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
    <>
      <section
        ref={sectionRef}
        className="w-full bg-white py-10 sm:py-12 md:py-16 px-6 sm:px-10 lg:px-16"
      >
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* LEFT: Text content */}
          <motion.div
            className="flex flex-col items-start"
            variants={fadeInLeft}
          >
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 font-normal"
            >
              <Link
                href="/Home"
                className="hover:text-[#9A85FE] transition-colors cursor-pointer"
              >
                Home
              </Link>

              <span className="text-gray-400 select-none">&gt;</span>

              <Link
                href="/AsanasLibrary"
                className="hover:text-[#9A85FE] transition-colors cursor-pointer"
              >
                Asanas
              </Link>

              <span className="text-gray-400 select-none">&gt;</span>

              <span className="text-gray-800 font-medium">{title}</span>
            </nav>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#9A85FE] tracking-tight mb-3">
              {title}
            </h1>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="inline-flex items-center bg-[#EDE9FE] text-[#9A85FE] font-medium text-xs sm:text-sm rounded-full px-4 py-1.5 mb-5">
                {tags.join(" • ")}
              </div>
            )}

            {/* Meta row (duration + level) */}
            {(durationMinutes || level) && (
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 mb-5">
                {durationMinutes && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {durationMinutes} min
                  </span>
                )}

                {level && (
                  <span className="flex items-center gap-1.5">
                    <BarChart2 size={14} />
                    {level}
                  </span>
                )}
              </div>
            )}

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 max-w-xl">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Practice */}
              <button
                onClick={handlePracticeClick}
                className="bg-[#9A85FE] hover:bg-[#8B5CF6] text-white font-medium text-sm rounded-lg px-5 py-2.5 transition-colors shadow-xs"
              >
                How to Practice
              </button>

              {/* Benefits */}
              <button
                onClick={onBenefitsClick}
                className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium text-sm rounded-lg px-5 py-2.5 transition-colors shadow-2xs"
              >
                Benefits
              </button>

              {/* Like */}
              <button
                onClick={onLikeClick}
                className={`flex items-center gap-2 border font-medium text-sm rounded-lg px-4 py-2.5 transition-colors shadow-2xs ${
                  isLiked
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Heart
                  size={16}
                  fill={isLiked ? "currentColor" : "none"}
                  className={isLiked ? "text-red-500" : "text-gray-500"}
                />

                <span>{isLiked ? "Liked" : "Like"}</span>
              </button>

              {/* Share */}
              <button
                onClick={handleShareClick}
                className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium text-sm rounded-lg px-4 py-2.5 transition-colors shadow-2xs"
              >
                <Share2 size={16} className="text-gray-500" />

                <span>Share</span>
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Hero Photo */}
          <motion.div
            className="w-full flex justify-center md:justify-end"
            variants={fadeInRight}
          >
            <div className="w-full max-w-[540px] aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative bg-gray-50">
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
                <div className="w-full h-full bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
                  <span className="text-gray-400 text-sm font-medium">
                    {title}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SHARE MODAL */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-modal-title"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.38)",
                backdropFilter: "blur(7px)",
                WebkitBackdropFilter: "blur(7px)",
              }}
              onClick={closeShareModal}
            />

            {/* Modal */}
            <motion.div
              className="
                relative
                z-10
                w-full
                max-w-[386px]
                rounded-[17px]
                bg-white
                shadow-[0_20px_60px_rgba(0,0,0,0.22)]
                px-5
                pt-5
                pb-5
              "
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2
                    id="share-modal-title"
                    className="text-[17px] sm:text-[18px] font-semibold leading-[1.25] text-[#182234] truncate"
                  >
                    Share {title}
                  </h2>

                  <p className="mt-1 text-[11px] sm:text-[12px] text-[#7D8491]">
                    Share this asana with your friends
                  </p>
                </div>

                {/* Close */}
                <button
                  type="button"
                  onClick={closeShareModal}
                  aria-label="Close"
                  className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-[#7B8492] hover:bg-[#F3F4F6] hover:text-[#374151] transition-colors"
                >
                  <X size={17} strokeWidth={1.8} />
                </button>
              </div>

              {/* Share Options */}
              <div className="grid grid-cols-2 gap-2.5 mt-5">
                {/* WhatsApp */}
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="h-[64px] rounded-[11px] border border-[#E3E6EB] bg-white flex items-center gap-3 px-3.5 text-left hover:bg-[#FAFAFA] hover:border-[#D8DCE3] transition-all"
                >
                  <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-[#DCFCE7] text-[#16A34A]">
                    <WhatsAppIcon size={18} />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[13px] font-medium text-[#182234]">
                      WhatsApp
                    </span>
                    <span className="block mt-0.5 text-[9px] text-[#8A919D]">
                      Share link
                    </span>
                  </span>
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  onClick={handleFacebookShare}
                  className="h-[64px] rounded-[11px] border border-[#E3E6EB] bg-white flex items-center gap-3 px-3.5 text-left hover:bg-[#FAFAFA] hover:border-[#D8DCE3] transition-all"
                >
                  <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-[#E4EEFF] text-[#1877F2]">
                    <FacebookIcon size={18} />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[13px] font-medium text-[#182234]">
                      Facebook
                    </span>
                    <span className="block mt-0.5 text-[9px] text-[#8A919D]">
                      Share link
                    </span>
                  </span>
                </button>

                {/* Instagram */}
                <button
                  type="button"
                  onClick={handleInstagramShare}
                  className="h-[64px] rounded-[11px] border border-[#E3E6EB] bg-white flex items-center gap-3 px-3.5 text-left hover:bg-[#FAFAFA] hover:border-[#D8DCE3] transition-all"
                >
                  <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-[#FCE7F3] text-[#E1306C]">
                    <InstagramIcon size={18} />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[13px] font-medium text-[#182234]">
                      Instagram
                    </span>
                    <span className="block mt-0.5 text-[9px] text-[#8A919D]">
                      Copy & open
                    </span>
                  </span>
                </button>

                {/* Copy Link */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="h-[64px] rounded-[11px] border border-[#E3E6EB] bg-white flex items-center gap-3 px-3.5 text-left hover:bg-[#FAFAFA] hover:border-[#D8DCE3] transition-all"
                >
                  <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-[#F1E8FF] text-[#9333EA]">
                    {copied ? (
                      <Check size={18} strokeWidth={2.2} />
                    ) : (
                      <LinkBrandIcon size={17} />
                    )}
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[13px] font-medium text-[#182234]">
                      {copied ? "Copied!" : "Copy Link"}
                    </span>
                    <span className="block mt-0.5 text-[9px] text-[#8A919D]">
                      {copied ? "Link copied" : "Copy website URL"}
                    </span>
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}