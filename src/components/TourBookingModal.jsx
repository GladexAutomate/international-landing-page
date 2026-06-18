// @ts-nocheck
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ChevronLeft, Calendar, Users, AlertTriangle } from "lucide-react";
import { getBookingOptionsForProduct } from "../services/bookingService";

const ORANGE = "#FF9913";

function currencySymbol(code) {
  const map = { JPY: "¥", USD: "$", SGD: "S$", HKD: "HK$", AUD: "A$", EUR: "€", GBP: "£" };
  return map[code] ?? "₱";
}

function titleCase(str) {
  if (!str) return str;
  if (str === str.toUpperCase()) return str.charAt(0) + str.slice(1).toLowerCase();
  return str;
}

function ageLabel(ageFrom, ageTo) {
  if (ageFrom != null && ageTo != null) return `${ageFrom}–${ageTo} yrs`;
  if (ageFrom != null) return `${ageFrom}+ yrs`;
  if (ageTo != null) return `up to ${ageTo} yrs`;
  return null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDate(isoDate) {
  if (!isoDate) return "";
  try {
    return new Date(isoDate + "T00:00:00").toLocaleDateString("en-PH", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
  } catch {
    return isoDate;
  }
}

function todayString() {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

// ── Step: Loading ─────────────────────────────────────────────────────────────

function StepLoading({ theme }) {
  return (
    <div className="py-16 flex flex-col items-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-9 h-9 border-4 rounded-full"
        style={{ borderColor: `${ORANGE}30`, borderTopColor: ORANGE }}
      />
      <p className="font-body text-sm" style={{ color: theme.textSecondary }}>
        Loading options…
      </p>
    </div>
  );
}

// ── Step: Error ───────────────────────────────────────────────────────────────

function StepError({ theme, onRetry }) {
  return (
    <div className="py-12 flex flex-col items-center gap-4 text-center px-4">
      <AlertTriangle className="w-10 h-10" style={{ color: "#EF4444" }} />
      <p className="font-condensed font-black text-lg" style={{ color: theme.textPrimary }}>
        Could not load options
      </p>
      <p className="font-body text-sm max-w-xs leading-relaxed" style={{ color: theme.textSecondary }}>
        There was a problem loading booking options for this activity. Check your connection and try again.
      </p>
      <button
        onClick={onRetry}
        className="font-body font-bold text-sm px-6 py-2.5 rounded-xl border-2 transition-all active:scale-95"
        style={{ borderColor: ORANGE, color: ORANGE }}
      >
        Try Again
      </button>
    </div>
  );
}

// ── Step: Options ─────────────────────────────────────────────────────────────

function StepOptions({ options, selectedOption, onSelect, currency, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  const sym = currencySymbol(currency);
  return (
    <div className="space-y-3">
      <p className="font-body text-sm mb-4" style={{ color: textSecondary }}>
        Choose which option you'd like to book:
      </p>
      {options.map((opt) => {
        const isSelected = selectedOption?.id === opt.id;
        const age = ageLabel(opt.ageFrom, opt.ageTo);
        const ticketLabel = opt.ticketTypeName
          ? `${titleCase(opt.ticketTypeName)}${age ? ` (${age})` : ""}`
          : null;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt)}
            className="w-full text-left rounded-2xl border-2 overflow-hidden transition-all duration-150 active:scale-[0.99]"
            style={{
              borderColor:     isSelected ? ORANGE : border,
              backgroundColor: isSelected ? (isDark ? "#1A0A00" : "#FFF8F0") : bgCard,
            }}
          >
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-condensed font-black text-base leading-snug" style={{ color: textPrimary }}>
                      {opt.optionName}
                    </p>
                    {isSelected && (
                      <span
                        className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: ORANGE }}
                      >
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  {ticketLabel && (
                    <p className="font-body text-xs mb-1" style={{ color: ORANGE }}>
                      {ticketLabel}
                    </p>
                  )}
                  <p className="font-body text-xs" style={{ color: textSecondary }}>
                    Min {opt.minPurchaseQty} pax
                    {opt.maxPurchaseQty ? ` · Max ${opt.maxPurchaseQty}` : ""}
                  </p>
                  {opt.cancellationNotes.length > 0 && (
                    <p className="font-body text-xs mt-1" style={{ color: "#EF4444" }}>
                      {opt.cancellationNotes[0]}
                    </p>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-condensed font-black text-xl" style={{ color: ORANGE }}>
                    {sym}{opt.price.toLocaleString()}
                  </p>
                  <p className="font-body text-[10px]" style={{ color: textSecondary }}>per pax</p>
                </div>
              </div>

              <AnimatePresence>
                {isSelected && opt.inclusions.length > 0 && (
                  <motion.div
                    key="inclusions"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-3 pt-3 space-y-1.5" style={{ borderTop: `1px solid ${border}` }}>
                      {opt.inclusions.slice(0, 5).map((inc, i) => (
                        <li key={i} className="flex items-start gap-1.5 font-body text-xs" style={{ color: textSecondary }}>
                          <Check className="w-3 h-3 shrink-0 mt-0.5" style={{ color: "#22C55E" }} strokeWidth={2.5} />
                          {inc}
                        </li>
                      ))}
                      {opt.inclusions.length > 5 && (
                        <li className="font-body text-xs pl-4" style={{ color: textSecondary }}>
                          +{opt.inclusions.length - 5} more included
                        </li>
                      )}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ── Step: Date ────────────────────────────────────────────────────────────────

function StepDate({ bookingDate, onDateChange, selectedOption, theme }) {
  const { border, textPrimary, textSecondary, isDark } = theme;
  const today = todayString();

  return (
    <div className="space-y-5">
      <p className="font-body text-sm" style={{ color: textSecondary }}>
        Select your preferred travel date for this activity.
      </p>

      <div>
        <label
          className="font-body text-xs font-bold uppercase tracking-widest block mb-2"
          style={{ color: textSecondary }}
        >
          Travel Date
        </label>
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => onDateChange(e.target.value)}
          min={today}
          className="w-full font-body text-base px-4 py-3.5 rounded-xl border-2 focus:outline-none transition-all"
          style={{
            backgroundColor: isDark ? "#111" : "#F8F8F8",
            borderColor:     bookingDate ? ORANGE : border,
            color:           textPrimary,
            colorScheme:     isDark ? "dark" : "light",
          }}
        />
      </div>

      {selectedOption?.cancellationNotes.length > 0 && (
        <div
          className="px-4 py-3 rounded-xl border-l-4"
          style={{
            borderLeftColor:  "#EF4444",
            backgroundColor:  isDark ? "rgba(239,68,68,0.08)" : "#FFF5F5",
          }}
        >
          <p className="font-body text-xs leading-relaxed" style={{ color: isDark ? "#FCA5A5" : "#B91C1C" }}>
            {selectedOption.cancellationNotes[0]}
          </p>
        </div>
      )}

      <div
        className="px-4 py-3 rounded-xl border"
        style={{ borderColor: border, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}
      >
        <p className="font-body text-xs leading-relaxed" style={{ color: textSecondary }}>
          Please arrive at least 30 minutes before your scheduled tour time.
        </p>
      </div>
    </div>
  );
}

// ── Step: Quantity ────────────────────────────────────────────────────────────

function StepQuantity({ selectedOption, qty, onQtyChange, bookingDate, currency, theme }) {
  const { border, textPrimary, textSecondary, isDark } = theme;
  const min   = selectedOption.minPurchaseQty;
  const max   = selectedOption.maxPurchaseQty;
  const total = qty * selectedOption.price;
  const sym   = currencySymbol(currency);
  const age   = ageLabel(selectedOption.ageFrom, selectedOption.ageTo);
  const ticketLabel = selectedOption.ticketTypeName
    ? `${titleCase(selectedOption.ticketTypeName)}${age ? ` (${age})` : ""}`
    : null;

  return (
    <div className="space-y-5">
      {/* Selected option recap */}
      <div
        className="rounded-xl border-2 px-4 py-4"
        style={{ borderColor: ORANGE, backgroundColor: isDark ? "#1A0A00" : "#FFF8F0" }}
      >
        <p className="font-body text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: ORANGE }}>
          Selected Option
        </p>
        <p className="font-condensed font-black text-xl leading-tight" style={{ color: textPrimary }}>
          {selectedOption.optionName}
        </p>
        {ticketLabel && (
          <p className="font-body text-xs mt-0.5 font-semibold" style={{ color: ORANGE }}>
            {ticketLabel}
          </p>
        )}
        <p className="font-body text-sm mt-0.5" style={{ color: textSecondary }}>
          {sym}{selectedOption.price.toLocaleString()} per participant
        </p>
        {bookingDate && (
          <p className="font-body text-xs mt-1.5 flex items-center gap-1.5" style={{ color: textSecondary }}>
            <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: ORANGE }} />
            {fmtDate(bookingDate)}
          </p>
        )}
      </div>

      {/* Participant stepper */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4" style={{ color: ORANGE }} />
          <label className="font-body text-xs font-bold uppercase tracking-widest" style={{ color: textSecondary }}>
            Number of Participants
          </label>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => qty > min && onQtyChange(qty - 1)}
            disabled={qty <= min}
            className="w-12 h-12 rounded-xl border-2 flex items-center justify-center font-condensed font-black text-2xl transition-all disabled:opacity-30 active:scale-95"
            style={{ borderColor: border, color: textPrimary }}
          >
            −
          </button>
          <span className="font-condensed font-black text-4xl w-14 text-center" style={{ color: textPrimary }}>
            {qty}
          </span>
          <button
            onClick={() => (!max || qty < max) && onQtyChange(qty + 1)}
            disabled={!!max && qty >= max}
            className="w-12 h-12 rounded-xl border-2 flex items-center justify-center font-condensed font-black text-2xl transition-all disabled:opacity-30 active:scale-95"
            style={{ borderColor: border, color: textPrimary }}
          >
            +
          </button>
        </div>
        <p className="font-body text-xs mt-2" style={{ color: textSecondary }}>
          Minimum {min} participant{min !== 1 ? "s" : ""}
          {max ? ` · Maximum ${max}` : ""}
        </p>
      </div>

      {/* Price total */}
      <div
        className="flex items-end justify-between pt-4 border-t"
        style={{ borderColor: border }}
      >
        <div>
          <p className="font-body text-xs" style={{ color: textSecondary }}>
            {qty} × {sym}{selectedOption.price.toLocaleString()}
          </p>
          <p className="font-condensed font-black text-4xl" style={{ color: ORANGE }}>
            {sym}{total.toLocaleString()}
          </p>
        </div>
        <p className="font-body text-xs pb-1" style={{ color: textSecondary }}>Total</p>
      </div>
    </div>
  );
}

// ── Main Modal ────────────────────────────────────────────────────────────────

const STEP_LABELS = {
  loading:  "Loading Options",
  options:  "Choose Your Option",
  date:     "Select Travel Date",
  quantity: "Set Participants",
  error:    "Unable to Load",
};

/**
 * Booking modal — multi-step flow:
 *   [options] → [date?] → [quantity]
 *
 * Availability (sessionId, slot selection) is NOT implemented here.
 * That is gated on Globaltix confirming /api/event parameter names.
 *
 * @param {Object}   props
 * @param {import("../types/addons").Tour} props.tour
 * @param {Object}   props.theme
 * @param {Function} props.onClose
 * @param {Function} props.onConfirm  - (tour, selectedOption, qty, bookingDate|null) => void
 */
export default function TourBookingModal({ tour, theme, onClose, onConfirm }) {
  const { border, textPrimary, isDark } = theme;

  const [step,           setStep]           = useState("loading");
  const [options,        setOptions]        = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [qty,            setQty]            = useState(1);
  const [bookingDate,    setBookingDate]     = useState("");
  const [loadAttempt,    setLoadAttempt]     = useState(0);

  // Load booking options when modal opens (or on retry).
  // DEMO MODE ONLY — non-Globaltix (mock) tours skip the API call and use
  // tour.bookingOptions directly. Replace with real API when Globaltix confirms
  // all parameter names for /api/event availability.
  useEffect(() => {
    let cancelled = false;
    setStep("loading");

    // Globaltix products have purely numeric sourceIds (e.g. "36337").
    // Mock tours use string IDs like "gtx_DAN_001" — those should NOT hit the API.
    const isGlobtixProduct =
      tour.source === "globaltix" && /^\d+$/.test(String(tour.sourceId ?? ""));

    // Shared helper — normalises raw bookingOptions from mock data into TourBookingOption[]
    function parseMockOptions(rawOptions) {
      return (rawOptions ?? []).map((o) => ({
        id:                o.id ?? `opt-${o.price}`,
        optionId:          o.optionId   ?? null,
        optionName:        o.optionName ?? o.label ?? o.id,
        ticketTypeId:      o.ticketTypeId ?? null,
        ticketTypeName:    o.ticketTypeName ?? o.label ?? o.id,
        sku:               o.sku ?? null,
        price:             o.price ?? 0,
        nettPrice:         o.nettPrice ?? o.price ?? 0,
        currency:          o.currency ?? tour.currency ?? "PHP",
        minPurchaseQty:    o.minPurchaseQty ?? 1,
        maxPurchaseQty:    o.maxPurchaseQty ?? null,
        ageFrom:           o.ageFrom ?? null,
        ageTo:             o.ageTo ?? null,
        isCancellable:     o.isCancellable ?? true,
        cancellationNotes: Array.isArray(o.cancellationNotes)
          ? o.cancellationNotes
          : o.cancellationPolicy ? [o.cancellationPolicy] : [],
        inclusions:        Array.isArray(o.inclusions) ? o.inclusions : (tour.inclusions ?? []),
        visitDateRequired: o.visitDateRequired ?? tour.requiresBookingDate ?? false,
      }));
    }

    // Shared step-setter — used by both live and mock paths
    function applyOptions(opts) {
      setOptions(opts);
      if (opts.length === 0) {
        setStep("error");
      } else if (opts.length === 1) {
        setSelectedOption(opts[0]);
        setQty(opts[0].minPurchaseQty);
        setStep(tour.requiresBookingDate ? "date" : "quantity");
      } else {
        setStep("options");
      }
    }

    if (!isGlobtixProduct) {
      applyOptions(parseMockOptions(tour.bookingOptions));
      return; // no cleanup needed — no async op started
    }

    getBookingOptionsForProduct(tour.sourceId).then((opts) => {
      if (cancelled) return;
      // If the live API returns nothing, fall back to the mock bookingOptions on the tour object.
      // This handles products whose ProductOptions endpoint isn't accessible for this reseller.
      const finalOpts = opts.length > 0 ? opts : parseMockOptions(tour.bookingOptions);
      applyOptions(finalOpts);
    }).catch(() => {
      if (cancelled) return;
      applyOptions(parseMockOptions(tour.bookingOptions));
    });

    return () => { cancelled = true; };
  }, [tour.sourceId, tour.requiresBookingDate, loadAttempt]);

  // Build step sequence based on loaded data + product requirements
  const ALL_STEPS = (() => {
    const s = [];
    if (options.length > 1) s.push("options");
    if (tour.requiresBookingDate) s.push("date");
    s.push("quantity");
    return s;
  })();

  const stepIndex = ALL_STEPS.indexOf(step);

  const handleNext = () => {
    if (step === "options") {
      if (!selectedOption) return;
      setQty(selectedOption.minPurchaseQty);
      setStep(tour.requiresBookingDate ? "date" : "quantity");
    } else if (step === "date") {
      if (!bookingDate) return;
      setStep("quantity");
    } else if (step === "quantity") {
      onConfirm(tour, selectedOption, qty, bookingDate || null);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStep(ALL_STEPS[stepIndex - 1]);
  };

  const nextDisabled =
    (step === "options" && !selectedOption) ||
    (step === "date"    && !bookingDate);

  const showNav = step !== "loading" && step !== "error";

  const currency = selectedOption?.currency ?? tour.currency ?? "PHP";
  const nextLabel = step === "quantity"
    ? `Add to Trip  ·  ${currencySymbol(currency)}${(qty * (selectedOption?.price ?? 0)).toLocaleString()}`
    : "Continue";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      {/* Panel — bottom sheet on mobile, centered dialog on sm+ */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 48 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full sm:max-w-md flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden"
        style={{
          backgroundColor: isDark ? "#161616" : "#FFFFFF",
          maxHeight:        "90vh",
          boxShadow: isDark
            ? "0 -8px 60px rgba(0,0,0,0.6)"
            : "0 -4px 40px rgba(0,0,0,0.14)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b shrink-0" style={{ borderColor: border }}>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <p
                className="font-body text-[10px] font-bold uppercase tracking-widest mb-0.5"
                style={{ color: ORANGE }}
              >
                {STEP_LABELS[step] ?? step}
              </p>
              <h2
                className="font-condensed font-black text-xl leading-tight"
                style={{ color: textPrimary }}
              >
                {tour.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border transition-all hover:opacity-70"
              style={{ borderColor: border, color: textPrimary }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step progress indicator */}
          {ALL_STEPS.length > 1 && showNav && (
            <div className="flex gap-1.5">
              {ALL_STEPS.map((s, i) => (
                <div
                  key={s}
                  className="h-1 flex-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i <= stepIndex ? ORANGE : (isDark ? "#333" : "#E5E5E5"),
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Step content — scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {step === "loading" && <StepLoading theme={theme} />}
          {step === "error"   && (
            <StepError theme={theme} onRetry={() => setLoadAttempt((a) => a + 1)} />
          )}
          {step === "options" && (
            <StepOptions
              options={options}
              selectedOption={selectedOption}
              onSelect={setSelectedOption}
              currency={currency}
              theme={theme}
            />
          )}
          {step === "date" && (
            <StepDate
              bookingDate={bookingDate}
              onDateChange={setBookingDate}
              selectedOption={selectedOption}
              theme={theme}
            />
          )}
          {step === "quantity" && selectedOption && (
            <StepQuantity
              selectedOption={selectedOption}
              qty={qty}
              onQtyChange={setQty}
              bookingDate={bookingDate}
              currency={currency}
              theme={theme}
            />
          )}
        </div>

        {/* Footer navigation */}
        {showNav && (
          <div
            className="px-5 py-4 border-t shrink-0 flex gap-3"
            style={{ borderColor: border }}
          >
            {stepIndex > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 font-body font-semibold text-sm px-4 py-3 rounded-xl border transition-all active:scale-95"
                style={{ borderColor: border, color: textPrimary }}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={nextDisabled}
              className="flex-1 font-condensed font-black text-lg py-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: step === "quantity"
                  ? ORANGE
                  : (isDark ? "#2A2A2A" : "#F0F0F0"),
                color: step === "quantity"
                  ? "#080808"
                  : nextDisabled
                    ? theme.textSecondary
                    : textPrimary,
                border: step !== "quantity"
                  ? `2px solid ${nextDisabled ? border : ORANGE}`
                  : "none",
              }}
            >
              {nextLabel}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
