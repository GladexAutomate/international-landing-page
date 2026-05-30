import { useState } from "react";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";

const ORANGE = "#FF8C00";

export default function YouMightAlsoLike({ activities = [], trendingSights = [] }) {
  const [actIdx, setActIdx] = useState(0);
  const [sightIdx, setSightIdx] = useState(0);

  const visibleActivities = 3;
  const visibleSights = 3;

  const actMax = Math.max(0, activities.length - visibleActivities);
  const sightMax = Math.max(0, trendingSights.length - visibleSights);

  if (!activities.length && !trendingSights.length) return null;

  return (
    <div className="space-y-8">
      {/* You Might Also Like */}
      {activities.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: ORANGE }} />
              <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">You Might Also Like</h2>
            </div>
            {activities.length > visibleActivities && (
              <div className="flex gap-2">
                <button
                  onClick={() => setActIdx(Math.max(0, actIdx - 1))}
                  disabled={actIdx === 0}
                  className="w-8 h-8 rounded-full border flex items-center justify-center transition-all disabled:opacity-30"
                  style={{ borderColor: ORANGE, color: ORANGE }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActIdx(Math.min(actMax, actIdx + 1))}
                  disabled={actIdx >= actMax}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30 text-white"
                  style={{ backgroundColor: ORANGE }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 overflow-hidden">
            {activities.slice(actIdx, actIdx + visibleActivities).map((act, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-700"
              >
                <Tag className="w-3.5 h-3.5 shrink-0" style={{ color: ORANGE }} />
                <span className="font-medium">{act}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trending Sights */}
      {trendingSights.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: ORANGE }} />
              <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">Trending Sights</h2>
            </div>
            {trendingSights.length > visibleSights && (
              <div className="flex gap-2">
                <button
                  onClick={() => setSightIdx(Math.max(0, sightIdx - 1))}
                  disabled={sightIdx === 0}
                  className="w-8 h-8 rounded-full border flex items-center justify-center transition-all disabled:opacity-30"
                  style={{ borderColor: ORANGE, color: ORANGE }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSightIdx(Math.min(sightMax, sightIdx + 1))}
                  disabled={sightIdx >= sightMax}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30 text-white"
                  style={{ backgroundColor: ORANGE }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingSights.slice(sightIdx, sightIdx + visibleSights + 3).map((sight, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-sm rounded-full border font-medium flex items-center gap-1.5"
                style={{ borderColor: "#E5E5E5", color: "#555", backgroundColor: "#FAFAFA" }}
              >
                <span className="text-xs font-bold" style={{ color: ORANGE }}>{i + 1}</span>
                {sight}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}