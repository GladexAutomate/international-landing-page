// @ts-nocheck
const ORANGE = "#FF9913";

function TravelerTypeCard({ type, requirements, note, theme, index }) {
  const { border, textPrimary, textSecondary } = theme;
  const cardBg = "#FFFFFF";
  const headerBg = "#FFFFFF";

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: border, backgroundColor: cardBg }}
    >
      <div
        className="px-5 py-4 border-b"
        style={{ borderColor: border, backgroundColor: headerBg }}
      >
        <span
          className="font-condensed font-bold text-base lg:text-lg tracking-wide"
          style={{ color: textPrimary }}
        >
          {type}
        </span>
      </div>

      <div
        className="px-5 pb-5 pt-4 space-y-4"
        style={{ backgroundColor: cardBg }}
      >
        <div>
          <p
            className="font-body text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: ORANGE }}
          >
            Required Documents
          </p>
          <ul className="space-y-2">
            {requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="font-body text-sm font-bold shrink-0" style={{ color: ORANGE }}>·</span>
                <span className="font-body text-base leading-relaxed" style={{ color: textSecondary }}>
                  {req}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {note && (
          <div
            className="px-4 py-3 rounded-xl border-l-4 text-sm font-body leading-relaxed"
            style={{
              borderLeftColor: ORANGE,
              backgroundColor: isDark ? "#1E1200" : "#FFFFFF",
              color: textSecondary,
            }}
          >
            <span className="font-semibold text-xs uppercase tracking-wide block mb-1" style={{ color: ORANGE }}>
              Advisory
            </span>
            {note}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ImmigrationAdvisory({ advisory = [], theme }) {
  if (!advisory.length) return null;

  return (
    <div className="space-y-3">
      {advisory.map((item, i) => (
        <TravelerTypeCard
          key={i}
          index={i}
          type={item.type}
          requirements={item.requirements}
          note={item.note}
          theme={theme}
        />
      ))}
    </div>
  );
}
