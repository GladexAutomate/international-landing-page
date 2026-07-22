// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, Trash2, FileText, Loader, Search, X, CheckCircle, ExternalLink,
} from "lucide-react";
import { getAllCachedEntries } from "../services/gdxCacheService";
import { uploadVoucher, getAllVouchers, deleteVoucher } from "../services/voucherService";
import { READY_SLUGS } from "../config/readySlugs";

const ORANGE = "#FF9913";

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

export default function AdminVouchers() {
  const [entries,   setEntries]   = useState([]); // international only
  const [vouchers,  setVouchers]  = useState({}); // { gdx: voucherRow }
  const [loading,   setLoading]   = useState(true);
  const [uploading, setUploading] = useState(null);
  const [deleting,  setDeleting]  = useState(null);
  const [search,    setSearch]    = useState("");
  const [toast,     setToast]     = useState(null);
  const fileInputRef  = useRef(null);
  const pendingGdxRef = useRef(null);
  const toastTimer    = useRef(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const cached = await getAllCachedEntries(Array.from(READY_SLUGS));
      const sorted = cached
        .sort((a, b) => Number(b.gdx) - Number(a.gdx));
      setEntries(sorted);
    } catch (err) {
      showToast("Failed to load bookings: " + err.message, false);
    } finally {
      setLoading(false);
    }

    try {
      const voucherList = await getAllVouchers();
      const map = {};
      voucherList.forEach(v => { map[String(v.gdx)] = v; });
      setVouchers(map);
    } catch (err) {
      showToast("Failed to load vouchers: " + err.message, false);
    }
  }

  function showToast(msg, ok = true) {
    setToast({ msg, ok });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }

  function handleUploadClick(gdx) {
    pendingGdxRef.current = gdx;
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const gdx = pendingGdxRef.current;
    setUploading(String(gdx));
    try {
      const uploadedBy = sessionStorage.getItem("gdx_admin_auth");
      const url = await uploadVoucher(gdx, file, uploadedBy);
      setVouchers(prev => ({
        ...prev,
        [String(gdx)]: {
          gdx:         String(gdx),
          voucher_url: url,
          file_name:   file.name,
        },
      }));
      showToast(`Voucher uploaded for GDX ${gdx}`);
    } catch (err) {
      showToast("Upload failed: " + err.message, false);
    } finally {
      setUploading(null);
    }
  }

  async function handleDelete(gdx) {
    if (!window.confirm(`Remove voucher for GDX ${gdx}?`)) return;
    setDeleting(String(gdx));
    try {
      await deleteVoucher(gdx);
      setVouchers(prev => {
        const copy = { ...prev };
        delete copy[String(gdx)];
        return copy;
      });
      showToast(`Voucher removed for GDX ${gdx}`);
    } catch (err) {
      showToast("Delete failed: " + err.message, false);
    } finally {
      setDeleting(null);
    }
  }

  const q = search.trim().toLowerCase();
  const filtered = entries.filter(e => {
    if (!q) return true;
    return String(e.gdx).includes(q) || (e.lead_name ?? "").toLowerCase().includes(q);
  });

  const uploadedCount = Object.keys(vouchers).length;

  return (
    <div className="flex-1 min-w-0">

      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <FileText size={20} style={{ color: ORANGE }} className="mt-1 shrink-0" />
        <div>
          <h2 className="font-condensed font-black text-3xl text-gray-900 leading-tight">Travel Vouchers</h2>
          <p className="font-body text-sm text-gray-400 mt-0.5">
            Upload a PDF voucher per client — automatically appears on their landing page.
          </p>
        </div>
      </div>

      {/* Summary bar */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2 font-body text-sm text-gray-500">
          <span className="font-bold text-gray-800">{entries.length}</span> international bookings
        </div>
        <div className="flex items-center gap-1.5 font-body text-sm" style={{ color: "#16a34a" }}>
          <CheckCircle size={13} />
          <span className="font-bold">{uploadedCount}</span> vouchers uploaded
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
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

      {/* Table */}
      {loading ? (
        <div className="flex items-center gap-2 text-gray-400 py-10">
          <Loader size={16} className="animate-spin" />
          <span className="font-body text-sm">Loading bookings…</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl p-8 text-center bg-white" style={{ border: "1px solid #e5e7eb" }}>
          <Search size={28} className="mx-auto mb-2 text-gray-200" />
          <p className="font-body text-sm text-gray-400">No bookings found{q ? ` for "${search}"` : ""}.</p>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden bg-white" style={{ border: "1.5px solid #e5e7eb" }}>
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase text-gray-400">GDX</th>
                <th className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase text-gray-400">Client Name</th>
                <th className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase text-gray-400 hidden md:table-cell">Destination</th>
                <th className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase text-gray-400 hidden lg:table-cell">Voucher File</th>
                <th className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase text-gray-400">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry, i) => {
                const gdxKey      = String(entry.gdx);
                const voucher     = vouchers[gdxKey];
                const isUploading = uploading === gdxKey;
                const isDeleting  = deleting  === gdxKey;

                return (
                  <tr
                    key={gdxKey}
                    className="border-t border-gray-50 hover:bg-orange-50/30 transition-colors"
                    style={{ backgroundColor: i % 2 === 0 ? undefined : "#FAFAFA" }}
                  >
                    {/* GDX */}
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm font-bold" style={{ color: ORANGE }}>
                        {entry.gdx}
                      </span>
                    </td>

                    {/* Full Name */}
                    <td className="px-4 py-3">
                      <span className="font-semibold text-gray-800 text-sm">
                        {entry.lead_name ?? "—"}
                      </span>
                    </td>

                    {/* Destination */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span
                        className="inline-block text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "#fff3e0", color: "#c05400" }}
                      >
                        {slugLabel(entry.slug)}
                      </span>
                    </td>

                    {/* Voucher file link */}
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {voucher ? (
                        <a
                          href={voucher.voucher_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-orange-500 transition-colors"
                        >
                          <FileText size={11} />
                          {voucher.file_name ?? "voucher"}
                          <ExternalLink size={10} className="opacity-50" />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      {voucher ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "#dcfce7", color: "#15803d" }}>
                          <CheckCircle size={10} /> Uploaded
                        </span>
                      ) : (
                        <span className="text-xs text-gray-300 font-medium">No voucher</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 justify-end">
                        <button
                          onClick={() => handleUploadClick(gdxKey)}
                          disabled={isUploading || isDeleting}
                          className="inline-flex items-center gap-1 font-body text-xs font-semibold px-2.5 py-1.5 rounded-lg disabled:opacity-40 transition-colors"
                          style={{ backgroundColor: `${ORANGE}18`, color: ORANGE }}
                          title={voucher ? "Replace voucher" : "Upload voucher"}
                        >
                          {isUploading
                            ? <Loader size={11} className="animate-spin" />
                            : <Upload size={11} />
                          }
                          {voucher ? "Replace" : "Upload"}
                        </button>

                        {voucher && (
                          <button
                            onClick={() => handleDelete(gdxKey)}
                            disabled={isUploading || isDeleting}
                            className="inline-flex items-center gap-1 font-body text-xs font-semibold px-2 py-1.5 rounded-lg disabled:opacity-40 transition-colors hover:bg-red-50"
                            style={{ color: "#dc2626" }}
                            title="Remove voucher"
                          >
                            {isDeleting
                              ? <Loader size={11} className="animate-spin" />
                              : <Trash2 size={11} />
                            }
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="px-4 py-2.5 border-t border-gray-50 bg-gray-50">
            <p className="font-body text-xs text-gray-400">
              {filtered.length} booking{filtered.length !== 1 ? "s" : ""}
              {q ? ` matching "${search}"` : ""}
            </p>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 font-body text-sm font-semibold px-5 py-3 rounded-xl shadow-lg"
            style={{
              backgroundColor: toast.ok ? "#111" : "#dc2626",
              color: "#fff",
              whiteSpace: "nowrap",
            }}
          >
            {toast.ok ? "✅" : "❌"} {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
