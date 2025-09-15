import multer from "multer";

// Allowed image types
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/avif": "avif",
  "image/webp": "webp",

  
  // Videos
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/ogg": "ogv",   // sometimes .ogv for video/ogg
  "video/mpeg": "mpeg",
  "video/quicktime": "mov", // for .mov files (iPhone recordings)
};

// File filter
function fileFilter(req, file, cb) {
  if (FILE_TYPE_MAP[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error("Invalid image type"), false);
  }
}

// Use memory storage (no folder)
const storage = multer.memoryStorage();

// Export multer upload
const upload = multer({ storage, fileFilter });
export default upload;
