"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { typography, spacing } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import { elementsService } from "../../services/apiService";

const ELEMENTS = [
  {
    key: "Earth",
    name: "Earth",
    finger: "Thumb",
    description: "Stability, structure, nourishment",
    imageKey: "EarthElement",
    color: "#4CAF50",
  },
  {
    key: "Water",
    name: "Water",
    finger: "Index Finger",
    description: "Flow, emotion, adaptability",
    imageKey: "WaterElement",
    color: "#2196F3",
  },
  {
    key: "Fire",
    name: "Fire",
    finger: "Middle Finger",
    description: "Transformation, energy, digestion",
    imageKey: "FireElement",
    color: "#f44336",
  },
  {
    key: "Air",
    name: "Air",
    finger: "Ring Finger",
    description: "Movement, creativity, communication",
    imageKey: "AirElement",
    color: "#9C27B0",
  },
  {
    key: "Space",
    name: "Space",
    finger: "Little Finger",
    description: "Expansion, awareness, connection",
    imageKey: "SpaceElement",
    color: "#FF9800",
  },
];

const documentIds = {
  "Water": "taqtjc5zg7zt46uv3fy0dimr",
  "Fire": "b7vupswbjvkqyxijo50swxkr",
  "Air": "vf3u1ukmxn229f66p6jg6m6r",
  "Space": "sr0xc8z5coitas3l7l2n75g1",
  "Earth": "in4vcbjj65hiqpk4gs49mja7"
};

function VDivider({ dark }) {
  return <div className="self-stretch w-px shrink-0" style={{
    backgroundColor: dark ? "#374151" : "#e5e7eb",
  }} />;
}

