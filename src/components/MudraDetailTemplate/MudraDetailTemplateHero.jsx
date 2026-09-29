"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import {
  Heart,
  Share2,
  X,
  MessageCircle,
  Link as LinkIcon,
  Check,
} from "lucide-react";

export default function MudraDetailHero({
  mudra,
  category: propCategory = "Mudras",
  title: propTitle = "Gyan Mudra",
  tags: propTags = ["Mind", "Clarity", "Awareness"],
  description: propDescription =
    "Gyan Mudra is the mudra of knowledge. It enhances concentration, sharpens memory, and brings clarity of thought. Regular practice helps in calming the mind and improving focus.",
  onPracticeClick,
  onBenefitsClick,
  onLikeClick,
  onShareClick,
  isLiked = false,
}) {
  const IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
    "http://192.168.1.14:1337";

  const category = mudra?.categories?.[0]?.Name || propCategory;
  const title = mudra?.name || propTitle;

  const intentionsList =
    mudra?.intentions?.map((t) => t.name) || [];

  const tags =
    intentionsList.length > 0 ? intentionsList : propTags;

  const description =
    mudra?.web?.HeroSection?.Description ||
    mudra?.description ||
    propDescription;

  const heroImageUrl = mudra?.web?.HeroSection?.HeroImage?.url
    ? `${IMAGE_BASE_URL}${mudra.web.HeroSection.HeroImage.url}`
    : null;

  const { dark } = useTheme();

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
    typeof window !== "undefined"
      ? window.location.href
      : "";

  const shareText = `Check out ${title} - ${description}`;

  const handleShareClick = () => {
    setShowShareModal(true);

    // Keep your existing callback if you are using it elsewhere
    // if (onShareClick) {
    //   onShareClick();
    // }
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
      await navigator.clipboard.writeText(shareUrl);

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

  // Animation variants
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const fadeInLeft = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeInRight = {
    hidden: {
      opacity: 0,
      x: 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
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

              <span className="text-gray-400 select-none">
                &gt;
              </span>

              <Link
                href="/MudraLibrary"
                className="hover:text-[#9A85FE] transition-colors cursor-pointer"
              >
                Mudras
              </Link>

              <span className="text-gray-400 select-none">
                &gt;
              </span>

              <span className="text-gray-800 font-medium">
                {title}
              </span>
            </nav>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#9A85FE] tracking-tight mb-3">
              {title}
            </h1>

            {/* Tags */}
            <div className="inline-flex items-center bg-[#EDE9FE] text-[#9A85FE] font-medium text-xs sm:text-sm rounded-full px-4 py-1.5 mb-5">
              {tags.join(" • ")}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 max-w-xl">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Practice */}
              <button
                onClick={onPracticeClick}
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
                  className={
                    isLiked
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                />

                <span>
                  {isLiked ? "Liked" : "Like"}
                </span>
              </button>

              {/* Share */}
              <button
                onClick={handleShareClick}
                className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium text-sm rounded-lg px-4 py-2.5 transition-colors shadow-2xs"
              >
                <Share2
                  size={16}
                  className="text-gray-500"
                />

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
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={closeShareModal}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6"
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              {/* Close */}
              <button
                onClick={closeShareModal}
                className="absolute right-4 top-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Close share modal"
              >
                <X
                  size={18}
                  className="text-gray-500"
                />
              </button>

              {/* Header */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Share {title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Share this mudra with your friends
                </p>
              </div>

              {/* Share Options */}
              <div className="grid grid-cols-2 gap-3">
                {/* WhatsApp */}
                <button
                  onClick={handleWhatsAppShare}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-green-50 hover:border-green-200 transition-all"
                >
                <div className="flex items-center gap-3">
                {/* WhatsApp Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-green-600"
                >
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L.05 24l6.29-1.65a11.9 11.9 0 0 0 5.72 1.46h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.44-8.43ZM12.07 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.23-.37a9.88 9.88 0 0 1-1.52-5.28C2.18 6.45 6.61 2.02 12.07 2.02c2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.9 7.02c0 5.46-4.44 9.89-9.91 9.89Zm5.42-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                </svg>

                <div className="text-left">
                  <p className="font-medium text-gray-900">
                    WhatsApp
                  </p>
                  <p className="text-xs text-gray-500">
                    Share link
                  </p>
                </div>
              </div>
                </button>

                {/* Facebook */}
                <button
                  onClick={handleFacebookShare}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                   <span className="text-xl font-bold text-blue-600">
  f
</span>
                  </div>

                  <div className="text-left">
                    <p className="font-medium text-gray-900">
                      Facebook
                    </p>
                    <p className="text-xs text-gray-500">
                      Share link
                    </p>
                  </div>
                </button>

                {/* Instagram */}
                <button
                  onClick={handleInstagramShare}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-pink-50 hover:border-pink-200 transition-all"
                >
                 <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-pink-600"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>

                  <div className="text-left">
                    <p className="font-medium text-gray-900">
                      Instagram
                    </p>
                    <p className="text-xs text-gray-500">
                      Copy & open
                    </p>
                  </div>
                </button>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-purple-50 hover:border-purple-200 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    {copied ? (
                      <Check
                        size={20}
                        className="text-green-600"
                      />
                    ) : (
                      <LinkIcon
                        size={20}
                        className="text-purple-600"
                      />
                    )}
                  </div>

                  <div className="text-left">
                    <p className="font-medium text-gray-900">
                      {copied
                        ? "Copied!"
                        : "Copy Link"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {copied
                        ? "Link copied"
                        : "Copy website URL"}
                    </p>
                  </div>
                </button>
              </div>

           
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}