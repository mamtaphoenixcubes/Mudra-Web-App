import ContinueExploring from "../../components/NewsletterSuccessState/ContinueExploring";
import NewsletterSubscribeHero from "../../components/NewsletterSubscribe/NewsletterSubscribeHero";
import DownloadAppBanner from "../../components/Downloadapp/DownloadAppBanner";


export default function NewsletterSuccessState() {
  return (
    <main>
      <NewsletterSubscribeHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <ContinueExploring />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <DownloadAppBanner />
    </main>
  );
}