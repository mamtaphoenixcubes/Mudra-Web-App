import ReminderTypes from "../../components/Reminder/Remindertypes";
import Remindersights from "../../components/Reminder/Remindersights";
import ReminderPreferences from "../../components/Reminder/Reminderpreferences";


export default function Reminder () {
   return(
       <main>
           <Remindersights/>
           <ReminderTypes/>
           <ReminderPreferences/>
       </main>
   )
}
