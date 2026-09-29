import WhatYouCanDo from "../../components/ServerError/Whatyoucando";
import ErrorStateHero from "../../components/ServerError/ErrorStateHero";
import DownloadAppBanner from "../../components/Downloadapp/DownloadAppBanner";


export default function ServerError() {
  return (
    <main>
      <ErrorStateHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <WhatYouCanDo />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <DownloadAppBanner />
    </main>
  );
}