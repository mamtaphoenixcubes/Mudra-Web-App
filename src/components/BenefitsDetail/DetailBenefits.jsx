"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { spacing } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const categories = [
  { id: "stress",    label: "Stress &\nAnxiety",    img: IMAGES.Mind },
  { id: "sleep",     label: "Sleep &\nInsomnia",    img: IMAGES.YogaNidra },
  { id: "energy",    label: "Energy &\nFatigue",    img: IMAGES.Body },
  { id: "immunity",  label: "Immunity",              img: IMAGES.Holistic },
  { id: "digestion", label: "Digestion",             img: IMAGES.digestion },
  { id: "heart",     label: "Heart\nHealth",         img: IMAGES.EmotionalBalance },
  { id: "focus",     label: "Focus &\nMemory",       img: IMAGES.focus },
  { id: "hormonal",  label: "Hormonal\nBalance",     img: IMAGES.HolisticWellbeing },
  { id: "emotional", label: "Emotional\nBalance",    img: IMAGES.KayaMudras },
  { id: "detox",     label: "Detox &\nCleansing",    img: IMAGES.detox },
];

const iconBgs = [
  "bg-problem-1",
  "bg-problem-2",
  "bg-problem-3",
  "bg-problem-4",
  "bg-problem-5",
  "bg-problem-1",
  "bg-problem-2",
  "bg-problem-3",
  "bg-problem-4",
  "bg-problem-5",
];

const tocLinks = [
  { id: "understanding", label: "Understanding Stress & Anxiety" },
  { id: "how-mudras",    label: "How Mudras Help" },
  { id: "best-mudras",   label: "Best Mudras for Stress & Anxiety" },
  { id: "practice",      label: "How to Practice" },
  { id: "lifestyle",     label: "Lifestyle Tips" },
  { id: "faq",           label: "Frequently Asked Questions" },
];

const benefits = [
  "Calms the mind\nand nervous system",
  "Reduces worry and\noverthinking",
  "Promotes relaxation\nand restful sleep",
  "Balances emotions\nand mood swings",
  "Brings inner peace\nand clarity",
];

// Mudras most relevant to the "Stress & Anxiety" topic this page covers.
const relatedMudras = [
  {
    id: "gyan",
    name: "Gyan Mudra",
    benefit: "Calms an overactive mind",
    imgKey: "gyanMudra",
    bg: "bg-benefit-1",
  },
  {
    id: "chin",
    name: "Chin Mudra",
    benefit: "Promotes calm and clarity",
    imgKey: "chinMudra",
    bg: "bg-benefit-2",
  },
  {
    id: "vayu",
    name: "Vayu Mudra",
    benefit: "Eases restlessness",
    imgKey: "vayuMudra",
    bg: "bg-benefit-3",
  },
  {
    id: "shunya",
    name: "Shunya Mudra",
    benefit: "Settles sensory overwhelm",
    imgKey: "DhyanaMudra",
    bg: "bg-benefit-4",
  },
];

// Detailed practice instructions
const practiceSteps = [
  {
    step: "1",
    title: "Choose Your Mudra",
    description: "Select a mudra that addresses your specific concern. For stress and anxiety, Gyan Mudra or Chin Mudra are excellent starting points."
  },
  {
    step: "2",
    title: "Find a Comfortable Position",
    description: "Sit in a comfortable position with your spine straight. You can sit on a chair, cushion, or floor. Close your eyes gently."
  },
  {
    step: "3",
    title: "Form the Mudra",
    description: "Place your hands on your knees or thighs with palms facing up. Gently form the mudra with your fingers, keeping the touch light but firm."
  },
  {
    step: "4",
    title: "Breathe Deeply",
    description: "Take slow, deep breaths. Inhale through your nose, exhale through your mouth. Focus on your breath while holding the mudra."
  },
  {
    step: "5",
    title: "Practice Duration",
    description: "Start with 5-10 minutes daily. Gradually increase to 15-20 minutes as you become more comfortable with the practice."
  }
];

