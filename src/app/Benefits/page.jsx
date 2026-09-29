import MudraNidraBenefits from "../../components/Benefits/MudraNidraBenefits";
import BenefitsHero from "../../components/Benefits/BenefitsHero";
import DownloadAppBanner from "../../components/Downloadapp/DownloadAppBanner";
import MudrasMayHelp from "../../components/Benefits/MudrasMayHelp";
import DoesResearch from "../../components/Benefits/DoesResearch";


export default function Benefits() {
 return (
   <main>
     <BenefitsHero />
     <MudraNidraBenefits/>
     <MudrasMayHelp/>
     <DoesResearch/>
     <DownloadAppBanner/>
   </main>
 );
}
