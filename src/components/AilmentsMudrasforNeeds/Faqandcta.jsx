"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { faq, cta } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "next/navigation";
import SiteContainer from "../../common/SiteContainer";

const faqs = [
  {
    question: "Can mudras really help with stress and anxiety?",
    answer:
      "Yes. Mudras may support relaxation and emotional well-being as part of a regular mindfulness practice. They can help you slow down, focus your attention, and build a calming daily routine.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Experiences vary from person to person. Starting with 10–20 minutes of consistent daily practice can help you establish a routine and notice how you feel over time.",
  },
  {
    question: "Can I combine mudras with meditation or Yoga Nidra?",
    answer:
      "Absolutely. Mudras and Yoga Nidra can complement each other. Practising a mudra at the start of a Yoga Nidra session can help you settle into a more focused, relaxed practice.",
  },
];

export default function FaqAndCta({ faqs: customFaqs = [] }) {
  const { dark, textColor } = useTheme();
  const router = useRouter();
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "-50px 0px",
  });

  const [openIndex, setOpenIndex] = useState(null);

  const finalFaqs =
    customFaqs.length > 0
      ? customFaqs.map((item) => ({
          question: item.Question || item.question,
          answer: item.Answer || item.answer,
        }))
      : faqs;

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const faqVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1 + 0.3,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headingText = "Frequently Asked Questions";

  return (
    <motion.section
      ref={sectionRef}
      className="w-full"
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <SiteContainer>
        <div className="flex flex-col md:flex-row md:items-stretch gap-4 lg:gap-6 xl:gap-8">
          {/* FAQ CARD */}
          <motion.div
            className={faq.cardClass}
            style={{
              backgroundColor: "#EDE8FF",
            }}
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              transition: { duration: 0.3 },
            }}
          >
            <motion.h2
              className={faq.titleClass}
              style={{ color: textColor }}
            >
              {headingText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 15 }
                  }
                  transition={{
                    delay: index * 0.04,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h2>

            <div className="flex flex-col gap-2 sm:gap-3">
              {finalFaqs.map((faqItem, index) => (
                <motion.div
                  key={index}
                  className="overflow-hidden rounded-xl"
                  style={{
                    backgroundColor: dark ? "#1f2937" : "#ffffff",
                  }}
                  custom={index}
                  variants={faqVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <motion.button
                    type="button"
                    onClick={() => toggle(index)}
                    className={faq.accordionBtnClass}
                    whileHover={{
                      scale: 1.01,
                      transition: { duration: 0.2 },
                    }}
                    aria-expanded={openIndex === index}
                  >
                    <span
                      className={faq.questionClass}
                      style={{
                        color: dark ? "#e5e7eb" : "#0F0F0F",
                      }}
                    >
                      {faqItem.question}
                    </span>

                    <motion.span
                      className="shrink-0"
                      style={{ color: "#6b7280" }}
                      animate={{
                        rotate: openIndex === index ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      ▾
                    </motion.span>
                  </motion.button>

                  {openIndex === index && (
                    <motion.div
                      className={faq.answerClass}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <p
                        className={faq.answerTextClass}
                        style={{
                          color: dark ? "#9ca3af" : "#4b5563",
                        }}
                      >
                        {faqItem.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA CARD — MATCHING THE REFERENCE IMAGE */}
          <motion.div
            className={`${cta.cardClass} w-full`}
            style={{
              backgroundColor: "#FFF5BD",
              borderRadius: "20px",
              padding: "28px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "28px",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              transition: { duration: 0.3 },
            }}
          >
            {/* LEFT IMAGE */}
            <motion.div
              className={`${cta.imageClass} relative shrink-0`}
              style={{
                width: "42%",
                maxWidth: "240px",
                aspectRatio: "1 / 1",
                overflow: "hidden",
                borderRadius: "10px",
              }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
            >
              <Image
                src={IMAGES.Faqandcta}
                alt="Personalized mudra recommendations"
                fill
                sizes="(max-width: 768px) 42vw, 240px"
                className="object-cover"
              />
            </motion.div>

            {/* RIGHT TEXT AND BUTTON */}
            <motion.div
              className={`${cta.textClass} min-w-0 flex-1`}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.h3
                className={cta.headingClass}
                style={{
                  color: "#111111",
                  fontSize: "22px",
                  fontWeight: 600,
                  lineHeight: 1.25,
                  margin: "0 0 12px",
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
              >
                Unlock Personalized Recommendations.
              </motion.h3>

              <p
                className={cta.bodyClass}
                style={{
                  color: "#0F0F0F80",
                  fontSize: "14px",
                  lineHeight: 1.55,
                  margin: "0 0 18px",
                }}
              >
                Get a personalized mudra plan based on your needs, goals and
                lifestyle.
              </p>

              <motion.button
                type="button"
                className={cta.btnClass}
                style={{
                  backgroundColor: "#111111",
                  color: "#ffffff",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  minHeight: "42px",
                  fontSize: "14px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "6px 7px 2px rgba(0,0,0,0.08)",
                }}
                whileHover={{
                  scale: 1.05,
                  opacity: 0.9,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/AppDownload")}
              >
                Try Mudras App
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </SiteContainer>
    </motion.section>
  );
}