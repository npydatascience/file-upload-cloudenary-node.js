const path = require("path");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// const uploadProductImageLocal = async (req, res) => {
//   if (!req.files) {
//     throw new CustomError.BadRequestError("file is required field");
//   }
//   if (!req.files.image.mimetype.startsWith("image/")) {
//     throw new CustomError.BadRequestError("file should be image");
//   }
//   const maxSize = 1024 * 1024;
//   if (req.files.image.size > maxSize) {
//     throw new CustomError.BadRequestError("image size should be less than 1MB");
//   }
//   const imagePath = path.join(
//     __dirname,
//     "..",
//     "public/uploads",
//     req.files.image.name
//   );
//   await req.files.image.mv(imagePath);
//   res
//     .status(StatusCodes.OK)
//     .json({ image: { src: `uploads/${req.files.image.name}` } });
// };

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  // console.log(result);//gives lots of options and path
  fs.unlinkSync(req.files.image.tempFilePath); //to delete uploaded file in local tem dir

  res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  uploadProductImage,
};
