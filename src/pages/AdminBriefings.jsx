// @ts-nocheck
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BookOpen, Search, X, ExternalLink, Loader, Copy, Check, ChevronDown, ChevronRight,
} from "lucide-react";
import { getAllCachedEntries } from "../services/gdxCacheService";
import { READY_SLUGS } from "../config/readySlugs";

const READY_SLUGS_ARR = Array.from(READY_SLUGS);

const ORANGE = "#FF9913";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTHS_LONG = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const SLUG_LABELS = {
  "danang-vietnam":                "Da Nang, Vietnam",
  "hongkong":                      "Hong Kong",
  "singapore":                     "Singapore",
  "taipei":                        "Taipei",
  "beijing":                       "Beijing / Shanghai",
  "beijing-6d5n-pal":              "Beijing 6D5N PAL",
  "beijing-shanghai-pal":          "Beijing + Shanghai PAL",
  "beijing-shanghai-cebu-pacific": "Beijing + Shanghai CEB",
  "beijing-shanghai-collective":   "Beijing + Shanghai Private",
  "hongkong-shenzhen-zhuhai":      "HK · Shenzhen · Zhuhai",
  "hanoi-sapa-airasia":            "Hanoi · Sapa",
};

function slugLabel(slug) {
  return SLUG_LABELS[slug] || slug;
}

function lastName(fullName) {
  if (!fullName) return "—";
  const n = String(fullName).trim();
  return n.includes(",") ? n.split(",")[0].trim() : (n.split(/\s+/).pop() ?? n);
}

function fmtDay(ts) {
  if (!ts) return "—";
  const d = new Date(ts);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

function weekLabel(date) {
  const d = new Date(date);
  const day = d.getDate();
  if (day <= 7)  return "Week 1";
  if (day <= 14) return "Week 2";
  if (day <= 21) return "Week 3";
  return "Week 4";
}

function groupEntries(entries) {
  // year → month → week → entries
  const tree = {}; // { "2026": { year: 2026, months: { "06": { label: "June 2026", weeks: { "Week 1": [...] } } } } }
  entries.forEach(e => {
    const d = e.cached_at ? new Date(e.cached_at) : null;
    const year  = d ? d.getFullYear() : 0;
    const mIdx  = d ? d.getMonth() : 0;
    const mKey  = d ? String(mIdx + 1).padStart(2, "0") : "00";
    const wKey  = d ? weekLabel(e.cached_at) : "—";

    if (!tree[year]) tree[year] = { year, months: {} };
    const mo = tree[year].months;
    if (!mo[mKey]) mo[mKey] = { label: d ? MONTHS_LONG[mIdx] : "Unknown", mIdx, weeks: {} };
    const wk = mo[mKey].weeks;
    if (!wk[wKey]) wk[wKey] = { label: wKey, entries: [] };
    wk[wKey].entries.push(e);
  });

  // Sort: years desc, months desc, weeks asc
  return Object.values(tree)
    .sort((a, b) => b.year - a.year)
    .map(yr => ({
      ...yr,
      months: Object.entries(yr.months)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([, mo]) => ({
          ...mo,
          weeks: Object.entries(mo.weeks)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([, wk]) => ({
              ...wk,
              entries: [...wk.entries].sort((a, b) => Number(b.gdx) - Number(a.gdx)),
            })),
          total: Object.values(mo.weeks).reduce((s, w) => s + w.entries.length, 0),
        })),
    }));
}

