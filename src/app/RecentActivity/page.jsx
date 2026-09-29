import TodaySchedule from "../../components/RecentActivity/Todayschedule";
import RecentHero from "../../components/RecentActivity/RecentHero";
import ConsistencyBanner from "../../components/RecentActivity/Consistencybanner";


export default function RecentActivity () {
   return(
       <main>
           <RecentHero/>
           <TodaySchedule/>
           <ConsistencyBanner/>
       </main>
   )
}


