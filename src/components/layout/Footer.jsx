"use client";

import { Send } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "../../assets/assets";

export default function Footer() {
  return (
    <footer className="w-full bg-[#9A85FE] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 md:py-16">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Col 1: Logo */}
          <div>
            <Link href="/Home" className="flex items-center gap-3 mb-4">
              <Image
                src={IMAGES.hero}
                alt="Mudras"
                width={48}
                height={48}
                className="object-contain brightness-0 invert"
              />
              <h2 className="text-2xl font-bold tracking-wider text-white">
                MUDRAS
              </h2>
            </Link>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
              Ancient wisdom for modern life.
              <br />
              Balance within. Transform life.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm font-medium text-white/90">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/WhatareMudras" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/Home#features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/Home#benefits" className="hover:text-white transition-colors">
                  Benefits
                </Link>
              </li>
              <li>
                <Link href="/BlogLearning" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/Contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm font-medium text-white/90">
              <li>
                <Link href="/MudraLibrary" className="hover:text-white transition-colors">
                  Mudra Library
                </Link>
              </li>
              <li>
                <Link href="/YogaNidraLibrary" className="hover:text-white transition-colors">
                  Yoga Nidra
                </Link>
              </li>
              <li>
                <Link href="/FiveElements" className="hover:text-white transition-colors">
                  Element Tracker
                </Link>
              </li>
              <li>
                <Link href="/FAQ" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/AilmentsMudrasforNeeds" className="hover:text-white transition-colors">
                  Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Stay Connected */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Stay Connected
            </h3>
            <p className="text-xs sm:text-sm text-white/90 mb-4 font-medium">
              Join our newsletter for tips, updates and more.
            </p>

            {/* Email Input */}
            <div className="w-full mb-6">
              <div className="flex w-full overflow-hidden rounded-xl bg-white/20 border border-white/30">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-0 flex-1 min-w-0 h-11 px-3 bg-transparent text-white placeholder-white/70 outline-none text-xs font-medium"
                />
                <button
                  aria-label="Subscribe"
                  className="flex-shrink-0 h-11 w-11 flex items-center justify-center bg-gray-900 text-white hover:bg-black transition-colors"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: FaFacebook, href: "#" },
                { icon: FaInstagram, href: "#" },
                { icon: FaYoutube, href: "#" },
                { icon: FaLinkedin, href: "#" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="w-9 h-9 rounded-full bg-white text-[#9A85FE] flex items-center justify-center hover:scale-110 transition-transform shadow-xs"
                >
                  <item.icon size={16} />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-4">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/90 font-medium">
          <p>
            © 2024 Mudras. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/PrivacyPolicy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/TermsConditions" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}