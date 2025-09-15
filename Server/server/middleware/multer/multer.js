import multer from "multer";

// Allowed image types
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/avif": "avif",
  "image/webp": "webp",
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
