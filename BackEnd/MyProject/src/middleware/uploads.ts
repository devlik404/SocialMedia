import { NextFunction, Request, Response } from "express";
import * as multer from "multer";

export const uploadProfile = (fieldNames: string[]) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + "_" + uniqueSuffix + ".png");
    },
  });

  // Membuat middleware multer untuk setiap field name
  const uploadFiles = fieldNames.map((fieldName) => {
    return multer({ storage: storage }).array(fieldName);
  });

  return (req: Request, res: Response, next: NextFunction) => {
    // Menjalankan middleware multer untuk setiap field name
    uploadFiles.forEach((uploadFile) => {
      uploadFile(req, res, (err: any) => {
        if (err) {
          return res.status(400).json({ error: "File upload failed." });
        }
      });
    });

    next();
  };
};
