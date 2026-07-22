// @ts-nocheck
import React from "react";
import { Users, FileText, Star, Globe, Lock, Upload, BookOpen } from "lucide-react";

const ORANGE = "#FF9913";

function Section({ icon: Icon, color, title, children }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(0,0,0,0.07)", padding: "22px 24px", borderLeft: `4px solid ${color}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={15} color={color} />
        </div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 900, color: "#111", margin: 0, letterSpacing: "-0.01em" }}>{title}</h2>
      </div>
      <div style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

function Step({ num, text }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${ORANGE}18`, color: ORANGE, fontSize: 10, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{num}</div>
      <p style={{ margin: 0 }}>{text}</p>
    </div>
  );
}

function Tip({ children }) {
  return (
    <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(255,153,19,0.07)", borderRadius: 10, border: "1px solid rgba(255,153,19,0.18)", fontSize: "11.5px", fontWeight: 600, color: "#92400e" }}>
      {children}
    </div>
  );
}

function MockupGdxSearch() {
  return (
    <div style={{ margin: "14px 0 4px", border: "1.5px solid #e5e5e5", borderRadius: 12, overflow: "hidden", fontSize: "11px" }}>
      {/* mock browser bar */}
      <div style={{ background: "#f9f9f9", padding: "8px 14px", borderBottom: "1px solid #e5e5e5", display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ddd" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ddd" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ddd" }} />
        <span style={{ marginLeft: 8, color: "#bbb", fontSize: 10 }}>gladextours.com/international</span>
      </div>
      {/* GDX search result */}
      <div style={{ background: "#fff", padding: "10px 14px" }}>
        <p style={{ fontSize: 9, color: "#bbb", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 6px" }}>Your Booking</p>
        <div style={{ padding: "8px 10px", background: "#fafafa", borderRadius: 8, border: "1px solid #f0f0f0", marginBottom: 8 }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "#111", margin: "0 0 2px" }}>Juan Dela Cruz</p>
          <p style={{ fontSize: 10, color: "#bbb", margin: 0 }}>GDX-12345 · Hong Kong · 4D3N</p>
        </div>
        {/* voucher highlighted */}
        <div style={{ background: "rgba(255,153,19,0.04)", border: "1.5px solid rgba(255,153,19,0.35)", borderRadius: 8 }}>
          <div style={{ padding: "6px 10px", background: "rgba(255,153,19,0.06)", borderBottom: "1px solid rgba(255,153,19,0.15)", display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,153,19,0.5)", border: "1.5px solid rgba(255,153,19,0.6)" }} />
            <span style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: ORANGE }}>Your Voucher</span>
            <span style={{ marginLeft: "auto", fontSize: 9, background: ORANGE, color: "#fff", borderRadius: 4, padding: "1px 6px", fontWeight: 800 }}>← appears here</span>
          </div>
          <div style={{ padding: "8px 10px", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, background: "rgba(255,153,19,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <FileText size={10} color={ORANGE} />
            </div>
            <span style={{ flex: 1, fontSize: 10, fontWeight: 700, color: "#333" }}>4D3N-HONGKONG-ITINERARY.pdf</span>
            <span style={{ fontSize: 9, background: ORANGE, color: "#fff", padding: "3px 8px", borderRadius: 5, fontWeight: 700 }}>Download</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminAbout() {
  return (
    <div style={{ padding: "32px", maxWidth: 780 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#111", margin: 0, letterSpacing: "-0.02em" }}>About this Panel</h1>
        <p style={{ fontSize: "13px", color: "#999", margin: "4px 0 0" }}>What everything here is for and how to use it</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

        <Section icon={Globe} color="#3B82F6" title="What is the International System?">
          <p style={{ margin: "0 0 8px" }}>
            This panel manages international Gladex bookings — destinations like Hong Kong, Singapore, Taipei, Da Nang, and Beijing/Shanghai. When a client books an international tour, they can search for their booking on the Gladex international site using their <strong>GDX number</strong>. From there, they can view their booking details and download their voucher.
          </p>
          <p style={{ margin: 0 }}>
            This admin panel handles the tools behind that experience: uploading vouchers, managing client reviews, tracking briefing links, and managing team access.
          </p>
        </Section>

        <Section icon={BookOpen} color="#8B5CF6" title="Briefings — Destination Links">
          <p style={{ margin: "0 0 10px" }}>
            The Briefings tab shows all GDX bookings that have been cached and matched to a destination. Each row includes the client's name, destination, and a direct link to their travel briefing page (if the destination has an active briefing).
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Step num="1" text="Browse or search the list by GDX number, name, or destination." />
            <Step num="2" text={`Copy the client's briefing link using the "Copy" button.`} />
            <Step num="3" text="Send the link to the client so they can view their full itinerary." />
          </div>
          <Tip>Only destinations marked as <strong>Ready</strong> have an active briefing page. Others are listed but no link is generated yet.</Tip>
        </Section>

        <Section icon={Upload} color={ORANGE} title="Vouchers — Uploading for Clients">
          <p style={{ margin: "0 0 10px" }}>
            Vouchers are files (PDFs, images, or any format) attached to a specific booking. Once uploaded, a <strong>Your Voucher</strong> section automatically appears on the client's GDX search result with a Download button.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
            <Step num="1" text="Go to the Vouchers tab and search the GDX number (e.g. 11056)." />
            <Step num="2" text="Confirm the booking name and destination in the result card." />
            <Step num="3" text="Click the upload zone or drag a file onto it — PDF, image, or any file type." />
            <Step num="4" text="The file appears under Attached Files. The client's page updates instantly." />
          </div>
          <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#333", fontSize: "11.5px" }}>Where it shows on the client's page:</p>
          <MockupGdxSearch />
          <Tip>Each GDX can only have one active voucher at a time. Uploading a new file replaces the previous one.</Tip>
        </Section>

        <Section icon={Star} color="#16a34a" title="Client Reviews — Tracking Feedback">
          <p style={{ margin: "0 0 8px" }}>
            Reviews are submitted by clients after their trip. Only 4–5 star reviews display publicly. Reviews rated 1–3 stars are visible to admins only and never shown to other clients.
          </p>
          <p style={{ margin: 0 }}>
            Use the <strong>By Destination</strong> tab to see reviews grouped by destination, and the <strong>Pending</strong> tab for reviews that still need approval before they go public.
          </p>
        </Section>

        <Section icon={Users} color="#06B6D4" title="Users — Managing the Team">
          <p style={{ margin: "0 0 10px" }}>
            The Users tab shows all Gladex employees pulled from the accounts system. You can search, filter by role or status, and manage access from here.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Step num="1" text="Search by name, employee code, or job title." />
            <Step num="2" text="Change a user's role (Agent → Admin, etc.) using the dropdown in the Actions column." />
            <Step num="3" text="Activate or deactivate accounts using the toggle button." />
          </div>
          <Tip>Only <strong>Super Admin</strong> and <strong>Developer</strong> roles can change roles or view passwords.</Tip>
        </Section>

        <Section icon={Lock} color="#6B7280" title="Access & Roles">
          <p style={{ margin: "0 0 8px" }}>
            Login uses your Gladex <strong>Login Code</strong> (employee code) and your assigned password. Sessions are stored in <code style={{ background: "#f5f5f5", padding: "1px 6px", borderRadius: 5 }}>sessionStorage</code> and expire when the browser tab is closed.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {[
              ["Super Admin", "#FF9913", "Full access — manage roles, view credentials, upload vouchers, manage reviews."],
              ["Developer",   "#8B5CF6", "Same as Super Admin. For technical maintainers of the system."],
              ["Admin",       "#3B82F6", "Can upload vouchers and manage reviews. Cannot change user roles."],
              ["Team Leader", "#16a34a", "View-only access to most data. Cannot manage users or upload vouchers."],
              ["Agent",       "#6B7280", "Basic access. View briefing data only."],
            ].map(([role, color, desc]) => (
              <div key={role} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ display: "inline-block", padding: "1px 8px", borderRadius: 999, background: `${color}18`, color, fontSize: 10, fontWeight: 800, flexShrink: 0, marginTop: 2 }}>{role}</span>
                <span style={{ fontSize: "11.5px", color: "#666" }}>{desc}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(220,38,38,0.05)", borderRadius: 10, border: "1px solid rgba(220,38,38,0.15)", fontSize: "11.5px", fontWeight: 600, color: "#dc2626" }}>
            Never share your Login Code and password. The panel has full write access to booking data and client-facing content.
          </div>
        </Section>

      </div>
    </div>
  );
}
