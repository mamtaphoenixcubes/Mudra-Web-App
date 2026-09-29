// app/ClientLayout.jsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ThemeProvider } from "../context/ThemeContext";
import ThemeWrapper from "../components/ThemeWrapper";
import LiveSupportChat from "./LiveSupportChat/page";
import SocialContactFab from "./Socialcontactfab/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  
  // Pages where you don't want navbar and footer
  const hideNavFooter = ["/", "/splash", "/welcome", "/login", "/SignUp", "/Personaliseexperience"].includes(pathname);
  
  return (
    <ThemeProvider>
      <ThemeWrapper>
        {!hideNavFooter && <Navbar />}
        <main className={`flex-1 ${!hideNavFooter ? '' : 'mt-0'}`}>
          {children}
        </main>
        {!hideNavFooter && <Footer />}
        <LiveSupportChat />
        <SocialContactFab />
        <ToastContainer position="bottom-right" autoClose={4000} theme="colored" />
      </ThemeWrapper>
    </ThemeProvider>
  );
}