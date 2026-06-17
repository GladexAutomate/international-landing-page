// @ts-nocheck
const ORANGE = "#FF9913";

export default function BriefingSection({ label, title, children, theme }) {
  const { textPrimary } = theme;
  // On solid-orange sections, accent is white so labels/underline are visible against the bg
  const accent = theme.accent || ORANGE;

  return (
    <div>
      <div className="mb-7">
        {label && (
          <p
            className="text-xs font-bold tracking-[0.35em] uppercase mb-2 font-body"
            style={{ color: accent }}
          >
            {label}
          </p>
        )}
        <h2
          className="font-condensed font-black text-3xl sm:text-4xl leading-tight"
          style={{ color: textPrimary }}
        >
          {title}
        </h2>
        <div
          className="mt-3 h-1 w-14 rounded-full"
          style={{ backgroundColor: accent }}
        />
      </div>

      {children}
    </div>
  );
}
