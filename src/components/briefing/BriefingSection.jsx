// @ts-nocheck
/**
 * BriefingSection — shared section wrapper used by all briefing sections.
 * Renders an orange-accent label, bold heading, and children content.
 */

const ORANGE = "#FF8C00";

export default function BriefingSection({ label, title, children, theme }) {
  const { textPrimary } = theme;

  return (
    <div>
      <div className="mb-6">
        {label && (
          <p
            className="text-xs font-bold tracking-[0.3em] uppercase mb-1.5 font-body"
            style={{ color: ORANGE }}
          >
            {label}
          </p>
        )}
        <div className="flex items-center gap-3">
          <div
            className="w-1 h-7 rounded-full shrink-0"
            style={{ backgroundColor: ORANGE }}
          />
          <h2
            className="font-condensed font-black text-2xl lg:text-3xl tracking-wide leading-tight"
            style={{ color: textPrimary }}
          >
            {title}
          </h2>
        </div>
      </div>
      {children}
    </div>
  );
}
