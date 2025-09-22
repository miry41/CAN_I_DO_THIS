"use client";

import { MobileLayoutProps } from "@/types";
import { cn } from "@/lib/utils";

export default function MobileLayout({
  children,
  className,
}: MobileLayoutProps) {
  return (
    <div className={cn("flex-1 overflow-y-auto px-4 py-8 pb-safe", className)}>
      {children}
    </div>
  );
}

// モバイル専用のコンテナコンポーネント
export function MobileContainer({
  children,
  maxWidth = "max-w-2xl",
  className,
}: {
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}) {
  return <div className={cn(maxWidth, "mx-auto", className)}>{children}</div>;
}

// モバイル専用のカードコンポーネント
export function MobileCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-white rounded-2xl shadow-lg p-6", className)}>
      {children}
    </div>
  );
}
