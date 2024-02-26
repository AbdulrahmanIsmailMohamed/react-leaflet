import multer from "multer";
import { Request } from "express";
const storage = multer.diskStorage({
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});

const fileFilter = (req: Request, file: any, cb: any) => {
  if (
    file.mimetype.startsWith("image") ||
    file.mimetype.startsWith("video") ||
    file.mimetype.startsWith("application/pdf")
  )
    cb(null, true);
  else cb(new Error("Add Only image or videos"), null);
};

export const upload = multer({ fileFilter, storage });
export const uploadSingleImage = (fileName: string) => upload.single(fileName);
export const uploadMedias = (fileName: string) => upload.array(fileName);
