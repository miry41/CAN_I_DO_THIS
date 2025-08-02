import Link from "next/link";
import { Brain } from "lucide-react";

export default function Header() {
  return (
    <header className="glass-effect border-b border-white/20 px-4 py-3 flex-shrink-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg floating-animation">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold gradient-text">
              CAN_I_DO_THIS??
            </h1>
            <p className="text-xs md:text-sm text-gray-700 leading-tight font-medium">
              AI-powered problem analyzer
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
