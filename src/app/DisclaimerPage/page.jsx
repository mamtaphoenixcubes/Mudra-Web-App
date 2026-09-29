import Disclaimerfuture from "../../components/DisclaimerPage/Disclaimerfuture";
import DisclaimerHero from "../../components/DisclaimerPage/DisclaimerHero";


export default function DisclaimerPage() {
  return (
    <main>
      <DisclaimerHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <Disclaimerfuture />
    </main>
  );
}