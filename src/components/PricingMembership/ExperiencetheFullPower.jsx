
"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { IMAGES } from "../../assets/assets";
import { spacing } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

import Container from "../../common/Container";
import Section from "../../common/Section";
import SiteContainer from "../../common/SiteContainer";
import SectionHeader from "../../common/SectionHeader";
import Card from "../../common/Card";

const features = [
  {
    icon: IMAGES.SecurePrivate,
    title: "Secure & Private",
    desc: "Your data is safe with us.",
    fallbackIcon: "lock",
  },
  {
    icon: IMAGES.TrustedThousands,
    title: "Trusted by Thousands",
    desc: "Join our growing community.",
    fallbackIcon: "shield",
  },
  {
    icon: IMAGES.ExpertDeveloped,
    title: "Expert Developed",
    desc: "Rooted in ancient wisdom backed by modern knowledge.",
    fallbackIcon: "star",
  },
];

// Fallback icons
function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <line x1="12" y1="15" x2="12" y2="17" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l7 3v6c0 4.418-3.134 8.215-7 9-3.866-.785-7-4.582-7-9V5l7-3z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function StarBadgeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
      <path d="M12 7l1.545 3.13L17 10.635l-2.5 2.435.59 3.43L12 14.885l-3.09 1.615.59-3.43L7 10.635l3.455-.505L12 7z" />
    </svg>
  );
}

const iconMap = {
  lock: LockIcon,
  shield: ShieldCheckIcon,
  star: StarBadgeIcon,
};

