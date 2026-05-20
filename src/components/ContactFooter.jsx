import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Phone, Mail, MapPin, Send, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactFooter() {
  const [form, setForm] = useState({ name: "", email: "", destination: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", destination: "", message: "" });
  };

  const inputClass =
    "w-full bg-transparent border-0 border-b border-white/20 text-white font-body text-sm py-3 px-0 placeholder-chrome focus:outline-none focus:border-gladex-orange transition-colors duration-300";

  return (
    <footer id="contact" className="border-t border-white/8" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gladex-orange rounded-sm flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#080808]" />
              </div>
              <div className="leading-none">
                <span className="font-condensed text-2xl font-bold text-white tracking-widest">GLADEX</span>
                <div className="font-condensed text-[10px] font-semibold tracking-[0.25em] text-gladex-orange uppercase">
                  International Travel
                </div>
              </div>
            </div>

            <h2
              className="font-condensed font-black text-white leading-none mb-4"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "0.03em" }}
            >
              START YOUR
              <br />
              <span className="text-gladex-orange">JOURNEY</span>
            </h2>
            <p className="font-body text-chrome text-base leading-relaxed mb-10 max-w-sm">
              Your premium international travel partner. We craft cinematic travel experiences for every Filipino explorer.
            </p>

            {/* Contact info */}
            <div className="space-y-4 mb-10">
              {[
                { icon: Phone, text: "+63 XXX XXX XXXX", label: "Call Us" },
                { icon: Mail, text: "inquiries@gladextravel.com", label: "Email Us" },
                { icon: MapPin, text: "Philippines", label: "Based In" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-9 h-9 glass-panel rounded-sm flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-gladex-orange" />
                  </div>
                  <div>
                    <div className="font-body text-[10px] text-chrome tracking-wider uppercase">{item.label}</div>
                    <div className="font-body text-white text-sm">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              <span className="font-body text-xs text-chrome tracking-widest uppercase">Follow Us</span>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Instagram, label: "Instagram" },
                ].map((social) => (
                  <button
                    key={social.label}
                    className="w-10 h-10 glass-panel rounded-sm flex items-center justify-center hover:bg-gladex-orange/20 hover:border-gladex-orange/40 transition-all duration-200 focus-ring"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-chrome hover:text-gladex-orange transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Inquiry Form (VIP Booking Desk) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="mb-8">
              <div className="font-body text-[10px] tracking-[0.4em] text-gladex-orange uppercase mb-2" style={{ fontFamily: "monospace" }}>
                VIP BOOKING DESK
              </div>
              <h3 className="font-condensed font-black text-white text-3xl lg:text-4xl tracking-wide">
                INQUIRE NOW
              </h3>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel rounded-sm p-8 text-center"
              >
                <div className="text-4xl mb-4">✈️</div>
                <h4 className="font-condensed font-bold text-white text-2xl mb-2">Inquiry Received!</h4>
                <p className="font-body text-chrome text-sm">
                  Our travel consultants will reach out within 24 hours to craft your perfect journey.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                      aria-label="Full Name"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      aria-label="Email Address"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Destination of Interest"
                    value={form.destination}
                    onChange={(e) => setForm({ ...form, destination: e.target.value })}
                    className={inputClass}
                    aria-label="Destination"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your travel plans, preferred dates, group size..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                    aria-label="Message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full font-condensed font-bold tracking-widest uppercase text-sm px-8 py-4 bg-gladex-orange text-[#080808] rounded-sm hover:bg-orange-400 transition-all duration-300 min-h-[56px] flex items-center justify-center gap-3 focus-ring"
                >
                  <Send className="w-4 h-4" />
                  Send Inquiry
                </button>
                <p className="font-body text-chrome text-xs text-center">
                  No commitment required. We'll craft your perfect itinerary within 24 hours.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 px-6 lg:px-10 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-chrome text-xs">
            © {new Date().getFullYear()} Gladex International Travel. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms & Conditions", "FAQ"].map((link) => (
              <button key={link} className="font-body text-chrome text-xs hover:text-white transition-colors focus-ring">
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}