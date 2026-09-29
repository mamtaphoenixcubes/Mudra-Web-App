import SessionFeedback from "../../components/SessionComplete/Sessionfeedback";
import SessionCompleteScreen from "../../components/SessionComplete/Sessioncompletescreen";
import SessionCompleteActions from "../../components/SessionComplete/Sessioncompleteactions";


export default function SessionComplete() {
 return (
   <main>
       <SessionCompleteScreen/>
       <SessionFeedback/>
       <SessionCompleteActions/>
   </main>
 );
}
