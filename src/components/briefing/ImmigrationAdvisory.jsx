// @ts-nocheck
const ORANGE = "#FF8C00";

function TravelerTypeCard({ type, requirements, note, theme }) {
  const { bgCard, bgAlt, border, textPrimary, textSecondary, isDark } = theme;

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: border, backgroundColor: bgCard }}
    >
      <div
        className="px-5 py-4 border-b"
        style={{ borderColor: border, backgroundColor: isDark ? "#1A1500" : "#FFF8F0" }}
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
        style={{ backgroundColor: bgAlt }}
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
                <span className="font-body text-sm leading-relaxed" style={{ color: textSecondary }}>
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
              backgroundColor: isDark ? "#1E1200" : "#FFFAF0",
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
          type={item.type}
          requirements={item.requirements}
          note={item.note}
          theme={theme}
        />
      ))}
    </div>
  );
}
