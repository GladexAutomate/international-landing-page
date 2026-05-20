import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { useTheme } from "../lib/ThemeContext";

export default function ContactFooter() {
  const { isDark } = useTheme();

  const bg = isDark ? "#0A0A0A" : "#2C1F0E";
  const textColor = "#FFFFFF";
  const mutedColor = isDark ? "#888" : "rgba(255,255,255,0.6)";
  const accentColor = "#FF8C00";
  const dividerColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.12)";

  return (
    <footer
      id="contact"
      style={{ backgroundColor: bg }}
      className="pt-14 pb-6"
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 pb-10" style={{ borderBottom: `1px solid ${dividerColor}` }}>
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            {/* REPLACE WITH ACTUAL GLADEX LOGO PNG */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-condensed font-black text-2xl tracking-widest" style={{ color: accentColor }}>
                G
              </span>
              <span className="font-condensed font-black text-2xl tracking-widest" style={{ color: textColor }}>
                ladex
              </span>
            </div>
            <p className="font-body text-xs leading-relaxed mb-1" style={{ color: mutedColor }}>
              Premium travel showcase
            </p>
            <p className="font-body text-xs" style={{ color: mutedColor }}>2007 Natiow Ave: #61, Roan,</p>
            <p className="font-body text-xs" style={{ color: mutedColor }}>Gladx, NY 35545</p>
          </div>

          {/* Contact Us 1 */}
          <div>
            <h4 className="font-body text-sm font-semibold mb-4" style={{ color: textColor }}>Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                <span className="font-body text-xs" style={{ color: mutedColor }}>+91 875 456 759</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                <span className="font-body text-xs" style={{ color: mutedColor }}>+91 875 868 580</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                <span className="font-body text-xs" style={{ color: mutedColor }}>gladexan@gladex.com</span>
              </div>
            </div>
          </div>

          {/* Contact Us 2 */}
          <div>
            <h4 className="font-body text-sm font-semibold mb-4" style={{ color: textColor }}>Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                <span className="font-body text-xs" style={{ color: mutedColor }}>gladexradex.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                <span className="font-body text-xs" style={{ color: mutedColor }}>gladex.com-gladex</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-body text-sm font-semibold mb-4" style={{ color: textColor }}>Social</h4>
            <div className="space-y-2">
              {["About", "About Us", "Contact"].map((item) => (
                <div key={item}>
                  <span className="font-body text-xs cursor-pointer hover:text-white transition-colors" style={{ color: mutedColor }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-body text-sm font-semibold mb-4" style={{ color: textColor }}>Follow Us</h4>
            <div className="flex gap-3">
              {[Facebook, Instagram].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" style={{ color: textColor }} />
                </button>
              ))}
              {/* Pinterest-style icon */}
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                aria-label="Pinterest"
              >
                <span className="font-body font-bold text-xs" style={{ color: textColor }}>P</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs" style={{ color: mutedColor }}>
            Copyright © Gladex
          </p>
          <p className="font-body text-xs" style={{ color: mutedColor }}>
            Copyright. All rights reserved.
          </p>
          <p className="font-body text-xs" style={{ color: mutedColor }}>
            Copyright © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}