// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { Star, Pencil, X, Check, Trash2, Send } from "lucide-react";
import { supabase } from "../lib/supabase";

const ORANGE     = "#FF9913";
const MAX_PHOTOS = 3;
const MAX_FILE_MB = 5;
const MAX_COMMENT = 500;
const ACCEPTED   = "image/jpeg,image/png,image/webp";

async function uploadPhotosToStorage(files, gdxReference) {
  const urls = [];
  for (const file of files) {
    const ext = file.name.split(".").pop().toLowerCase() || "jpg";
    const path = `${gdxReference}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await supabase.storage
      .from("review-photos")
      .upload(path, file, { contentType: file.type, upsert: false });
    if (error) { console.warn("[RateMyService] photo upload failed:", error.message); continue; }
    const { data: { publicUrl } } = supabase.storage.from("review-photos").getPublicUrl(data.path);
    urls.push(publicUrl);
  }
  return urls;
}

function extractFirstName(fullName) {
  if (!fullName) return null;
  const n = String(fullName).trim();
  const parts = n.includes(",") ? n.split(",")[1].trim().split(/\s+/) : n.split(/\s+/);
  return parts[0] || null;
}

/* ── Decorative SVG for the left panel ─────────────────────────────── */
function FlightPathDecoration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 h-36 opacity-30">
      <path
        d="M20 130 C 20 80, 60 20, 100 50 C 140 80, 180 20, 180 70 C 180 110, 140 140, 100 120 C 60 100, 20 130, 20 130"
        stroke="white" strokeWidth="2" strokeDasharray="6 4" fill="none"
      />
      {/* small airplane at tip */}
      <g transform="translate(175,60) rotate(-30)">
        <path d="M0,-6 L4,2 L0,0 L-4,2 Z" fill="white" />
        <path d="M-2,1 L-6,5 L0,3 L6,5 L2,1" fill="white" />
        <rect x="-0.5" y="2" width="1" height="3" fill="white" />
      </g>
      {/* heart outline */}
      <path
        d="M70 100 C 70 90, 80 85, 90 92 C 100 85, 110 90, 110 100 C 110 110, 90 122, 90 122 C 90 122, 70 110, 70 100 Z"
        stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="4 3"
      />
    </svg>
  );
}

export default function RateMyService({ theme, gdxReference, destination, reviewerName, onReviewSaved }) {
  const fileInputRef  = useRef(null);
  const objectUrlsRef = useRef([]);
  const dragCounterRef = useRef(0);

  const [loading,          setLoading]          = useState(true);
  const [existingReview,   setExistingReview]   = useState(null);
  const [isEditing,        setIsEditing]        = useState(false);
  const [hovered,          setHovered]          = useState(0);
  const [selected,         setSelected]         = useState(0);
  const [comment,          setComment]          = useState("");
  const [submitting,       setSubmitting]       = useState(false);
  const [error,            setError]            = useState(null);
  const [existingPhotos,   setExistingPhotos]   = useState([]);
  const [newPhotoFiles,    setNewPhotoFiles]    = useState([]);
  const [newPhotoPreviews, setNewPhotoPreviews] = useState([]);
  const [isDragging,       setIsDragging]       = useState(false);
  const [deleting,         setDeleting]         = useState(false);

  useEffect(() => () => objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u)), []);

  useEffect(() => {
    if (!gdxReference) { setLoading(false); return; }
    setLoading(true);
    setExistingReview(null);
    setIsEditing(false);
    setSelected(0);
    setComment("");
    setError(null);

    supabase
      .from("reviews")
      .select("*")
      .eq("gdx_reference", gdxReference)
      .maybeSingle()
      .then(({ data, error: fetchError }) => {
        if (fetchError) console.error("[RateMyService] fetch:", fetchError.code, fetchError.message);
        if (!fetchError && data) { setExistingReview(data); onReviewSaved?.(data); }
        setLoading(false);
      });
  }, [gdxReference]);

  function handleEdit() {
    setSelected(existingReview.rating);
    setComment(existingReview.comment || "");
    setExistingPhotos(existingReview.photos || []);
    setNewPhotoFiles([]);
    setNewPhotoPreviews([]);
    setError(null);
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
    setSelected(0);
    setComment("");
    setExistingPhotos([]);
    newPhotoPreviews.forEach((u) => URL.revokeObjectURL(u));
    setNewPhotoFiles([]);
    setNewPhotoPreviews([]);
    setError(null);
  }

  async function handleDelete() {
    if (deleting || !gdxReference) return;
    setDeleting(true);
    setError(null);
    const { data: deleted, error: deleteError } = await supabase
      .from("reviews").delete().eq("gdx_reference", gdxReference).select("id");
    if (deleteError || !deleted?.length) {
      setError("Failed to delete review. Please try again.");
      setDeleting(false);
      return;
    }
    setExistingReview(null);
    onReviewSaved?.(null);
    setDeleting(false);
  }

  function addFiles(fileList) {
    const slots = MAX_PHOTOS - existingPhotos.length - newPhotoFiles.length;
    if (slots <= 0) return;
    const valid = Array.from(fileList)
      .filter((f) => ACCEPTED.includes(f.type))
      .filter((f) => f.size <= MAX_FILE_MB * 1024 * 1024)
      .slice(0, slots);
    if (!valid.length) return;
    const previews = valid.map((f) => { const u = URL.createObjectURL(f); objectUrlsRef.current.push(u); return u; });
    setNewPhotoFiles((p) => [...p, ...valid]);
    setNewPhotoPreviews((p) => [...p, ...previews]);
  }

  function removeExistingPhoto(i) { setExistingPhotos((p) => p.filter((_, idx) => idx !== i)); }
  function removeNewPhoto(i) {
    URL.revokeObjectURL(newPhotoPreviews[i]);
    objectUrlsRef.current = objectUrlsRef.current.filter((u) => u !== newPhotoPreviews[i]);
    setNewPhotoFiles((p) => p.filter((_, idx) => idx !== i));
    setNewPhotoPreviews((p) => p.filter((_, idx) => idx !== i));
  }

  function handleDragEnter(e) { e.preventDefault(); dragCounterRef.current++; setIsDragging(true); }
  function handleDragLeave(e) { e.preventDefault(); dragCounterRef.current--; if (dragCounterRef.current === 0) setIsDragging(false); }
  function handleDragOver(e) { e.preventDefault(); }
  function handleDrop(e) { e.preventDefault(); dragCounterRef.current = 0; setIsDragging(false); addFiles(e.dataTransfer.files); }

  async function handleSubmit() {
    if (!selected || !gdxReference || submitting) return;
    setSubmitting(true);
    setError(null);

    let uploadedUrls = [];
    if (newPhotoFiles.length > 0) uploadedUrls = await uploadPhotosToStorage(newPhotoFiles, gdxReference);
    const allPhotos = [...existingPhotos, ...uploadedUrls];
    const firstName = extractFirstName(reviewerName);
    const isUpdate  = existingReview?.id != null;

    let fields = { rating: selected, comment: comment.trim() || null };
    if (destination)      fields.destination   = destination;
    if (firstName)        fields.reviewer_name = firstName;
    if (allPhotos.length) fields.photos        = allPhotos;

    async function doWrite(f) {
      if (isUpdate) return supabase.from("reviews").update(f).eq("id", existingReview.id).select("*").maybeSingle();
      return supabase.from("reviews").insert({ gdx_reference: gdxReference, ...f }).select("*").maybeSingle();
    }

    let { data: savedRecord, error: writeError } = await doWrite(fields);
    const isColErr = (e, col) => (e?.code === "42703" || e?.code === "PGRST204") && e?.message?.includes(col);
    if (isColErr(writeError, "reviewer_name")) { delete fields.reviewer_name; ({ data: savedRecord, error: writeError } = await doWrite(fields)); }
    if (isColErr(writeError, "photos"))        { delete fields.photos;        ({ data: savedRecord, error: writeError } = await doWrite(fields)); }
    if (isColErr(writeError, "destination"))   { delete fields.destination;   ({ data: savedRecord, error: writeError } = await doWrite(fields)); }
    if (writeError?.code === "42703" || writeError?.code === "PGRST204") { fields = { rating: selected, comment: comment.trim() || null }; ({ data: savedRecord, error: writeError } = await doWrite(fields)); }

    if (writeError) {
      console.error("[RateMyService] write failed:", writeError.code, writeError.message, writeError.details, writeError.hint);
      const msg = writeError.code === "42501"
        ? "Permission denied — please check Supabase RLS policy on the reviews table."
        : writeError.code === "23505"
        ? "A review for this booking already exists."
        : `Failed to save review (${writeError.code || "unknown error"}). Please try again.`;
      setError(msg);
      setSubmitting(false);
      return;
    }

    const record = savedRecord ?? {
      id: existingReview?.id ?? null, gdx_reference: gdxReference,
      rating: selected, comment: comment.trim() || null,
      photos: allPhotos.length ? allPhotos : null,
      destination: destination || null, reviewer_name: firstName || null,
    };

    setExistingReview(record);
    onReviewSaved?.(record);
    setIsEditing(false);
    setSelected(0);
    setComment("");
    setExistingPhotos([]);
    newPhotoPreviews.forEach((u) => URL.revokeObjectURL(u));
    setNewPhotoFiles([]);
    setNewPhotoPreviews([]);
    setSubmitting(false);
  }

  if (!gdxReference) return null;

  const showForm    = !existingReview || isEditing;
  const totalPhotos = (isEditing ? existingPhotos.length : 0) + newPhotoFiles.length;
  const canAddMore  = totalPhotos < MAX_PHOTOS;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

      {/* ── LEFT PANEL — title + decoration ─────────────────────────── */}
      <div className="lg:w-64 xl:w-72 shrink-0">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          Your Experience
        </p>
        <h2
          className="font-condensed font-bold text-3xl xl:text-4xl leading-tight text-white mb-4"
        >
          Review Our Service
        </h2>
        <div className="w-10 h-0.5 bg-white/50 mb-4" />
        <p className="font-body text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
          We'd love to hear about your experience with Gladex Tours!
        </p>
        <div className="mt-8 hidden lg:block">
          <FlightPathDecoration />
        </div>
      </div>

      {/* ── RIGHT PANEL — form card ──────────────────────────────────── */}
      <div className="flex-1 w-full bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: ORANGE, borderTopColor: "transparent" }} />
          </div>
        )}

        {/* Existing review — view mode */}
        {!loading && existingReview && !isEditing && (
          <div className="p-6 lg:p-8 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: ORANGE + "18" }}>
                <Check className="w-5 h-5" style={{ color: ORANGE }} />
              </div>
              <div>
                <p className="font-condensed font-bold text-base text-gray-800">Review Submitted</p>
                <p className="font-body text-sm text-gray-500 mt-0.5">Your feedback has been saved. Thank you!</p>
              </div>
            </div>

            <div className="flex gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6"
                  style={{ fill: i < existingReview.rating ? ORANGE : "none", color: i < existingReview.rating ? ORANGE : "#D1D5DB", strokeWidth: 1.5 }}
                />
              ))}
            </div>

            {existingReview.comment && (
              <p className="font-body text-base leading-relaxed italic px-4 py-3 rounded-xl bg-orange-50 text-gray-600">
                "{existingReview.comment}"
              </p>
            )}

            <div className="flex gap-2 pt-1">
              <button onClick={handleEdit}
                className="flex-1 flex items-center justify-center gap-2 font-body text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:opacity-70 transition-all"
              >
                <Pencil className="w-3.5 h-3.5" /> Edit Review
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex items-center justify-center gap-2 font-body text-sm font-semibold px-4 py-2.5 rounded-xl border border-red-200 text-red-500 hover:opacity-70 transition-all disabled:opacity-40"
              >
                <Trash2 className="w-3.5 h-3.5" /> {deleting ? "Removing…" : "Remove"}
              </button>
            </div>

            {error && <p className="font-body text-sm text-red-500">{error}</p>}
          </div>
        )}

        {/* Review form */}
        {!loading && showForm && (
          <div className="p-6 lg:p-8 space-y-6">

            {/* Edit header */}
            {isEditing && (
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <p className="font-body text-base font-semibold text-gray-600">Update your review</p>
                <button onClick={handleCancel}
                  className="flex items-center gap-1 font-body text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-400 hover:opacity-70 transition-all"
                >
                  <X className="w-3 h-3" /> Cancel
                </button>
              </div>
            )}

            {/* Star rating */}
            <div>
              <p className="font-body text-base text-gray-700 mb-3">
                How would you rate your experience with Gladex Tours?
              </p>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  const filled = i < (hovered || selected);
                  return (
                    <button key={i}
                      onClick={() => setSelected(i + 1)}
                      onMouseEnter={() => setHovered(i + 1)}
                      onMouseLeave={() => setHovered(0)}
                      className="transition-transform hover:scale-110 focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label={`Rate ${i + 1} star${i === 0 ? "" : "s"}`}
                    >
                      <Star className="w-8 h-8"
                        style={{
                          fill:        filled ? ORANGE : "none",
                          color:       filled ? ORANGE : "rgba(255,153,19,0.3)",
                          strokeWidth: 1.5,
                          transition:  "all 0.12s ease",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comment */}
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-gray-400 mb-2">
                Comments <span className="normal-case tracking-normal font-normal">(Optional)</span>
              </p>
              <div className="relative">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT))}
                  placeholder="Tell us about your experience…"
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 font-body text-base resize-none focus:outline-none focus:border-orange-300 transition-colors text-gray-700 placeholder:text-gray-300"
                />
                <span className="absolute bottom-3 right-3 font-body text-xs text-gray-300 select-none">
                  {comment.length}/{MAX_COMMENT}
                </span>
              </div>
            </div>

            {/* Photo upload */}
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-gray-400 mb-3">
                Photos <span className="normal-case tracking-normal font-normal">(Optional – up to {MAX_PHOTOS})</span>
              </p>

              {/* Photo thumbnails — fixed small size, not 1/3 of card width */}
              {(isEditing && existingPhotos.length > 0 || newPhotoPreviews.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {isEditing && existingPhotos.map((url, i) => (
                    <div key={`ex-${i}`} className="relative w-24 h-24 shrink-0">
                      <img src={url} alt="" className="w-24 h-24 object-cover rounded-xl" />
                      <button onClick={() => removeExistingPhoto(i)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "#fff" }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {newPhotoPreviews.map((url, i) => (
                    <div key={`new-${i}`} className="relative w-24 h-24 shrink-0">
                      <img src={url} alt="" className="w-24 h-24 object-cover rounded-xl" />
                      <button onClick={() => removeNewPhoto(i)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "#fff" }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Drop zone */}
              {canAddMore && (
                <div
                  className="rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors select-none"
                  style={{
                    borderColor:     isDragging ? ORANGE : "rgba(255,153,19,0.30)",
                    backgroundColor: isDragging ? "rgba(255,153,19,0.04)" : "transparent",
                  }}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input ref={fileInputRef} type="file" multiple accept={ACCEPTED} className="hidden"
                    onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
                  />
                  {/* Upload cloud icon */}
                  <svg className="w-9 h-9 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke={isDragging ? ORANGE : "rgba(255,153,19,0.55)"} strokeWidth="1.5">
                    <path d="M12 16V8m0 0l-3 3m3-3l3 3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="font-body text-base font-semibold" style={{ color: isDragging ? ORANGE : "#6B7280" }}>
                    Drag photos here or tap to upload
                  </p>
                  <p className="font-body text-xs mt-1 text-gray-400">
                    JPG · PNG · WebP · Max {MAX_FILE_MB}MB each
                  </p>
                </div>
              )}

              {totalPhotos >= MAX_PHOTOS && (
                <p className="font-body text-xs mt-2 text-center text-gray-400">
                  Maximum {MAX_PHOTOS} photos reached
                </p>
              )}
            </div>

            {error && <p className="font-body text-sm text-red-500">{error}</p>}

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={!selected || submitting}
              className="w-full py-3.5 rounded-xl font-condensed font-bold text-base tracking-wide flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: ORANGE, color: "#FFFFFF" }}
            >
              <Send className="w-4 h-4" />
              {submitting
                ? (newPhotoFiles.length > 0 ? "Uploading photos…" : isEditing ? "Updating…" : "Submitting…")
                : (isEditing ? "Update Review" : "Submit Review")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
