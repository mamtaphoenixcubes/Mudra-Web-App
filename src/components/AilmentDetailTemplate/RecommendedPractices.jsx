"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spacing, typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const defaultMudras = {
    icon: IMAGES.MudraIcon,
    title: "Mudras for Stress & Anxiety",
    link: "View all related mudras →",
    items: [
        {
            icon: IMAGES.HastaMudras,
            title: "Prithvi Mudra",
            description: "Promotes stability and reduces stress.",
        },
        {
            icon: IMAGES.HastaMudras,
            title: "Apan Vayu Mudra",
            description: "Helps release anxiety and restlessness.",
        },
        {
            icon: IMAGES.HastaMudras,
            title: "Gyan Mudra",
            description: "Calms the mind and improves focus.",
        },
    ],
};

const defaultYogaNidra = {
    icon: IMAGES.KayaMudras,
    title: "Yoga Nidra for Stress & Anxiety",
    link: "View all related yoga nidra sessions →",
    items: [
        {
            icon: IMAGES.KayaMudras,
            title: "Deep Relaxation Yoga Nidra",
            description: "Releases tension and promotes deep rest.",
        },
        {
            icon: IMAGES.KayaMudras,
            title: "Anxiety Relief Yoga Nidra",
            description: "Calms the mind and reduces anxiety.",
        },
        {
            icon: IMAGES.KayaMudras,
            title: "Sleep Deep Yoga Nidra",
            description: "Improves sleep quality and relaxation.",
        },
    ],
};

function IconCircle({ src, alt, dark, index }) {
    const iconVariants = {
        hidden: { opacity: 0, scale: 0.5, rotate: -180 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.08 + 0.2,
            },
        },
    };

    return (
        <motion.div 
            className="rounded-full w-12 h-12 flex items-center justify-center shrink-0 shadow-sm" 
            style={{
                backgroundColor: "#ffffff",
            }}
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 }
            }}
        >
            {src ? (
                <Image src={src} alt={alt} width={22} height={22} className="object-contain" unoptimized={true} />
            ) : (
                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: dark ? "#0e0e0e" : "#e5e7eb" }} />
            )}
        </motion.div>
    );
}