// Lifestyle tips with imported images
const lifestyleTips = [
  {
    icon: IMAGES.MudraIcon,
    title: "Morning Routine",
    description: "Practice mudras during your morning meditation or yoga session for a calm start to your day."
  },
  {
    icon: IMAGES.LeafIcon,
    title: "Nature Connection",
    description: "Practice outdoors in nature when possible. Fresh air and natural surroundings enhance the calming effect."
  },
  {
    icon: IMAGES.Flower,
    title: "Herbal Support",
    description: "Combine mudra practice with calming herbal teas like chamomile, lavender, or ashwagandha."
  },
  {
    icon: IMAGES.BellIcon,
    title: "Sleep Routine",
    description: "Practice relaxing mudras like Shunya Mudra before bed to promote deep, restful sleep."
  },
  {
    icon: IMAGES.HeadPhone,
    title: "Calming Music",
    description: "Listen to soft, instrumental music or nature sounds while practicing to deepen relaxation."
  },
  {
    icon: IMAGES.pencil,
    title: "Journaling",
    description: "Keep a journal to track your progress, emotions, and experiences with mudra practice."
  }
];

// FAQ data
const faqs = [
  {
    question: "How long does it take to see results with mudra practice?",
    answer: "Some people feel immediate calming effects, while others notice significant changes within 1-2 weeks of consistent daily practice. Results vary based on individual factors and practice consistency."
  },
  {
    question: "Can I practice mudras while lying down?",
    answer: "Yes, you can practice mudras lying down, especially before sleep. However, sitting with a straight spine is recommended for optimal energy flow and concentration."
  },
  {
    question: "How many times a day should I practice mudras?",
    answer: "For best results, practice 2-3 times daily for 10-15 minutes each session. Morning, midday, and evening sessions are ideal for maintaining balanced energy throughout the day."
  },
  {
    question: "Can I combine different mudras in one session?",
    answer: "Yes, you can practice different mudras in one session. Start with 5 minutes of one mudra, then transition to another. This can address multiple concerns simultaneously."
  },
  {
    question: "Are there any contraindications for mudra practice?",
    answer: "Mudras are generally safe for everyone. However, if you have specific health conditions, consult with a healthcare provider. Pregnant women should practice with caution and under guidance."
  }
];

