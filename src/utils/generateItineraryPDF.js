// @ts-nocheck
import { jsPDF } from "jspdf";

/**
 * Generates and triggers download of a branded Gladex itinerary PDF.
 *
 * @param {{ dest, briefing, pkg, booking }} options
 */
export function generateItineraryPDF({ dest, briefing, pkg, booking }) {
  const itinerary = briefing?.itinerary || pkg?.itinerary || [];
  if (!itinerary.length) return;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const PAGE_W    = 210;
  const PAGE_H    = 297;
  const MARGIN    = 14;
  const CONTENT_W = PAGE_W - MARGIN * 2;
  const FOOTER_H  = 12;      // reserved space at bottom of every page
  const SAFE_BOTTOM = PAGE_H - FOOTER_H - 4;

  // ── Colour helpers ─────────────────────────────────────────────────────────
  const orange = () => doc.setFillColor(255, 140, 0);
  const dark   = () => doc.setFillColor(22, 22, 22);
  const light  = () => doc.setFillColor(248, 248, 248);
  const tOrange  = () => doc.setTextColor(255, 140, 0);
  const tWhite   = () => doc.setTextColor(255, 255, 255);
  const tDark    = () => doc.setTextColor(24, 24, 24);
  const tGray    = () => doc.setTextColor(100, 100, 100);
  const tLightGray = () => doc.setTextColor(190, 190, 190);
  const drawGray  = () => { doc.setDrawColor(215, 215, 215); doc.setLineWidth(0.25); };

  // ── Cover header (first page only) ─────────────────────────────────────────
  function drawCoverHeader() {
    // Orange band
    orange(); doc.rect(0, 0, PAGE_W, 30, "F");

    // Company name
    tWhite(); doc.setFont("helvetica", "bold"); doc.setFontSize(17);
    doc.text("GLADEX TRAVEL & TOURS CORP.", MARGIN, 13);

    // Sub-label
    tLightGray(); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
    doc.text("OFFICIAL TRAVEL ITINERARY", MARGIN, 21);

    // GDX ref (top right)
    if (booking?.gdx) {
      tWhite(); doc.setFont("helvetica", "bold"); doc.setFontSize(9);
      doc.text(`REF: ${booking.gdx}`, PAGE_W - MARGIN, 13, { align: "right" });
      tLightGray(); doc.setFont("helvetica", "normal"); doc.setFontSize(7);
      doc.text("Booking Reference", PAGE_W - MARGIN, 20, { align: "right" });
    }

    // Dark destination band
    dark(); doc.rect(0, 30, PAGE_W, 18, "F");
    tWhite(); doc.setFont("helvetica", "bold"); doc.setFontSize(14);
    doc.text(dest?.name || "Travel Package", MARGIN, 43);

    const sub = briefing?.welcomeMessage?.subtitle || pkg?.packageCode || "";
    if (sub) {
      tLightGray(); doc.setFont("helvetica", "normal"); doc.setFontSize(8);
      doc.text(sub, PAGE_W - MARGIN, 43, { align: "right" });
    }
  }

  // ── Continuation header (pages 2+) ─────────────────────────────────────────
  function drawContinuationHeader() {
    orange(); doc.rect(0, 0, PAGE_W, 12, "F");
    tWhite(); doc.setFont("helvetica", "bold"); doc.setFontSize(8);
    doc.text("GLADEX TRAVEL & TOURS CORP.  ·  OFFICIAL ITINERARY", MARGIN, 8);
    if (booking?.gdx) {
      doc.text(`REF: ${booking.gdx}`, PAGE_W - MARGIN, 8, { align: "right" });
    }
  }

  // ── Footer ─────────────────────────────────────────────────────────────────
  function drawFooter(pageNum, total) {
    doc.setPage(pageNum);
    light(); doc.rect(0, PAGE_H - FOOTER_H, PAGE_W, FOOTER_H, "F");
    drawGray(); doc.line(0, PAGE_H - FOOTER_H, PAGE_W, PAGE_H - FOOTER_H);
    tGray(); doc.setFont("helvetica", "normal"); doc.setFontSize(7);
    doc.text("Gladex Travel & Tours Corp.  ·  gladextours.com", MARGIN, PAGE_H - 4.5);
    doc.text(`Page ${pageNum} of ${total}`, PAGE_W - MARGIN, PAGE_H - 4.5, { align: "right" });
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════════════

  // Page 1 header
  drawCoverHeader();
  let y = 55;

  // Passenger info row
  const passengerName = booking?.name_of_guests || booking?.lead_name || booking?.facebook_name || "";
  if (passengerName) {
    light(); drawGray(); doc.rect(MARGIN, y, CONTENT_W, 13, "FD");
    tGray(); doc.setFont("helvetica", "bold"); doc.setFontSize(7);
    doc.text("PASSENGER", MARGIN + 4, y + 5);
    tDark(); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
    doc.text(passengerName, MARGIN + 4, y + 10.5);
    y += 18;
  }

  // "Day by Day Itinerary" label
  tOrange(); doc.setFont("helvetica", "bold"); doc.setFontSize(9);
  doc.text("DAY BY DAY ITINERARY", MARGIN, y);
  drawGray(); doc.line(MARGIN, y + 2, PAGE_W - MARGIN, y + 2);
  y += 7;

  const DAY_HDR_H  = 9;    // orange day header bar height
  const LINE_H     = 5.1;  // line height for activity text
  const BULLET_R   = 0.85; // bullet circle radius
  const DAY_GAP    = 7;    // gap after each day block

  let isFirstPage = true;

  for (const item of itinerary) {
    // Estimate height for this day block (to decide if we need a new page)
    const actRows = (item.activities || []).reduce((n, act) => {
      return n + doc.splitTextToSize(act, CONTENT_W - 8).length;
    }, 0);
    const blockH = DAY_HDR_H + 3 + actRows * LINE_H + DAY_GAP;

    if (y + blockH > SAFE_BOTTOM) {
      doc.addPage();
      drawContinuationHeader();
      y = 17;
      isFirstPage = false;
    }

    // ── Day header bar ───────────────────────────────────────────────────────
    orange(); doc.rect(MARGIN, y, CONTENT_W, DAY_HDR_H, "F");

    // "Day N" pill (white on orange)
    doc.setFillColor(255, 255, 255);
    doc.rect(MARGIN + 2, y + 1.5, 17, 6, "F");
    tOrange(); doc.setFont("helvetica", "bold"); doc.setFontSize(7);
    doc.text(`DAY ${item.day}`, MARGIN + 10.5, y + 6, { align: "center" });

    // Title (truncated to one line in header)
    const titleLines = doc.splitTextToSize(item.title || "", CONTENT_W - 24);
    tWhite(); doc.setFont("helvetica", "bold"); doc.setFontSize(8.5);
    doc.text(titleLines[0], MARGIN + 22, y + 6);

    y += DAY_HDR_H + 3;

    // ── Activities ──────────────────────────────────────────────────────────
    for (const activity of (item.activities || [])) {
      const lines = doc.splitTextToSize(activity, CONTENT_W - 8);

      if (y + lines.length * LINE_H > SAFE_BOTTOM) {
        doc.addPage();
        drawContinuationHeader();
        y = 17;
      }

      // Orange bullet dot
      orange(); doc.circle(MARGIN + 2, y + 1.5, BULLET_R, "F");

      // Activity text
      tDark(); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
      doc.text(lines, MARGIN + 5.5, y + 2.5);
      y += lines.length * LINE_H;
    }

    y += DAY_GAP;
  }

  // ── Footers on all pages ───────────────────────────────────────────────────
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) drawFooter(i, total);

  // ── Save ──────────────────────────────────────────────────────────────────
  const namePart = (dest?.name || "Itinerary").replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-");
  const refPart  = booking?.gdx || "download";
  doc.save(`Gladex-Itinerary-${namePart}-${refPart}.pdf`);
}
