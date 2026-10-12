"use client";

import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { useRouter } from "next/navigation";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { spacing, typography } from "../../theme";

export default function CTASection() {
  const router = useRouter();
  const { dark, textColor } = useTheme();

  return (
    <section className={`${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`} style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}>
      <div>

        <motion.div 
          className="rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-12"
          style={{ backgroundColor: dark ? "#DDF4FF" : "#DDF4FF" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          
          {/* Left Sunset Image */}
          <motion.div 
            className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-xs"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Image
              src={IMAGES.Transform || IMAGES.journeySunset}
              alt="Transform Your Life"
              width={600}
              height={450}
              className="w-full h-full object-cover"
            />
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
              Ready to Transform Your Life?
            </motion.h2>

            <motion.p 
              className={`${typography.ctaBody} mb-8`}
              style={{ color: dark ? "#0e0e0e" : "#4b5563" }}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Start your journey to inner balance with Mudras,
              Yoga Nidra and the power of elements.
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
              Get Started For Free
            </motion.button>

            <motion.div 
              className={`${typography.ctaNote} flex items-center gap-2`}
              style={{ color: dark ? "#000000" : "#4b5563" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 shrink-0"
                style={{ color: dark ? "#2d2e30" : "#4b5563" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span>No credit card required.</span>
            </motion.div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}