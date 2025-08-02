export default function BannerAd() {
  return (
    <div className="glass-effect border-t border-white/20 px-4 py-4 flex-shrink-0 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 rounded-2xl p-4 text-center shadow-lg card-hover">
          <div className="text-white">
            <p className="text-sm font-semibold">Advertisement Space</p>
            <p className="text-xs opacity-95 mt-1 font-medium">
              Support free AI analysis - Ad revenue keeps this service running
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}