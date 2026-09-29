"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { spacing, faq, cta } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "next/navigation";

const faqs = [
  {
    question: "Can mudras really help with stress and anxiety?",
    answer: "Yes. Mudras work by redirecting the flow of prana (life energy) in the body. Specific mudras activate the parasympathetic nervous system, which helps reduce cortisol levels, calm racing thoughts, and restore emotional balance.",
  },
  {
    question: "How long does it take to see results?",
    answer: "Many people notice a sense of calm within the first few sessions. For deeper, lasting benefits — improved sleep, reduced anxiety, emotional stability — consistent daily practice of 10–20 minutes over 2–4 weeks is recommended.",
  },
  {
    question: "Can I combine mudras with meditation or Yoga Nidra?",
    answer: "Absolutely. Mudras and Yoga Nidra complement each other beautifully. Practising a mudra at the start of a Yoga Nidra session can deepen the state of relaxation and enhance the overall healing experience.",
  },
];

export default function FaqAndCta({ faqs: customFaqs = [] }) {
  const { dark, textColor } = useTheme();
  const finalFaqs = customFaqs.length > 0
    ? customFaqs.map(f => ({ question: f.Question || f.question, answer: f.Answer || f.answer }))
    : faqs;
  const router = useRouter();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px"
  });

  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  // Staggered FAQ items
  const faqVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Character animation for heading
  const charVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-4 lg:gap-6 xl:gap-8">

        {/* ── FAQ Card ── */}
        <motion.div 
          className={faq.cardClass} 
          style={{ backgroundColor: "#EDE8FF" }}
          variants={slideInLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Heading - Character by character */}
          <motion.h2 
            className={faq.titleClass} 
            style={{ color: textColor }}
          >
            {headingChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>

          <div className="flex flex-col gap-2 sm:gap-3">
            {finalFaqs.map((faqItem, i) => (
              <motion.div 
                key={i} 
                className="rounded-xl overflow-hidden" 
                style={{
                  backgroundColor: dark ? "#1f2937" : "#ffffff",
                }}
                custom={i}
                variants={faqVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.button 
                  onClick={() => toggle(i)} 
                  className={faq.accordionBtnClass}
                  whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className={faq.questionClass} style={{ color: dark ? "#e5e7eb" : "#111827" }}>
                    {faqItem.question}
                  </span>
                  <motion.span 
                    className={`shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} 
                    style={{ color: dark ? "#6b7280" : "#6b7280" }}
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▾
                  </motion.span>
                </motion.button>
                {openIndex === i && (
                  <motion.div 
                    className={faq.answerClass}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <p className={faq.answerTextClass} style={{ color: dark ? "#9ca3af" : "#4b5563" }}>
                      {faqItem.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA Card ──
            Mobile        : image stacked on top, text below
            Tablet+ (md+) : image LEFT, text RIGHT — side by side
        */}
        <motion.div 
          className={cta.cardClass} 
          style={{ 
            backgroundColor: dark ? "#FFF9C4" : "#FFF9C4" 
          }}
          variants={slideInRight}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Image — left on tablet+, top on mobile */}
          <motion.div 
            className={cta.imageClass}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.3 }
            }}
          >
            <Image
              src={IMAGES.Faqandcta}
              alt="Unlock Personalized Recommendations"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Text — right on tablet+, bottom on mobile */}
          <motion.div 
            className={cta.textClass}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h3 
              className={cta.headingClass} 
              style={{ color: textColor }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              Unlock Personalized Recommendations.
            </motion.h3>
            <p className={cta.bodyClass} style={{ color: dark ? "#3a3b3b" : "#4b5563" }}>
              Get a personalized mudra plan based on your needs, goals and lifestyle.
            </p>
            <motion.button 
              className={cta.btnClass}
              style={{
                backgroundColor: textColor,
                color: "#ffffff",
              }}
              whileHover={{
                scale: 1.05,
                opacity: 0.85,
                boxShadow: `0 8px 30px ${textColor}40`,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/AppDownload")}
            >
              Try Mudras App
            </motion.button>
          </motion.div>

        </motion.div>

      </div>
    </motion.section>
  );
}