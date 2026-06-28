// @ts-nocheck
import { jsPDF } from "jspdf";

/**
 * Generates and downloads a Gladex booking voucher PDF.
 * Fields mirror the traveler dashboard display panel exactly.
 */
export function generateVoucherPDF({ booking }) {
  if (!booking) return;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const PAGE_W      = 210;
  const PAGE_H      = 297;
  const MARGIN      = 14;
  const CONTENT_W   = PAGE_W - MARGIN * 2;
  const FOOTER_H    = 12;
  const SAFE_BOTTOM = PAGE_H - FOOTER_H - 6;

  // ── Colours ────────────────────────────────────────────────────────────────
  const setOrange  = () => doc.setFillColor(255, 153, 19);
  const setDark    = () => doc.setFillColor(22, 22, 22);
  const setLight   = () => doc.setFillColor(248, 248, 248);
  const setMidGray = () => doc.setFillColor(235, 235, 235);
  const tOrange    = () => doc.setTextColor(255, 140, 0);
  const tWhite     = () => doc.setTextColor(255, 255, 255);
  const tDark      = () => doc.setTextColor(24, 24, 24);
  const tGray      = () => doc.setTextColor(100, 100, 100);
  const tLightGray = () => doc.setTextColor(190, 190, 190);
  const drawGray   = () => { doc.setDrawColor(215, 215, 215); doc.setLineWidth(0.25); };
  const drawOrange = () => { doc.setDrawColor(255, 153, 19); doc.setLineWidth(0.5); };

  // ── Formatters ──────────────────────────────────────────────────────────────
  const FUSIOO_ID_RE = /^i[0-9a-f]{32}$/i;

  function fmtVal(v) {
    if (v === null || v === undefined || v === "") return null;
    if (typeof v === "boolean") return v ? "Yes" : "No";
    if (typeof v === "object" && !Array.isArray(v)) return null;
    if (Array.isArray(v)) {
      const parts = v.map(fmtVal).filter(Boolean);
      return parts.length ? parts.join(", ") : null;
    }
    const s = String(v).trim();
    if (!s || FUSIOO_ID_RE.test(s)) return null;
    return s;
  }

  function fmtDate(raw) {
    if (!raw) return null;
    const s = fmtVal(raw);
    if (!s) return null;
    try {
      const d = new Date(s);
      if (!isNaN(d.getTime()) && s.includes("-"))
        return d.toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });
    } catch {}
    return s;
  }

  function fmtCurrency(amount) {
    if (amount === null || amount === undefined || amount === "") return null;
    const n = typeof amount === "string"
      ? parseFloat(String(amount).replace(/,/g, ""))
      : Number(amount);
    if (isNaN(n)) return fmtVal(amount);
    return "PHP " + n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // ── Header ──────────────────────────────────────────────────────────────────
  function drawHeader() {
    setOrange(); doc.rect(0, 0, PAGE_W, 28, "F");
    tWhite(); doc.setFont("helvetica", "bold"); doc.setFontSize(16);
    doc.text("GLADEX TRAVEL & TOURS CORP.", MARGIN, 12);
    tLightGray(); doc.setFont("helvetica", "normal"); doc.setFontSize(8);
    doc.text("OFFICIAL BOOKING VOUCHER", MARGIN, 20);

    if (booking.gdx) {
      tWhite(); doc.setFont("helvetica", "bold"); doc.setFontSize(9);
      doc.text(`GDX: ${booking.gdx}`, PAGE_W - MARGIN, 12, { align: "right" });
      tLightGray(); doc.setFont("helvetica", "normal"); doc.setFontSize(7);
      doc.text("Booking Reference", PAGE_W - MARGIN, 19, { align: "right" });
    }

    setDark(); doc.rect(0, 28, PAGE_W, 15, "F");
    tOrange(); doc.setFont("helvetica", "bold"); doc.setFontSize(12);
    const dest = fmtVal(booking.destinationName) || "International Package";
    doc.text(dest.toUpperCase(), MARGIN, 39);

    const pkg = fmtVal(booking.packageName) || fmtVal(booking.collective_package_name) || fmtVal(booking.type_of_package);
    if (pkg) {
      tLightGray(); doc.setFont("helvetica", "normal"); doc.setFontSize(7.5);
      doc.text(pkg, PAGE_W - MARGIN, 39, { align: "right" });
    }
  }

  function drawContinuationHeader() {
    setOrange(); doc.rect(0, 0, PAGE_W, 12, "F");
    tWhite(); doc.setFont("helvetica", "bold"); doc.setFontSize(7.5);
    doc.text("GLADEX TRAVEL & TOURS CORP.  ·  BOOKING VOUCHER", MARGIN, 8);
    if (booking.gdx) doc.text(`GDX: ${booking.gdx}`, PAGE_W - MARGIN, 8, { align: "right" });
  }

  function drawFooter(pageNum, total) {
    doc.setPage(pageNum);
    setLight(); doc.rect(0, PAGE_H - FOOTER_H, PAGE_W, FOOTER_H, "F");
    drawGray(); doc.line(0, PAGE_H - FOOTER_H, PAGE_W, PAGE_H - FOOTER_H);
    tGray(); doc.setFont("helvetica", "normal"); doc.setFontSize(7);
    doc.text("Gladex Travel & Tours Corp.  ·  gladextours.com  ·  Facebook: Gladex Tours", MARGIN, PAGE_H - 4.5);
    doc.text(`Page ${pageNum} of ${total}`, PAGE_W - MARGIN, PAGE_H - 4.5, { align: "right" });
  }

  // ── Section / row renderers ─────────────────────────────────────────────────
  function drawSectionHeader(title, y) {
    setMidGray(); doc.rect(MARGIN, y, CONTENT_W, 7.5, "F");
    drawOrange(); doc.line(MARGIN, y, MARGIN, y + 7.5);
    tOrange(); doc.setFont("helvetica", "bold"); doc.setFontSize(8);
    doc.text(title, MARGIN + 4, y + 5.2);
    return y + 7.5;
  }

  const ROW_H  = 6.5;
  const COL1_W = 52;

  function drawRow(label, value, y, shade) {
    if (!value) return y;
    const valueLines = doc.splitTextToSize(String(value), CONTENT_W - COL1_W - 4);
    const rowH = Math.max(ROW_H, valueLines.length * 5);

    if (y + rowH > SAFE_BOTTOM) {
      doc.addPage();
      drawContinuationHeader();
      y = 17;
    }

    if (shade) { setLight(); doc.rect(MARGIN, y, CONTENT_W, rowH, "F"); }
    drawGray(); doc.line(MARGIN, y + rowH, MARGIN + CONTENT_W, y + rowH);
    tGray(); doc.setFont("helvetica", "bold"); doc.setFontSize(7.5);
    doc.text(label, MARGIN + 3, y + 4.5);
    tDark(); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
    doc.text(valueLines, MARGIN + COL1_W, y + 4.5);
    return y + rowH;
  }

  // ── Extract values (mirrors the display panel field order) ─────────────────

  // Booking Summary
  const gdxNum      = fmtVal(booking.gdx);
  const status      = fmtVal(booking.status) || "Confirmed";
  const payment     = fmtVal(booking.formula_1) || fmtVal(booking.payment_type);
  const txType      = fmtVal(booking.transaction_type);
  const bookDate    = fmtDate(booking.date_created) || fmtDate(booking.created);
  const lastMod     = fmtDate(booking.last_modified);

  // Traveler
  const leadName    = fmtVal(booking.lead_name) || fmtVal(booking.facebook_name);
  const totalGuests = fmtVal(booking.total_number_of_guests) || fmtVal(booking.no_of_person);
  const guestNames  = fmtVal(booking.name_of_guests);
  const email       = fmtVal(booking.email_1);
  const mobile      = fmtVal(booking.mobile_1);

  // Travel
  const destName    = fmtVal(booking.destinationName);
  const travelDate  = fmtDate(booking.travel_date);
  const arrival     = fmtDate(booking.arrivalDate)   || fmtDate(booking.arrival_date);
  const departure   = fmtDate(booking.departureDate) || fmtDate(booking.departure_date);
  const duration    = fmtVal(booking.duration);

  // Accommodation
  const hotelName   = fmtVal(booking.hotelName);
  const roomType    = fmtVal(booking.room_type);
  const checkIn     = fmtDate(booking.check_in)  || fmtDate(booking.checkin);
  const checkOut    = fmtDate(booking.check_out) || fmtDate(booking.checkout);
  const nights      = fmtVal(booking.number_of_nights);
  const hotelConf   = fmtVal(booking.hotel_confirmation) || fmtVal(booking.hotel_booking_details);

  // Flight
  const airline     = fmtVal(booking.airlineName);
  const pnr         = fmtVal(booking.pnr);
  const fltDep      = fmtVal(booking.flightDeparture);
  const fltRet      = fmtVal(booking.flightReturn);

  // Tour
  const tourName    = fmtVal(booking.tourName);
  const tourDate    = fmtDate(booking.tourDate);
  const tourDesc    = fmtVal(booking.tourDescription);
  const tourOp      = fmtVal(booking.tour_operator);

  // Transfer
  const transfer    = fmtVal(booking.transferInfo);
  const txProvider  = fmtVal(booking.transfer_provider);

  // Payment
  const pkgCost     = fmtCurrency(booking.packageCost) || fmtCurrency(booking.total_package_price_srp);
  const amtPaid     = fmtCurrency(booking.amountPaid);
  const balance     = fmtCurrency(booking.remainingBalance);
  const refund      = fmtCurrency(booking.refundAmount);

  // Agent
  const agent       = fmtVal(booking.name_of_agent) || fmtVal(booking.name_of_agent_1) || fmtVal(booking.agent_name);

  // ── RENDER ──────────────────────────────────────────────────────────────────
  drawHeader();
  let y = 50;

  // Lead passenger banner
  if (leadName) {
    setLight(); drawGray();
    doc.rect(MARGIN, y, CONTENT_W, 14, "FD");
    tGray(); doc.setFont("helvetica", "bold"); doc.setFontSize(7);
    doc.text("LEAD PASSENGER", MARGIN + 4, y + 5);
    tDark(); doc.setFont("helvetica", "normal"); doc.setFontSize(10);
    doc.text(leadName, MARGIN + 4, y + 11.5);
    y += 18;
  }

  // 1. Booking Summary
  y = drawSectionHeader("BOOKING SUMMARY", y) + 1;
  y = drawRow("GDX Number",       gdxNum,   y, false);
  y = drawRow("Status",           status,   y, true);
  y = drawRow("Payment Status",   payment,  y, false);
  y = drawRow("Transaction Type", txType,   y, true);
  y = drawRow("Booking Date",     bookDate, y, false);
  y = drawRow("Last Modified",    lastMod,  y, true);
  y += 4;

  // 2. Traveler Information
  y = drawSectionHeader("TRAVELER INFORMATION", y) + 1;
  y = drawRow("Lead Guest",    leadName,    y, false);
  y = drawRow("Total Guests",  totalGuests, y, true);
  y = drawRow("Guest Names",   guestNames,  y, false);
  y = drawRow("Email",         email,       y, true);
  y = drawRow("Mobile",        mobile,      y, false);
  y += 4;

  // 3. Travel Information
  y = drawSectionHeader("TRAVEL INFORMATION", y) + 1;
  y = drawRow("Destination",    destName,   y, false);
  y = drawRow("Travel Date",    travelDate, y, true);
  y = drawRow("Arrival Date",   arrival,    y, false);
  y = drawRow("Departure Date", departure,  y, true);
  y = drawRow("Duration",       duration,   y, false);
  y += 4;

  // 4. Accommodation
  if (hotelName || roomType || checkIn || hotelConf) {
    y = drawSectionHeader("ACCOMMODATION", y) + 1;
    y = drawRow("Hotel",            hotelName,  y, false);
    y = drawRow("Room Type",        roomType,   y, true);
    y = drawRow("Check-in",         checkIn,    y, false);
    y = drawRow("Check-out",        checkOut,   y, true);
    y = drawRow("Nights",           nights,     y, false);
    y = drawRow("Confirmation No.", hotelConf,  y, true);
    y += 4;
  }

  // 5. Flight Information
  if (airline || pnr || fltDep || fltRet) {
    y = drawSectionHeader("FLIGHT INFORMATION", y) + 1;
    y = drawRow("Airline",           airline, y, false);
    y = drawRow("PNR / Booking Ref", pnr,     y, true);
    y = drawRow("Departing Flight",  fltDep,  y, false);
    y = drawRow("Return Flight",     fltRet,  y, true);
    y += 4;
  }

  // 6. Tour Information
  if (tourName || tourDate) {
    y = drawSectionHeader("TOUR INFORMATION", y) + 1;
    y = drawRow("Tour",        tourName, y, false);
    y = drawRow("Tour Date",   tourDate, y, true);
    y = drawRow("Description", tourDesc, y, false);
    y = drawRow("Operator",    tourOp,   y, true);
    y += 4;
  }

  // 7. Transfer Information
  if (transfer || txProvider) {
    y = drawSectionHeader("TRANSFER INFORMATION", y) + 1;
    y = drawRow("Transfer Details",  transfer,   y, false);
    y = drawRow("Transfer Provider", txProvider, y, true);
    y += 4;
  }

  // 8. Payment Summary
  if (pkgCost || amtPaid || balance) {
    y = drawSectionHeader("PAYMENT SUMMARY", y) + 1;
    y = drawRow("Package Cost",      pkgCost,  y, false);
    y = drawRow("Amount Paid",       amtPaid,  y, true);
    y = drawRow("Remaining Balance", balance,  y, false);
    if (refund) y = drawRow("Refund Amount", refund, y, true);
    y += 4;
  }

  // 9. Agent
  if (agent) {
    y = drawSectionHeader("TRAVEL CONSULTANT", y) + 1;
    y = drawRow("Agent", agent, y, false);
    y += 4;
  }

  // Disclaimer
  if (y + 20 > SAFE_BOTTOM) { doc.addPage(); drawContinuationHeader(); y = 17; }
  y += 2;
  drawGray(); doc.line(MARGIN, y, MARGIN + CONTENT_W, y);
  y += 5;
  tGray(); doc.setFont("helvetica", "italic"); doc.setFontSize(7);
  const disclaimer = "This is an official booking confirmation issued by Gladex Travel & Tours Corp. For inquiries, please contact us via Facebook: Gladex Tours or email us at info@gladextours.com. Please present this document upon check-in at your hotel and at the airport.";
  doc.text(doc.splitTextToSize(disclaimer, CONTENT_W), MARGIN, y);

  // Footers
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) drawFooter(i, total);

  // Save
  const destPart = (fmtVal(booking.destinationName) || "Booking").replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-");
  doc.save(`Gladex-Voucher-${destPart}-${booking.gdx || "download"}.pdf`);
}
