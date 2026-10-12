"use client";

import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { useRouter } from "next/navigation";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { spacing, typography } from "../../theme";

export default function JourneyInward() {
  const router = useRouter();
  const { dark, textColor } = useTheme();

  return (
    <section className={`${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`} style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}>
      <div className="mx-auto">

        <motion.div 
          className="rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-12"
          style={{ backgroundColor: dark ? "#FCE7F3" : "#FCE7F3" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          
          {/* Left Meditation Sunset Image */}
          <motion.div 
            className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-xs"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {IMAGES.JourneyInward && (
              <Image
                src={IMAGES.JourneyInward}
                alt="A Journey Inward"
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>

          {/* Right Text Content */}
          <motion.div 
            className="flex flex-col items-start w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className={`${typography.ctaHeading} mb-4`}
              style={{ color: dark ? "#070707" : "#111827" }}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              A Journey Inward.
              <br />
              A Life Transformed.
            </motion.h2>

            <motion.p 
              className={`${typography.ctaBody} mb-8`}
              style={{ color: dark ? "#0e0e0e" : "#4b5563" }}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Small consistent practices create big shifts.
              <br />
              Take the first step toward a balanced you.
            </motion.p>

            <motion.button
              onClick={() => router.push("/SignUp")}
              className={`${typography.ctaBtnText} px-6 py-3.5 rounded-xl font-bold shadow-xs hover:shadow-md transition-all mb-4 cursor-pointer`}
              style={{ 
                backgroundColor: dark ? "#ffffff" : "#ffffff",
                color: dark ? "#000000" : "#111827"
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Start Your Journey
            </motion.button>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}