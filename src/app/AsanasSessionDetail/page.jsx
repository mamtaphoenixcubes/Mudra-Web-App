import AsanasInfoCard from "../../components/AsanasSessionDetail/AsanasInfoCard";
import AsanasSessionHero from "../../components/AsanasSessionDetail/AsanasSessionHero";
import HowToPracticeAsanas from "../../components/AsanasSessionDetail/HowToPracticeAsanas";
import AsanasSessionBenefits from "../../components/AsanasSessionDetail/AsanasSessionBenefits";
import PracticeInfoGridAsanas from "../../components/AsanasSessionDetail/PracticeInfoGridAsanas";
import RelatedAsanas from "../../components/AsanasSessionDetail/RelatedAsanas";


export default function Asanas() {
    return (
        <main className="w-full bg-white">
            <AsanasSessionHero />
            <hr className="w-full border-t border-gray-200" />
            < AsanasInfoCard />
            <hr className="w-full border-t border-gray-200" />
            < HowToPracticeAsanas />
            <hr className="w-full border-t border-gray-200" />
            <AsanasSessionBenefits />
            <hr className="w-full border-t border-gray-200" />
            <PracticeInfoGridAsanas />
            <hr className="w-full border-t border-gray-200" />
            <RelatedAsanas />
        </main>
    );
}