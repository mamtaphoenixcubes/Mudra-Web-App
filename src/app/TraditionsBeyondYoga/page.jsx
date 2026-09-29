import JinShinJyutsu from "../../components/TraditionsBeyondYoga/JinShinJyutsu";
import BuddhistMudrasSection from "../../components/TraditionsBeyondYoga/BuddhistMudrasSection";
import TraditionsHero from "../../components/TraditionsBeyondYoga/TraditionsHero";
import AcrossTraditions from "../../components/TraditionsBeyondYoga/Acrosstraditions";
import CTASection from "../../components/TraditionsBeyondYoga/CTASection";

export default function TherapeuticEffects() {
  return (
    <main>
      <TraditionsHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <BuddhistMudrasSection />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <JinShinJyutsu />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <AcrossTraditions />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <CTASection />
    </main>
  );
}