// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw, Database, CheckCircle, XCircle,
  SkipForward, Loader, BarChart2, ChevronDown, ChevronRight, Zap, Search, X, ExternalLink,
} from "lucide-react";
import { getCacheStats, bulkCacheAllBookings, getAllCachedEntries, getCachedGdx, getRecentInternationalBookings } from "../services/gdxCacheService";
import { READY_SLUGS } from "../config/readySlugs";

const ORANGE = "#FF9913";

// ── helpers ───────────────────────────────────────────────────────────────────

function lastName(fullName) {
  if (!fullName) return "—";
  const n = String(fullName).trim();
  return n.includes(",") ? n.split(",")[0].trim() : (n.split(/\s+/).pop() ?? n);
}

function groupByDestination(entries) {
  const map = {};
  entries.forEach((e) => {
    const key = e.slug || "unresolved";
    if (!map[key]) map[key] = { slug: key, destinationName: null, packages: {} };
    if (!map[key].destinationName && e.destination_name) map[key].destinationName = e.destination_name;
    const pkg = e.package_name || "—";
    if (!map[key].packages[pkg]) map[key].packages[pkg] = [];
    map[key].packages[pkg].push(e);
  });
  return Object.values(map)
    .sort((a, b) => (a.destinationName || a.slug).localeCompare(b.destinationName || b.slug))
    .map(({ slug, destinationName, packages }) => ({
      slug,
      destinationName,
      packages: Object.entries(packages)
        .sort((a, b) => b[1].length - a[1].length)
        .map(([pkg, rows]) => ({
          pkg,
          rows: rows.sort((a, b) => lastName(a.lead_name).localeCompare(lastName(b.lead_name))),
        })),
      total: Object.values(packages).reduce((s, r) => s + r.length, 0),
    }));
}

// ── sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, color, sub }) {
  return (
    <div className="rounded-xl p-4 flex flex-col gap-0.5 bg-white" style={{ border: "1px solid rgba(0,0,0,0.07)" }}>
      <p className="font-body text-xs font-bold tracking-widest uppercase" style={{ color: ORANGE }}>{label}</p>
      <p className="font-condensed font-black text-3xl" style={{ color: color ?? "#111" }}>{value ?? "—"}</p>
      {sub && <p className="font-body text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

function PackageSection({ pkg, rows, onOpenBooking }) {
  const [open, setOpen] = useState(false);

  function handleOpen(e) {
    onOpenBooking(e.slug, null, e.gdx);
  }

  return (
    <div className="border border-gray-100 rounded-xl mb-2 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          {open ? <ChevronDown size={13} className="text-gray-400 shrink-0" /> : <ChevronRight size={13} className="text-gray-400 shrink-0" />}
          <span className="font-body text-sm font-semibold text-gray-700">{pkg}</span>
        </div>
        <span className="font-body text-xs font-bold px-2 py-0.5 rounded-full shrink-0" style={{ backgroundColor: `${ORANGE}22`, color: ORANGE }}>
          {rows.length} GDX
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }}
            style={{ overflow: "hidden" }}
          >
            <table className="w-full text-xs font-body border-t border-gray-100">
              <thead>
                <tr className="bg-gray-50 text-gray-400">
                  <th className="text-left px-4 py-2 font-semibold">GDX</th>
                  <th className="text-left px-4 py-2 font-semibold">Last Name</th>
                  <th className="text-left px-4 py-2 font-semibold hidden sm:table-cell">Full Name</th>
                  <th className="px-2 py-2" />
                </tr>
              </thead>
              <tbody>
                {rows.map((e) => (
                  <tr key={e.gdx} className="border-t border-gray-50 hover:bg-orange-50/40">
                    <td className="px-4 py-1.5 font-bold text-gray-800">GDX-{e.gdx}</td>
                    <td className="px-4 py-1.5 font-bold" style={{ color: ORANGE }}>{lastName(e.lead_name)}</td>
                    <td className="px-4 py-1.5 text-gray-500 hidden sm:table-cell">{e.lead_name ?? "—"}</td>
                    <td className="px-2 py-1.5 text-right">
                      <button
                        onClick={() => handleOpen(e)}
                        title="Open on main page"
                        className="inline-flex items-center gap-1 font-body text-xs font-semibold px-2 py-1 rounded-lg transition-colors"
                        style={{ backgroundColor: `${ORANGE}18`, color: ORANGE }}
                      >
                        <ExternalLink size={11} /> Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DestinationBlock({ slug, destinationName, packages, total, defaultOpen, onOpenBooking }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const isReady = READY_SLUGS.has(slug);
  const title = destinationName || slug;
  return (
    <div className="rounded-xl mb-2 overflow-hidden bg-white" style={{ border: `1.5px solid ${isReady ? "#bbf7d0" : "#fef08a"}` }}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left">
        <div className="flex items-center gap-2 min-w-0">
          {open ? <ChevronDown size={15} className="text-gray-400 shrink-0" /> : <ChevronRight size={15} className="text-gray-400 shrink-0" />}
          <div className="min-w-0">
            <span className="font-condensed font-black text-lg text-gray-900">{title}</span>
            {isReady && (
              <span className="ml-2 font-body text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#dcfce7", color: "#15803d" }}>
                ✅ LIVE
              </span>
            )}
          </div>
        </div>
        <span className="font-body text-xs font-bold px-2 py-1 rounded-full shrink-0 ml-2"
          style={{ backgroundColor: isReady ? "#dcfce7" : "#fef9c3", color: isReady ? "#15803d" : "#854d0e" }}>
          {total} GDX
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
            className="px-4 pb-4 pt-1 border-t border-gray-100"
          >
            {packages.map(({ pkg, rows }) => (
              <PackageSection key={pkg} pkg={pkg} rows={rows} onOpenBooking={onOpenBooking} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── main ──────────────────────────────────────────────────────────────────────

export default function AdminCache() {
  const navigate = useNavigate();
  const [stats,      setStats]      = useState(null);
  const [masterList, setMasterList] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [running,    setRunning]    = useState(false);
  const [logs,       setLogs]       = useState([]);
  const [result,     setResult]     = useState(null);
  const [tab,        setTab]        = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [recentIntl, setRecentIntl] = useState([]);
  const [recentLoading, setRecentLoading] = useState(false);
  const logsEndRef = useRef(null);
  const seenGdxRef = useRef(new Set());

  useEffect(() => { load(); }, []);
  useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);

  async function loadTable() {
    try {
      const cached = await getAllCachedEntries();
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
    setRecentLoading(true);
    await Promise.all([
      loadTable(),
      loadStats(),
      getRecentInternationalBookings(50).then(setRecentIntl).catch(() => {}).finally(() => setRecentLoading(false)),
    ]);
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
      );
      setResult(res);
      // Always reload table after run — handles "all already cached" case
      // where onEntry never fired but data is in Supabase
      await Promise.all([loadTable(), loadStats()]);
    } catch (err) {
      setLogs((p) => [...p, `❌ Fatal error: ${err.message}`]);
    } finally {
      setRunning(false);
    }
  }

  function handleOpenBooking(slug, booking, gdx) {
    window.open(`/?gdx=${gdx}`, "_blank");
  }

  // Derived display lists
  const allGroups      = groupByDestination(masterList);
  const readyGroups    = allGroups.filter(g => READY_SLUGS.has(g.slug));
  const pendingGroups  = allGroups.filter(g => !READY_SLUGS.has(g.slug) && g.slug !== "unresolved");
  const unresolvedRows = masterList.filter(e => !e.slug);
  const newThisRun     = masterList.filter(e => e.isNew);
  const newGroups      = groupByDestination(newThisRun);

  const q = searchQuery.trim().toLowerCase();
  // Normalize: collapse dashes, en-dashes, em-dashes, and spaces into a single space
  // so "Beijing-Shanghai", "Beijing Shanghai", "beijing–shanghai" all match each other
  function norm(s) {
    return (s ?? "").toLowerCase().replace(/[-–—]+/g, " ").replace(/\s+/g, " ").trim();
  }
  const qNorm = norm(q);
  function textMatch(s) {
    const lo = (s ?? "").toLowerCase();
    const n  = norm(s);
    return lo.includes(q) || n.includes(qNorm);
  }
  function filterGroups(groups) {
    if (!q) return groups;
    return groups
      .map(g => {
        const slugMatch = textMatch(g.slug);
        const nameMatch = textMatch(g.destinationName);
        const matchedPkgs = g.packages.filter(
          ({ pkg, rows }) =>
            textMatch(pkg) ||
            rows.some(r => textMatch(r.lead_name) || String(r.gdx).includes(q))
        );
        if (slugMatch || nameMatch) return g;
        if (matchedPkgs.length > 0) return { ...g, packages: matchedPkgs };
        return null;
      })
      .filter(Boolean);
  }

  const filteredReady   = filterGroups(readyGroups);
  const filteredPending = filterGroups(pendingGroups);
  const filteredNew     = filterGroups(newGroups);

  const tabs = [
    { id: "all",        label: `📋 All (${masterList.filter(e => e.slug).length})` },
    { id: "recent",     label: `🌏 International (${recentIntl.length})` },
    { id: "live",       label: `🆕 New (${newThisRun.length})` },
    { id: "unresolved", label: `❌ Unresolved (${unresolvedRows.length})` },
  ];

  return (
    <div className="flex-1 min-w-0">

        {/* Header */}
        <div className="mb-6 flex items-start gap-3">
          <Database size={20} style={{ color: ORANGE }} className="mt-1 shrink-0" />
          <div>
            <h2 className="font-condensed font-black text-3xl text-gray-900 leading-tight">GDX Cache Manager</h2>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-5">

          {/* ── LEFT: Table ──────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Search bar */}
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by destination, slug, package, name, or GDX…"
                className="w-full font-body text-sm pl-8 pr-8 py-2.5 rounded-xl bg-white outline-none"
                style={{ border: `1.5px solid ${searchQuery ? ORANGE : "#e5e7eb"}`, color: "#111" }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className="font-body text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                  style={{
                    backgroundColor: tab === t.id ? ORANGE : "#FFF",
                    color: tab === t.id ? "#000" : "#555",
                    border: `1px solid ${tab === t.id ? ORANGE : "#ddd"}`,
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex items-center gap-2 text-gray-400 py-8">
                <Loader size={16} className="animate-spin" />
                <span className="font-body text-sm">Loading cached bookings…</span>
              </div>
            ) : (
              <>
                {/* ── ALL BOOKINGS ── */}
                {tab === "all" && (
                  masterList.filter(e => e.slug).length === 0
                    ? (
                      <div className="rounded-2xl p-8 text-center bg-white" style={{ border: "1px solid rgba(0,0,0,0.07)" }}>
                        <Database size={32} className="mx-auto mb-3 text-gray-300" />
                        <p className="font-body text-sm text-gray-500">No bookings yet. Click <strong>Fetch All from Fusioo</strong> to populate.</p>
                      </div>
                    ) : (
                      <>
                        {q && (filteredReady.length + filteredPending.length === 0) && (
                          <div className="rounded-xl p-6 text-center bg-white" style={{ border: "1px solid #e5e7eb" }}>
                            <Search size={24} className="mx-auto mb-2 text-gray-300" />
                            <p className="font-body text-sm text-gray-400">No bookings found for <strong>"{searchQuery}"</strong></p>
                          </div>
                        )}
                        {filteredReady.length > 0 && (
                          <div className="mb-4">
                            <p className="font-body text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#16a34a" }}>✅ Live — Briefing Page Ready</p>
                            {filteredReady.map(g => <DestinationBlock key={g.slug} {...g} defaultOpen={true} onOpenBooking={handleOpenBooking} />)}
                          </div>
                        )}
                        {filteredPending.length > 0 && (
                          <div>
                            <p className="font-body text-xs font-bold tracking-widest uppercase mb-2 mt-4" style={{ color: "#d97706" }}>⏭️ Pending — Destination Known</p>
                            {filteredPending.map(g => <DestinationBlock key={g.slug} {...g} defaultOpen={!!q} onOpenBooking={handleOpenBooking} />)}
                          </div>
                        )}
                      </>
                    )
                )}

                {/* ── INTERNATIONAL RECENT ── */}
                {tab === "recent" && (
                  recentLoading
                    ? <div className="flex items-center gap-2 text-gray-400 py-8"><Loader size={16} className="animate-spin" /><span className="font-body text-sm">Loading…</span></div>
                    : recentIntl.length === 0
                      ? <p className="font-body text-sm text-gray-400 py-4">No international bookings found in cache.</p>
                      : (
                        <div className="rounded-xl overflow-hidden bg-white" style={{ border: "1.5px solid #bbf7d0" }}>
                          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
                            <p className="font-body text-xs font-bold tracking-widest uppercase" style={{ color: "#16a34a" }}>🌏 International Bookings — Newest First</p>
                            <div className="flex items-center gap-2">
                              <span className="font-body text-xs text-gray-400">{recentIntl.length} total</span>
                              <button
                                onClick={() => { setRecentLoading(true); getRecentInternationalBookings(50).then(setRecentIntl).catch(() => {}).finally(() => setRecentLoading(false)); }}
                                disabled={recentLoading}
                                className="inline-flex items-center gap-1 font-body text-xs font-semibold px-2 py-1 rounded-lg disabled:opacity-50"
                                style={{ backgroundColor: `${ORANGE}18`, color: ORANGE }}
                              >
                                {recentLoading ? <Loader size={11} className="animate-spin" /> : <RefreshCw size={11} />}
                                Refresh
                              </button>
                            </div>
                          </div>
                          <table className="w-full text-xs font-body">
                            <thead>
                              <tr className="bg-gray-50 text-gray-400">
                                <th className="text-left px-4 py-2 font-semibold">#</th>
                                <th className="text-left px-4 py-2 font-semibold">GDX</th>
                                <th className="text-left px-4 py-2 font-semibold">Last Name</th>
                                <th className="text-left px-4 py-2 font-semibold hidden sm:table-cell">Full Name</th>
                                <th className="text-left px-4 py-2 font-semibold hidden md:table-cell">Destination</th>
                                <th className="px-2 py-2" />
                              </tr>
                            </thead>
                            <tbody>
                              {recentIntl.map((e, i) => (
                                <tr key={e.gdx} className="border-t border-gray-50 hover:bg-orange-50/40">
                                  <td className="px-4 py-1.5 text-gray-400">{i + 1}</td>
                                  <td className="px-4 py-1.5 font-bold text-gray-800">GDX-{e.gdx}</td>
                                  <td className="px-4 py-1.5 font-bold" style={{ color: ORANGE }}>{lastName(e.lead_name)}</td>
                                  <td className="px-4 py-1.5 text-gray-600 hidden sm:table-cell">{e.lead_name ?? "—"}</td>
                                  <td className="px-4 py-1.5 hidden md:table-cell">
                                    <span className="font-body text-xs px-2 py-0.5 rounded-full"
                                      style={{ backgroundColor: READY_SLUGS.has(e.slug) ? "#dcfce7" : "#fef9c3",
                                               color: READY_SLUGS.has(e.slug) ? "#15803d" : "#854d0e" }}>
                                      {e.slug}
                                    </span>
                                  </td>
                                  <td className="px-2 py-1.5 text-right">
                                    <button
                                      onClick={() => handleOpenBooking(e.slug, null, e.gdx)}
                                      title="Open briefing page"
                                      className="inline-flex items-center gap-1 font-body text-xs font-semibold px-2 py-1 rounded-lg"
                                      style={{ backgroundColor: `${ORANGE}18`, color: ORANGE }}
                                    >
                                      <ExternalLink size={11} /> Open
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )
                )}

                {/* ── NEW THIS RUN ── */}
                {tab === "live" && (
                  newThisRun.length === 0
                    ? (
                      <div className="rounded-2xl p-8 text-center bg-white" style={{ border: "1px solid rgba(0,0,0,0.07)" }}>
                        <Zap size={32} className="mx-auto mb-3 text-gray-300" />
                        <p className="font-body text-sm text-gray-500">
                          {result ? "No new bookings this run — all were already listed." : "Run a fetch to see newly discovered bookings here."}
                        </p>
                      </div>
                    )
                    : <>
                        <p className="font-body text-sm text-gray-500 mb-3">
                          <strong>{newThisRun.length} bookings</strong> discovered this run that weren't in the list before.
                        </p>
                        {filteredNew.map(g => <DestinationBlock key={g.slug} {...g} defaultOpen={true} onOpenBooking={handleOpenBooking} />)}
                      </>
                )}

                {/* ── UNRESOLVED ── */}
                {tab === "unresolved" && (
                  unresolvedRows.length === 0
                    ? <p className="font-body text-sm text-gray-400">No unresolved bookings.</p>
                    : (
                      <div className="rounded-xl overflow-hidden bg-white" style={{ border: "1.5px solid #fca5a5" }}>
                        <table className="w-full text-sm font-body">
                          <thead>
                            <tr className="bg-gray-50 text-gray-400 text-xs">
                              <th className="text-left px-4 py-2 font-semibold">GDX</th>
                              <th className="text-left px-4 py-2 font-semibold">Last Name</th>
                              <th className="text-left px-4 py-2 font-semibold hidden sm:table-cell">Full Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {unresolvedRows
                              .sort((a, b) => lastName(a.lead_name).localeCompare(lastName(b.lead_name)))
                              .map(e => (
                                <tr key={e.gdx} className="border-t border-gray-50">
                                  <td className="px-4 py-1.5 font-bold text-gray-800">GDX-{e.gdx}</td>
                                  <td className="px-4 py-1.5 font-bold" style={{ color: ORANGE }}>{lastName(e.lead_name)}</td>
                                  <td className="px-4 py-1.5 text-gray-500 hidden sm:table-cell">{e.lead_name ?? "—"}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    )
                )}
              </>
            )}
          </div>

          {/* ── RIGHT: Controls + Log ─────────────────────────────────────────── */}
          <div className="lg:w-80 xl:w-96 shrink-0 flex flex-col gap-4">

            {/* Buttons */}
            <div className="flex flex-col gap-2">
              <motion.button
                onClick={handleBulkCache} disabled={running}
                className="w-full inline-flex items-center justify-center gap-2 font-body font-bold text-sm px-5 py-3 rounded-xl disabled:opacity-50"
                style={{ backgroundColor: ORANGE, color: "#000" }}
                whileHover={{ scale: running ? 1 : 1.02 }} whileTap={{ scale: 0.97 }}
              >
                {running ? <Loader size={15} className="animate-spin" /> : <RefreshCw size={15} />}
                {running ? "Fetching from Fusioo…" : "Fetch All from Fusioo"}
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
                <StatCard label="Displayed"     value={masterList.filter(e => e.slug).length} color="#16a34a" />
                <StatCard label="Unresolved"    value={unresolvedRows.length}  color="#d97706" />
              </div>
            )}

            {/* Result summary */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-4 grid grid-cols-2 gap-3"
                style={{ backgroundColor: "#FFF5EC", border: `1px solid ${ORANGE}33` }}
              >
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
              </motion.div>
            )}

            {/* Live log */}
            <AnimatePresence>
              {logs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl overflow-hidden flex-1"
                  style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                >
                  <div className="px-3 py-2 flex items-center gap-2" style={{ backgroundColor: "#1A1A1A" }}>
                    <div className={`w-2 h-2 rounded-full ${running ? "bg-green-400 animate-pulse" : "bg-gray-500"}`} />
                    <span className="font-body text-xs text-gray-400">{running ? "Live" : "Done"}</span>
                    <span className="font-body text-xs text-gray-600 ml-auto">{logs.length} lines</span>
                  </div>
                  <div
                    className="p-3 overflow-y-auto font-mono text-xs space-y-0.5"
                    style={{ backgroundColor: "#111", maxHeight: 380, color: "#d4d4d4" }}
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
        </div>

    </div>
  );
}
