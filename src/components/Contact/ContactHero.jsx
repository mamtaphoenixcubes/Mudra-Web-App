"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { spacing, typography, btn } from "../../theme";
import { IMAGES } from "../../assets/assets";
import Image from "next/image";
import { useTheme } from "../../context/ThemeContext";
import { contactService } from "../../services/apiService";
import { toast } from "react-toastify";

const features = [
  {
    bg: "bg-yellow-100",
    color: "text-yellow-600",
    title: "We reply within 24-48 hours",
    desc: "Our team is here to support you.",
    icon: IMAGES.HeadPhone,
  },
  {
    bg: "bg-pink-100",
    color: "text-pink-400",
    title: "Made with care",
    desc: "Your feedback helps us grow.",
    icon: IMAGES.Holistic,
  },
  {
    bg: "bg-purple-100",
    color: "text-purple-500",
    title: "Your privacy matters",
    desc: "We respect and protect your information.",
    icon: IMAGES.ShieldTick,
  },
  {
    bg: "bg-sky-100",
    color: "text-sky-400",
    title: "For the community",
    desc: "Supporting your wellness journey together.",
    icon: IMAGES.PEOPLE,
  },
];

export default function ContactHero() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px"
  });

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.email) {
      toast.error("Email address is mandatory.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (formState.phoneNumber) {
      const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
      if (!phoneRegex.test(formState.phoneNumber)) {
        toast.error("Please enter a valid phone number (7 to 15 digits).");
        return;
      }
    }

    setIsLoading(true);
    try {
      const res = await contactService.submitMessage(formState);
      toast.success(res?.message || "Message sent successfully!");
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      const serverMsg = err.response?.data?.message || err.response?.data?.error || err.message;
      toast.error(serverMsg || "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

  // Staggered feature variants
  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
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

  // Character animation for label
  const labelVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headingText = "We're Here to Help";
  const headingChars = headingText.split("");
  
  const labelText = "Contact Us";
  const labelChars = labelText.split("");

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
      <motion.div 
        className={`${spacing.container} grid grid-cols-2 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-start`}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* ── LEFT: Info ── */}
        <motion.div 
          className="flex flex-col"
          variants={slideInLeft}
        >
          {/* Label - Character by character */}
          <motion.p 
            className={`${typography.sectionLabel} uppercase mb-2 sm:mb-3`} 
            style={{ color: dark ? "#ffffff" : "#9ca3af" }}
          >
            {labelChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={labelVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.p>

          {/* Heading - Character by character */}
          <motion.h1 
            className={`${typography.MainHeading} leading-tight mb-2 sm:mb-3`} 
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

          {/* Underline */}
          <motion.div 
            className="w-8 sm:w-10 h-[3px] rounded-full mb-4 sm:mb-5" 
            style={{ backgroundColor: textColor }}
            initial={{ width: 0 }}
            animate={isInView ? { width: "2.5rem" } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          {/* Body */}
          <motion.p 
            className={`${typography.sectionBody} font-medium leading-snug mb-6 sm:mb-8`} 
            style={{ color: dark ? "#ffffff" : "#4b5563" }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have questions, feedback, or need guidance?<br />
            We'd love to hear from you.
          </motion.p>

          {/* Feature list */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {features.map((f, i) => (
              <motion.div 
                key={i} 
                className="flex items-start gap-3 sm:gap-4"
                custom={i}
                variants={featureVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{
                  x: 5,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Icon circle */}
                <motion.div 
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full ${f.bg} ${f.color} flex items-center justify-center shrink-0`}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Image
                    src={f.icon}
                    alt={f.title}
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                </motion.div>
                <div className="pt-0.5">
                  <motion.p 
                    className={`${typography.cardTitle} font-semibold leading-tight`} 
                    style={{ color: textColor }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {f.title}
                  </motion.p>
                  <p className={`${typography.sectionMb} mt-0.5`} style={{ color: dark ? "#ffffff" : "#6b7280" }}>
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: Contact form card ── */}
        <motion.div 
          className="rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm border" 
          style={{
            backgroundColor: dark ? "#1f2937" : "#ffffff",
            borderColor: dark ? "#374151" : "#e5e7eb",
          }}
          variants={slideInRight}
          whileHover={{
            boxShadow: dark 
              ? "0 8px 30px rgba(0,0,0,0.3)"
              : "0 8px 30px rgba(0,0,0,0.08)",
            transition: { duration: 0.3 }
          }}
        >
          <motion.h2 
            className={`${typography.featureTitle} mb-1 font-bold`} 
            style={{ color: textColor }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Send Us a Message
          </motion.h2>
          <motion.p 
            className={`${typography.sessionCardMeta} mb-5 sm:mb-6`} 
            style={{ color: dark ? "#9ca3af" : "#6b7280" }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Fill out the form below and we'll get back to you.
          </motion.p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
            {/* First + Last name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
              <motion.div 
                className="flex flex-col gap-1.5"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <label className="text-sm font-medium" style={{ color: dark ? "#e5e7eb" : "#374151" }}>
                  First Name
                </label>
                <motion.input
                  type="text"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                  style={{
                    backgroundColor: dark ? "#374151" : "#ffffff",
                    borderColor: dark ? "#4b5563" : "#e5e7eb",
                    color: dark ? "#e5e7eb" : "#374151",
                  }}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
              <motion.div 
                className="flex flex-col gap-1.5"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.55 }}
              >
                <label className="text-sm font-medium" style={{ color: dark ? "#e5e7eb" : "#374151" }}>
                  Last Name
                </label>
                <motion.input
                  type="text"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                  style={{
                    backgroundColor: dark ? "#374151" : "#ffffff",
                    borderColor: dark ? "#4b5563" : "#e5e7eb",
                    color: dark ? "#e5e7eb" : "#374151",
                  }}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </div>

            {/* Email + Phone number row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
              <motion.div 
                className="flex flex-col gap-1.5"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.58 }}
              >
                <label className="text-sm font-medium" style={{ color: dark ? "#e5e7eb" : "#374151" }}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                  style={{
                    backgroundColor: dark ? "#374151" : "#ffffff",
                    borderColor: dark ? "#4b5563" : "#e5e7eb",
                    color: dark ? "#e5e7eb" : "#374151",
                  }}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
              <motion.div 
                className="flex flex-col gap-1.5"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.62 }}
              >
                <label className="text-sm font-medium" style={{ color: dark ? "#e5e7eb" : "#374151" }}>
                  Phone Number
                </label>
                <motion.input
                  type="tel"
                  name="phoneNumber"
                  value={formState.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                  style={{
                    backgroundColor: dark ? "#374151" : "#ffffff",
                    borderColor: dark ? "#4b5563" : "#e5e7eb",
                    color: dark ? "#e5e7eb" : "#374151",
                  }}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </div>

            {/* Subject */}
            <motion.div 
              className="flex flex-col gap-1.5"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <label className="text-sm font-medium" style={{ color: dark ? "#e5e7eb" : "#374151" }}>
                Subject
              </label>
              <motion.input
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                placeholder="What is this regarding?"
                className="w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                style={{
                  backgroundColor: dark ? "#374151" : "#ffffff",
                  borderColor: dark ? "#4b5563" : "#e5e7eb",
                  color: dark ? "#e5e7eb" : "#374151",
                }}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            {/* Message */}
            <motion.div 
              className="flex flex-col gap-1.5"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.65 }}
            >
              <label className="text-sm font-medium" style={{ color: dark ? "#e5e7eb" : "#374151" }}>
                Your message
              </label>
              <motion.textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Please provide details about your inquiry..."
                rows={6}
                className="w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
                style={{
                  backgroundColor: dark ? "#374151" : "#ffffff",
                  borderColor: dark ? "#4b5563" : "#e5e7eb",
                  color: dark ? "#e5e7eb" : "#374151",
                }}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            {/* Submit button */}
            <motion.button 
              type="submit"
              disabled={isLoading}
              className={`${btn.primary} w-full sm:w-auto self-start mt-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`} 
              style={{
                backgroundColor: textColor,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={!isLoading ? {
                scale: 1.05,
                opacity: 0.85,
                boxShadow: `0 8px 30px ${textColor}40`,
                transition: { duration: 0.2 }
              } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>

      </motion.div>
    </motion.section>
  );
}