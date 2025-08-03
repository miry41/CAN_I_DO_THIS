import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CAN_I_DO_THIS?? - AI Problem Analyzer",
  description:
    "Visualize the knowledge needed to solve any problem with AI-powered analysis",
  openGraph: {
    title: "CAN_I_DO_THIS?? - AI Problem Analyzer",
    description:
      "Visualize the knowledge needed to solve any problem with AI-powered analysis",
    images: [
      {
        url: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "CAN_I_DO_THIS?? - Problem Analysis Tool",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CAN_I_DO_THIS?? - AI Problem Analyzer",
    description:
      "Visualize the knowledge needed to solve any problem with AI-powered analysis",
    images: [
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
