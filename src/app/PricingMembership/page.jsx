import PricingSection from "../../components/PricingMembership/PricingSection";
import PricingMembershipHero from "../../components/PricingMembership/PricingMembershipHero";
import CompletePracticeSection from "../../components/PricingMembership/CompletePracticeSection";
import ExperiencetheFullPower from "../../components/PricingMembership/ExperiencetheFullPower";

export default function PricingMembership() {
  return (
    <main>
      <PricingMembershipHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <PricingSection />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <CompletePracticeSection />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <ExperiencetheFullPower />
    </main>
  );
}