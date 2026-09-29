"use client";

import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { useRouter } from "next/navigation";

export default function JourneyInward() {
  const router = useRouter();

  return (
    <section className="w-full py-16 md:py-20 bg-white px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        <div className="rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-12 bg-[#FCE7F3]">
          
          {/* Left Meditation Sunset Image */}
          <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-xs">
            {IMAGES.JourneyInward && (
              <Image
                src={IMAGES.JourneyInward}
                alt="A Journey Inward"
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Right Text Content */}
          <div className="flex flex-col items-start w-full md:w-1/2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
              A Journey Inward.
              <br />
              A Life Transformed.
            </h2>

            <p className="text-sm sm:text-base text-gray-600 font-medium mb-6 leading-relaxed">
              Small consistent practices create big shifts.
              <br />
              Take the first step toward a balanced you.
            </p>

            <button
              onClick={() => router.push("/SignUp")}
              className="px-6 py-3 rounded-lg font-bold text-sm text-gray-900 bg-white border border-gray-200 shadow-xs hover:shadow-md hover:bg-gray-50 transition-all cursor-pointer"
            >
              Start Your Journey
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}