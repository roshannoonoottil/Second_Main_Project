import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";


// ✅ Define __dirname manually in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Allowed image types
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/avif": "avif",
  "image/webp": "webp",
};

// ✅ Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");

    if (isValid) {
      uploadError = null;
    }
    
    cb(uploadError, path.join(__dirname, "../../../public/images"));
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "_" + file.originalname;
    cb(null, fileName);
  },
});

// ✅ Export multer upload
const upload = multer({ storage });
export default upload;
