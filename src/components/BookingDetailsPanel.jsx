// @ts-nocheck
import { motion } from "framer-motion";
import {
  X,
  Star,
  MapPin,
  User,
  CalendarDays,
  Building2,
  Plane,
  Globe,
  Package,
  CreditCard,
  UserCheck,
  CheckCircle,
} from "lucide-react";

const ORANGE = "#FF8C00";

// ── Formatters ────────────────────────────────────────────────────────────────

function fmtDate(raw) {
  if (!raw) return null;
  const d = new Date(raw);
  if (isNaN(d.getTime())) return String(raw);
  return d.toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" });
}

function fmtCurrency(amount) {
  if (amount === null || amount === undefined || amount === "") return null;
  const n = typeof amount === "string" ? parseFloat(String(amount).replace(/,/g, "")) : Number(amount);
  if (isNaN(n)) return String(amount);
  return "₱" + n.toLocaleString("en-PH", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function fmtValue(val) {
  if (val === null || val === undefined || val === "") return null;
  if (typeof val === "boolean") return val ? "Yes" : "No";
  if (typeof val === "number") return String(val);
  if (typeof val === "string") return val.trim() || null;
  if (Array.isArray(val)) {
    const clean = val.filter(Boolean).join(", ");
    return clean || null;
  }
  return String(val);
}

function stripHtml(html) {
  if (!html || typeof html !== "string") return null;
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() || null;
}

// ── Trip Highlights ───────────────────────────────────────────────────────────

function TripHighlights({ booking, isDark }) {
  const cardBg     = isDark ? "rgba(255,140,0,0.10)" : "rgba(255,140,0,0.08)";
  const cardBorder = isDark ? "rgba(255,140,0,0.25)" : "rgba(255,140,0,0.22)";
  const textPrimary   = isDark ? "#FFFFFF" : "#111111";
  const textSecondary = isDark ? "#CCCCCC" : "#444444";

  let travelDate = null;
  if (booking.arrivalDate && booking.departureDate) {
    travelDate = `${fmtDate(booking.arrivalDate)} – ${fmtDate(booking.departureDate)}`;
  } else if (booking.arrivalDate) {
    travelDate = fmtDate(booking.arrivalDate);
  } else if (booking.travel_date) {
    travelDate = fmtDate(booking.travel_date);
  }

  const highlights = [
    { icon: <Globe className="w-4 h-4" />,       label: "Destination", value: fmtValue(booking.destinationName) },
    { icon: <CalendarDays className="w-4 h-4" />, label: "Travel Date", value: travelDate },
    { icon: <Building2 className="w-4 h-4" />,   label: "Hotel",       value: fmtValue(booking.hotelName) },
    { icon: <Plane className="w-4 h-4" />,        label: "Airline",     value: fmtValue(booking.airlineName) },
  ].filter((h) => h.value);

  if (highlights.length === 0) return null;

  return (
    <motion.div
      className="rounded-2xl p-5 mb-4"
      style={{
        backgroundColor: cardBg,
        border: `1px solid ${cardBorder}`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-4 h-4" style={{ color: ORANGE }} />
        <h3 className="font-condensed font-bold text-sm uppercase tracking-widest" style={{ color: ORANGE }}>
          Trip Highlights
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {highlights.map((h, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="shrink-0 mt-0.5" style={{ color: ORANGE }}>{h.icon}</span>
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wider" style={{ color: textSecondary }}>
                {h.label}
              </p>
              <p className="font-body text-sm font-medium leading-snug mt-0.5" style={{ color: textPrimary }}>
                {h.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Section card ──────────────────────────────────────────────────────────────

function SectionCard({ icon, title, fields, isDark, delay }) {
  const visibleFields = fields.filter((f) => f.value !== null && f.value !== undefined && f.value !== "");
  if (visibleFields.length === 0) return null;

  const cardBg        = isDark ? "rgba(30,30,30,0.90)" : "rgba(255,255,255,0.90)";
  const cardBorder    = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const textPrimary   = isDark ? "#FFFFFF" : "#111111";
  const textSecondary = isDark ? "#A0A0A0" : "#666666";
  const divider       = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  return (
    <motion.div
      className="rounded-2xl p-5"
      style={{
        backgroundColor: cardBg,
        border: `1px solid ${cardBorder}`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span style={{ color: ORANGE }}>{icon}</span>
        <h3 className="font-condensed font-bold text-sm uppercase tracking-widest" style={{ color: ORANGE }}>
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-2.5">
        {visibleFields.map((f, i) => (
          <div key={i}>
            {i > 0 && <div className="h-px mb-2.5" style={{ backgroundColor: divider }} />}
            <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
              <span
                className="font-body text-xs font-semibold uppercase tracking-wider shrink-0 sm:w-36"
                style={{ color: textSecondary }}
              >
                {f.label}
              </span>
              <span
                className="font-body text-sm leading-relaxed mt-0.5 sm:mt-0"
                style={{ color: textPrimary }}
              >
                {f.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function BookingDetailsPanel({ booking, onClose, isDark }) {
  if (!booking) return null;

  const panelBg     = isDark ? "rgba(10,10,10,0.97)" : "rgba(238,238,238,0.97)";
  const panelBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const textPrimary   = isDark ? "#FFFFFF" : "#111111";
  const textSecondary = isDark ? "#A0A0A0" : "#666666";

  const tourDesc  = fmtValue(booking.tourDescription) || stripHtml(booking.tourRequest);
  // Show packageType only when it adds new info (avoids repeating packageName)
  const pkgType   = booking.packageType !== booking.packageName ? fmtValue(booking.packageType) : null;

  const agentName = fmtValue(booking.name_of_agent_1) || fmtValue(booking.agent_name);

  const sections = [
    {
      icon:  <CheckCircle className="w-4 h-4" />,
      title: "Booking Summary",
      fields: [
        { label: "GDX Number",   value: fmtValue(booking.gdx) },
        { label: "Status",       value: fmtValue(booking.status) },
        { label: "Date Created", value: fmtDate(booking.date_created || booking.created) },
        { label: "Payment Type", value: fmtValue(booking.payment_type) },
        { label: "Payment Mode", value: fmtValue(booking.mop_used_by_customer) },
      ],
    },
    {
      icon:  <User className="w-4 h-4" />,
      title: "Traveler Information",
      fields: [
        { label: "Lead Traveler",  value: fmtValue(booking.lead_name) },
        { label: "Guests",         value: fmtValue(booking.name_of_guests) },
        { label: "No. of Persons", value: fmtValue(booking.no_of_person) },
        { label: "Email",          value: fmtValue(booking.email_1) },
        { label: "Mobile",         value: fmtValue(booking.mobile_1) },
        { label: "Facebook",       value: fmtValue(booking.facebook_name) },
      ],
    },
    {
      icon:  <MapPin className="w-4 h-4" />,
      title: "Travel Information",
      fields: [
        { label: "Destination",   value: fmtValue(booking.destinationName) },
        { label: "Travel Date",   value: fmtDate(booking.travel_date) },
        { label: "Arrival",       value: fmtDate(booking.arrivalDate) },
        { label: "Departure",     value: fmtDate(booking.departureDate) },
        { label: "Duration",      value: fmtValue(booking.duration) },
        { label: "Customer Type", value: fmtValue(booking.customer_type) },
      ],
    },
    {
      icon:  <Building2 className="w-4 h-4" />,
      title: "Hotel Information",
      fields: [
        { label: "Hotel Name",    value: fmtValue(booking.hotelName) },
        { label: "Address",       value: fmtValue(booking.hotelAddress) },
        { label: "Contact",       value: fmtValue(booking.hotelPhone) },
        { label: "Room Type",     value: fmtValue(booking.room_type) },
        { label: "Booking Notes", value: fmtValue(booking.hotel_booking_details) },
      ],
    },
    {
      icon:  <Plane className="w-4 h-4" />,
      title: "Flight Information",
      fields: [
        { label: "Airline",     value: fmtValue(booking.airlineName) },
        { label: "PNR",         value: fmtValue(booking.pnr) },
        { label: "Departing",   value: fmtValue(booking.flightDeparture) },
        { label: "Returning",   value: fmtValue(booking.flightReturn) },
        { label: "Flight Cost", value: fmtCurrency(booking.flightCost) },
      ],
    },
    {
      icon:  <Globe className="w-4 h-4" />,
      title: "Tour Information",
      fields: [
        { label: "Tour Name",     value: fmtValue(booking.tourName) },
        { label: "Tour Date",     value: fmtDate(booking.tourDate) },
        { label: "Description",   value: tourDesc },
        { label: "Tour Operator", value: fmtValue(booking.tour_operator) },
      ],
    },
    {
      icon:  <Package className="w-4 h-4" />,
      title: "Package Information",
      fields: [
        { label: "Package Name", value: fmtValue(booking.packageName) },
        { label: "Package Type", value: pkgType },
        { label: "Package Cost", value: fmtCurrency(booking.packageCost) },
        { label: "Land Cost",    value: fmtCurrency(booking.total_land_arrangement_cost) },
        { label: "Total Cost",   value: fmtCurrency(booking.total_cost) },
      ],
    },
    {
      icon:  <CreditCard className="w-4 h-4" />,
      title: "Payment Information",
      fields: [
        { label: "Amount Paid",       value: fmtCurrency(booking.amountPaid) },
        { label: "Remaining Balance", value: fmtCurrency(booking.remainingBalance) },
        { label: "Refund Amount",     value: fmtCurrency(booking.refundAmount) },
        { label: "Visa Cost",         value: fmtCurrency(booking.total_visa_cost) },
      ],
    },
    {
      icon:  <UserCheck className="w-4 h-4" />,
      title: "Agent Information",
      fields: [
        { label: "Agent",      value: agentName },
        { label: "Created By", value: fmtValue(booking.created_by) },
      ],
    },
  ];

  return (
    <div
      className="rounded-3xl p-6 sm:p-8 shadow-2xl"
      style={{
        backgroundColor: panelBg,
        border: `1px solid ${panelBorder}`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      {/* Panel header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2
            className="font-condensed font-black text-2xl sm:text-3xl leading-tight"
            style={{ color: textPrimary }}
          >
            Your Booking Details
          </h2>
          <p className="font-body text-sm mt-1" style={{ color: textSecondary }}>
            GDX {booking.gdx}
          </p>
        </div>
        <motion.button
          onClick={onClose}
          aria-label="Close booking details"
          className="flex items-center gap-1.5 font-body font-semibold text-sm px-4 py-2 rounded-xl border shrink-0 transition-colors"
          style={{
            backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
            borderColor:     isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)",
            color: textPrimary,
          }}
          whileHover={{
            scale: 1.03,
            backgroundColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.09)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          <X className="w-4 h-4" />
          Close
        </motion.button>
      </div>

      {/* Trip Highlights */}
      <TripHighlights booking={booking} isDark={isDark} />

      {/* Sections grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((s, i) => (
          <SectionCard
            key={s.title}
            icon={s.icon}
            title={s.title}
            fields={s.fields}
            isDark={isDark}
            delay={0.08 + i * 0.04}
          />
        ))}
      </div>
    </div>
  );
}
