const path = require("path");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const uploadProductImage = async (req, res) => {
  const imagePath = path.join(
    __dirname,
    "..",
    "public/uploads",
    req.files.image.name
  );
  await req.files.image.mv(imagePath);
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `uploads/${req.files.image.name}` } });
};

module.exports = {
  uploadProductImage,
};
