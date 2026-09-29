"use client";

import WaysToConnect from "../../components/Contact/Waystoconnect";
import ContactHero from "../../components/Contact/ContactHero";
import FAQSection from "../../components/Contact/Faqsection";


export default function Contact() {
  return (
    <main>
      <ContactHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <WaysToConnect />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <FAQSection />
    </main>
  );
}