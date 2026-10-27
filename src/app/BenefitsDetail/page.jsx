import Benefitsinfromaction from "../../components/BenefitsDetail/Benefitsinfromaction";
import BenefitsdetailHero from "../../components/BenefitsDetail/BenefitsdetailHero";
import YogaNidraSessionsList from "../../components/BenefitsDetail/Yoganidrasessionslist";
import DetailBenefits from "../../components/BenefitsDetail/DetailBenefits";


export default function BenefitsDetail() {
  return (
    <main>
      <BenefitsdetailHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300 dark:border-gray-800" />
      </div>
      <DetailBenefits />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300 dark:border-gray-800" />
      </div>
      <Benefitsinfromaction />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300 dark:border-gray-800" />
      </div>
      <YogaNidraSessionsList />
    </main>
  );
}
