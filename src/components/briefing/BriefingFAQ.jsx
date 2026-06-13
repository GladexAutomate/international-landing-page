// @ts-nocheck

const ORANGE = "#FF8C00";

function FAQItem({ q, a, theme }) {
  const { border, textPrimary, textSecondary } = theme;

  return (
    <div
      className="border-b last:border-b-0 py-4"
      style={{ borderColor: border }}
    >
      <p
        className="font-body text-base font-semibold leading-snug mb-2"
        style={{ color: textPrimary }}
      >
        {q}
      </p>
      <p
        className="font-body text-base leading-relaxed"
        style={{ color: textSecondary }}
      >
        {a}
      </p>
    </div>
  );
}

export default function BriefingFAQ({ faqs = [], theme }) {
  if (!faqs.length) return null;
  const { bgCard, border } = theme;

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: border, backgroundColor: bgCard }}
    >
      {faqs.map((faq, i) => (
        <div key={i} className="px-5">
          <FAQItem q={faq.q} a={faq.a} theme={theme} />
        </div>
      ))}
    </div>
  );
}
