import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function InquiryForm({ destination }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", pax: "1", date: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glass-panel rounded-sm p-6 text-center">
        <CheckCircle className="w-12 h-12 text-gladex-orange mx-auto mb-4" />
        <h4 className="font-condensed font-bold text-white text-2xl mb-2">Inquiry Sent!</h4>
        <p className="font-body text-chrome text-sm leading-relaxed">
          Our travel consultant will contact you within 24 hours with your personalized {destination.name} itinerary.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-transparent border-0 border-b border-white/20 text-white font-body text-sm py-2.5 px-0 placeholder-chrome focus:outline-none focus:border-gladex-orange transition-colors duration-300";

  return (
    <div className="glass-panel rounded-sm p-6">
      <div className="mb-6">
        <div className="font-body text-[9px] tracking-[0.3em] text-gladex-orange uppercase mb-1" style={{ fontFamily: "monospace" }}>
          SECURE INQUIRY
        </div>
        <h3 className="font-condensed font-bold text-white text-2xl">Book This Package</h3>
        <p className="font-body text-chrome text-xs mt-1">No commitment — we'll reach out within 24h</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          required
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass}
          aria-label="Full Name"
        />
        <input
          type="email"
          required
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass}
          aria-label="Email Address"
        />
        <input
          type="tel"
          placeholder="Phone / Viber Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={inputClass}
          aria-label="Phone Number"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            min="1"
            placeholder="No. of Pax"
            value={form.pax}
            onChange={(e) => setForm({ ...form, pax: e.target.value })}
            className={inputClass}
            aria-label="Number of Passengers"
          />
          <input
            type="text"
            placeholder="Preferred Date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={inputClass}
            aria-label="Preferred Date"
          />
        </div>
        <textarea
          rows={3}
          placeholder="Questions or special requests..."
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className={`${inputClass} resize-none`}
          aria-label="Additional Notes"
        />
        <button
          type="submit"
          className="w-full font-condensed font-bold tracking-widest uppercase text-sm px-6 py-4 bg-gladex-orange text-[#080808] rounded-sm hover:bg-orange-400 transition-all duration-300 min-h-[52px] flex items-center justify-center gap-2 focus-ring"
        >
          <Send className="w-4 h-4" />
          Send Inquiry
        </button>
      </form>
    </div>
  );
}