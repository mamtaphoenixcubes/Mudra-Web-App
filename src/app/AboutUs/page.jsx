import OurCorePillars from "../../components/AboutUs/OurCorePillars";
import AboutScience from "../../components/AboutUs/Aboutscience";
import FounderStory from "../../components/AboutUs/Founderstory";
import FounderJourney from "../../components/AboutUs/Founderjourney";



export default function AilmentDetailTemplate() {
  return (
    <main>
      <AboutScience />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <OurCorePillars />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <FounderStory />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <FounderJourney />
    </main>
  );
}