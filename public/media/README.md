# Local Media Storage

This folder holds locally-stored destination images and videos.

Files placed here are served at the root URL by Vite:
- A file at `public/media/danang-vietnam/cover.jpg` is served as `/media/danang-vietnam/cover.jpg`
- Reference it in `mediaConfig.js` as `heroImage: "/media/danang-vietnam/cover.jpg"`

## Folder Structure

```
public/media/
├── danang-vietnam/
│   ├── cover.jpg          → heroImage
│   ├── card.jpg           → cardImage
│   ├── gallery1.jpg       → gallery[0].url
│   ├── gallery2.jpg       → gallery[1].url
│   └── briefing.mp4       → video (or paste Google Drive URL instead)
│
├── korea/
│   ├── cover.jpg
│   ├── card.jpg
│   └── briefing.mp4
│
├── japan/
├── hongkong/
├── singapore/
├── bangkok/
└── (one folder per destination slug)
```

## How to Add a Local Image or Video

1. Drop the file into the correct destination folder here.
2. Open `src/data/mediaConfig.js`.
3. Find the destination entry.
4. Set the path, e.g.:
   ```js
   "danang-vietnam": {
     heroImage: "/media/danang-vietnam/cover.jpg",
     cardImage: "/media/danang-vietnam/card.jpg",
     video: "/media/danang-vietnam/briefing.mp4",
     gallery: [
       { url: "/media/danang-vietnam/gallery1.jpg", caption: "Golden Bridge" },
       { url: "/media/danang-vietnam/gallery2.jpg", caption: "Hoi An Ancient Town" },
     ],
   }
   ```
5. Save. The change is live — no other files need to be edited.

## Notes

- Supported image formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`
- Supported video formats: `.mp4`, `.webm`
- For Google Drive videos, keep using the Drive embed URL in `mediaConfig.js` — no local file needed.
- Files in `public/` are NOT bundled by Vite — they are copied as-is to the build output.
  Large videos are fine here; they won't bloat the JS bundle.
