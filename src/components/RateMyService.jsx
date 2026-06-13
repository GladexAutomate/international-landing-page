// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { Star, Pencil, X, Upload, Check, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import BriefingSection from "./briefing/BriefingSection";

const ORANGE = "#FF8C00";
const MAX_PHOTOS = 3;
const MAX_FILE_MB = 5;
const ACCEPTED = "image/jpeg,image/png,image/webp";

async function uploadPhotosToStorage(files, gdxReference) {
  const urls = [];
  for (const file of files) {
    const ext = file.name.split(".").pop().toLowerCase() || "jpg";
    const path = `${gdxReference}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await supabase.storage
      .from("review-photos")
      .upload(path, file, { contentType: file.type, upsert: false });
    if (error) {
      console.warn("[RateMyService] photo upload failed:", error.message);
      continue;
    }
    const { data: { publicUrl } } = supabase.storage.from("review-photos").getPublicUrl(data.path);
    urls.push(publicUrl);
  }
  return urls;
}

function extractFirstName(fullName) {
  if (!fullName) return null;
  const n = String(fullName).trim();
  const parts = n.includes(",")
    ? n.split(",")[1].trim().split(/\s+/)
    : n.split(/\s+/);
  return parts[0] || null;
}

export default function RateMyService({ theme, gdxReference, destination, reviewerName, onReviewSaved }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
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
  const [existingPhotos,   setExistingPhotos]   = useState([]);   // URLs already in DB
  const [newPhotoFiles,    setNewPhotoFiles]    = useState([]);   // File objects to upload
  const [newPhotoPreviews, setNewPhotoPreviews] = useState([]);   // object URL previews
  const [isDragging,       setIsDragging]       = useState(false);
  const [deleting,         setDeleting]         = useState(false);

  // Revoke all object URLs on unmount
  useEffect(() => () => objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u)), []);

  // Fetch existing review on GDX change
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
        if (!fetchError && data) {
          setExistingReview(data);
          onReviewSaved?.(data);
        }
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
    const { error: deleteError } = await supabase
      .from("reviews")
      .delete()
      .eq("gdx_reference", gdxReference);
    if (deleteError) {
      console.error("[RateMyService] delete:", deleteError.code, deleteError.message);
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
    const previews = valid.map((f) => {
      const url = URL.createObjectURL(f);
      objectUrlsRef.current.push(url);
      return url;
    });
    setNewPhotoFiles((p) => [...p, ...valid]);
    setNewPhotoPreviews((p) => [...p, ...previews]);
  }

  function removeExistingPhoto(i) {
    setExistingPhotos((p) => p.filter((_, idx) => idx !== i));
  }

  function removeNewPhoto(i) {
    URL.revokeObjectURL(newPhotoPreviews[i]);
    objectUrlsRef.current = objectUrlsRef.current.filter((u) => u !== newPhotoPreviews[i]);
    setNewPhotoFiles((p) => p.filter((_, idx) => idx !== i));
    setNewPhotoPreviews((p) => p.filter((_, idx) => idx !== i));
  }

  function handleDragEnter(e) {
    e.preventDefault();
    dragCounterRef.current++;
    setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) setIsDragging(false);
  }

  function handleDragOver(e) { e.preventDefault(); }

  function handleDrop(e) {
    e.preventDefault();
    dragCounterRef.current = 0;
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }

  async function handleSubmit() {
    if (!selected || !gdxReference || submitting) return;
    setSubmitting(true);
    setError(null);

    // Upload any new photos first
    let uploadedUrls = [];
    if (newPhotoFiles.length > 0) {
      uploadedUrls = await uploadPhotosToStorage(newPhotoFiles, gdxReference);
    }
    const allPhotos = [...existingPhotos, ...uploadedUrls];

    const firstName = extractFirstName(reviewerName);
    const payload = {
      gdx_reference:  gdxReference,
      rating:         selected,
      comment:        comment.trim() || null,
    };
    if (destination)  payload.destination    = destination;
    if (firstName)    payload.reviewer_name  = firstName;
    if (allPhotos.length) payload.photos     = allPhotos;

    let { error: upsertError } = await supabase
      .from("reviews")
      .upsert(payload, { onConflict: "gdx_reference" });

    // Retry: strip any optional column Postgres flags as missing (42703)
    while (upsertError?.code === "42703") {
      const col = upsertError.message?.match(/column "?(\w+)"? of relation/)?.[1]
               || upsertError.message?.match(/column reviews\.(\w+)/)?.[1];
      if (!col || !(col in payload)) break;
      delete payload[col];
      const r = await supabase.from("reviews").upsert(payload, { onConflict: "gdx_reference" });
      upsertError = r.error;
    }

    if (upsertError) {
      console.error("[RateMyService] upsert failed:", upsertError.code, upsertError.message);
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    const saved = {
      rating:  selected,
      comment: comment.trim() || null,
      photos:  allPhotos.length ? allPhotos : null,
    };
    setExistingReview(saved);
    onReviewSaved?.(saved);
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
    <BriefingSection label="Your Experience" title="Review Our Service" theme={theme}>

      {/* ── Loading ── */}
      {loading && (
        <div className="flex items-center justify-center py-10">
          <div
            className="w-6 h-6 border-2 rounded-full animate-spin"
            style={{ borderColor: ORANGE, borderTopColor: "transparent" }}
          />
        </div>
      )}

      {/* ── Existing review (view mode) ── */}
      {!loading && existingReview && !isEditing && (
        <div
          className="rounded-2xl border p-5 space-y-4"
          style={{ backgroundColor: bgCard, borderColor: border }}
        >
          {/* Success badge */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: ORANGE + "18" }}
            >
              <Check className="w-4.5 h-4.5" style={{ color: ORANGE }} />
            </div>
            <div>
              <p className="font-condensed font-bold text-base leading-tight" style={{ color: textPrimary }}>
                Review Submitted
              </p>
              <p className="font-body text-sm mt-0.5" style={{ color: textSecondary }}>
                Your feedback has been saved. Thank you!
              </p>
            </div>
          </div>

          {/* Stars */}
          <div className="flex gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5"
                style={{
                  fill:        i < existingReview.rating ? ORANGE : "none",
                  color:       i < existingReview.rating ? ORANGE : isDark ? "#555" : "#CCC",
                  strokeWidth: 1.5,
                }}
              />
            ))}
          </div>

          {/* Comment */}
          {existingReview.comment && (
            <p
              className="font-body text-base leading-relaxed italic px-4 py-3 rounded-xl"
              style={{
                backgroundColor: isDark ? "rgba(255,140,0,0.07)" : "rgba(255,140,0,0.05)",
                color: textSecondary,
              }}
            >
              "{existingReview.comment}"
            </p>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleEdit}
              className="flex-1 flex items-center justify-center gap-2 font-body text-sm font-semibold px-4 py-2.5 rounded-xl border transition-all hover:opacity-80"
              style={{ borderColor: border, color: textSecondary, backgroundColor: "transparent" }}
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit Review
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center justify-center gap-2 font-body text-sm font-semibold px-4 py-2.5 rounded-xl border transition-all hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ borderColor: "#EF444460", color: "#EF4444", backgroundColor: "transparent" }}
            >
              <Trash2 className="w-3.5 h-3.5" />
              {deleting ? "Removing…" : "Remove"}
            </button>
          </div>
        </div>
      )}

      {/* ── Review form (new or edit) ── */}
      {!loading && showForm && (
        <div className="space-y-5">

          {/* Edit mode header */}
          {isEditing && (
            <div className="flex items-center justify-between">
              <p className="font-body text-base font-semibold" style={{ color: textSecondary }}>
                Update your review
              </p>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 font-body text-sm px-3 py-1.5 rounded-lg border transition-all hover:opacity-70"
                style={{ borderColor: border, color: textSecondary }}
              >
                <X className="w-3 h-3" /> Cancel
              </button>
            </div>
          )}

          {/* Star selector */}
          <div>
            {!isEditing && (
              <p className="font-body text-base mb-3" style={{ color: textSecondary }}>
                How would you rate your experience with Gladex Tours?
              </p>
            )}
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < (hovered || selected);
                return (
                  <button
                    key={i}
                    onClick={() => setSelected(i + 1)}
                    onMouseEnter={() => setHovered(i + 1)}
                    onMouseLeave={() => setHovered(0)}
                    className="transition-transform hover:scale-110 focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label={`Rate ${i + 1} star${i === 0 ? "" : "s"}`}
                  >
                    <Star
                      className="w-8 h-8"
                      style={{
                        fill:        filled ? ORANGE : "none",
                        color:       filled ? ORANGE : isDark ? "#555" : "#CCC",
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
            <p
              className="font-body text-sm font-semibold uppercase tracking-[0.18em] mb-2"
              style={{ color: textSecondary }}
            >
              Comments{" "}
              <span className="normal-case tracking-normal font-normal text-sm">(optional)</span>
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience…"
              rows={3}
              className="w-full rounded-xl border px-4 py-3 font-body text-base resize-none focus:outline-none transition-colors"
              style={{ backgroundColor: bgCard, borderColor: border, color: textPrimary }}
            />
          </div>

          {/* Photo upload */}
          <div>
            <p
              className="font-body text-sm font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: textSecondary }}
            >
              Photos{" "}
              <span className="normal-case tracking-normal font-normal text-sm">
                (optional · up to {MAX_PHOTOS})
              </span>
            </p>

            {/* Existing photos in edit mode */}
            {isEditing && existingPhotos.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {existingPhotos.map((url, i) => (
                  <div key={i} className="relative">
                    <img
                      src={url}
                      alt=""
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                    <button
                      onClick={() => removeExistingPhoto(i)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "rgba(0,0,0,0.65)", color: "#fff" }}
                      aria-label="Remove photo"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* New photo previews */}
            {newPhotoPreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {newPhotoPreviews.map((url, i) => (
                  <div key={i} className="relative">
                    <img
                      src={url}
                      alt=""
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                    <button
                      onClick={() => removeNewPhoto(i)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "rgba(0,0,0,0.65)", color: "#fff" }}
                      aria-label="Remove photo"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Drop zone — shown only if more slots available */}
            {canAddMore && (
              <div
                className="rounded-2xl border-2 border-dashed p-5 text-center cursor-pointer transition-colors select-none"
                style={{
                  borderColor:     isDragging ? ORANGE : isDark ? "#3A3A3A" : "#DDD",
                  backgroundColor: isDragging
                    ? isDark ? "rgba(255,140,0,0.08)" : "rgba(255,140,0,0.04)"
                    : "transparent",
                }}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={ACCEPTED}
                  className="hidden"
                  onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
                />
                <Upload
                  className="w-7 h-7 mx-auto mb-2"
                  style={{ color: isDragging ? ORANGE : isDark ? "#555" : "#AAA" }}
                />
                <p
                  className="font-body text-base font-semibold"
                  style={{ color: isDragging ? ORANGE : textSecondary }}
                >
                  Drag photos here or tap to upload
                </p>
                <p
                  className="font-body text-xs mt-1"
                  style={{ color: isDark ? "#555" : "#AAA" }}
                >
                  JPG · PNG · WEBP · Max {MAX_FILE_MB}MB each
                </p>
              </div>
            )}

            {totalPhotos >= MAX_PHOTOS && (
              <p className="font-body text-xs mt-2 text-center" style={{ color: isDark ? "#666" : "#AAA" }}>
                Maximum {MAX_PHOTOS} photos reached
              </p>
            )}
          </div>

          {error && (
            <p className="font-body text-base" style={{ color: "#EF4444" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!selected || submitting}
            className="w-full py-3 rounded-xl font-condensed font-bold text-base tracking-wide transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: ORANGE, color: "#080808" }}
          >
            {submitting
              ? newPhotoFiles.length > 0
                ? "Uploading photos…"
                : isEditing ? "Updating…" : "Submitting…"
              : isEditing ? "Update Review" : "Submit Review"}
          </button>
        </div>
      )}
    </BriefingSection>
  );
}
