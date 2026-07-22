// @ts-nocheck
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, Trash2, ChevronDown, ChevronRight, Loader, User } from "lucide-react";

// ── Group Blocking Reference ───────────────────────────────────────────────────
// blockBy + srp   = management policy from Product Development proposal
// slugs           = used to find travel dates in enriched_data (gdx_cache)
// destKeywords    = matched against actual Fusioo destination text in bookings_6fbdd6b2
//                   for accurate counts + Book Rush (covers ALL bookings, not just cached ones)
const INTL_BLOCKING = [
  {
    dest: "🇻🇳 Da Nang, Vietnam",
    slugs: ["danang-vietnam","danang-6d4n-vietjet","danang-5d3n-vietjet","danang-4d2n-bamboo",
            "danang-4d3n-airasia","danang-4d3n-cebu-pacific","danang-5d3n-bamboo","danang-6d4n-vietjet-standard"],
    destKeywords: ["da nang","danang","vietnam"],
    refPeak: "Feb – May", blockBy: "June",        srp: "₱33,800",
  },
  {
    dest: "🇻🇳 Hanoi – Sapa",
    slugs: ["hanoi-sapa-airasia"],
    destKeywords: ["hanoi","sapa"],
    refPeak: "Sep–Oct, Apr",    blockBy: "Feb / Oct",   srp: "₱34,600",
  },
  {
    dest: "🇭🇰 Hong Kong",
    slugs: ["hongkong","hongkong-cebu-pacific","hongkong-shenzhen-zhuhai"],
    destKeywords: ["hong kong","hongkong"],
    refPeak: "Oct – Dec",        blockBy: "April",       srp: "₱26,500",
  },
  {
    dest: "🇨🇳 Beijing – Shanghai",
    slugs: ["beijing-shanghai-collective","beijing-shanghai-pal","beijing-shanghai-cebu-pacific","beijing-shanghai"],
    destKeywords: ["beijing","shanghai"],
    refPeak: "Mar–May, Sep–Nov", blockBy: "Oct / March", srp: "—",
  },
  {
    dest: "🇹🇼 Taipei, Taiwan",
    slugs: ["taipei"],
    destKeywords: ["taipei","taiwan"],
    refPeak: "Oct – Apr",        blockBy: "February",    srp: "₱31,800",
  },
  {
    dest: "🇸🇬 Singapore",
    slugs: ["singapore"],
    destKeywords: ["singapore"],
    refPeak: "Dec – Feb",        blockBy: "June",        srp: "—",
  },
  {
    dest: "🇹🇭 Thailand / Pattaya",
    slugs: [],
    destKeywords: ["thailand","pattaya","bangkok"],
    refPeak: "Nov – May",        blockBy: "March",       srp: "₱29,500",
  },
  {
    dest: "🇯🇵 Japan Tokyo / Osaka",
    slugs: [],
    destKeywords: ["japan","tokyo","osaka"],
    refPeak: "Mar–Apr, Oct–Dec", blockBy: "Jul / April", srp: "₱64,000",
  },
  {
    dest: "🇰🇷 South Korea",
    slugs: [],
    destKeywords: ["korea","seoul","busan"],
    refPeak: "Mar–May, Oct–Dec", blockBy: "Jul / April", srp: "₱33,500",
  },
];
const DMSTC_BLOCKING = [
  {
    dest: "🏖️ Siargao",
    slugs: ["siargao"],
    destKeywords: ["siargao"],
    refPeak: "Mar – Oct",        blockBy: "Jul / April", srp: "₱28,980",
  },
  {
    dest: "🌄 Batanes",
    slugs: ["batanes"],
    destKeywords: ["batanes"],
    refPeak: "Mar – Jun",        blockBy: "Jul / April", srp: "₱29,600",
  },
  {
    dest: "🏝️ Boracay",
    slugs: ["boracay"],
    destKeywords: ["boracay"],
    refPeak: "Mar – Jun",        blockBy: "July",        srp: "₱16,200",
  },
  {
    dest: "🌊 El Nido / Palawan",
    slugs: ["el-nido","palawan","el nido"],
    destKeywords: ["el nido","elnido","palawan"],
    refPeak: "Oct – May",        blockBy: "March",       srp: "₱16,600",
  },
  {
    dest: "✈️ Cebu",
    slugs: ["cebu"],
    destKeywords: ["cebu"],
    refPeak: "Dec – May",        blockBy: "June",        srp: "—",
  },
  {
    dest: "🌴 Coron",
    slugs: ["coron"],
    destKeywords: ["coron"],
    refPeak: "Nov – May",        blockBy: "March",       srp: "—",
  },
];
import { getReviewStats, addReview, deleteReview, lookupLeadNameByGdx, setReviewVisibility } from "../services/reviewsService";
import { getBlockingIntelStats } from "../services/gdxCacheService";
import { destinations } from "../data/destinations";

