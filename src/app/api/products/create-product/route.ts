import cloudinary from "@/lib/utils/cloudinary";
import upload from "@/lib/utils/multer";

export default async function (request: Request) {
  upload.array("images", 6);
}
