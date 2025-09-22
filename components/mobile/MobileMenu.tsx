"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { MobileMenuProps } from "@/types";

export default function MobileMenu({
  isOpen,
  onToggle,
  onClose,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      {/* Backdrop */}
      <div
        className="fixed top-16 left-0 right-0 bottom-0 bg-black bg-opacity-70 z-40"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-wisteria-200">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-wisteria-200 bg-wisteria-50">
            <h2 className="text-lg font-semibold text-wisteria-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-wisteria-200 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-wisteria-700" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 bg-white">
            <div className="space-y-2">
              <Link
                href="/guide"
                onClick={onClose}
                className="flex items-center px-4 py-3 text-wisteria-700 hover:text-wisteria-900 hover:bg-wisteria-100 rounded-lg transition-colors duration-200"
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
                onClick={onClose}
                className="flex items-center px-4 py-3 text-wisteria-700 hover:text-wisteria-900 hover:bg-wisteria-100 rounded-lg transition-colors duration-200"
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
                onClick={onClose}
                className="flex items-center px-4 py-3 text-wisteria-700 hover:text-wisteria-900 hover:bg-wisteria-100 rounded-lg transition-colors duration-200"
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
          <div className="p-4 border-t border-wisteria-200 bg-wisteria-50">
            <div className="text-xs text-wisteria-500 text-center">
              <p>CAN_I_DO_THIS??</p>
              <p>AI-powered problem analyzer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
