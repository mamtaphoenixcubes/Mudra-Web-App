import DownloadAppBanner from "../../components/Downloadapp/DownloadAppBanner";
import Categories from "../../components/NoResultsState/Categories";
import NoResultsStateHero from "../../components/NoResultsState/NoResultsStateHero";


export default function NoResultsState() {
  return (
    <main>
      <NoResultsStateHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <Categories />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <DownloadAppBanner />
    </main>
  );
}