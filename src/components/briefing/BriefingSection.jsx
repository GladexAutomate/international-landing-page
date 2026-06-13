// @ts-nocheck
const ORANGE = "#FF8C00";

export default function BriefingSection({ label, title, children, theme }) {
  const { textPrimary, isDark } = theme;

  return (
    <div>
      {/* Section header — gradient background integrated with title, no separate banner */}
      <div
        className="mb-6 rounded-r-2xl px-5 py-4 sm:px-8 sm:py-5"
        style={{
          background: isDark
            ? "linear-gradient(90deg, rgba(255,140,0,0.18) 0%, rgba(255,140,0,0.06) 45%, transparent 78%)"
            : "linear-gradient(90deg, rgba(255,140,0,0.20) 0%, rgba(255,200,100,0.08) 45%, rgba(255,255,255,0) 78%)",
          borderLeft: `4px solid ${ORANGE}`,
          boxShadow: isDark
            ? "none"
            : "0 2px 14px rgba(255,140,0,0.09)",
        }}
      >
        {label && (
          <p
            className="text-sm font-bold tracking-[0.28em] uppercase mb-1 font-body"
            style={{ color: ORANGE }}
          >
            {label}
          </p>
        )}
        <h2
          className="font-condensed font-black text-2xl sm:text-3xl lg:text-4xl tracking-wide leading-tight"
          style={{ color: textPrimary }}
        >
          {title}
        </h2>
      </div>

      {children}
    </div>
  );
}
