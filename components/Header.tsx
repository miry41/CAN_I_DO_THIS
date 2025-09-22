"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";
import { MobileHeader, MobileMenu } from "@/components/mobile";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="glass-effect border-b border-wisteria-200/30 px-4 py-3 flex-shrink-0 z-50 soft-shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/icon.png"
            alt="CAN_I_DO_THIS logo"
            width={48}
            height={48}
            className="rounded-2xl shadow-lg floating-animation"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold gradient-text">
              CAN_I_DO_THIS??
            </h1>
            <p className="text-xs md:text-sm text-wisteria-700 leading-tight font-medium">
              AI-powered problem analyzer
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            <Link
              href="/guide"
              className="text-wisteria-700 hover:text-wisteria-900 font-medium transition-colors duration-200"
            >
              Guide
            </Link>
            <Link
              href="/contact"
              className="text-wisteria-700 hover:text-wisteria-900 font-medium transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-wisteria-700 hover:text-wisteria-900 font-medium transition-colors duration-200"
            >
              Privacy
            </Link>
          </nav>

          {/* Presented by */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-wisteria-600 font-medium">
              presented by
            </span>
            <Link
              href="https://x.com/dionaeatech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform duration-200"
            >
              <Image
                src="/deonaea_icon.png"
                alt="Deonaea (@dionaeatech)"
                width={48}
                height={48}
                className="rounded-[2px] shadow-md hover:shadow-lg transition-shadow duration-200"
              />
            </Link>
          </div>
        </div>

        {/* Mobile Header */}
        <MobileHeader onMenuToggle={toggleMenu} />
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onToggle={toggleMenu}
        onClose={closeMenu}
      />
    </header>
  );
}
