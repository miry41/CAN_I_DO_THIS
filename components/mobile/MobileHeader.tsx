"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { MobileHeaderProps } from "@/types";

interface MobileHeaderExtendedProps extends MobileHeaderProps {
  onMenuToggle: () => void;
}

export default function MobileHeader({
  onMenuToggle,
}: MobileHeaderExtendedProps) {
  return (
    <div className="md:hidden flex items-center space-x-3">
      {/* Presented by (mobile) */}
      <div className="flex items-center space-x-1">
        <span className="text-xs text-wisteria-600 font-medium">by</span>
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
        onClick={onMenuToggle}
        className="p-2 rounded-lg hover:bg-wisteria-100 transition-colors duration-200"
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6 text-wisteria-700" />
      </button>
    </div>
  );
}
