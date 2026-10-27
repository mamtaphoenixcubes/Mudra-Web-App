import DownloadAppBanner from "../../components/Downloadapp/DownloadAppBanner";
import ContinueExploring from "../../components/NewsletterSuccessState/ContinueExploring";
import Newslettersuccesshero from "../../components/NewsletterSuccessState/Newslettersuccesshero";


export default function NewsletterSuccessState() {
  return (
    <main>
      <Newslettersuccesshero/>
        <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <ContinueExploring/>
        <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <DownloadAppBanner />
    </main>
  );
}