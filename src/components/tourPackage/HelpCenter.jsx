import { Phone, MapPin, AlertTriangle, BookOpen, MessageCircle } from "lucide-react";

const ORANGE = "#FF9913";

const helpItems = [
  {
    icon: BookOpen,
    label: "Destination Guide",
    desc: "Full travel briefing, requirements, and tips for your destination.",
  },
  {
    icon: AlertTriangle,
    label: "Travel Reminders",
    desc: "Important reminders about visas, documents, and travel notices.",
  },
  {
    icon: Phone,
    label: "Emergency Contact",
    desc: "Our team is available for urgent travel assistance and support.",
  },
  {
    icon: MessageCircle,
    label: "Client Assistance",
    desc: "Reach out to us via chat, email, or messenger for any concern.",
  },
  {
    icon: MapPin,
    label: "Travel Coordination",
    desc: "Airport pickup, hotel transfers, and on-ground coordination.",
  },
];

export default function HelpCenter() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: ORANGE }} />
        <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">Help Center</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {helpItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex gap-3 p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#FFF3E8" }}>
                <Icon className="w-4 h-4" style={{ color: ORANGE }} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 mb-0.5 group-hover:text-orange-700 transition-colors">{item.label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}