function ElementCard({ el, dark, textColor, index, isInView }) {
  const router = useRouter();
  // Split text for animations
  const nameChars = el.name.split("");
  const fingerWords = el.finger.split(" ");
  const descWords = el.description.split(" ");

  // Card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1
      }
    }
  };

  // Character animation for name
  const charVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.04 + index * 0.1 + 0.3,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Word animation for finger
  const wordVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05 + index * 0.1 + 0.4,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Word animation for description
  const descWordVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.04 + index * 0.1 + 0.5,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <motion.div 
      onClick={() =>
        router.push(`/ElementDetailTemplate?id=${el.documentId}`)
      }
     className="flex flex-col items-center text-center w-full cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3 }
      }}
    >
      {/* Image circle */}
      <motion.div 
        className={`relative rounded-full overflow-hidden mb-2 sm:mb-3 md:mb-4 shrink-0 ${spacing.fingerImageCircle}`} 
        style={{
          backgroundColor: dark ? "#374151" : "#f3f4f6",
        }}
        whileHover={{ 
          scale: 1.1,
          rotate: 5,
          boxShadow: `0 8px 30px ${el.color}40`,
          transition: { duration: 0.3 }
        }}
      >
       <Image
  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${el.image}`}
  alt={el.name}
  fill
  className="object-cover"
/>
        
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `2px solid ${el.color}30` }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.15,
          }}
        />
      </motion.div>

      {/* Name - Character by character */}
      <motion.p 
        className={`${typography.fingerName} mb-0.5 sm:mb-1`} 
        style={{ color: textColor }}
        whileHover={{ 
          color: el.color,
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        {nameChars.map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={charVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>

      {/* Finger - Word by word */}
      <motion.p 
        className={`${typography.fingerText} mb-2 sm:mb-2.5 md:mb-3`} 
        style={{ color: dark ? "#ffffff" : "#6b7280" }}
      >
        {fingerWords.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "inline-block", marginRight: "0.15em" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>

      {/* Divider line */}
      <motion.div 
        className={`${spacing.fingerDivider} mb-2 sm:mb-2.5 md:mb-3`} 
        style={{
          backgroundColor: textColor,
          opacity: 0.3,
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: "2rem", opacity: 0.3 } : { width: 0, opacity: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.3 + index * 0.1,
          ease: [0.22, 1, 0.36, 1]
        }}
      />

      {/* Description - Word by word */}
      <motion.p 
        className={`${typography.fingerDesc} ${spacing.fingerDescMaxW}`} 
        style={{ color: dark ? "#fcfcfc" : "#4b5563" }}
      >
        {descWords.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={descWordVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  );
}

export default function FingerMapping() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.15,
    margin: "-50px"
  });
  const [elements, setElements] = useState([]);
useEffect(() => {
  const fetchElements = async () => {
    try {
      const response = await elementsService.getElements();

      console.log("FIVE ELEMENTS RESPONSE:", response);

      const apiElements = response?.data || [];

      const formattedElements = apiElements.map((item) => ({
        key: item.Name,
        name: item.Name,
        finger: item.FingerMapping?.Finger || "",
        description: item.FingerMapping?.ShortDescription || "",
        image: item.FingerMapping?.Image?.url || "",
        documentId: item.documentId,
        color: "#9C27B0",
      }));

      setElements(formattedElements);
    } catch (error) {
      console.error("FIVE ELEMENTS API ERROR:", error);
    }
  };

  fetchElements();
}, []);
  // Letter animation for label
  const letterVariants = {
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

  // Character animation for heading
  const charVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.03,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Word animation for subtitle
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Split text
  const labelText = "FINGER MAPPING";
  const labelChars = labelText.split("");
  
  const headingText = "Each Element Lives in a Finger";
  const headingChars = headingText.split("");
  
  const subtitleText = "Our hands are a reflection of the five elements";
  const subtitleWords = subtitleText.split(" ");

  return (
    <motion.section 
      ref={sectionRef}
      className={`w-full ${spacing.sectionPadding} relative overflow-hidden`} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background decorative elements */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-5"
        style={{ backgroundColor: textColor }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-5"
        style={{ backgroundColor: textColor }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className={spacing.container}>

        {/* Heading block */}
        <div className={`text-center ${spacing.headingBlockMb}`}>
          {/* Label - Character by character */}
          <motion.p 
            className={`${typography.fingerLabel} mb-2 sm:mb-3`} 
            style={{ color: dark ? "#ffffff" : "#9ca3af" }}
          >
            {labelChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
          
          {/* Heading - Character by character */}
          <motion.h2 
            className={`${typography.fingerHeading} mb-2 sm:mb-3 md:mb-4`} 
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
                transition={{ delay: i * 0.03 + 0.2 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
          
          {/* Subtitle - Word by word */}
          <motion.p 
            className={`${typography.fingerSubheading} ${spacing.maxWSectionBody}`} 
            style={{ color: dark ? "#ffffff" : "#6b7280" }}
          >
            {subtitleWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ display: "inline-block", marginRight: "0.25em" }}
                transition={{ delay: i * 0.05 + 0.4 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* Desktop: single horizontal row (md and above) */}
        <div className="hidden md:flex flex-row items-start justify-between">
         {elements.map((el, i) => (
  <div
    key={el.documentId}
    className="flex flex-row items-stretch flex-1 min-w-0"
  >
    <div className={`flex-1 flex justify-center ${spacing.fingerDesktopGutter}`}>
      <ElementCard
        el={el}
        dark={dark}
        textColor={textColor}
        index={i}
        isInView={isInView}
      />
    </div>

    {i < elements.length - 1 && <VDivider dark={dark} />}
  </div>
))}
        </div>

        {/* Mobile: 2-col rows + Space centred (below md) */}
       <div className="md:hidden">
  {elements.length >= 2 && (
    <div className="flex flex-row mb-8">
      <div className="flex-1 flex justify-center">
        <ElementCard
          el={elements[0]}
          dark={dark}
          textColor={textColor}
          index={0}
          isInView={isInView}
        />
      </div>

      <div
        className={spacing.fingerMobileDivider}
        style={{
          backgroundColor: dark ? "#374151" : "#e5e7eb",
        }}
      />

      <div className="flex-1 flex justify-center">
        <ElementCard
          el={elements[1]}
          dark={dark}
          textColor={textColor}
          index={1}
          isInView={isInView}
        />
      </div>
    </div>
  )}

  {elements.length >= 4 && (
    <div className="flex flex-row mb-8">
      <div className="flex-1 flex justify-center">
        <ElementCard
          el={elements[2]}
          dark={dark}
          textColor={textColor}
          index={2}
          isInView={isInView}
        />
      </div>

      <div
        className={spacing.fingerMobileDivider}
        style={{
          backgroundColor: dark ? "#374151" : "#e5e7eb",
        }}
      />

      <div className="flex-1 flex justify-center">
        <ElementCard
          el={elements[3]}
          dark={dark}
          textColor={textColor}
          index={3}
          isInView={isInView}
        />
      </div>
    </div>
  )}

  {elements[4] && (
    <div className="flex justify-center">
      <ElementCard
        el={elements[4]}
        dark={dark}
        textColor={textColor}
        index={4}
        isInView={isInView}
      />
    </div>
  )}
</div>

      </div>
    </motion.section>
  );
}