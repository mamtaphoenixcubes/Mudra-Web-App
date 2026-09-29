import SearchResultsAbout from "../../components/SearchResults/SearchResultsAbout";
import SearchResultsHero from "../../components/SearchResults/SearchResultsHero";


export default function SearchResults() {
  return (
    <main>
      <SearchResultsHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <SearchResultsAbout />
    </main>
  );
}