export default function AdminBriefings() {
  const [entries,   setEntries]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");
  const [copied,    setCopied]    = useState(null);
  const [collapsed, setCollapsed] = useState(new Set());

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const cached = await getAllCachedEntries(READY_SLUGS_ARR);
      setEntries(cached);
    } catch (err) {
      console.error("[AdminBriefings] load error:", err);
    } finally {
      setLoading(false);
    }
  }

  function copyGdx(gdx) {
    navigator.clipboard.writeText(String(gdx)).catch(() => {});
    setCopied(String(gdx));
    setTimeout(() => setCopied(null), 1600);
  }

  function toggleCollapse(key) {
    setCollapsed(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  const q = search.trim().toLowerCase();
  const filtered = useMemo(() => entries.filter(e => {
    if (!q) return true;
    return String(e.gdx).includes(q) || (e.lead_name ?? "").toLowerCase().includes(q);
  }), [entries, q]);

  const grouped = useMemo(() => groupEntries(filtered), [filtered]);
  const liveCount = entries.length;

  return (
    <div className="flex-1 min-w-0">

      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <BookOpen size={20} style={{ color: ORANGE }} className="mt-1 shrink-0" />
        <div>
          <h2 className="font-condensed font-black text-3xl text-gray-900 leading-tight">Client Briefings</h2>
          <p className="font-body text-sm text-gray-400 mt-0.5">
            Fetched bookings organized by date — open a briefing page or copy GDX.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-2 mb-4 font-body text-sm text-gray-500">
        <span className="font-bold" style={{ color: "#16a34a" }}>{liveCount}</span>
        <span>international bookings</span>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by GDX number or client name…"
          className="w-full font-body text-sm pl-8 pr-8 py-2.5 rounded-xl bg-white outline-none"
          style={{ border: `1.5px solid ${search ? ORANGE : "#e5e7eb"}`, color: "#111" }}
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
            <X size={13} />
          </button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center gap-2 text-gray-400 py-10">
          <Loader size={16} className="animate-spin" />
          <span className="font-body text-sm">Loading bookings…</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl p-8 text-center bg-white" style={{ border: "1px solid #e5e7eb" }}>
          <Search size={28} className="mx-auto mb-2 text-gray-200" />
          <p className="font-body text-sm text-gray-400">
            {q ? `No results for "${search}"` : "No bookings found."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map(yearGroup => (
            <div key={yearGroup.year}>
              {/* Year header */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
                <span className="font-condensed font-black text-lg text-gray-400 px-2">{yearGroup.year}</span>
                <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
              </div>

              <div className="space-y-3">
                {yearGroup.months.map(monthGroup => {
                  const colKey = `${yearGroup.year}-${monthGroup.label}`;
                  const isOpen = !collapsed.has(colKey);

                  return (
                    <div key={colKey} className="rounded-xl overflow-hidden bg-white" style={{ border: "1.5px solid #e5e7eb" }}>
                      {/* Month header */}
                      <button
                        onClick={() => toggleCollapse(colKey)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {isOpen
                            ? <ChevronDown size={14} className="text-gray-400" />
                            : <ChevronRight size={14} className="text-gray-400" />
                          }
                          <span className="font-condensed font-black text-base text-gray-800">
                            {monthGroup.label}
                          </span>
                        </div>
                        <span className="font-body text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                          {monthGroup.total}
                        </span>
                      </button>

                      {/* Weeks + rows */}
                      {isOpen && (
                        <div className="border-t border-gray-100">
                          {monthGroup.weeks.map(weekGroup => (
                            <div key={weekGroup.label}>
                              {/* Week label */}
                              <div
                                className="px-4 py-1.5 flex items-center gap-2"
                                style={{ backgroundColor: "#fafafa", borderBottom: "1px solid #f0f0f0" }}
                              >
                                <span className="font-body text-xs font-bold text-gray-400 tracking-widest uppercase">
                                  {weekGroup.label}
                                </span>
                                <span className="font-body text-xs text-gray-300">·</span>
                                <span className="font-body text-xs text-gray-400">{weekGroup.entries.length} booking{weekGroup.entries.length !== 1 ? "s" : ""}</span>
                              </div>

                              {/* Entries */}
                              <table className="w-full text-sm font-body">
                                <tbody>
                                  {weekGroup.entries.map((entry, i) => {
                                    const gdxKey  = String(entry.gdx);
                                    const isReady = READY_SLUGS.has(entry.slug);
                                    const isCopied = copied === gdxKey;

                                    return (
                                      <tr
                                        key={gdxKey}
                                        className="border-t border-gray-50 hover:bg-orange-50/30 transition-colors"
                                        style={{ backgroundColor: i % 2 === 0 ? undefined : "#FAFAFA" }}
                                      >
                                        {/* Date */}
                                        <td className="pl-4 pr-2 py-2.5 whitespace-nowrap">
                                          <span className="font-mono text-xs text-gray-400">{fmtDay(entry.cached_at)}</span>
                                        </td>

                                        {/* GDX */}
                                        <td className="px-2 py-2.5">
                                          <button
                                            onClick={() => copyGdx(gdxKey)}
                                            className="inline-flex items-center gap-1 font-mono text-sm font-bold transition-colors"
                                            style={{ color: ORANGE }}
                                            title="Click to copy"
                                          >
                                            {entry.gdx}
                                            {isCopied
                                              ? <Check size={10} style={{ color: "#16a34a" }} />
                                              : <Copy size={10} className="opacity-30 hover:opacity-70" />
                                            }
                                          </button>
                                        </td>

                                        {/* Last name */}
                                        <td className="px-2 py-2.5">
                                          <span className="font-semibold text-gray-800 text-sm">{lastName(entry.lead_name)}</span>
                                        </td>

                                        {/* Full name — hidden on small screens */}
                                        <td className="px-2 py-2.5 hidden sm:table-cell">
                                          <span className="text-xs text-gray-400">{entry.lead_name ?? "—"}</span>
                                        </td>

                                        {/* Destination */}
                                        <td className="px-2 py-2.5 hidden md:table-cell">
                                          <span
                                            className="inline-block text-xs font-bold px-2 py-0.5 rounded-full"
                                            style={{
                                              backgroundColor: isReady ? "#dcfce7" : "#fef9c3",
                                              color:           isReady ? "#15803d" : "#854d0e",
                                            }}
                                          >
                                            {slugLabel(entry.slug)}
                                          </span>
                                        </td>

                                        {/* Action */}
                                        <td className="px-4 py-2.5">
                                          {isReady ? (
                                            <motion.button
                                              onClick={() => window.open(`/destination/${entry.slug}`, "_blank")}
                                              className="inline-flex items-center gap-1 font-body text-xs font-bold px-2.5 py-1.5 rounded-lg"
                                              style={{ backgroundColor: `${ORANGE}18`, color: ORANGE }}
                                              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                                            >
                                              <ExternalLink size={10} /> Open
                                            </motion.button>
                                          ) : (
                                            <span className="text-xs text-gray-300">Pending</span>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <p className="font-body text-xs text-gray-400 pb-4">
            {filtered.length} booking{filtered.length !== 1 ? "s" : ""}
            {q ? ` matching "${search}"` : ""}
          </p>
        </div>
      )}

    </div>
  );
}
