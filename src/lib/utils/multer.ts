import multer from "multer";

const multerStorage = multer.memoryStorage();
const multerFilter = (file: any, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ error: "Not an image! Please upload only images" }, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export default upload;
