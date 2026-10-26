"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { spacing, typography, faq, btn } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import SiteContainer from "../../common/SiteContainer";

const faqs = [
  {
    question: "What is Mudras?",
    answer:
      "Mudras are symbolic hand gestures used in yoga, meditation, and Ayurveda. Each mudra channels energy flow in the body to support physical, mental, and spiritual well-being.",
    img: IMAGES.FaqMudra,
  },
  {
    question: "What is Yoga Nidra?",
    answer:
      "Yoga Nidra is a guided meditation practice that leads you to the threshold between waking and sleep, enabling deep rest, stress relief, and inner transformation.",
    img: IMAGES.FaqYogaNidra,
  },
  {
    question: "Is the app free?",
    answer:
      "Yes! The app is free to download with a limited mudra library and basic features. Upgrade to Premium or Premium Plus to unlock the full experience.",
    img: IMAGES.FaqFree,
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel anytime from your account settings or through the App Store / Google Play subscription management page. No commitments required.",
    img: IMAGES.FaqCancel,
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Refunds are handled by the App Store or Google Play. Please refer to their refund policies. We offer a 7-day free trial so you can explore before committing.",
    img: IMAGES.FaqRefund,
  },
  {
    question: "How can I suggest a mudra or report an issue?",
    answer:
      "We'd love to hear from you! Use the Contact Us page or email us at support@mudras.app with your suggestion or issue and our team will get back to you within 24-48 hours.",
    img: IMAGES.FaqSuggest,
  },
];

function ChevronIcon({ open, dark }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        color: dark ? "#6b7280" : "#6b7280",
      }}
      animate={{
        rotate: open ? 180 : 0,
      }}
      transition={{
        duration: 0.3,
      }}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

export default function FAQSection() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05,
    margin: "-50px",
  });

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  // Main section animation
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

  // Staggered FAQ animations
  const faqVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08 + 0.2,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Character animation for heading
  const charVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -10,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headingText = "Frequently Asked Questions";
  const headingChars = headingText.split("");

  return (
    <motion.section
      ref={sectionRef}
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
      }}
    >
      <SiteContainer
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "1200px",
            lg: "1360px",
            xl: "1600px",
          },
          mx: "auto",
          px: {
            xs: 2,
            sm: 3,
            md: 3,
            lg: 3,
            xl: 3,
          },
          py: 0,
          boxSizing: "border-box",
        }}
      >
        <motion.div
          className="w-full min-w-0"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Heading */}
          <motion.h2
            className={`${typography.sectionMbHeading} text-center ${spacing.headingBlockMb}`}
            style={{
              color: textColor,
            }}
          >
            {headingChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{
                  display: "inline-block",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>

          {/* Accordion list */}
          <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-10 w-full min-w-0">
            {faqs.map((item, i) => {
              const isOpen = openIndex === i;

              return (
                <motion.div
                  key={i}
                  className="w-full min-w-0 box-border border rounded-xl overflow-hidden shadow-sm"
                  style={{
                    borderColor: dark ? "#374151" : "#e5e7eb",
                    backgroundColor: dark ? "#1f2937" : "#ffffff",
                  }}
                  custom={i}
                  variants={faqVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{
                    boxShadow: dark
                      ? "0 4px 20px rgba(0,0,0,0.3)"
                      : "0 4px 20px rgba(0,0,0,0.06)",
                    transition: {
                      duration: 0.2,
                    },
                  }}
                >
                  {/* Accordion trigger */}
                  <motion.button
                    type="button"
                    onClick={() => toggle(i)}
                    className={`${faq.accordionBtnClass} w-full min-w-0 box-border`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    whileHover={{
                      scale: 1.005,
                      transition: {
                        duration: 0.2,
                      },
                    }}
                  >
                    {/* Thumbnail */}
                    <motion.div
                      className="w-14 h-10 sm:w-16 sm:h-11 md:w-20 md:h-[52px] lg:w-24 lg:h-[60px] rounded-lg shrink-0 overflow-hidden"
                      style={{
                        backgroundColor: dark ? "#374151" : "#e5e7eb",
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: {
                          duration: 0.2,
                        },
                      }}
                    >
                      {item.img ? (
                        <Image
                          src={item.img}
                          alt={item.question}
                          width={96}
                          height={60}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full rounded-lg"
                          style={{
                            backgroundColor: dark
                              ? "#374151"
                              : "#e5e7eb",
                          }}
                        />
                      )}
                    </motion.div>

                    {/* Question */}
                    <motion.span
                      className={`${faq.questionClass} min-w-0 flex-1 text-left whitespace-normal break-words`}
                      style={{
                        color: dark ? "#e5e7eb" : "#0F0F0F",
                      }}
                      whileHover={{
                        scale: 1.005,
                        transition: {
                          duration: 0.2,
                        },
                      }}
                    >
                      {item.question}
                    </motion.span>

                    {/* Chevron */}
                    <ChevronIcon open={isOpen} dark={dark} />
                  </motion.button>

                  {/* Answer panel */}
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    className="overflow-hidden"
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    aria-hidden={!isOpen}
                  >
                    <div className={faq.answerClass}>
                      <p
                        className={faq.answerTextClass}
                        style={{
                          color: dark ? "#9ca3af" : "#4b5563",
                        }}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Help Center CTA */}
          <motion.div
            className="flex justify-center w-full"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            transition={{
              duration: 0.5,
              delay: 0.4,
            }}
          >
            <motion.button
              type="button"
              className={btn.helpCenter}
              style={{
                backgroundColor: textColor,
              }}
              whileHover={{
                scale: 1.05,
                opacity: 0.85,
                boxShadow: `0 8px 30px ${textColor}40`,
                transition: {
                  duration: 0.2,
                },
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              Visit Help Center
            </motion.button>
          </motion.div>
        </motion.div>
      </SiteContainer>
    </motion.section>
  );
}