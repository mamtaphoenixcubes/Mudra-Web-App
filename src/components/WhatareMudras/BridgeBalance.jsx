"use client";

import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { useRouter } from "next/navigation";

export default function BridgeBalance() {
  const router = useRouter();

  return (
    <section className="w-full py-16 md:py-20 bg-white px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        <div className="rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-12 bg-[#DDF4FF]">
          
          {/* Left Meditation Nature Image */}
          <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-xs">
            {IMAGES.JourneyInward && (
              <Image
                src={IMAGES.JourneyInward}
                alt="A Bridge to Balance"
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Right Text Content */}
          <div className="flex flex-col items-start w-full md:w-1/2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
              A Bridge to Balance
            </h2>

            <p className="text-sm sm:text-base text-gray-700 font-medium mb-6 leading-relaxed">
              Mudras connect body, breath, mind and energy—helping you live in harmony with yourself and the world.
            </p>

            <button
              onClick={() => router.push("/MudraLibrary")}
              className="px-6 py-3 rounded-lg font-bold text-sm text-gray-900 bg-white shadow-xs hover:shadow-md hover:bg-gray-50 transition-all cursor-pointer"
            >
              Explore Mudras
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}