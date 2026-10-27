"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import SiteContainer from "../../common/SiteContainer";

const tocLinks = [
  { id: "understanding", label: "Understanding Stress & Anxiety" },
  { id: "how-mudras", label: "How Mudras Help" },
  { id: "best-mudras", label: "Best Mudras for Stress & Anxiety" },
  { id: "practice", label: "How to Practice" },
  { id: "lifestyle", label: "Lifestyle Tips" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const benefits = [
  "Calms the mind\nand nervous system",
  "Reduces worry and\noverthinking",
  "Promotes relaxation\nand restful sleep",
  "Balances emotions\nand mood swings",
  "Brings inner peace\nand clarity",
];

const relatedMudras = [
  { id: "gyan", name: "Gyan Mudra", benefit: "Calms an overactive mind", imgKey: "gyanMudra", bg: "bg-benefit-1" },
  { id: "chin", name: "Chin Mudra", benefit: "Promotes calm and clarity", imgKey: "chinMudra", bg: "bg-benefit-2" },
  { id: "vayu", name: "Vayu Mudra", benefit: "Eases restlessness", imgKey: "vayuMudra", bg: "bg-benefit-3" },
  { id: "shunya", name: "Shunya Mudra", benefit: "Settles sensory overwhelm", imgKey: "DhyanaMudra", bg: "bg-benefit-4" },
];

const practiceSteps = [
  { step: "1", title: "Choose Your Mudra", description: "Select a mudra that addresses your specific concern. For stress and anxiety, Gyan Mudra or Chin Mudra are excellent starting points." },
  { step: "2", title: "Find a Comfortable Position", description: "Sit in a comfortable position with your spine straight. You can sit on a chair, cushion, or floor. Close your eyes gently." },
  { step: "3", title: "Form the Mudra", description: "Place your hands on your knees or thighs with palms facing up. Gently form the mudra with your fingers, keeping the touch light but firm." },
  { step: "4", title: "Breathe Deeply", description: "Take slow, deep breaths. Inhale through your nose, exhale through your mouth. Focus on your breath while holding the mudra." },
  { step: "5", title: "Practice Duration", description: "Start with 5-10 minutes daily. Gradually increase to 15-20 minutes as you become more comfortable with the practice." },
];

const lifestyleTips = [
  { icon: IMAGES.MudraIcon, title: "Morning Routine", description: "Practice mudras during your morning meditation or yoga session for a calm start to your day." },
  { icon: IMAGES.LeafIcon, title: "Nature Connection", description: "Practice outdoors in nature when possible. Fresh air and natural surroundings enhance the calming effect." },
  { icon: IMAGES.Flower, title: "Herbal Support", description: "Combine mudra practice with calming herbal teas like chamomile, lavender, or ashwagandha." },
  { icon: IMAGES.BellIcon, title: "Sleep Routine", description: "Practice relaxing mudras like Shunya Mudra before bed to promote deep, restful sleep." },
  { icon: IMAGES.HeadPhone, title: "Calming Music", description: "Listen to soft, instrumental music or nature sounds while practicing to deepen relaxation." },
  { icon: IMAGES.pencil, title: "Journaling", description: "Keep a journal to track your progress, emotions, and experiences with mudra practice." },
];

const faqs = [
  { question: "How long does it take to see results with mudra practice?", answer: "Some people feel immediate calming effects, while others notice significant changes within 1-2 weeks of consistent daily practice. Results vary based on individual factors and practice consistency." },
  { question: "Can I practice mudras while lying down?", answer: "Yes, you can practice mudras lying down, especially before sleep. However, sitting with a straight spine is recommended for optimal energy flow and concentration." },
  { question: "How many times a day should I practice mudras?", answer: "For best results, practice 2-3 times daily for 10-15 minutes each session. Morning, midday, and evening sessions are ideal for maintaining balanced energy throughout the day." },
  { question: "Can I combine different mudras in one session?", answer: "Yes, you can practice different mudras in one session. Start with 5 minutes of one mudra, then transition to another. This can address multiple concerns simultaneously." },
  { question: "Are there any contraindications for mudra practice?", answer: "Mudras are generally safe for everyone. However, if you have specific health conditions, consult with a healthcare provider. Pregnant women should practice with caution and under guidance." },
];

/* ---------- shared tiny components ---------- */
function SectionHeading({ children, textColor }) {
  return (
    <motion.h2
      className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 mt-8 sm:mt-10"
      style={{ color: textColor }}
    >
      {children}
    </motion.h2>
  );
}

export default function DetailBenefits() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05,
    margin: "-50px",
  });

  const [activeToc, setActiveToc] = useState("understanding");
  const [activeFaq, setActiveFaq] = useState(null);

  /* ---------- shared styles ---------- */
  const bodyStyle = { color: dark ? "#e5e7eb" : "#4b5563" };
  const bodyClass = "text-[13px] sm:text-sm md:text-[14px] lg:text-base leading-relaxed";

  /* ---------- variants ---------- */
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };
  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };
  const tocVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1, x: 0,
      transition: { delay: i * 0.06 + 0.3, duration: 0.4, ease: "easeOut" },
    }),
  };
  const benefitVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: (i) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { delay: i * 0.08 + 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };
  const relatedVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.94 },
    visible: (i) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }),
  };
  const charVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -10 },
    visible: (i) => ({
      opacity: 1, y: 0, rotateX: 0,
      transition: { delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const headingChars = "Mudra Practice".split("");

  const toggleFaq = (index) => setActiveFaq(activeFaq === index ? null : index);

  const handleTocClick = (sectionId) => {
    setActiveToc(sectionId);
    // let the new section mount, then scroll to top of article
    requestAnimationFrame(() => {
      document
        .getElementById("detail-benefits-content")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <motion.div
      ref={sectionRef}
      className="w-full"
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ✅ SiteContainer replaces spacing.sectionPaddingX */}
      <SiteContainer>
        <motion.div
          className="mt-6 sm:mt-8 md:mt-10 flex flex-col md:flex-row gap-5 md:gap-6 lg:gap-8 xl:gap-10 items-start"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* ── Sidebar TOC ── */}
          <motion.aside
            className="w-full md:w-[210px] lg:w-[230px] xl:w-[250px] shrink-0 rounded-2xl p-4 sm:p-5 md:sticky md:top-6"
            style={{ backgroundColor: dark ? "#374151" : "#E3DDFF" }}
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)", transition: { duration: 0.3 } }}
          >
            <motion.h3
              className="text-sm sm:text-base font-semibold mb-3 sm:mb-4"
              style={{ color: textColor }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
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
                      (activeToc === link.id ? "font-medium" : "")
                    }
                    style={{
                      color:
                        activeToc === link.id
                          ? textColor
                          : dark
                          ? "#e5e7eb"
                          : "#6b7280",
                    }}
                    whileHover={{ x: 5, scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    {link.label}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.aside>

          {/* ── Article content ── */}
          <motion.article
            id="detail-benefits-content"
            className="flex-1 min-w-0 pb-12"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Page heading */}
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
                  animate={isInView ? "visible" : "hidden"}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-sm sm:text-base font-medium mb-3 sm:mb-4"
              style={bodyStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Find calm, Restore balance, Reclaim peace.
            </motion.p>

            <motion.p
              className={`${bodyClass} mb-6 sm:mb-8`}
              style={bodyStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Stress and anxiety are common in today&apos;s fast-paced world. They can affect your mind, body,
              sleep, digestion and overall well-being. Mudras are simple hand gestures that help calm the
              nervous system, balance energy and promote a sense of inner peace.
            </motion.p>

            {/* ── Understanding ── */}
            {activeToc === "understanding" && (
              <motion.section
                id="understanding"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SectionHeading textColor={textColor}>
                  Understanding Stress & Anxiety
                </SectionHeading>
                <div className="space-y-3 sm:space-y-4">
                  <p className={bodyClass} style={bodyStyle}>
                    Stress is the body&apos;s natural response to pressure, while anxiety is the feeling of fear or
                    apprehension about what&apos;s to come. Both can manifest through physical, emotional, and
                    behavioral symptoms.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      {
                        title: "Physical Symptoms",
                        items: ["Rapid heartbeat", "Headaches and tension", "Digestive issues", "Fatigue and sleep problems"],
                      },
                      {
                        title: "Emotional Symptoms",
                        items: ["Racing thoughts", "Irritability", "Restlessness", "Feeling overwhelmed"],
                      },
                    ].map((block, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl"
                        style={{ backgroundColor: dark ? "#1f2937" : "#f3f4f6" }}
                      >
                        <h4 className="font-semibold mb-2" style={{ color: textColor }}>
                          {block.title}
                        </h4>
                        <ul
                          className="space-y-1 text-[12px] sm:text-[13px]"
                          style={{ color: dark ? "#d1d5db" : "#4b5563" }}
                        >
                          {block.items.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
                <SectionHeading textColor={textColor}>How Mudras Help</SectionHeading>
                <div className="space-y-3 sm:space-y-4">
                  <p className={bodyClass} style={bodyStyle}>
                    Mudras influence the flow of prana (life energy) in the body. Certain mudras activate the
                    parasympathetic nervous system, reduce cortisol levels, calm racing thoughts and create
                    emotional stability.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {[
                      { emoji: "🧘", title: "Nervous System", desc: "Activates parasympathetic response" },
                      { emoji: "⚡", title: "Energy Flow", desc: "Balances prana distribution" },
                      { emoji: "🧠", title: "Mind-Body", desc: "Creates emotional stability" },
                    ].map((c, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl text-center"
                        style={{ backgroundColor: dark ? "#1f2937" : "#f3f4f6" }}
                      >
                        <div className="text-2xl mb-2">{c.emoji}</div>
                        <h4 className="font-semibold text-sm" style={{ color: textColor }}>
                          {c.title}
                        </h4>
                        <p
                          className="text-[11px] sm:text-xs mt-1"
                          style={{ color: dark ? "#d1d5db" : "#4b5563" }}
                        >
                          {c.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>
            )}

            {/* ── Best Mudras ── */}
            {activeToc === "best-mudras" && (
              <motion.section
                id="best-mudras"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SectionHeading textColor={textColor}>
                  Best Mudras for Stress & Anxiety
                </SectionHeading>
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold mb-2" style={{ color: textColor }}>
                      Key Benefits
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-3">
                      {benefits.map((b, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-2"
                          custom={i}
                          variants={benefitVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover={{ scale: 1.05, x: 3, transition: { duration: 0.2 } }}
                        >
                          <span
                            className="text-[11px] sm:text-xs md:text-[12px] lg:text-sm leading-snug whitespace-pre-line"
                            style={bodyStyle}
                          >
                            {b}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4" style={{ color: textColor }}>
                      Recommended Mudras
                    </h3>
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

            {/* ── How to Practice ── */}
            {activeToc === "practice" && (
              <motion.section
                id="practice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SectionHeading textColor={textColor}>How to Practice Mudras</SectionHeading>
                <div className="space-y-4 sm:space-y-5">
                  {practiceSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl"
                      style={{ backgroundColor: dark ? "#1f2937" : "#f9fafb" }}
                      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    >
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: dark ? "#6366f1" : "#4f46e5" }}
                      >
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[13px] sm:text-sm" style={{ color: textColor }}>
                          {step.title}
                        </h4>
                        <p
                          className="text-[12px] sm:text-[13px] mt-1 leading-relaxed"
                          style={{ color: dark ? "#d1d5db" : "#4b5563" }}
                        >
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* ── Lifestyle Tips ── */}
            {activeToc === "lifestyle" && (
              <motion.section
                id="lifestyle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SectionHeading textColor={textColor}>
                  Lifestyle Tips for Better Results
                </SectionHeading>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {lifestyleTips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="p-4 rounded-xl"
                      style={{ backgroundColor: dark ? "#1f2937" : "#f9fafb" }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
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
                      <h4 className="font-semibold text-[13px] sm:text-sm" style={{ color: textColor }}>
                        {tip.title}
                      </h4>
                      <p
                        className="text-[11px] sm:text-[12px] mt-1 leading-relaxed"
                        style={{ color: dark ? "#d1d5db" : "#4b5563" }}
                      >
                        {tip.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* ── FAQ ── */}
            {activeToc === "faq" && (
              <motion.section
                id="faq"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SectionHeading textColor={textColor}>Frequently Asked Questions</SectionHeading>
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
                        aria-expanded={activeFaq === index}
                        aria-controls={`faq-answer-${index}`}
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
                        id={`faq-answer-${index}`}
                        initial={false}
                        animate={{
                          height: activeFaq === index ? "auto" : 0,
                          opacity: activeFaq === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                          <p
                            className="text-[12px] sm:text-[13px] leading-relaxed"
                            style={{ color: dark ? "#d1d5db" : "#4b5563" }}
                          >
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
      </SiteContainer>
    </motion.div>
  );
}