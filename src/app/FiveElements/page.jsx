import ImbalanceStates from "../../components/fiveelements/ImbalanceStates";
import FingerMapping from "../../components/fiveelements/Fingermapping";
import FiveHero from "../../components/fiveelements/FiveHero";
import TypeofMudras from "../../components/fiveelements/TypeofMudras";
import BalancetheElements from "../../components/fiveelements/BalancetheElements";

export default function FiveElements() {
  return (
    <main>
      <FiveHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <FingerMapping />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <ImbalanceStates />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <TypeofMudras />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <BalancetheElements />
    </main>
  );
}