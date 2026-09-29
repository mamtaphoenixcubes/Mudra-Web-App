import HolisticFeaturesSection from "../../components/Downloadapp/Holisticfeaturessection";
import DownloadappHero from "../../components/Downloadapp/DownloadappHero";
import DownloadAppBanner from "../../components/Downloadapp/DownloadAppBanner";

export default function Downloadapp() {
  return (
    <main>
      <DownloadappHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <HolisticFeaturesSection />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <DownloadAppBanner />
    </main>
  );
}