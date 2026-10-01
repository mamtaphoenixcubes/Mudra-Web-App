import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "../styles/globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import ThemeWrapper from "../components/ThemeWrapper";
import LiveSupportChat from "./LiveSupportChat/page";
import SocialContactFab from "./Socialcontactfab/page";
import { ToastContainer } from "react-toastify";


export const metadata = {
 title: "Mudras - Balance Within. Transform Life.",
 description: "Ancient wisdom. Modern life...",
};

// updated


export default function RootLayout({ children }) {
 return (
   <html lang="en">
     <body className="font-sans min-h-screen flex flex-col">
       <ThemeProvider>
         <ThemeWrapper>
           <Navbar />
           <main className="flex-1">{children}</main>
           <LiveSupportChat/>
           <SocialContactFab/>
           <ToastContainer position="top-center" autoClose={4000} theme="colored" />
           <Footer />
         </ThemeWrapper>
       </ThemeProvider>
     </body>
   </html>
 );
}