// App Store badge
function AppStoreBadge({ dark }) {
  return (
    <motion.a
      href="#"
      aria-label="Download on the App Store"
      className="flex items-center gap-2 rounded-xl px-3.5 py-2 border transition-colors shrink-0 min-w-[130px]"
      style={{
        backgroundColor: dark ? "#1f2937" : "#000000",
        borderColor: "#374151",
        color: "#ffffff",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 fill-white shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>

      <div className="flex flex-col leading-none">
        <span className="text-[9px] text-gray-300 font-normal">
          Download on the
        </span>
        <span className="text-[14px] font-semibold tracking-tight text-white">
          App Store
        </span>
      </div>
    </motion.a>
  );
}

// Google Play badge
function GooglePlayBadge({ dark }) {
  return (
    <motion.a
      href="#"
      aria-label="Get it on Google Play"
      className="flex items-center gap-2 rounded-xl px-3.5 py-2 border transition-colors shrink-0 min-w-[140px]"
      style={{
        backgroundColor: dark ? "#1f2937" : "#000000",
        borderColor: "#374151",
        color: "#ffffff",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.18 23.5c.3.17.64.26.99.24l11.4-11.4-2.83-2.84L3.18 23.5z"
          fill="#EA4335"
        />
        <path
          d="M20.5 10.72l-2.78-1.6-3.17 3.17 3.17 3.16 2.81-1.62a1.6 1.6 0 0 0 0-3.1z"
          fill="#FBBC04"
        />
        <path
          d="M3.18.5C2.82.72 2.57 1.1 2.57 1.6v20.8c0 .5.25.88.61 1.1l11.56-11.57L3.18.5z"
          fill="#4285F4"
        />
        <path
          d="M4.17.24l10.36 10.36-2.82 2.83L3.18.5c.3-.17.66-.26.99-.26z"
          fill="#34A853"
        />
      </svg>

      <div className="flex flex-col leading-none">
        <span className="text-[9px] text-gray-300 font-normal">
          GET IT ON
        </span>
        <span className="text-[14px] font-semibold tracking-tight text-white">
          Google Play
        </span>
      </div>
    </motion.a>
  );
}

export default function ExperienceFullPower() {
  const { dark, textColor } = useTheme();

  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "-50px",
  });

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

  const slideInLeft = {
    hidden: {
      opacity: 0,
      x: -40,
    },
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
    hidden: {
      opacity: 0,
      x: 40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const featureVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
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

  return (
    <Section
      className={`${spacing.sectionPaddingX} py-8 md:py-10 lg:py-14`}
      sx={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
    >
      <SiteContainer
        sx={{
          py: 0,
        }}
      >
        <Container>

          <Card
            className="experience-full-power-card w-full"
            sx={{
              display: "flex",
              width: "100%",
              maxWidth: "100%",
              minWidth: 0,
              minHeight: {
                xs: "auto",
                sm: "300px",
                md: "280px",
                lg: "320px",
              },
              flexDirection: {
                xs: "column",
                md: "row",
              },
              alignItems: {
                xs: "center",
                md: "stretch",
              },
              gap: {
                xs: 2,
                md: 0,
              },
              p: {
                xs: "20px",
                sm: "24px",
                md: "24px",
                lg: "28px",
              },
              borderRadius: "16px",
              backgroundColor: "#DFF0FB",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <motion.div
              ref={sectionRef}
              className="w-full flex flex-col md:flex-row items-center md:items-stretch gap-4 md:gap-0"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{
                boxShadow: dark
                  ? "0 8px 30px rgba(0,0,0,0.3)"
                  : "0 8px 30px rgba(0,0,0,0.08)",
                transition: {
                  duration: 0.3,
                },
              }}
            >
              {/* Column 1: Portrait image */}
              <motion.div
                className="w-full max-w-[160px] md:max-w-none md:w-[18%] lg:w-[17%] aspect-[3/4] md:aspect-auto rounded-xl overflow-hidden shrink-0 self-stretch"
                style={{
                  backgroundColor: dark ? "#374151" : "#f3f4f6",
                }}
                variants={slideInLeft}
              >
                <motion.div
                  className="w-full h-full"
                  whileHover={{
                    scale: 1.05,
                    transition: {
                      duration: 0.3,
                    },
                  }}
                >
                  {IMAGES.PricingMembership ? (
                    <Image
                      src={IMAGES.PricingMembership}
                      alt="Pricing membership illustration"
                      width={200}
                      height={260}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 768px) 160px, 18vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-green-200 to-emerald-300 rounded-xl" />
                  )}
                </motion.div>
              </motion.div>

              {/* Column 2: Heading, description and store badges */}
              <motion.div
                className="flex flex-col justify-center flex-1 min-w-0 md:px-6 lg:px-8 md:max-w-[40%] lg:max-w-[38%]"
                variants={slideInRight}
              >
                <motion.h2
                  className="font-bold leading-tight mb-2 md:mb-3 text-xl sm:text-2xl lg:text-3xl"
                  style={{
                    color: textColor,
                  }}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={
                    isInView
                      ? {
                        opacity: 1,
                        y: 0,
                      }
                      : {
                        opacity: 0,
                        y: 15,
                      }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                  }}
                >
                  Experience the Full Power of Mudras and Yoga Nidra
                </motion.h2>

                <motion.p
                  className="text-[11px] sm:text-xs md:text-sm leading-relaxed mb-4 md:mb-5"
                  style={{
                    color: dark ? "#9ca3af" : "#4b5563",
                  }}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={
                    isInView
                      ? {
                        opacity: 1,
                        y: 0,
                      }
                      : {
                        opacity: 0,
                        y: 10,
                      }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                  }}
                >
                  Join thousands of users transforming their health, mind and
                  energy with daily practices
                </motion.p>

                {/* Store badges */}
                <motion.div
                  className="flex flex-row items-center gap-2.5 flex-wrap"
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={
                    isInView
                      ? {
                        opacity: 1,
                        y: 0,
                      }
                      : {
                        opacity: 0,
                        y: 10,
                      }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.4,
                  }}
                >
                  <AppStoreBadge dark={dark} />
                  <GooglePlayBadge dark={dark} />
                </motion.div>
              </motion.div>

              {/* Vertical divider: desktop */}
              <motion.div
                className="hidden md:flex items-stretch mx-1 lg:mx-2"
                initial={{
                  opacity: 0,
                  scaleY: 0,
                }}
                animate={
                  isInView
                    ? {
                      opacity: 1,
                      scaleY: 1,
                    }
                    : {
                      opacity: 0,
                      scaleY: 0,
                    }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                }}
              >
                <div
                  className="w-px self-stretch"
                  style={{
                    backgroundColor: dark ? "#374151" : "#BAE0FD",
                  }}
                />
              </motion.div>

              {/* Horizontal divider: mobile */}
              <motion.div
                className="md:hidden h-px w-full"
                style={{
                  backgroundColor: dark ? "#374151" : "#BAE0FD",
                }}
                initial={{
                  scaleX: 0,
                }}
                animate={
                  isInView
                    ? {
                      scaleX: 1,
                    }
                    : {
                      scaleX: 0,
                    }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                }}
              />

              {/* Column 3: Feature list */}
              <div className="flex flex-col justify-center gap-4 md:gap-4 lg:gap-5 md:flex-1 md:pl-4 lg:pl-6 min-w-0">
                {features.map((feature, i) => {
                  const IconComponent = iconMap[feature.fallbackIcon];

                  return (
                    <motion.div
                      key={feature.title}
                      className="flex items-center gap-2.5 md:gap-3"
                      custom={i}
                      variants={featureVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      whileHover={{
                        x: 5,
                        transition: {
                          duration: 0.2,
                        },
                      }}
                    >
                      {/* Icon */}
                      <motion.div
                        className="w-10 h-10 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                        style={{
                          backgroundColor: dark ? "#374151" : "#ffffff",
                          color: dark ? "#e5e7eb" : "#374151",
                        }}
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                          transition: {
                            duration: 0.2,
                          },
                        }}
                      >
                        {feature.icon ? (
                          <Image
                            src={feature.icon}
                            alt={feature.title}
                            width={24}
                            height={24}
                            className="w-5 h-5 object-contain"
                            style={{
                              filter: dark
                                ? "brightness(0.8) invert(1)"
                                : "none",
                            }}
                          />
                        ) : (
                          <IconComponent />
                        )}
                      </motion.div>

                      {/* Feature text */}
                      <div className="min-w-0">
                        <motion.p
                          className="text-[11px] sm:text-xs md:text-[11px] lg:text-xs xl:text-sm font-semibold leading-tight"
                          style={{
                            color: textColor,
                          }}
                          whileHover={{
                            scale: 1.02,
                            transition: {
                              duration: 0.2,
                            },
                          }}
                        >
                          {feature.title}
                        </motion.p>

                        <p
                          className="text-[10px] md:text-[10px] lg:text-[11px] leading-snug mt-0.5"
                          style={{
                            color: dark ? "#9ca3af" : "#6b7280",
                          }}
                        >
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </Card>
        </Container>
      </SiteContainer>
    </Section>
  );
}
