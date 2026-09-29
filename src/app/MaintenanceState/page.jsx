import DownloadAppBanner from "../../components/Downloadapp/DownloadAppBanner";
import MaintenanceHero from "../../components/MaintenanceState/MaintenanceHero";

export default function MaintenanceState() {
  return (
    <main>
      <MaintenanceHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <DownloadAppBanner />
    </main>
  );
}