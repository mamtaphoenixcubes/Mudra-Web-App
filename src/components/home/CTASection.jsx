"use client";

import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();

  return (
    <section className="w-full py-16 md:py-20 bg-white px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        <div className="rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-12 bg-[#DDF4FF]">
          
          {/* Left Sunset Image */}
          <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-xs">
            <Image
              src={IMAGES.Transform || IMAGES.journeySunset}
              alt="Transform Your Life"
              width={600}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Text Content */}
          <div className="flex flex-col items-start w-full md:w-1/2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Ready to Transform Your Life?
            </h2>

            <p className="text-sm sm:text-base text-gray-700 font-medium mb-8 leading-relaxed">
              Start your journey to inner balance with Mudras,
              Yoga Nidra and the power of elements.
            </p>

            <button
              onClick={() => router.push("/SignUp")}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-gray-900 bg-white shadow-xs hover:shadow-md hover:bg-gray-50 transition-all mb-4 cursor-pointer"
            >
              Get Started For Free
            </button>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 text-gray-600 shrink-0"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span>No credit card required.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}