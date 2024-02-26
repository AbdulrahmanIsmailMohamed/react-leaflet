import express, { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import { uploadSingleImage } from "./middlewares/multer";
import { config } from "dotenv";
config();

const app = express();
const port = 3000;

app.post(
  "/",
  uploadSingleImage("image"),
  async (req: Request, res: Response) => {
    console.log(req.file);

    const imagePath = req.file?.path;

    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "emergancy/Photos",
      format: "jpg",
      public_id: encodeURIComponent(req.file.originalname),
    });
    console.log(result.original_filename === req.file.originalname);
    
    if (!result) throw new Error("Internal Server Error");
    res.status(201).json(result);
  }
);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
