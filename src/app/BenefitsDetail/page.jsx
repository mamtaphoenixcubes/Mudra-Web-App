import Benefitsinfromaction from "../../components/BenefitsDetail/Benefitsinfromaction";
import BenefitsdetailHero from "../../components/BenefitsDetail/BenefitsdetailHero";
import YogaNidraSessionsList from "../../components/BenefitsDetail/Yoganidrasessionslist";
import DetailBenefits from "../../components/BenefitsDetail/DetailBenefits";


export default function BenefitsDetail() {
 return (
   <main>
     <BenefitsdetailHero/>
     <DetailBenefits/>
     <Benefitsinfromaction/>
     <YogaNidraSessionsList/>
   </main>
 );
}
