"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="glass-effect border-b border-white/20 px-4 py-3 flex-shrink-0 z-50 shadow-lg">
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
            <p className="text-xs md:text-sm text-gray-700 leading-tight font-medium">
              AI-powered problem analyzer
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            <Link
              href="/guide"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Guide
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Privacy
            </Link>
          </nav>

          {/* Presented by */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 font-medium">
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

        {/* Mobile Menu and User Icon */}
        <div className="md:hidden flex items-center space-x-3">
          {/* Presented by (mobile) */}
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-600 font-medium">by</span>
            <Link
              href="https://x.com/dionaeatech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform duration-200"
            >
              <Image
                src="/deonaea_icon.png"
                alt="Deonaea (@dionaeatech)"
                width={36}
                height={36}
                className="rounded-[2px] shadow-md"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden">
          {/* Backdrop */}
          <div
            className="fixed top-16 left-0 right-0 bottom-0 bg-black bg-opacity-70 z-40"
            onClick={closeMenu}
          />

          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-200">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-4 bg-white">
                <div className="space-y-2">
                  <Link
                    href="/guide"
                    onClick={closeMenu}
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Guide
                  </Link>
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Contact
                  </Link>
                  <Link
                    href="/privacy"
                    onClick={closeMenu}
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Privacy
                  </Link>
                </div>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="text-xs text-gray-500 text-center">
                  <p>CAN_I_DO_THIS??</p>
                  <p>AI-powered problem analyzer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