export default function DetailBenefits()  {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.05,
    margin: "-50px"
  });

  const [activeTab, setActiveTab] = useState("stress");
  const [activeToc, setActiveToc] = useState("understanding");
  const [activeFaq, setActiveFaq] = useState(null);

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
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  // Staggered TOC items
  const tocVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.06 + 0.3,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  // Staggered benefits
  const benefitVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08 + 0.3,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Staggered related mudra cards
  const relatedVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.94 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.07,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Character animation for heading
  const charVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -10 },
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

  const headingText = "Mudra Practice";
  const headingChars = headingText.split("");

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Function to handle TOC click - shows only selected section
  const handleTocClick = (sectionId) => {
    setActiveToc(sectionId);
  };

  return (
    <motion.div 
      ref={sectionRef}
      className="w-full" 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >

      {/* ── Body: sidebar + content ── */}
      <motion.div
        className={
          spacing.sectionPaddingX +
          " mt-6 sm:mt-8 md:mt-10 flex flex-col md:flex-row gap-5 md:gap-6 lg:gap-8 xl:gap-10 items-start"
        }
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {/* ── Sidebar TOC ── */}
        <motion.aside 
          className="w-full md:w-[210px] lg:w-[230px] xl:w-[250px] shrink-0 rounded-2xl p-4 sm:p-5 md:sticky md:top-6" 
          style={{
            backgroundColor: dark ? "#E3DDFF" : "#E3DDFF",
          }}
          variants={slideInLeft}
          whileHover={{
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            transition: { duration: 0.3 }
          }}
        >
          <motion.h3 
            className="text-sm sm:text-base font-semibold mb-3 sm:mb-4" 
            style={{ color: textColor }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            On This Page
          </motion.h3>
          <ul className="flex flex-col gap-2.5">
            {tocLinks.map((link, i) => (
              <motion.li 
                key={link.id}
                custom={i}
                variants={tocVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.button
                  onClick={() => handleTocClick(link.id)}
                  className={
                    "text-left w-full cursor-pointer bg-transparent border-0 p-0 " +
                    "text-[12px] sm:text-[13px] lg:text-sm leading-snug transition-colors " +
                    (activeToc === link.id
                      ? "font-medium"
                      : "")
                  }
                  style={{
                    color: activeToc === link.id ? textColor : (dark ? "#030303" : "#6b7280"),
                  }}
                  whileHover={{
                    x: 5,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  {link.label}
                </motion.button>
              </motion.li>
            ))}
          </ul>
        </motion.aside>

        {/* ── Article content ── */}
        <motion.article 
          className="flex-1 min-w-0 pb-12"
          variants={slideInRight}
        >
          {/* Heading - Character by character */}
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight mb-2 sm:mb-3" 
            style={{ color: textColor }}
          >
            {headingChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p 
            className="text-sm sm:text-base font-medium mb-3 sm:mb-4" 
            style={{ color: dark ? "#ffffff" : "#4b5563" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Find calm, Restore balance, Reclaim peace.
          </motion.p>

          <motion.p 
            className="text-[13px] sm:text-sm md:text-[14px] lg:text-base leading-relaxed mb-6 sm:mb-8" 
            style={{ color: dark ? "#ffffff" : "#4b5563" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Stress and anxiety are common in today&apos;s fast-paced world. They can affect your mind, body,
            sleep, digestion and overall well-being. Mudras are simple hand gestures that help calm the
            nervous system, balance energy and promote a sense of inner peace.
          </motion.p>

          {/* ── Understanding Stress & Anxiety Section ── */}
          {activeToc === "understanding" && (
            <motion.section
              id="understanding"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 mt-8 sm:mt-10" 
                style={{ color: textColor }}
              >
                Understanding Stress & Anxiety
              </motion.h2>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-[13px] sm:text-sm md:text-[14px] lg:text-base leading-relaxed" style={{ color: dark ? "#ffffff" : "#4b5563" }}>
                  Stress is the body&apos;s natural response to pressure, while anxiety is the feeling of fear or apprehension about what&apos;s to come. Both can manifest through physical, emotional, and behavioral symptoms.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: dark ? "#1f2937" : "#f3f4f6" }}>
                    <h4 className="font-semibold mb-2" style={{ color: textColor }}>Physical Symptoms</h4>
                    <ul className="space-y-1 text-[12px] sm:text-[13px]" style={{ color: dark ? "#d1d5db" : "#4b5563" }}>
                      <li>• Rapid heartbeat</li>
                      <li>• Headaches and tension</li>
                      <li>• Digestive issues</li>
                      <li>• Fatigue and sleep problems</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: dark ? "#1f2937" : "#f3f4f6" }}>
                    <h4 className="font-semibold mb-2" style={{ color: textColor }}>Emotional Symptoms</h4>
                    <ul className="space-y-1 text-[12px] sm:text-[13px]" style={{ color: dark ? "#d1d5db" : "#4b5563" }}>
                      <li>• Racing thoughts</li>
                      <li>• Irritability</li>
                      <li>• Restlessness</li>
                      <li>• Feeling overwhelmed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* ── How Mudras Help ── */}
          {activeToc === "how-mudras" && (
            <motion.section
              id="how-mudras"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 mt-8 sm:mt-10" 
                style={{ color: textColor }}
              >
                How Mudras Help
              </motion.h2>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-[13px] sm:text-sm md:text-[14px] lg:text-base leading-relaxed" style={{ color: dark ? "#ffffff" : "#4b5563" }}>
                  Mudras influence the flow of prana (life energy) in the body. Certain mudras activate the
                  parasympathetic nervous system, reduce cortisol levels, calm racing thoughts and create
                  emotional stability.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="p-4 rounded-xl text-center" style={{ backgroundColor: dark ? "#1f2937" : "#f3f4f6" }}>
                    <div className="text-2xl mb-2">🧘</div>
                    <h4 className="font-semibold text-sm" style={{ color: textColor }}>Nervous System</h4>
                    <p className="text-[11px] sm:text-xs mt-1" style={{ color: dark ? "#d1d5db" : "#4b5563" }}>
                      Activates parasympathetic response
                    </p>
                  </div>
                  <div className="p-4 rounded-xl text-center" style={{ backgroundColor: dark ? "#1f2937" : "#f3f4f6" }}>
                    <div className="text-2xl mb-2">⚡</div>
                    <h4 className="font-semibold text-sm" style={{ color: textColor }}>Energy Flow</h4>
                    <p className="text-[11px] sm:text-xs mt-1" style={{ color: dark ? "#d1d5db" : "#4b5563" }}>
                      Balances prana distribution
                    </p>
                  </div>
                  <div className="p-4 rounded-xl text-center" style={{ backgroundColor: dark ? "#1f2937" : "#f3f4f6" }}>
                    <div className="text-2xl mb-2">🧠</div>
                    <h4 className="font-semibold text-sm" style={{ color: textColor }}>Mind-Body</h4>
                    <p className="text-[11px] sm:text-xs mt-1" style={{ color: dark ? "#d1d5db" : "#4b5563" }}>
                      Creates emotional stability
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* ── Best Mudras Section ── */}
          {activeToc === "best-mudras" && (
            <motion.section
              id="best-mudras"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 mt-8 sm:mt-10" 
                style={{ color: textColor }}
              >
                Best Mudras for Stress & Anxiety
              </motion.h2>
              
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold mb-2" style={{ color: textColor }}>Key Benefits</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-3">
                    {benefits.map((b, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-start gap-2"
                        custom={i}
                        variants={benefitVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{
                          scale: 1.05,
                          x: 3,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <span className="text-[11px] sm:text-xs md:text-[12px] lg:text-sm leading-snug whitespace-pre-line" style={{ color: dark ? "#ffffff" : "#4b5563" }}>
                          {b}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* ── Related mudras for this concern ── */}
                <div>
                  <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4" style={{ color: textColor }}>Recommended Mudras</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {relatedMudras.map((m, i) => (
                      <motion.button
                        key={m.id}
                        className={`${m.bg} rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-300`}
                        custom={i}
                        variants={relatedVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="w-14 h-14 rounded-full overflow-hidden mb-2.5 bg-white shrink-0 shadow-md">
                          <Image
                            src={IMAGES[m.imgKey]}
                            alt={m.name}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </span>
                        <p className="text-[12px] sm:text-[13px] font-semibold" style={{ color: "#1f2937" }}>
                          {m.name}
                        </p>
                        <p className="text-[10px] sm:text-[11px] mt-1 leading-snug" style={{ color: "#4b5563" }}>
                          {m.benefit}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* ── How to Practice Section ── */}
          {activeToc === "practice" && (
            <motion.section
              id="practice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-4 sm:mb-5 mt-8 sm:mt-10" 
                style={{ color: textColor }}
              >
                How to Practice Mudras
              </motion.h2>
              <div className="space-y-4 sm:space-y-5">
                {practiceSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl"
                    style={{ backgroundColor: dark ? "#1f2937" : "#f9fafb" }}
                    whileHover={{
                      scale: 1.01,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" 
                      style={{ backgroundColor: dark ? "#6366f1" : "#4f46e5" }}>
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[13px] sm:text-sm" style={{ color: textColor }}>{step.title}</h4>
                      <p className="text-[12px] sm:text-[13px] mt-1 leading-relaxed" style={{ color: dark ? "#d1d5db" : "#4b5563" }}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ── Lifestyle Tips Section ── */}
          {activeToc === "lifestyle" && (
            <motion.section
              id="lifestyle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-4 sm:mb-5 mt-8 sm:mt-10" 
                style={{ color: textColor }}
              >
                Lifestyle Tips for Better Results
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {lifestyleTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: dark ? "#1f2937" : "#f9fafb" }}
                    whileHover={{
                      y: -4,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="w-12 h-12 mb-2 relative">
                      <Image
                        src={tip.icon}
                        alt={tip.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h4 className="font-semibold text-[13px] sm:text-sm" style={{ color: textColor }}>{tip.title}</h4>
                    <p className="text-[11px] sm:text-[12px] mt-1 leading-relaxed" style={{ color: dark ? "#d1d5db" : "#4b5563" }}>
                      {tip.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ── FAQ Section ── */}
          {activeToc === "faq" && (
            <motion.section
              id="faq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-4 sm:mb-5 mt-8 sm:mt-10" 
                style={{ color: textColor }}
              >
                Frequently Asked Questions
              </motion.h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-xl overflow-hidden"
                    style={{ backgroundColor: dark ? "#1f2937" : "#f9fafb" }}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-4 py-3 sm:px-5 sm:py-4 text-left flex justify-between items-center"
                      style={{ color: textColor }}
                    >
                      <span className="font-medium text-[13px] sm:text-sm">{faq.question}</span>
                      <motion.span
                        animate={{ rotate: activeFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-xl"
                      >
                        {activeFaq === index ? "−" : "+"}
                      </motion.span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: activeFaq === index ? "auto" : 0,
                        opacity: activeFaq === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                        <p className="text-[12px] sm:text-[13px] leading-relaxed" style={{ color: dark ? "#d1d5db" : "#4b5563" }}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

        </motion.article>
      </motion.div>
    </motion.div>
  );
}