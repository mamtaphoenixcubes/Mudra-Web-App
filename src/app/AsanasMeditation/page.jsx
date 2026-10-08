import AsanasPracticeSteps from "../../components/AsanasMeditation/AsanasPracticeSteps";
import AsanasMeditationBar from "../../components/AsanasMeditation/AsanasMeditationBar";
import AsanasMeditationCard from "../../components/AsanasMeditation/AsanasMeditationCard";
import AsanasMeditationSection from "../../components/AsanasMeditation/AsanasMeditationSection";


export default function AsanasMeditation() {
    return (
        <main className="w-full bg-white">
            < AsanasMeditationCard />
            <hr className="w-full border-t border-gray-200" />
            <AsanasPracticeSteps />
            <hr className="w-full border-t border-gray-200" />
            <AsanasMeditationSection />
            <hr className="w-full border-t border-gray-200" />
            < AsanasMeditationBar />
        </main>
    );
}