
"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import { typography } from "../../theme";
import Section from "../../common/Section";
import SiteContainer from "../../common/SiteContainer";
import SectionHeader from "../../common/SectionHeader";

export default function BridgeBalance() {
  const router = useRouter();
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
  });

  const { dark } = useTheme();

  return (
    <Section
      className="bridge-balance-section"
      sx={{
        backgroundColor: dark ? "#111827" : "#ffffff",
        py: 0,
      }}
    >
      <SiteContainer
        sx={{
          py: { xs: 4, sm: 6, md: 8, lg: 10 },
        }}
      >
        <motion.div
          ref={sectionRef}
          className="rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-12"
          style={{
            backgroundColor: "#DDF4FF",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Left: Meditation Nature Image */}
          <motion.div
            className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-sm"
            initial={{ opacity: 0, x: -50 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -50 }
            }
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            {IMAGES.JourneyInward && (
              <Image
                src={IMAGES.JourneyInward}
                alt="A peaceful nature scene representing a bridge to balance"
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            className="flex flex-col items-start w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: 50 }
            }
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: "easeOut",
            }}
          >
            <SectionHeader
              title="A Bridge to Balance"
              align="left"
              sx={{
                mb: { xs: 2, md: 3 },
                "& h2": {
                  fontFamily:
                    '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
                  fontWeight: 700,
                  fontSize: {
                    xs: "28px",
                    sm: "32px",
                    md: "36px",
                    lg: "42px",
                  },
                  lineHeight: 1.2,
                  color: "#0F0F0F",
                },
              }}
            />

            <motion.p
              className={`${typography.ctaBody} mb-8`}
              style={{
                color: "#0F0F0F80",
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -10 }
              }
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Mudras connect body, breath, mind and energy—helping you
              live in harmony with yourself and the world.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              type="button"
              onClick={() => router.push("/MudraLibrary")}
              className={`${typography.ctaBtnText} px-6 py-3.5 rounded-xl font-bold transition-all cursor-pointer`}
              style={{
                background: "#FFFFFF",
                color: "#111827",
                boxShadow: "7.19px 8.13px 2.65px 0px #0000000F",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "7.19px 8.13px 8px 0px #0000001A",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Explore Mudras
            </motion.button>
          </motion.div>
        </motion.div>
      </SiteContainer>
    </Section>
  );
}
