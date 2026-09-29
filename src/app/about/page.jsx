import AboutHero from "../../components/about/AboutHero";
import Approachsection from "../../components/about/Approachsection";
import OurPhilosophy from "../../components/about/OurPhilosophy";
import JourneyInward from "../../components/about/JourneyInward";

export default function AboutPage() {
  return (
    <main className="w-full bg-white text-gray-900 min-h-screen">
      <AboutHero />
      <hr className="w-full border-t border-gray-200" />
      <Approachsection />
      <hr className="w-full border-t border-gray-200" />
      <OurPhilosophy />
      <hr className="w-full border-t border-gray-200" />
      <JourneyInward />
    </main>
  );
}