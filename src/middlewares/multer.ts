import multer, { StorageEngine } from "multer";
import path from "path";

const uploadPath = path.join(__dirname, "../uploads");

const storage: StorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadPath);
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
		);
	},
});

export const upload = multer({ storage });
