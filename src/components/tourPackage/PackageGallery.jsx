import { useState } from "react";
import { X } from "lucide-react";

const ORANGE = "#FF9913";

export default function PackageGallery({ images = [], destinationName }) {
  const [lightbox, setLightbox] = useState(null);

  const displayImages = images.slice(0, 5);

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-1.5 rounded-2xl overflow-hidden" style={{ height: 380 }}>
        {/* Main large image */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer group overflow-hidden"
          onClick={() => setLightbox(0)}
        >
          <img
            src={displayImages[0]}
            alt={`${destinationName} 1`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Right 4 images */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="relative cursor-pointer group overflow-hidden"
            onClick={() => setLightbox(i)}
          >
            {displayImages[i] ? (
              <>
                <img
                  src={displayImages[i]}
                  alt={`${destinationName} ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {i === 4 && (
                  <div
                    className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
                  >
                    Gallery
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:opacity-70"
            onClick={() => setLightbox(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={displayImages[lightbox]}
            alt={destinationName}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 flex gap-2">
            {displayImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className="w-2 h-2 rounded-full transition-all"
                style={{ backgroundColor: i === lightbox ? ORANGE : "rgba(255,255,255,0.5)" }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}