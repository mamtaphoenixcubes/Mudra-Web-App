import WhySubscribeSection from "../../components/NewsletterSubscribe/Whysubscribesection";
import Newsletter from "../../components/NewsletterSubscribe/Newsletter";
import NewsletterSubscribeHero from "../../components/NewsletterSubscribe/NewsletterSubscribeHero";
import DownloadAppBanner from "../../components/Downloadapp/DownloadAppBanner";


export default function NewsletterSubscribe() {
  return (
    <main>
      <NewsletterSubscribeHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <Newsletter />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <WhySubscribeSection />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <DownloadAppBanner />
    </main>
  );
}