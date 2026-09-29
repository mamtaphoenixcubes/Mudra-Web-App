import Analytics from "../../components/Progressinsights/Analytics";
import Consistency from "../../components/Progressinsights/Consistency";
import Practiceanalysis from "../../components/Progressinsights/Practiceanalysis";
import ProgressInsights from "../../components/Progressinsights/Progressinsights";


export default function Progressinsights () {
   return(
       <main>
           <ProgressInsights/>
           <Practiceanalysis/>
           <Consistency/>
           <Analytics/>
       </main>
   )
}
