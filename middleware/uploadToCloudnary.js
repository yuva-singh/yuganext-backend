const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = (folderName, fieldNames, maxCounts) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folderName,
      allowed_formats: ["jpg", "jpeg", "png", "gif", "pdf"],
      quality: 80,
    },
  });

  const upload = multer({
    storage: storage,
  });

  const fields = fieldNames.map((name, index) => ({
    name: name,
    maxCount: maxCounts[index] || 1,
  }));

  return (req, res, next) => {
    upload.fields(fields)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          err.statusCode = 400;
          err.message = `Multer error: ${err.message}`;
        } else if (err) {
          err.statusCode = 500;
          err.message = `Upload error: ${err.message}`;
        }
        return next(err);
      }
      next();
    });
  };
};

module.exports = uploadToCloudinary;
