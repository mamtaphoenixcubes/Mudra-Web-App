import OriginsSection from "../../components/OriginsHistory/Originssection";
import OriginsHero from "../../components/OriginsHistory/OriginsHero"
import AncientWisdom from "../../components/OriginsHistory/AncientWisdom";
export default function originshistory() {
  return (
    <main>
      <OriginsHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <OriginsSection />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <AncientWisdom />
    </main>
  );
}