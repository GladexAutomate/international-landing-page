// @ts-nocheck
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, Trash2, ChevronDown, ChevronRight, Loader, User } from "lucide-react";
import { getReviewStats, addReview, deleteReview, lookupLeadNameByGdx } from "../services/reviewsService";
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

function AgentCard({ name, total, avgRating, reviews, onDelete, onDeleteAll }) {
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
                <ReviewCard key={r.id} review={r} onDelete={onDelete} />
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

function ReviewCard({ review, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const hasName = review.lead_name?.trim();
  const hasText = review.review_text?.trim() && review.review_text !== "—";
  const lowRating = review.rating && review.rating <= 3;

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
            {review.gdx && (
              <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: "#F3F4F6", color: "#6B7280" }}>
                GDX-{review.gdx}
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
            <p className="font-body text-sm text-gray-600 mt-2 leading-relaxed italic">"{review.review_text}"</p>
          )}
          {!hasText && (
            <p className="font-body text-xs text-gray-300 mt-1 italic">No review text</p>
          )}
        </div>

        {/* Delete */}
        {onDelete && (
          <div className="shrink-0 ml-auto">
            {!confirming ? (
              <button onClick={() => setConfirming(true)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
            ) : (
              <div className="flex gap-1">
                <button onClick={() => { onDelete(review.id); setConfirming(false); }} className="font-body text-xs px-2 py-1 rounded bg-red-500 text-white">Delete</button>
                <button onClick={() => setConfirming(false)} className="font-body text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">Cancel</button>
              </div>
            )}
          </div>
        )}
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
        gdx:         form.gdx.trim()        || null,
        lead_name:   form.lead_name.trim()   || null,
        destination: form.destination.trim() || null,
        agent_name:  form.agent_name.trim(),
        review_text: form.review_text.trim(),
        rating:      form.rating || null,
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
                <AgentCard key={agent.name} {...agent} onDelete={handleDelete} onDeleteAll={handleDeleteAll} />
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
    </div>
  );
}
