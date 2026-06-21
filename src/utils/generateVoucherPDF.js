// @ts-nocheck
import { jsPDF } from "jspdf";

/**
 * Generates and downloads a Gladex booking voucher PDF.
 * Includes: passenger info, travel dates, hotel, airline/PNR, tour, payment summary.
 *
 * @param {{ booking: object }} options
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

  // ── Colours ───────────────────────────────────────────────────────────────────
  const setOrange    = () => doc.setFillColor(255, 153, 19);
  const setDark      = () => doc.setFillColor(22, 22, 22);
  const setLight     = () => doc.setFillColor(248, 248, 248);
  const setMidGray   = () => doc.setFillColor(235, 235, 235);
  const tOrange      = () => doc.setTextColor(255, 140, 0);
  const tWhite       = () => doc.setTextColor(255, 255, 255);
  const tDark        = () => doc.setTextColor(24, 24, 24);
  const tGray        = () => doc.setTextColor(100, 100, 100);
  const tLightGray   = () => doc.setTextColor(190, 190, 190);
  const drawGray     = () => { doc.setDrawColor(215, 215, 215); doc.setLineWidth(0.25); };
  const drawOrange   = () => { doc.setDrawColor(255, 153, 19); doc.setLineWidth(0.5); };

  // ── Formatters ────────────────────────────────────────────────────────────────
  function fmtVal(v) {
    if (v === null || v === undefined || v === "") return null;
    if (typeof v === "boolean") return v ? "Yes" : "No";
    if (Array.isArray(v)) { const c = v.filter(Boolean).join(", "); return c || null; }
    return String(v).trim() || null;
  }

  function fmtDate(raw) {
    if (!raw) return null;
    const d = new Date(raw);
    if (isNaN(d.getTime())) return String(raw);
    return d.toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });
  }

  function fmtCurrency(amount) {
    if (amount === null || amount === undefined || amount === "") return null;
    const n = typeof amount === "string" ? parseFloat(String(amount).replace(/,/g, "")) : Number(amount);
    if (isNaN(n)) return String(amount);
    return "PHP " + n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // ── Cover header ──────────────────────────────────────────────────────────────
  function drawHeader() {
    // Orange top band
    setOrange(); doc.rect(0, 0, PAGE_W, 28, "F");

    // Company name
    tWhite(); doc.setFont("helvetica", "bold"); doc.setFontSize(16);
    doc.text("GLADEX TRAVEL & TOURS CORP.", MARGIN, 12);

    tLightGray(); doc.setFont("helvetica", "normal"); doc.setFontSize(8);
    doc.text("OFFICIAL BOOKING VOUCHER", MARGIN, 20);

    // GDX top-right
    if (booking.gdx) {
      tWhite(); doc.setFont("helvetica", "bold"); doc.setFontSize(9);
      doc.text(`GDX: ${booking.gdx}`, PAGE_W - MARGIN, 12, { align: "right" });
      tLightGray(); doc.setFont("helvetica", "normal"); doc.setFontSize(7);
      doc.text("Booking Reference", PAGE_W - MARGIN, 19, { align: "right" });
    }

    // Dark band — destination
    setDark(); doc.rect(0, 28, PAGE_W, 15, "F");
    tOrange(); doc.setFont("helvetica", "bold"); doc.setFontSize(12);
    const dest = fmtVal(booking.destinationName) || fmtVal(booking.destination) || "International Package";
    doc.text(dest.toUpperCase(), MARGIN, 39);

    const pkg = fmtVal(booking.packageName) || fmtVal(booking.collective_package_name) || "";
    if (pkg) {
      tLightGray(); doc.setFont("helvetica", "normal"); doc.setFontSize(7.5);
      doc.text(pkg, PAGE_W - MARGIN, 39, { align: "right" });
    }
  }

  // ── Continuation header (page 2+) ─────────────────────────────────────────────
  function drawContinuationHeader() {
    setOrange(); doc.rect(0, 0, PAGE_W, 12, "F");
    tWhite(); doc.setFont("helvetica", "bold"); doc.setFontSize(7.5);
    doc.text("GLADEX TRAVEL & TOURS CORP.  ·  BOOKING VOUCHER", MARGIN, 8);
    if (booking.gdx) {
      doc.text(`GDX: ${booking.gdx}`, PAGE_W - MARGIN, 8, { align: "right" });
    }
  }

  // ── Footer ─────────────────────────────────────────────────────────────────────
  function drawFooter(pageNum, total) {
    doc.setPage(pageNum);
    setLight(); doc.rect(0, PAGE_H - FOOTER_H, PAGE_W, FOOTER_H, "F");
    drawGray(); doc.line(0, PAGE_H - FOOTER_H, PAGE_W, PAGE_H - FOOTER_H);
    tGray(); doc.setFont("helvetica", "normal"); doc.setFontSize(7);
    doc.text("Gladex Travel & Tours Corp.  ·  gladextours.com  ·  Facebook: Gladex Tours", MARGIN, PAGE_H - 4.5);
    doc.text(`Page ${pageNum} of ${total}`, PAGE_W - MARGIN, PAGE_H - 4.5, { align: "right" });
  }

  // ── Section header renderer ───────────────────────────────────────────────────
  function drawSectionHeader(title, y) {
    setMidGray(); doc.rect(MARGIN, y, CONTENT_W, 7.5, "F");
    drawOrange(); doc.line(MARGIN, y, MARGIN, y + 7.5);
    tOrange(); doc.setFont("helvetica", "bold"); doc.setFontSize(8);
    doc.text(title, MARGIN + 4, y + 5.2);
    return y + 7.5;
  }

  // ── Row renderer (label: value) ───────────────────────────────────────────────
  const ROW_H   = 6.5;
  const COL1_W  = 52;

  function drawRow(label, value, y, shade) {
    if (!value) return y;

    const valueLines = doc.splitTextToSize(String(value), CONTENT_W - COL1_W - 4);
    const rowH = Math.max(ROW_H, valueLines.length * 5);

    if (y + rowH > SAFE_BOTTOM) {
      doc.addPage();
      drawContinuationHeader();
      y = 17;
    }

    if (shade) {
      setLight(); doc.rect(MARGIN, y, CONTENT_W, rowH, "F");
    }
    drawGray(); doc.line(MARGIN, y + rowH, MARGIN + CONTENT_W, y + rowH);

    tGray(); doc.setFont("helvetica", "bold"); doc.setFontSize(7.5);
    doc.text(label, MARGIN + 3, y + 4.5);

    tDark(); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
    doc.text(valueLines, MARGIN + COL1_W, y + 4.5);

    return y + rowH;
  }

  // ── Build sections ────────────────────────────────────────────────────────────
  const passengerName = fmtVal(booking.lead_name) || fmtVal(booking.facebook_name) || "";
  const guestNames    = fmtVal(booking.name_of_guests);
  const numPax        = fmtVal(booking.total_number_of_guests) || fmtVal(booking.no_of_person);

  const travelDate  = fmtDate(booking.travel_date);
  const arrival     = fmtDate(booking.arrivalDate)   || fmtDate(booking.arrival_date);
  const departure   = fmtDate(booking.departureDate) || fmtDate(booking.departure_date);
  const duration    = fmtVal(booking.duration);

  const hotelName   = fmtVal(booking.hotelName)   || fmtVal(booking.hotel_name);
  const hotelAddr   = fmtVal(booking.hotelAddress);
  const hotelPhone  = fmtVal(booking.hotelPhone);
  const roomType    = fmtVal(booking.room_type);
  const hotelNotes  = fmtVal(booking.hotel_booking_details);

  const airline     = fmtVal(booking.airlineName)     || fmtVal(booking.name_of_airline);
  const pnr         = fmtVal(booking.pnr);
  const fltDep      = fmtVal(booking.flightDeparture);
  const fltRet      = fmtVal(booking.flightReturn);

  const tourName    = fmtVal(booking.tourName);
  const tourDate    = fmtDate(booking.tourDate);
  const tourDesc    = fmtVal(booking.tourDescription);

  const amtPaid     = fmtCurrency(booking.amountPaid);
  const balance     = fmtCurrency(booking.remainingBalance);
  const pkgCost     = fmtCurrency(booking.packageCost) || fmtCurrency(booking.total_package_price_srp);

  // ── RENDER ────────────────────────────────────────────────────────────────────
  drawHeader();
  let y = 50;

  // ── Passenger banner ──────────────────────────────────────────────────────────
  if (passengerName) {
    setLight(); drawGray();
    doc.rect(MARGIN, y, CONTENT_W, 14, "FD");
    tGray(); doc.setFont("helvetica", "bold"); doc.setFontSize(7);
    doc.text("LEAD PASSENGER", MARGIN + 4, y + 5);
    tDark(); doc.setFont("helvetica", "normal"); doc.setFontSize(10);
    doc.text(passengerName, MARGIN + 4, y + 11.5);
    y += 18;
  }

  // ── Booking Summary ────────────────────────────────────────────────────────────
  y = drawSectionHeader("BOOKING SUMMARY", y) + 1;
  y = drawRow("GDX Number",    fmtVal(booking.gdx),    y, false);
  y = drawRow("Status",        fmtVal(booking.status) || "Confirmed", y, true);
  y = drawRow("Payment",       fmtVal(booking.formula_1) || fmtVal(booking.payment_type), y, false);
  y = drawRow("Booking Date",  fmtDate(booking.date_created) || fmtDate(booking.created), y, true);
  y += 4;

  // ── Traveler Information ───────────────────────────────────────────────────────
  y = drawSectionHeader("TRAVELER INFORMATION", y) + 1;
  y = drawRow("Lead Guest",    passengerName, y, false);
  if (guestNames) y = drawRow("Guest Names", guestNames, y, true);
  if (numPax)     y = drawRow("Total Pax",   numPax,     y, false);
  y += 4;

  // ── Travel Dates ──────────────────────────────────────────────────────────────
  y = drawSectionHeader("TRAVEL INFORMATION", y) + 1;
  y = drawRow("Destination",   fmtVal(booking.destinationName) || fmtVal(booking.destination), y, false);
  if (travelDate) y = drawRow("Travel Date",   travelDate,  y, true);
  if (arrival)    y = drawRow("Arrival Date",  arrival,     y, false);
  if (departure)  y = drawRow("Departure Date",departure,   y, true);
  if (duration)   y = drawRow("Duration",      duration,    y, false);
  y += 4;

  // ── Accommodation ─────────────────────────────────────────────────────────────
  if (hotelName || roomType) {
    y = drawSectionHeader("ACCOMMODATION", y) + 1;
    if (hotelName)  y = drawRow("Hotel",           hotelName,  y, false);
    if (roomType)   y = drawRow("Room Type",        roomType,   y, true);
    if (hotelAddr)  y = drawRow("Address",          hotelAddr,  y, false);
    if (hotelPhone) y = drawRow("Hotel Contact",    hotelPhone, y, true);
    if (hotelNotes) y = drawRow("Booking Notes",    hotelNotes, y, false);
    y += 4;
  }

  // ── Flight Information ────────────────────────────────────────────────────────
  if (airline || pnr || fltDep || fltRet) {
    y = drawSectionHeader("FLIGHT INFORMATION", y) + 1;
    if (airline) y = drawRow("Airline",           airline, y, false);
    if (pnr)     y = drawRow("PNR / Booking Ref", pnr,     y, true);
    if (fltDep)  y = drawRow("Departing Flight",  fltDep,  y, false);
    if (fltRet)  y = drawRow("Return Flight",     fltRet,  y, true);
    y += 4;
  }

  // ── Tour Information ──────────────────────────────────────────────────────────
  if (tourName || tourDate) {
    y = drawSectionHeader("TOUR INFORMATION", y) + 1;
    if (tourName) y = drawRow("Tour",        tourName, y, false);
    if (tourDate) y = drawRow("Tour Date",   tourDate, y, true);
    if (tourDesc) y = drawRow("Description", tourDesc, y, false);
    y += 4;
  }

  // ── Payment Summary ───────────────────────────────────────────────────────────
  if (pkgCost || amtPaid || balance) {
    y = drawSectionHeader("PAYMENT SUMMARY", y) + 1;
    if (pkgCost)  y = drawRow("Package Cost",      pkgCost,  y, false);
    if (amtPaid)  y = drawRow("Amount Paid",        amtPaid,  y, true);
    if (balance)  y = drawRow("Remaining Balance",  balance,  y, false);
    y += 4;
  }

  // ── Disclaimer ────────────────────────────────────────────────────────────────
  if (y + 20 > SAFE_BOTTOM) { doc.addPage(); drawContinuationHeader(); y = 17; }
  y += 2;
  drawGray(); doc.line(MARGIN, y, MARGIN + CONTENT_W, y);
  y += 5;
  tGray(); doc.setFont("helvetica", "italic"); doc.setFontSize(7);
  const disclaimer = "This is an official booking confirmation issued by Gladex Travel & Tours Corp. For inquiries, please contact us via Facebook: Gladex Tours or email us at info@gladextours.com. Please present this document upon check-in at your hotel and at the airport.";
  const disLines = doc.splitTextToSize(disclaimer, CONTENT_W);
  doc.text(disLines, MARGIN, y);

  // ── Footers ───────────────────────────────────────────────────────────────────
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) drawFooter(i, total);

  // ── Save ──────────────────────────────────────────────────────────────────────
  const destPart = (fmtVal(booking.destinationName) || "Booking").replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-");
  const refPart  = booking.gdx || "download";
  doc.save(`Gladex-Voucher-${destPart}-${refPart}.pdf`);
}
