import Categories from "../../components/EmptySearchState/Categories";
import NoResultsStateHero from "../../components/EmptySearchState/NoResultsStateHero";
import DownloadAppBanner from "../../components/Downloadapp/DownloadAppBanner";


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