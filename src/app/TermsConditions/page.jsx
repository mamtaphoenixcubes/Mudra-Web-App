import TermsConditionsfuture from "../../components/TermsConditions/TermsConditionsfuture";
import TermsConditionsHero from "../../components/TermsConditions/TermsConditionsHero";


export default function TermsConditions() {
  return (
    <main>
      <TermsConditionsHero/>
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <TermsConditionsfuture/>
    </main>
  );
}