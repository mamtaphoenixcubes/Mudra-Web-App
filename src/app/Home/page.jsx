import Hero from "../../components/home/Hero";
import ProblemSection from "../../components/home/ProblemSection";
import SolutionSection from "../../components/home/SolutionSection";
import FeaturesSection from "../../components/home/FeaturesSection";
import BenefitsSection from "../../components/home/BenefitsSection";
import CTASection from "../../components/home/CTASection";

export default function Home() {
  return (
    <main className="w-full bg-white text-gray-900 min-h-screen">
      <Hero />
      <hr className="w-full border-t border-gray-200" />
      <ProblemSection />
      <hr className="w-full border-t border-gray-200" />
      <SolutionSection />
      <hr className="w-full border-t border-gray-200" />
      <FeaturesSection />
      <hr className="w-full border-t border-gray-200" />
      <BenefitsSection />
      <hr className="w-full border-t border-gray-200" />
      <CTASection />
    </main>
  );
}