const ORANGE = "#FF9913";

// Use actual destination names so the dropdown value matches dest.name on the briefing page
const DESTINATIONS = [...new Set(destinations.map(d => d.name))].sort();

function Stars({ rating, size = 14 }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={size} fill={s <= rating ? ORANGE : "none"} stroke={s <= rating ? ORANGE : "#ccc"} />
      ))}
    </span>
  );
}

function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <span className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} type="button" onClick={() => onChange(s)} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}>
          <Star size={22} fill={s <= (hover || value) ? ORANGE : "none"} stroke={s <= (hover || value) ? ORANGE : "#ccc"} />
        </button>
      ))}
    </span>
  );
}

function AgentCard({ name, total, avgRating, reviews, onDelete, onDeleteAll, onToggleHidden }) {
  const [open, setOpen]           = useState(name === "Unassigned");
  const [confirmAll, setConfirmAll] = useState(false);
  const isUnassigned = name === "Unassigned";
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="bg-white rounded-2xl overflow-hidden mb-3"
      style={{ border: `1px solid ${isUnassigned ? "#fca5a5" : "rgba(0,0,0,0.07)"}` }}>

      <div className="flex items-center gap-4 px-5 py-4">
        {/* Clickable area */}
        <button onClick={() => setOpen(o => !o)} className="flex items-center gap-4 flex-1 min-w-0 text-left hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-condensed font-black text-sm text-white"
            style={{ backgroundColor: isUnassigned ? "#9CA3AF" : ORANGE }}>{initials}</div>
          <div className="flex-1 min-w-0">
            <p className="font-condensed font-black text-lg leading-tight" style={{ color: isUnassigned ? "#9CA3AF" : "#111" }}>
              {name}
              {isUnassigned && <span className="font-body text-xs font-normal ml-2 text-gray-400">— no agent assigned</span>}
            </p>
            <div className="flex items-center gap-3 mt-0.5">
              {avgRating && <Stars rating={Math.round(avgRating)} size={12} />}
              {avgRating && <span className="font-body text-xs text-gray-500">{avgRating} avg</span>}
            </div>
          </div>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-body text-xs font-bold px-2 py-1 rounded-full"
            style={{ backgroundColor: isUnassigned ? "#FEE2E2" : `${ORANGE}22`, color: isUnassigned ? "#dc2626" : ORANGE }}>
            {total} review{total !== 1 ? "s" : ""}
          </span>

          {/* Delete All — only on Unassigned */}
          {isUnassigned && onDeleteAll && !confirmAll && (
            <button onClick={() => setConfirmAll(true)}
              className="font-body text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
              style={{ backgroundColor: "#FEE2E2", color: "#dc2626" }}>
              Delete All
            </button>
          )}
          {isUnassigned && confirmAll && (
            <div className="flex gap-1.5 items-center">
              <span className="font-body text-xs text-gray-500">Sure?</span>
              <button onClick={async () => { setConfirmAll(false); await onDeleteAll(reviews.map(r => r.id)); }}
                className="font-body text-xs font-bold px-3 py-1.5 rounded-lg bg-red-500 text-white">
                Yes, delete {total}
              </button>
              <button onClick={() => setConfirmAll(false)}
                className="font-body text-xs px-2 py-1.5 rounded-lg bg-gray-100 text-gray-600">
                Cancel
              </button>
            </div>
          )}

          <button onClick={() => setOpen(o => !o)} className="text-gray-400">
            {open ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
            <div className="px-5 pb-5 pt-2 border-t border-gray-100 space-y-3">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} onDelete={onDelete} onToggleHidden={onToggleHidden} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function clientInitials(name) {
  if (!name) return "?";
  const parts = name.replace(",", "").trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : parts[0].slice(0, 2).toUpperCase();
}

function ReviewCard({ review, onDelete, onToggleHidden }) {
  const [confirming, setConfirming] = useState(false);
  const [toggling, setToggling] = useState(false);
  const hasName = review.lead_name?.trim();
  const hasText = review.comment?.trim() && review.comment !== "—";
  const lowRating = review.rating && review.rating <= 3;
  const isLive = review.is_hidden === false && review.needs_approval === false;

  async function handleToggle() {
    setToggling(true);
    try { await onToggleHidden(review.id, !review.is_hidden); }
    finally { setToggling(false); }
  }

  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: "#FAFAFA", border: `1px solid ${lowRating ? "#fca5a5" : "#eee"}` }}>
      <div className="flex items-start gap-3">

        {/* Avatar circle with initials */}
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-condensed font-black text-xs text-white"
          style={{ backgroundColor: hasName ? ORANGE : "#D1D5DB" }}>
          {clientInitials(review.lead_name)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + badges row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-body font-black text-sm text-gray-900">
              {hasName ? review.lead_name : <span className="text-gray-400 font-normal italic">No name</span>}
            </span>
            {review.gdx_reference && (
              <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: "#F3F4F6", color: "#6B7280" }}>
                GDX-{review.gdx_reference}
              </span>
            )}
            {review.destination && (
              <span className="font-body text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: `${ORANGE}18`, color: ORANGE }}>
                {review.destination}
              </span>
            )}
            {lowRating && (
              <span className="font-body text-xs px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor: "#fef2f2", color: "#dc2626" }}>
                Admin only
              </span>
            )}
            <span className="font-body text-xs px-1.5 py-0.5 rounded font-bold"
              style={{ backgroundColor: isLive ? "#dcfce7" : "#f3f4f6", color: isLive ? "#15803d" : "#6b7280" }}>
              {isLive ? "Live on site" : "Hidden"}
            </span>
          </div>

          {/* Stars + date */}
          <div className="flex items-center gap-3 mt-1">
            {review.rating && <Stars rating={review.rating} size={12} />}
            <span className="font-body text-xs text-gray-400">
              {new Date(review.created_at).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" })}
            </span>
          </div>

          {/* Review text */}
          {hasText && (
            <p className="font-body text-sm text-gray-600 mt-2 leading-relaxed italic">"{review.comment}"</p>
          )}
          {!hasText && (
            <p className="font-body text-xs text-gray-300 mt-1 italic">No review text</p>
          )}

          {/* Photos */}
          {Array.isArray(review.photos) && review.photos.length > 0 && (
            <div className="flex gap-1.5 mt-2">
              {review.photos.map((url, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                  <img src={url} alt="" className="w-12 h-12 object-cover rounded-lg" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="shrink-0 ml-auto flex items-center gap-1">
          {onToggleHidden && (
            <button
              onClick={handleToggle}
              disabled={toggling}
              className="font-body text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-50"
              style={{ backgroundColor: isLive ? "#fef2f2" : "#dcfce7", color: isLive ? "#dc2626" : "#15803d" }}
            >
              {isLive ? "Hide" : "Approve"}
            </button>
          )}
          {onDelete && (
            !confirming ? (
              <button onClick={() => setConfirming(true)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
            ) : (
              <div className="flex gap-1">
                <button onClick={() => { onDelete(review.id); setConfirming(false); }} className="font-body text-xs px-2 py-1 rounded bg-red-500 text-white">Delete</button>
                <button onClick={() => setConfirming(false)} className="font-body text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">Cancel</button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

const EMPTY_FORM = { gdx: "", lead_name: "", destination: "", agent_name: "", review_text: "", rating: 0 };

export default function AdminReviews() {
  const [stats,       setStats]       = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [saving,      setSaving]      = useState(false);
  const [lookingUp,   setLookingUp]   = useState(false);
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [errors,      setErrors]      = useState({});
  const [tab,         setTab]         = useState("agents"); // "agents" | "add"

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try { setStats(await getReviewStats()); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  async function handleGdxBlur() {
    const gdx = form.gdx.trim();
    if (!gdx || form.lead_name.trim()) return; // don't overwrite if already filled
    setLookingUp(true);
    try {
      const name = await lookupLeadNameByGdx(gdx);
      if (name) setForm(p => ({ ...p, lead_name: name }));
    } catch (_) {}
    finally { setLookingUp(false); }
  }

  function validate() {
    const e = {};
    if (!form.lead_name.trim()) e.lead_name = "Required";
    if (!form.agent_name.trim()) e.agent_name = "Required";
    if (!form.review_text.trim()) e.review_text = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await addReview({
        gdx_reference: form.gdx.trim()        || null,
        lead_name:     form.lead_name.trim()   || null,
        destination:   form.destination.trim() || null,
        agent_name:    form.agent_name.trim(),
        comment:       form.review_text.trim(),
        rating:        form.rating || null,
        // Manually-logged reviews (verbal/emailed) are approved by the admin entering them.
        is_hidden:      false,
        needs_approval: false,
      });
      setForm(EMPTY_FORM);
      setErrors({});
      setTab("agents");
      await load();
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteReview(id);
      await load();
    } catch (err) { console.error(err); }
  }

  async function handleToggleHidden(id, isHidden) {
    try {
      await setReviewVisibility(id, { isHidden, needsApproval: false });
      await load();
    } catch (err) { console.error(err); }
  }

  async function handleDeleteAll(ids) {
    try {
      await Promise.all(ids.map(id => deleteReview(id)));
      await load();
    } catch (err) { console.error(err); }
  }

  const Field = ({ label, name, type = "text", required, as, children, ...rest }) => (
    <div>
      <label className="block font-body text-xs font-bold mb-1" style={{ color: errors[name] ? "#dc2626" : "#555" }}>
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {as === "select" ? (
        <select
          value={form[name]} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
          className="w-full font-body text-sm rounded-xl px-3 py-2.5 outline-none"
          style={{ border: `1.5px solid ${errors[name] ? "#dc2626" : "#ddd"}`, backgroundColor: "#FAFAFA" }}
          {...rest}
        >
          <option value="">Select destination…</option>
          {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      ) : as === "textarea" ? (
        <textarea
          value={form[name]} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
          rows={4}
          className="w-full font-body text-sm rounded-xl px-3 py-2.5 outline-none resize-none"
          style={{ border: `1.5px solid ${errors[name] ? "#dc2626" : "#ddd"}`, backgroundColor: "#FAFAFA" }}
          {...rest}
        />
      ) : (
        <input
          type={type} value={form[name]} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
          className="w-full font-body text-sm rounded-xl px-3 py-2.5 outline-none"
          style={{ border: `1.5px solid ${errors[name] ? "#dc2626" : "#ddd"}`, backgroundColor: "#FAFAFA" }}
          {...rest}
        />
      )}
      {errors[name] && <p className="font-body text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="flex-1 min-w-0">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-condensed font-black text-3xl text-gray-900">Client Reviews</h2>
          <p className="font-body text-sm text-gray-500 mt-0.5">
            Store client feedback and recognize agents who delivered great service.
          </p>
        </div>
        {stats && (
          <div className="flex gap-3">
            <div className="text-center">
              <p className="font-condensed font-black text-3xl" style={{ color: ORANGE }}>{stats.total}</p>
              <p className="font-body text-xs text-gray-400">Total Reviews</p>
            </div>
            <div className="text-center">
              <p className="font-condensed font-black text-3xl text-gray-800">{stats.byAgent.length}</p>
              <p className="font-body text-xs text-gray-400">Agents</p>
            </div>
          </div>
        )}
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2 mb-5">
        {[
          { id: "agents", label: `👤 By Agent${stats ? ` (${stats.byAgent.length})` : ""}` },
          { id: "add",    label: "＋ Add Review" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="font-body text-sm font-semibold px-4 py-2 rounded-xl transition-all"
            style={{ backgroundColor: tab === t.id ? ORANGE : "#FFF", color: tab === t.id ? "#000" : "#555", border: `1px solid ${tab === t.id ? ORANGE : "#ddd"}` }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── By Agent ── */}
      {tab === "agents" && (
        loading
          ? <div className="flex items-center gap-2 text-gray-400 py-8"><Loader size={16} className="animate-spin" /><span className="font-body text-sm">Loading reviews…</span></div>
          : !stats?.byAgent.length
            ? (
              <div className="bg-white rounded-2xl p-10 text-center" style={{ border: "1px solid rgba(0,0,0,0.07)" }}>
                <User size={36} className="mx-auto mb-3 text-gray-200" />
                <p className="font-body text-sm text-gray-400">No reviews yet. Add the first one!</p>
                <button onClick={() => setTab("add")} className="mt-4 font-body text-sm font-bold px-5 py-2 rounded-xl text-white" style={{ backgroundColor: ORANGE }}>
                  Add Review
                </button>
              </div>
            )
            : stats.byAgent.map(agent => (
                <AgentCard key={agent.name} {...agent} onDelete={handleDelete} onDeleteAll={handleDeleteAll} onToggleHidden={handleToggleHidden} />
              ))
      )}

      {/* ── Add Review ── */}
      {tab === "add" && (
        <div className="bg-white rounded-2xl p-6 max-w-xl" style={{ border: "1px solid rgba(0,0,0,0.07)" }}>
          <h3 className="font-condensed font-black text-xl text-gray-900 mb-5">New Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="GDX Number" name="gdx" placeholder="e.g. 12345" onBlur={handleGdxBlur} />
              <div>
                <label className="block font-body text-xs font-bold mb-1" style={{ color: errors.lead_name ? "#dc2626" : "#555" }}>
                  Client Name<span className="text-red-500 ml-0.5">*</span>
                  {lookingUp && <span className="font-normal text-gray-400 ml-1">(looking up…)</span>}
                </label>
                <input
                  value={form.lead_name}
                  onChange={e => setForm(p => ({ ...p, lead_name: e.target.value }))}
                  placeholder="DELA CRUZ, MARIA"
                  className="w-full font-body text-sm rounded-xl px-3 py-2.5 outline-none"
                  style={{ border: `1.5px solid ${errors.lead_name ? "#dc2626" : "#ddd"}`, backgroundColor: "#FAFAFA" }}
                />
                {errors.lead_name && <p className="font-body text-xs text-red-500 mt-1">{errors.lead_name}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Destination" name="destination" as="select" />
              <div>
                <label className="block font-body text-xs font-bold mb-1" style={{ color: "#555" }}>Rating</label>
                <div className="flex items-center gap-2 h-10">
                  <StarPicker value={form.rating} onChange={v => setForm(p => ({ ...p, rating: v }))} />
                  {form.rating > 0 && (
                    <button type="button" onClick={() => setForm(p => ({ ...p, rating: 0 }))} className="font-body text-xs text-gray-400 hover:text-gray-600">clear</button>
                  )}
                </div>
              </div>
            </div>
            <Field label="Agent Name" name="agent_name" required placeholder="Full name of the agent" />
            <Field label="Client Review" name="review_text" required as="textarea" placeholder="Write the client's review here…" />
            {errors.submit && <p className="font-body text-xs text-red-500">{errors.submit}</p>}
            <div className="flex gap-3 pt-1">
              <motion.button
                type="submit" disabled={saving}
                className="inline-flex items-center gap-2 font-body font-bold text-sm px-6 py-3 rounded-xl disabled:opacity-50"
                style={{ backgroundColor: ORANGE, color: "#000" }}
                whileHover={{ scale: saving ? 1 : 1.02 }} whileTap={{ scale: 0.97 }}
              >
                {saving ? <Loader size={14} className="animate-spin" /> : <Plus size={14} />}
                {saving ? "Saving…" : "Save Review"}
              </motion.button>
              <button type="button" onClick={() => { setForm(EMPTY_FORM); setErrors({}); }} className="font-body text-sm text-gray-400 hover:text-gray-600">
                Clear
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Group Blocking Reference ── */}
      <BlockingMatrix />
    </div>
  );
}

// ── Blocking Matrix (live Fusioo cache + policy reference) ────────────────────

function mergeStats(rows, stats) {
  // stats = { bySlug: Map, byDest: Map } from getBlockingIntelStats()
  const { bySlug, byDest } = stats || {};

  return rows.map(r => {
    let count = 0;
    let travelPeak = null;
    let bookingPeak = null;
    let hasLiveTravelDates = false;
    let hasLiveBookingDates = false;

    // ── Count + Book Rush from actual Fusioo destination text ──────────────
    // byDest is keyed by the lowercase destination string stored in bookings_6fbdd6b2.
    // We iterate all entries in byDest and sum those whose key INCLUDES any of our keywords.
    // This is accurate for ALL bookings regardless of cache/slug status.
    if (byDest) {
      const keywords = r.destKeywords || [];
      for (const [destKey, s] of byDest) {
        if (keywords.some(kw => destKey.includes(kw))) {
          count += s.count;
          if (s.hasLiveBookingDates && s.bookingPeak) {
            bookingPeak = s.bookingPeak;
            hasLiveBookingDates = true;
          }
        }
      }
    }

    // ── Travel Peak from enriched_data departure dates (slug-based) ────────
    // Only enriched/cached bookings have departure dates, so this stays slug-based.
    if (bySlug) {
      for (const slug of (r.slugs || [])) {
        const s = bySlug.get(slug);
        if (s?.hasLiveTravelDates && s.travelPeak) {
          travelPeak = s.travelPeak;
          hasLiveTravelDates = true;
        }
      }
    }

    return { ...r, count, travelPeak, bookingPeak, hasLiveTravelDates, hasLiveBookingDates };
  });
}

function BlockingTable({ rows, slugStats }) {
  const merged = mergeStats(rows, slugStats);
  const maxCount = Math.max(...merged.map(r => r.count), 1);

  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid #e5e7eb" }}>
      <table className="w-full text-xs font-body">
        <thead>
          <tr className="bg-gray-50 text-gray-400">
            <th className="text-left px-4 py-2.5 font-semibold">Destination</th>
            <th className="text-left px-4 py-2.5 font-semibold whitespace-nowrap">Bookings</th>
            <th className="text-left px-4 py-2.5 font-semibold whitespace-nowrap">Travel Peak</th>
            <th className="text-left px-4 py-2.5 font-semibold whitespace-nowrap">Book Rush</th>
            <th className="text-left px-4 py-2.5 font-semibold whitespace-nowrap">Block By</th>
            <th className="text-left px-4 py-2.5 font-semibold whitespace-nowrap">SRP Avg</th>
          </tr>
        </thead>
        <tbody>
          {merged.map((r, i) => {
            const pct = r.count / maxCount;
            const barColor = pct >= 0.55 ? "#ef4444" : pct >= 0.2 ? "#f59e0b" : "#d1d5db";

            // Travel Peak: live travel dates → ref from PDF
            const travelDisplay = r.hasLiveTravelDates ? r.travelPeak : r.refPeak;
            const travelBadge   = r.hasLiveTravelDates ? (
              <span className="ml-1 font-body text-xs px-1 py-0.5 rounded font-bold" style={{ backgroundColor: "#dcfce7", color: "#15803d" }}>live</span>
            ) : r.count > 0 ? (
              <span className="ml-1 font-body text-xs text-gray-300">ref</span>
            ) : null;

            // Book Rush: when clients tend to actually purchase this destination
            const bookDisplay = r.hasLiveBookingDates ? r.bookingPeak : null;

            return (
              <tr key={i} className="border-t border-gray-50 hover:bg-orange-50/30 transition-colors">
                <td className="px-4 py-2.5 font-semibold text-gray-800 whitespace-nowrap">{r.dest}</td>
                <td className="px-4 py-2.5">
                  {r.count > 0 ? (
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-gray-100 shrink-0">
                        <div className="h-1.5 rounded-full" style={{ width: `${Math.max(pct * 100, 4)}%`, backgroundColor: barColor }} />
                      </div>
                      <span className="font-bold text-gray-800">{r.count}</span>
                    </div>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <span className="text-gray-700">{travelDisplay || <span className="text-gray-300">—</span>}</span>
                  {travelBadge}
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  {bookDisplay ? (
                    <>
                      <span className="text-gray-700">{bookDisplay}</span>
                      <span className="ml-1 font-body text-xs px-1 py-0.5 rounded font-bold" style={{ backgroundColor: "#dbeafe", color: "#1d4ed8" }}>live</span>
                    </>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>
                <td className="px-4 py-2.5 font-bold whitespace-nowrap" style={{ color: "#d97706" }}>{r.blockBy}</td>
                <td className="px-4 py-2.5 font-bold text-gray-800 whitespace-nowrap">{r.srp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const MONTH_LABELS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTH_SHORT  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function MonthlyReport({ byMonth }) {
  if (!byMonth) return null;

  // Compute the global max count across all months for bar scaling
  const globalMax = Math.max(
    1,
    ...byMonth.flatMap(rows => rows.slice(0, 5).map(r => r.count))
  );

  // Only show months that have any bookings
  const activeMonths = byMonth
    .map((rows, idx) => ({ idx, rows }))
    .filter(m => m.rows.length > 0);

  if (activeMonths.length === 0) return null;

  // Total bookings across all months
  const grandTotal = byMonth.reduce((sum, rows) => sum + rows.reduce((s, r) => s + r.count, 0), 0);

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-condensed font-black text-base text-gray-900">📅 Monthly Booking Report</p>
          <p className="font-body text-xs text-gray-400">Current year only · from Fusioo enriched cache</p>
        </div>
        <span className="font-body text-xs font-bold px-2 py-1 rounded-lg" style={{ backgroundColor: "#f3f4f6", color: "#6b7280" }}>{grandTotal.toLocaleString()} bookings</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {activeMonths.map(({ idx, rows }) => {
          const monthTotal = rows.reduce((s, r) => s + r.count, 0);
          const top5 = rows.slice(0, 5);
          return (
            <div key={idx} className="rounded-xl p-3" style={{ border: "1px solid #e5e7eb", backgroundColor: "#fafafa" }}>
              {/* Month header */}
              <div className="flex items-center justify-between mb-2">
                <p className="font-condensed font-black text-sm text-gray-800">{MONTH_LABELS[idx]}</p>
                <span className="font-body text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#fff7ed", color: "#c2410c" }}>
                  {monthTotal} bookings
                </span>
              </div>
              {/* Top destinations */}
              <div className="space-y-1.5">
                {top5.map((r, i) => {
                  const pct = r.count / globalMax;
                  const barColor = i === 0 ? "#FF9913" : i === 1 ? "#f59e0b" : "#d1d5db";
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <span className="font-body text-xs font-bold text-gray-400 w-3 shrink-0">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="font-body text-xs font-semibold text-gray-700 truncate">{r.dest}</span>
                          <span className="font-body text-xs font-bold text-gray-800 shrink-0">{r.count}</span>
                        </div>
                        <div className="h-1 rounded-full bg-gray-100">
                          <div className="h-1 rounded-full" style={{ width: `${Math.max(pct * 100, 3)}%`, backgroundColor: barColor }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
                {rows.length > 5 && (
                  <p className="font-body text-xs text-gray-400 pt-0.5">+{rows.length - 5} more destinations</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BlockingMatrix() {
  const [open, setOpen]         = useState(false);
  const [slugStats, setSlugStats] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [loaded, setLoaded]     = useState(false);

  async function loadStats() {
    if (loaded) return;
    setLoading(true);
    try {
      const stats = await getBlockingIntelStats();
      setSlugStats(stats);
      setLoaded(true);
    } catch (err) {
      console.error("[BlockingMatrix] Failed to load stats:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleOpen() {
    setOpen(o => !o);
    if (!loaded) loadStats();
  }

  return (
    <div className="mt-8 rounded-2xl overflow-hidden bg-white" style={{ border: "1.5px solid #e0e7ff" }}>
      <button
        onClick={handleOpen}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        style={{ borderBottom: open ? "1px solid #f3f4f6" : "none" }}
      >
        <div className="text-left">
          <p className="font-condensed font-black text-xl text-gray-900 leading-tight">📊 Group Blocking Reference</p>
          <p className="font-body text-xs text-gray-400 mt-0.5">
            Booking counts, travel peak, and booking rush month — all from live Fusioo data · block-by from Product Development proposal
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {loading && <Loader size={13} className="animate-spin text-gray-400" />}
          {open ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 py-5 space-y-5">

              {/* Rule banner */}
              <div className="rounded-xl px-4 py-3 flex items-start gap-3" style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa" }}>
                <span className="text-lg leading-none mt-0.5">⏰</span>
                <div>
                  <p className="font-body text-sm font-bold text-orange-800">Mandatory 6–8 Month Planning Rule</p>
                  <p className="font-body text-xs text-orange-700 mt-0.5">
                    All blockings must be planned at least <strong>6 months before travel date.</strong> Requests below this window require management approval + urgency justification.
                  </p>
                </div>
              </div>

              {/* International */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#2563eb" }}>🌏 International</p>
                <BlockingTable rows={INTL_BLOCKING} slugStats={slugStats} />
              </div>

              {/* Domestic */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#16a34a" }}>🇵🇭 Domestic</p>
                <BlockingTable rows={DMSTC_BLOCKING} slugStats={slugStats} />
              </div>

              {/* Legend + footer */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <span className="font-body text-xs px-1 py-0.5 rounded font-bold" style={{ backgroundColor: "#dcfce7", color: "#15803d" }}>live</span>
                  <span className="font-body text-xs text-gray-400">Travel Peak = from actual Fusioo departure dates</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-body text-xs px-1 py-0.5 rounded font-bold" style={{ backgroundColor: "#dbeafe", color: "#1d4ed8" }}>live</span>
                  <span className="font-body text-xs text-gray-400">Book Rush = months clients actually purchase this package</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-body text-xs text-gray-300 font-bold">ref</span>
                  <span className="font-body text-xs text-gray-400">= reference from Product Development proposal</span>
                </div>
              </div>
              <p className="font-body text-xs text-gray-400">
                💡 Pricing average is the <strong>maximum range</strong> per blocking. Check 3 airline rates + 3 operator rates. Internal payment must be completed <strong>3 weeks before</strong> ticketing deadline.
              </p>

              {/* Monthly report — all destinations ranked by booking count per month */}
              <MonthlyReport byMonth={slugStats?.byMonth} />

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
