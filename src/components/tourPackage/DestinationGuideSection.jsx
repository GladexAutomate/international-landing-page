import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const ORANGE = "#FF8C00";

const GUIDE_ITEMS = [
  {
    icon: "✈️",
    title: "Arrival Instructions",
    content: (dest) => [
      `Upon landing at the international airport, proceed to the Immigration counter.`,
      `Have your passport, return ticket, and accommodation details ready for inspection.`,
      `After clearing immigration, collect your luggage from the designated baggage carousel.`,
      `Proceed to the Arrival Hall where your Gladex representative will be holding a name board.`,
      `Do not leave the arrival area without meeting your designated guide or driver.`,
      `If you cannot locate your representative, call the emergency contact immediately.`,
    ],
  },
  {
    icon: "🚌",
    title: "Transfer Instructions",
    content: (dest) => [
      `Your airport-to-hotel transfer is pre-arranged. Do not take unauthorized taxis or rides.`,
      `Travel time to your hotel varies — expect 30–60 minutes depending on traffic.`,
      `All transfers will be in an air-conditioned vehicle. Keep your baggage close at all times.`,
      `For hotel-to-tour transfers, be ready in the hotel lobby 10–15 minutes before departure.`,
      `Day tour transfers depart on time — late arrivals may miss the group.`,
      `Keep the driver's contact number saved in case of any delay.`,
    ],
  },
  {
    icon: "🏨",
    title: "Hotel Check-In",
    content: (dest) => [
      `Standard hotel check-in time is 2:00 PM. Early check-in is subject to availability.`,
      `Present your valid passport and booking confirmation at the hotel front desk.`,
      `A security deposit (credit card hold or cash) may be required by the hotel.`,
      `Keep your room key safe — replacement fees may apply if lost.`,
      `Familiarize yourself with emergency exits and hotel facilities upon arrival.`,
      `For any room concerns, contact the hotel reception immediately.`,
    ],
  },
  {
    icon: "📋",
    title: "Tour Reminders",
    content: (dest) => [
      `Be at the meeting point at least 10 minutes before the scheduled tour departure.`,
      `Wear comfortable walking shoes — most tours involve extended walking.`,
      `Bring sufficient water and light snacks for day tours.`,
      `Respect local customs and dress codes, especially at religious or sacred sites.`,
      `Photography may be restricted at some locations — follow your guide's instructions.`,
      `Keep all valuables secured and be aware of your surroundings at all times.`,
    ],
  },
  {
    icon: "📞",
    title: "Emergency Contacts",
    content: () => [
      `Gladex Travel Hotline: Available 24/7 during your travel period.`,
      `Local Emergency: Dial 911 or the local emergency number of your destination.`,
      `Philippine Embassy / Consulate: Contact number provided in your travel documents.`,
      `Hotel Front Desk: Always available for immediate assistance on-site.`,
      `Your travel guide's mobile number is provided in your welcome packet.`,
      `In case of medical emergency, proceed to the nearest hospital and notify Gladex immediately.`,
    ],
  },
  {
    icon: "✅",
    title: "Important Do's and Don'ts",
    content: (dest) => [
      `✅ DO carry a photocopy of your passport and keep the original in the hotel safe.`,
      `✅ DO follow local laws, rules, and customs at all times.`,
      `✅ DO stay with your group, especially in crowded tourist areas.`,
      `✅ DO keep the emergency contact number saved on your phone.`,
      `❌ DON'T exchange money with unauthorized money changers.`,
      `❌ DON'T leave your valuables unattended in public areas.`,
      `❌ DON'T consume tap water unless confirmed safe by your guide.`,
      `❌ DON'T engage in any illegal activities — this will result in immediate tour cancellation.`,
    ],
  },
];

function GuideItem({ item, dest }) {
  const [open, setOpen] = useState(false);
  const lines = item.content(dest);

  return (
    <div className="rounded-xl border overflow-hidden transition-all" style={{ borderColor: open ? ORANGE : "#E5E5E5" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-orange-50"
        style={{ backgroundColor: open ? "#FFF8F0" : "#FFFFFF" }}
      >
        <span className="text-xl shrink-0">{item.icon}</span>
        <span className="flex-1 font-bold text-sm text-gray-800">{item.title}</span>
        {open
          ? <ChevronUp className="w-4 h-4 shrink-0" style={{ color: ORANGE }} />
          : <ChevronDown className="w-4 h-4 shrink-0 text-gray-400" />
        }
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-gray-100">
              <ul className="space-y-2">
                {lines.map((line, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                    {!line.startsWith("✅") && !line.startsWith("❌") && (
                      <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ORANGE }} />
                    )}
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DestinationGuideSection({ dest }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: ORANGE }} />
        <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">Destination Guide</h2>
      </div>
      <div className="space-y-2">
        {GUIDE_ITEMS.map((item, i) => (
          <GuideItem key={i} item={item} dest={dest} />
        ))}
      </div>
    </div>
  );
}