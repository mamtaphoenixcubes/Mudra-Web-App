import MudraDetailSection from "../../components/Features/MudraDetailSection";
import FeaturesHero from "../../components/Features/FeaturesHero";
import PopularMudras from "../../components/Features/Popularmudras";

export default function Features() {
 return (
   <main className="w-full bg-white">
     <FeaturesHero />
     <hr className="w-full border-t border-gray-200" />
     <PopularMudras/>
     <hr className="w-full border-t border-gray-200" />
     <MudraDetailSection/>
   </main>
 );
}

