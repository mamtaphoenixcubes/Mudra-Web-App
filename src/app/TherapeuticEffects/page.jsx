import MudraClaims from "../../components/TherapeuticEffects/Mudraclaims";
import KeyBenefits from "../../components/TherapeuticEffects/KeyBenefits";
import TherapeuticHero from "../../components/TherapeuticEffects/TherapeuticHero";
import ResearchSection from "../../components/TherapeuticEffects/Researchsection";
import DisclaimerSection from "../../components/TherapeuticEffects/Disclaimersection";

export default function TherapeuticEffects() {
  return (
    <main>
      <TherapeuticHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <KeyBenefits />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <MudraClaims />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <ResearchSection />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <DisclaimerSection />
    </main>
  );
}