function PracticeItem({ icon, title, description, documentId, isYogaNidra, dark, textColor, index }) {
    const itemVariants = {
        hidden: { opacity: 0, x: -15 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: index * 0.06 + 0.3,
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    // Character animation for title
    const charVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.03 + 0.1,
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    const titleChars = title.split("");

    const href = isYogaNidra 
        ? `/YogaNidraSessionDetail?id=${documentId}`
        : `/MudraDetailTemplate?id=${documentId}`;

    const innerContent = (
        <div className="flex items-start gap-4">
            <IconCircle src={icon} alt={title} dark={dark} index={index} />
            <div>
                <motion.h4 
                    className="text-sm md:text-xs lg:text-base font-semibold mb-1" 
                    style={{ color: textColor }}
                >
                    {titleChars.map((char, i) => (
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
                </motion.h4>
                <motion.p 
                    className="text-xs md:text-[10px] lg:text-sm text-left" 
                    style={{ color: dark ? "#ffffff" : "#4b5563" }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    {description}
                </motion.p>
            </div>
        </div>
    );

    return (
        <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
                x: 3,
                transition: { duration: 0.2 }
            }}
        >
            {documentId ? (
                <Link href={href} className="block hover:opacity-90 transition-opacity">
                    {innerContent}
                </Link>
            ) : (
                innerContent
            )}
        </motion.div>
    );
}

function PracticeCard({ title, items, link, onViewAll, dark, textColor, side, isYogaNidra }) {
    const cardVariants = {
        hidden: { opacity: 0, x: side === "left" ? -30 : 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
            },
        },
    };

    // Character animation for card title
    const cardTitleVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.04 + 0.2,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    const cardTitleChars = title.split("");

    return (
        <motion.div 
            className="bg-primary/10 rounded-3xl p-8 md:p-10"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
                boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                transition: { duration: 0.3 }
            }}
        >
            <motion.h3 
                className="text-base md:text-sm lg:text-lg font-semibold mb-6" 
                style={{ color: textColor }}
            >
                {cardTitleChars.map((char, i) => (
                    <motion.span
                        key={i}
                        custom={i}
                        variants={cardTitleVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{ display: "inline-block" }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.h3>

            <div className="flex flex-col gap-6 mb-8">
                {items.map((item, i) => (
                    <PracticeItem 
                        key={i} 
                        {...item} 
                        isYogaNidra={isYogaNidra}
                        dark={dark} 
                        textColor={textColor} 
                        index={i} 
                    />
                ))}
            </div>

            <motion.button
                type="button"
                onClick={onViewAll}
                className="text-sm md:text-xs lg:text-base font-medium transition-colors"
                style={{ color: dark ? "#f8f8f8" : "#374151" }}
                whileHover={{
                    scale: 1.05,
                    color: textColor,
                    transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
            >
                {link}
            </motion.button>
        </motion.div>
    );
}

export default function RecommendedPractices({
    heading = "Recommended Practices",
    mudras = defaultMudras,
    yogaNidra = defaultYogaNidra,
    onViewAllMudras,
    onViewAllYogaNidra,
}) {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.05,
        margin: "-50px"
    });

    const parsedMudras = mudras?.items
        ? mudras
        : {
              icon: IMAGES.MudraIcon,
              title: `Mudras for ${heading}`,
              link: "View all related mudras →",
              items: Array.isArray(mudras) ? mudras.map(m => ({
                icon: m.image?.[0]?.url ? (m.image[0].url.startsWith("http") ? m.image[0].url : `http://192.168.1.14:1337${m.image[0].url}`) : IMAGES.HastaMudras,
                title: m.name || "",
                description: m.introCard?.introCardText || m.description || "",
                documentId: m.documentId || m.id
              })) : defaultMudras.items
          };

    const parsedYogaNidra = yogaNidra?.items
        ? yogaNidra
        : {
              icon: IMAGES.KayaMudras,
              title: `Yoga Nidra for ${heading}`,
              link: "View all related yoga nidra sessions →",
              items: Array.isArray(yogaNidra) ? yogaNidra.map(y => ({
                icon: IMAGES.KayaMudras,
                title: y.Name || y.name || "",
                description: y.Description || `${y.Duration || 20} mins • ${y.Level || "Beginner"} level`,
                documentId: y.documentId || y.id
              })) : defaultYogaNidra.items
          };

    const headingText = "Recommended Practices";
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
            <div className={spacing.container}>
                
                {/* Heading - Character by character */}
                <motion.h2 
                    className={`${typography.heroHeading} text-center mb-3`} 
                    style={{ color: textColor }}
                >
                    {headingChars.map((char, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={charVariants => ({
                              hidden: { opacity: 0, y: 20, rotateX: -10 },
                              visible: {
                                opacity: 1,
                                y: 0,
                                rotateX: 0,
                                transition: {
                                  delay: i * 0.04,
                                  duration: 0.5,
                                  ease: [0.22, 1, 0.36, 1],
                                },
                              }
                            })}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            style={{ display: "inline-block" }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h2>

                {/* Divider */}
                <motion.div 
                    className={typography.howToPractice.dividerWrapper}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <motion.span 
                        className={typography.whySubscribe.dividerLine} 
                        style={{ backgroundColor: dark ? "#ffffff" : "#e5e7eb" }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    />
                    <motion.div 
                        className={typography.howToPractice.lotusDivider}
                    >
                        <Image
                            src={IMAGES.Energy}
                            alt="Lotus divider"
                            width={40}
                            height={40}
                            className="w-full h-full object-contain"
                            style={{
                                filter: dark ? "brightness(0.8) invert(1)" : "none",
                            }}
                        />
                    </motion.div>
                    <motion.span 
                        className={typography.whySubscribe.dividerLine} 
                        style={{ backgroundColor: dark ? "#ffffff" : "#e5e7eb" }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <PracticeCard 
                        {...parsedMudras} 
                        isYogaNidra={false}
                        dark={dark} 
                        textColor={textColor} 
                        onViewAll={onViewAllMudras}
                        side="left"
                    />
                    <PracticeCard 
                        {...parsedYogaNidra} 
                        isYogaNidra={true}
                        dark={dark} 
                        textColor={textColor} 
                        onViewAll={onViewAllYogaNidra}
                        side="right"
                    />
                </div>
            </div>
        </motion.section>
    );
}