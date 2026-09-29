import BlogFilterPage from "../../components/FilterAppliedState/Blogfilterpage";
import DownloadAppBanner from "../../components/Downloadapp/DownloadAppBanner";


export default function FilterAppliedState() {
  return (
    <main>
      <BlogFilterPage />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <DownloadAppBanner />
    </main>
  );
}