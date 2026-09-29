import Research from "../../components/what-is-yoga-nidra/Research";
import Benefitsofyoga from "../../components/what-is-yoga-nidra/Benefitsofyoga";
import StepsOfPractice from "../../components/what-is-yoga-nidra/StepsOfPractice";
import YogaNidraHero from "../../components/what-is-yoga-nidra/YogaNidraHero";

export default function whatisyoganidra() {
  return (
    <main>
      <YogaNidraHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <StepsOfPractice />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <Benefitsofyoga />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <Research />
    </main>
  );
}