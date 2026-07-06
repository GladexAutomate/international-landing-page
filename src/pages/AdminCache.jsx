// @ts-nocheck
import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw, Database, CheckCircle, XCircle,
  SkipForward, Loader, BarChart2, Zap, ExternalLink,
  Search, X, BookOpen, FileText,
} from "lucide-react";
import { getCacheStats, bulkCacheAllBookings, getAllCachedEntries } from "../services/gdxCacheService";
import { READY_SLUGS } from "../config/readySlugs";
import { getBriefingBySlug } from "../data/briefings/index.js";

const ORANGE = "#FF9913";

const SLUG_LABELS = {
  "danang-vietnam":                "Da Nang, Vietnam",
  "hongkong":                      "Hong Kong",
  "singapore":                     "Singapore",
  "taipei":                        "Taipei",
  "beijing":                       "Beijing",
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

function StatCard({ label, value, color, sub }) {
  return (
    <div className="rounded-xl p-4 flex flex-col gap-0.5 bg-white" style={{ border: "1px solid rgba(0,0,0,0.07)" }}>
      <p className="font-body text-xs font-bold tracking-widest uppercase" style={{ color: ORANGE }}>{label}</p>
      <p className="font-condensed font-black text-3xl" style={{ color: color ?? "#111" }}>{value ?? "—"}</p>
      {sub && <p className="font-body text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

const RANGE_OPTIONS = [
  { label: "7 days",   days: 7   },
  { label: "2 weeks",  days: 14  },
  { label: "1 month",  days: 30  },
  { label: "3 months", days: 90  },
  { label: "6 months", days: 180 },
  { label: "All new",  days: null },
];

function getCutoff(days) {
  if (!days) return null;
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

function fmtDate(ts) {
  if (!ts) return "—";
  const d = new Date(ts);
  const mo = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()];
  return `${mo} ${d.getDate()}, ${d.getFullYear()}`;
}

export default function AdminCache() {
  const navigate = useNavigate();
  const [stats,      setStats]      = useState(null);
  const [masterList, setMasterList] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [running,    setRunning]    = useState(false);
  const [logs,       setLogs]       = useState([]);
  const [result,     setResult]     = useState(null);
  const [rangeDays,  setRangeDays]  = useState(30);
  const [search,     setSearch]     = useState("");
  const logsEndRef = useRef(null);
  const seenGdxRef = useRef(new Set());

  useEffect(() => { load(); }, []);
  useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);

  async function loadTable() {
    try {
      const cached = await getAllCachedEntries(Array.from(READY_SLUGS));
      const rows = cached.map(e => ({
        ...e,
        is_ready: READY_SLUGS.has(e.slug),
        isNew: false,
      }));
      seenGdxRef.current = new Set(rows.map(r => String(r.gdx)));
      setMasterList(rows);
    } catch (err) {
      console.error("[AdminCache] loadTable error:", err?.message ?? err);
    }
  }

  async function loadStats() {
    try {
      const s = await getCacheStats();
      setStats(s);
    } catch (err) {
      console.warn("[AdminCache] loadStats error:", err?.message ?? err);
    }
  }

  async function load() {
    setLoading(true);
    await Promise.all([loadTable(), loadStats()]);
    setLoading(false);
  }

  async function handleBulkCache() {
    setRunning(true);
    setLogs([]);
    setResult(null);
    seenGdxRef.current = new Set(masterList.map(r => String(r.gdx)));
    try {
      const res = await bulkCacheAllBookings(
        (msg) => setLogs((p) => [...p, msg]),
        READY_SLUGS,
        (entry) => {
          const key = String(entry.gdx);
          if (seenGdxRef.current.has(key)) return;
          seenGdxRef.current.add(key);
          setMasterList((prev) => [...prev, {
            ...entry,
            is_ready: READY_SLUGS.has(entry.slug),
          }]);
        },
        getCutoff(rangeDays),
      );
      setResult(res);
      await Promise.all([loadTable(), loadStats()]);
    } catch (err) {
      setLogs((p) => [...p, `❌ Fatal error: ${err.message}`]);
    } finally {
      setRunning(false);
    }
  }

  // International (READY_SLUGS only), filtered by search
  const q = search.trim().toLowerCase();
  const intlRows = useMemo(() => {
    const rows = masterList
      .filter(e => e.slug && READY_SLUGS.has(e.slug))
      .sort((a, b) => Number(b.gdx) - Number(a.gdx));
    if (!q) return rows;
    return rows.filter(e =>
      String(e.gdx).includes(q) ||
      (e.lead_name ?? "").toLowerCase().includes(q) ||
      (slugLabel(e.slug)).toLowerCase().includes(q)
    );
  }, [masterList, q]);

  const unresolvedRows = masterList.filter(e => !e.slug);

  return (
    <div className="flex-1 min-w-0">

      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <Database size={20} style={{ color: ORANGE }} className="mt-1 shrink-0" />
        <div>
          <h2 className="font-condensed font-black text-3xl text-gray-900 leading-tight">Admin</h2>
        </div>
      </div>

      {/* Two-column layout on large screens */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">

        {/* ── LEFT COLUMN: Controls + Stats + Live Pages ── */}
        <div className="flex flex-col gap-4 w-full xl:w-80 shrink-0">

          {/* Always-visible nav buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/admin/briefings")}
              className="flex-1 flex items-center justify-center gap-1.5 font-body text-xs font-bold py-2.5 rounded-xl border transition-colors hover:bg-orange-50"
              style={{ borderColor: `${ORANGE}55`, color: ORANGE }}
            >
              <BookOpen size={13} /> Client Briefings
            </button>
            <button
              onClick={() => navigate("/admin/vouchers")}
              className="flex-1 flex items-center justify-center gap-1.5 font-body text-xs font-bold py-2.5 rounded-xl border transition-colors hover:bg-orange-50"
              style={{ borderColor: `${ORANGE}55`, color: ORANGE }}
            >
              <FileText size={13} /> Vouchers
            </button>
          </div>

          {/* Date range + Fetch */}
          <div className="flex flex-col gap-2">
            <div className="rounded-xl overflow-hidden bg-white" style={{ border: "1.5px solid #e5e7eb" }}>
              <p className="font-body text-xs font-bold tracking-widest uppercase text-gray-400 px-3 pt-2.5 pb-1">Fetch bookings from</p>
              <div className="flex flex-wrap gap-1 px-3 pb-3">
                {RANGE_OPTIONS.map(opt => {
                  const active = rangeDays === opt.days;
                  return (
                    <button
                      key={String(opt.days)}
                      onClick={() => setRangeDays(opt.days)}
                      disabled={running}
                      className="font-body text-xs font-bold px-3 py-1.5 rounded-lg transition-all disabled:opacity-40"
                      style={{
                        backgroundColor: active ? ORANGE : "#f3f4f6",
                        color:           active ? "#000" : "#555",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.button
              onClick={handleBulkCache} disabled={running}
              className="w-full inline-flex items-center justify-center gap-2 font-body font-bold text-sm px-5 py-3 rounded-xl disabled:opacity-50"
              style={{ backgroundColor: ORANGE, color: "#000" }}
              whileHover={{ scale: running ? 1 : 1.02 }} whileTap={{ scale: 0.97 }}
            >
              {running ? <Loader size={15} className="animate-spin" /> : <RefreshCw size={15} />}
              {running ? "Fetching from Fusioo…" : `Fetch — last ${RANGE_OPTIONS.find(o => o.days === rangeDays)?.label}`}
            </motion.button>
            <motion.button
              onClick={load} disabled={running || loading}
              className="w-full inline-flex items-center justify-center gap-2 font-body font-bold text-sm px-5 py-3 rounded-xl border disabled:opacity-50"
              style={{ backgroundColor: "#FFF", borderColor: "#ddd", color: "#444" }}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
            >
              <BarChart2 size={15} /> Refresh Stats
            </motion.button>
          </div>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 gap-2">
              <StatCard label="International" value={stats.totalBookings} />
              <StatCard label="In Cache"      value={stats.freshCached}  color="#2563eb" />
              <StatCard label="Displayed"     value={masterList.filter(e => e.slug && READY_SLUGS.has(e.slug)).length} color="#16a34a" />
              <StatCard label="Unresolved"    value={unresolvedRows.length}  color="#d97706" />
            </div>
          )}

          {/* Result summary */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl overflow-hidden"
              style={{ border: `1px solid ${ORANGE}33` }}
            >
              <div className="p-4 grid grid-cols-2 gap-3" style={{ backgroundColor: "#FFF5EC" }}>
                {[
                  { icon: <CheckCircle size={16} style={{ color: "#16a34a" }} />, val: result.success.length,   label: "Resolved" },
                  { icon: <Zap size={16} style={{ color: "#7c3aed" }} />,         val: result.newToList.length, label: "New" },
                  { icon: <SkipForward size={16} style={{ color: "#d97706" }} />, val: result.skipped.length,   label: "Unresolved" },
                  { icon: <XCircle size={16} style={{ color: "#dc2626" }} />,     val: result.failed.length,    label: "Failed" },
                ].map(({ icon, val, label }) => (
                  <div key={label} className="flex flex-col items-center gap-0.5">
                    {icon}
                    <p className="font-condensed font-black text-2xl text-gray-900">{val}</p>
                    <p className="font-body text-xs text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Live Briefing Pages */}
          <div className="rounded-xl overflow-hidden bg-white" style={{ border: "1.5px solid #bbf7d0" }}>
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-condensed font-black text-base text-gray-900 leading-tight">Live Briefing Pages</p>
                <p className="font-body text-xs text-gray-400">{READY_SLUGS.size} packages available</p>
              </div>
              <span className="font-body text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#dcfce7", color: "#15803d" }}>✅ LIVE</span>
            </div>
            <div className="divide-y divide-gray-50">
              {[...READY_SLUGS].map(slug => {
                const b = getBriefingBySlug(slug);
                const wm = b?.welcomeMessage ?? {};
                const subtitle = wm.subtitle || wm.title || slug;
                const code = wm.packageCode || null;
                const duration = wm.duration || null;
                return (
                  <div key={slug} className="px-4 py-3 flex items-start justify-between gap-2 hover:bg-orange-50/40 transition-colors">
                    <div className="min-w-0">
                      <p className="font-body text-sm font-semibold text-gray-800 leading-snug">
                        {subtitle}
                        {code && <span className="font-mono text-xs font-normal text-gray-400 ml-1.5">{code}</span>}
                      </p>
                      {duration && <p className="font-body text-xs text-gray-400 mt-0.5">{duration}</p>}
                    </div>
                    <button
                      onClick={() => window.open(`/preview/${slug}`, "_blank")}
                      title="Preview briefing page"
                      className="shrink-0 inline-flex items-center gap-1 font-body text-xs font-semibold px-2 py-1 rounded-lg mt-0.5"
                      style={{ backgroundColor: `${ORANGE}18`, color: ORANGE }}
                    >
                      <ExternalLink size={11} /> View
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live log */}
          <AnimatePresence>
            {logs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(0,0,0,0.1)" }}
              >
                <div className="px-3 py-2 flex items-center gap-2" style={{ backgroundColor: "#1A1A1A" }}>
                  <div className={`w-2 h-2 rounded-full ${running ? "bg-green-400 animate-pulse" : "bg-gray-500"}`} />
                  <span className="font-body text-xs text-gray-400">{running ? "Live" : "Done"}</span>
                  <span className="font-body text-xs text-gray-600 ml-auto">{logs.length} lines</span>
                </div>
                <div
                  className="p-3 overflow-y-auto font-mono text-xs space-y-0.5"
                  style={{ backgroundColor: "#111", maxHeight: 280, color: "#d4d4d4" }}
                >
                  {logs.map((line, i) => (
                    <p key={i} style={{
                      color: line.includes("✅") ? "#86efac"
                        : line.includes("❌") ? "#fca5a5"
                        : line.includes("⏭️") ? "#fde68a"
                        : line.includes("🆕") ? "#c4b5fd"
                        : line.startsWith("🏁") || line.startsWith("🌏") ? "#93c5fd"
                        : "#d4d4d4",
                    }}>{line}</p>
                  ))}
                  <div ref={logsEndRef} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* ── RIGHT COLUMN: International Bookings Table ── */}
        <div className="flex-1 min-w-0">
          <div className="rounded-xl overflow-hidden bg-white" style={{ border: "1.5px solid #e5e7eb" }}>

            {/* Table header */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
              <div>
                <p className="font-condensed font-black text-base text-gray-900 leading-tight">International Bookings</p>
                <p className="font-body text-xs text-gray-400">
                  {loading ? "Loading…" : `${intlRows.length} client${intlRows.length !== 1 ? "s" : ""}${q ? ` matching "${search}"` : ""}`}
                </p>
              </div>
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search GDX or name…"
                  className="w-full font-body text-sm pl-8 pr-8 py-2 rounded-lg bg-gray-50 outline-none"
                  style={{ border: `1.5px solid ${search ? ORANGE : "#e5e7eb"}`, color: "#111" }}
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Table body */}
            {loading ? (
              <div className="flex items-center gap-2 text-gray-400 px-4 py-10">
                <Loader size={15} className="animate-spin" />
                <span className="font-body text-sm">Loading bookings…</span>
              </div>
            ) : intlRows.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <p className="font-body text-sm text-gray-400">
                  {q ? `No results for "${search}"` : "No international bookings cached yet. Run a Fetch All."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-4 py-2.5 text-xs font-bold tracking-widest uppercase text-gray-400">GDX</th>
                      <th className="text-left px-4 py-2.5 text-xs font-bold tracking-widest uppercase text-gray-400">Client Name</th>
                      <th className="text-left px-4 py-2.5 text-xs font-bold tracking-widest uppercase text-gray-400 hidden md:table-cell">Destination</th>
                      <th className="text-left px-4 py-2.5 text-xs font-bold tracking-widest uppercase text-gray-400 hidden lg:table-cell">Cached</th>
                      <th className="px-4 py-2.5" />
                    </tr>
                  </thead>
                  <tbody>
                    {intlRows.map((entry, i) => (
                      <tr
                        key={entry.gdx}
                        className="border-t border-gray-50 hover:bg-orange-50/30 transition-colors"
                        style={{ backgroundColor: i % 2 === 0 ? undefined : "#FAFAFA" }}
                      >
                        <td className="px-4 py-2.5">
                          <span className="font-mono text-sm font-bold" style={{ color: ORANGE }}>{entry.gdx}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="font-semibold text-gray-800 text-sm">{entry.lead_name ?? "—"}</span>
                        </td>
                        <td className="px-4 py-2.5 hidden md:table-cell">
                          <span
                            className="inline-block text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: "#dcfce7", color: "#15803d" }}
                          >
                            {slugLabel(entry.slug)}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 hidden lg:table-cell">
                          <span className="font-body text-xs text-gray-400">{fmtDate(entry.cached_at)}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <button
                            onClick={() => window.open(`/destination/${entry.slug}?gdx=${entry.gdx}`, "_blank")}
                            className="inline-flex items-center gap-1 font-body text-xs font-bold px-2.5 py-1.5 rounded-lg"
                            style={{ backgroundColor: `${ORANGE}18`, color: ORANGE }}
                          >
                            <ExternalLink size={10} /> Open
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-4 py-2 border-t border-gray-50 bg-gray-50">
                  <p className="font-body text-xs text-gray-400">{intlRows.length} international booking{intlRows.length !== 1 ? "s" : ""}</p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
