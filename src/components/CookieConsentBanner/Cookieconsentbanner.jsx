"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "../../assets/assets";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { btn } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function CookieConsentBanner() {
  const { dark, textColor } = useTheme();
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleAcceptAll = () => setVisible(false);
  const handleRejectAll = () => setVisible(false);
  const handleCustomize = () => {};

  const surface = dark ? "bg-gray-900" : "bg-white";
  const border = dark ? "border-gray-700" : "border-gray-200";

  const banner = (
    <AnimatePresence>
      {visible && (
        <motion.div 
          className={spacing.cookieBanner.wrapper}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.5
          }}
        >
          <motion.div 
            className={`${spacing.cookieBanner.container} `} 
            style={{
              backgroundColor: dark ? "#374151" : "#f3f4f6",
            }}
            whileHover={{
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
              transition: { duration: 0.3 }
            }}
          >
            <motion.div 
              className={spacing.cookieBanner.iconTextRow}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div 
                className={spacing.cookieBanner.iconBox} 
                style={{
                  backgroundColor: dark ? "#ffffff" : "#f3f4f6",
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <Image
                  src={IMAGES.cookieIcon}
                  alt=""
                  width={28}
                  height={28}
                  className={spacing.cookieBanner.iconImage}
                />
              </motion.div>

              <div className={spacing.cookieBanner.textWrapper}>
                <motion.p 
                  className={typography.cookieBanner.title} 
                  style={{ color: textColor }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  We value your privacy
                </motion.p>
                <motion.p 
                  className={typography.cookieBanner.body} 
                  style={{ color: dark ? "#ffffff" : "#4b5563" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  We use cookies to enhance your browsing experience, analyze
                  site traffic, and personalize content. You can choose which
                  cookies you allow.
                </motion.p>
              </div>
            </motion.div>

            <motion.div 
              className={spacing.cookieBanner.actionsRow}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/privacy-policy" 
                  className={typography.cookieBanner.learnMore}
                  style={{ color: textColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  Learn more
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  onClick={handleCustomize} 
                  className={btn.cookieOutline}
                  style={{
                    borderColor: dark ? "#4b5563" : "#e5e7eb",
                    color: dark ? "#e5e7eb" : "#374151",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = dark ? "#374151" : "#f9fafb";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Customize
                </button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  onClick={handleRejectAll} 
                  className={btn.cookieOutline}
                  style={{
                    borderColor: dark ? "#4b5563" : "#e5e7eb",
                    color: dark ? "#e5e7eb" : "#374151",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = dark ? "#374151" : "#f9fafb";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Reject All
                </button>
              </motion.div>

              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.button 
                  onClick={handleAcceptAll} 
                  className={btn.cookieAccept} 
                  style={{ color: textColor }}
                  whileHover={{
                    boxShadow: `0 4px 20px ${textColor}40`,
                    transition: { duration: 0.2 }
                  }}
                >
                  Accept All
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(banner, document.body);
}