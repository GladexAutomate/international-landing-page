const ORANGE = "#FF8C00";

export default function WhatToBringSection({ items = [], seasons = [] }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: ORANGE }} />
        <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">Good to Know — What to Bring</h2>
      </div>

      {/* What to bring */}
      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-gray-100 bg-gray-50 text-center"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-medium text-gray-700 leading-tight">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Season / Weather */}
      {seasons.length > 0 && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: ORANGE }} />
            <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">Best Seasons & Weather</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {seasons.map((s, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl border border-gray-100 bg-white text-center"
                style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
              >
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xs font-black text-gray-800 mb-0.5">{s.label}</div>
                <div className="text-xs font-semibold mb-1" style={{ color: ORANGE }}>{s.weather}</div>
                <div className="text-[10px] text-gray-500">{s.note}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}