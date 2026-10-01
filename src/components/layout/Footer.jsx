"use client";

import { Send } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "../../assets/assets";

const linkClass =
  "transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const linkGroups = {
  quick: [
    // ["Features", "/Features"],
    ["Benefits", "/Benefits"],
    
    ["Ailments & Needs", "/AilmentsMudrasforNeeds"],
    ["Blog", "/BlogLearning"],
    ["Search Blog", "/BlogsFilter"],
    // ["Blog Article", "/BlogDetailPage"],
    
  
    ["Origins & History", "/originshistory"],
    ["Traditions Beyond Yoga", "/TraditionsBeyondYoga"],
    ["Therapeutic Effects", "/TherapeuticEffects"],
    // ["Practice Analysis", "/Practiceanalysisdetail"],
    // ["Progress Insights", "/Progressinsights"],
    // ["Recent Activity", "/RecentActivity"],
    // ["App Download", "/AppDownload"],
    // ["Download App", "/Downloadapp"],
    // ["Daily Streak", "/DailyStreak"],
    // ["My Sessions", "/Mysessionspage"],
    // ["Play Session", "/PlaySession"],
    // ["Reminders", "/Reminder"],
    // ["Notifications", "/Notificationspage"],
    // ["Saved Favourites", "/Savedfavourites"],
    // ["Newsletter", "/NewsletterSubscribe"],
    ["Privacy Policy", "/PrivacyPolicy"],
    ["Terms & Conditions", "/TermsConditions"],
    ["Disclaimer", "/DisclaimerPage"],
    // ["Newsletter Success", "/NewsletterSuccessState"],
  ],
  about: [
    ["About Mudras", "/about"],
    ["About Us", "/AboutUs"],
  ],
  faq: [["Frequently Asked Questions", "/FAQ"],
["What Are Mudras", "/WhatareMudras"],
    ["What Is Yoga Nidra", "/whatisyoganidra"],
    ["Pricing", "/PricingMembership"],
    ["Contact", "/Contact"],
],
  resources: [
    ["Mudra Library", "/MudraLibrary"],
    ["Yoga Nidra", "/YogaNidraLibrary"],
    ["Element Tracker", "/FiveElements"],
    ["Asanas", "/feature-three"],
    ["Meditation", "/feature-four"],
    ["Pranayam", "/feature-five"],
  ],
};

function LinkColumn({ title, links }) {
  return (
    <nav aria-label={title} className="min-w-0">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
        {title}
      </h3>
      <ul className="space-y-2.5 text-sm font-medium text-white/90">
        {links.map(([label, href]) => (
          <li key={`${title}-${href}-${label}`}>
            <Link href={href} className={linkClass}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#9A85FE] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.15fr_1.2fr_.8fr_.8fr_1.05fr_1.2fr] xl:gap-x-8">
          <div className="min-w-0">
            <Link href="/Home" className="mb-4 flex items-center gap-3">
              <Image
                src={IMAGES.hero}
                alt="Mudras"
                width={48}
                height={48}
                className="object-contain brightness-0 invert"
              />
              <span className="text-2xl font-bold tracking-wider">MUDRAS</span>
            </Link>
            <p className="text-sm font-medium leading-relaxed text-white/90">
              Ancient wisdom for modern life.
              <br />
              Balance within. Transform life.
            </p>
          </div>

          <LinkColumn title="Quick Links" links={linkGroups.quick} />
          <LinkColumn title="About" links={linkGroups.about} />
          <LinkColumn title="FAQs" links={linkGroups.faq} />
          <LinkColumn title="Resources" links={linkGroups.resources} />

          <div className="min-w-0">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Stay Connected
            </h3>
            <p className="mb-4 text-sm font-medium text-white/90">
              Join our newsletter for tips, updates and more.
            </p>
            <form className="mb-6 flex w-full overflow-hidden rounded-xl border border-white/30 bg-white/20">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/70"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-11 w-11 shrink-0 items-center justify-center bg-gray-900 text-white transition-colors hover:bg-black"
              >
                <Send size={15} />
              </button>
            </form>
            <div className="flex items-center gap-3">
              {[
                { icon: FaFacebook, label: "Facebook" },
                { icon: FaInstagram, label: "Instagram" },
                { icon: FaYoutube, label: "YouTube" },
                { icon: FaLinkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#9A85FE] shadow-sm transition-transform hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 py-4">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-3 px-5 text-center text-xs font-medium text-white/90 sm:flex-row sm:px-8 sm:text-left lg:px-12 xl:px-16">
          <p>© 2024 Mudras. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/PrivacyPolicy" className={linkClass}>
              Privacy Policy
            </Link>
            <Link href="/TermsConditions" className={linkClass}>
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
