// @ts-nocheck
import { motion } from "framer-motion";
import { Gift, Share2 } from "lucide-react";
import BriefingSection from "./briefing/BriefingSection";

const ORANGE = "#FF8C00";

const SHARE_TEXT =
  "Hey! I just booked my international trip with Gladex Tours and their service is amazing! Book your dream trip here: https://gladextours.com";

export default function ReferralSection({ theme }) {
  const { border, textPrimary, textSecondary, isDark } = theme;

  return (
    <BriefingSection
      label="Travel Rewards"
      title="Know Someone Who Wants To Travel?"
      theme={theme}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #1A0A00 0%, #130700 100%)"
            : "linear-gradient(135deg, #FFF8F0 0%, #FFF0DC 100%)",
          border: `1.5px solid ${ORANGE}35`,
        }}
      >
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
            style={{
              backgroundColor: isDark ? "rgba(255,140,0,0.12)" : "rgba(255,140,0,0.15)",
            }}
          >
            <Gift className="w-7 h-7" style={{ color: ORANGE }} />
          </div>

          {/* Headline */}
          <h4
            className="font-condensed font-black text-2xl sm:text-3xl leading-tight mb-3"
            style={{ color: textPrimary }}
          >
            Refer a Friend, Earn Rewards 🧡
          </h4>

          <p
            className="font-body text-base leading-relaxed mb-4"
            style={{ color: textSecondary }}
          >
            Know someone dreaming of their next international adventure? Refer
            them to Gladex and{" "}
            <span
              className="font-semibold"
              style={{ color: textPrimary }}
            >
              both of you receive exclusive travel rewards and discounts.
            </span>
          </p>

          {/* Benefits list */}
          <ul className="space-y-2 mb-7">
            {[
              "Your friend gets a special welcome discount",
              "You earn travel credits on your next booking",
              "No limit — refer as many friends as you want!",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 font-body text-sm"
                style={{ color: textSecondary }}
              >
                <span style={{ color: ORANGE }} className="mt-0.5 shrink-0">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <motion.a
              href="https://m.me/gladextours"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 font-condensed font-black text-lg px-6 py-3.5 rounded-xl"
              style={{ backgroundColor: ORANGE, color: "#080808" }}
            >
              <Gift className="w-5 h-5" /> Refer A Friend
            </motion.a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body font-bold text-sm px-5 py-3.5 rounded-xl border transition-all hover:opacity-80"
              style={{ borderColor: ORANGE, color: ORANGE }}
            >
              <Share2 className="w-4 h-4" /> Share via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </BriefingSection>
  );
}
