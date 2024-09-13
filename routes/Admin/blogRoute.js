const express = require("express");
const uploadToCloudinary = require("../../middleware/uploadToCloudnary");
const {
  createBlog,
  updateBlog,
  getAllBlog,
  getSingleBlog,
  deleteBlog,
  updateBlogStatus,
  getBlogContentImg,
  addBlogImage,
} = require("../../controllers/Admin/blogController");

const router = express.Router();

router.post("/create", uploadToCloudinary("blog", ["image"], [1]), createBlog);
router.put(
  "/update/:id",
  uploadToCloudinary("blog", ["image"], [1]),
  updateBlog
);
router.get("/all", getAllBlog);
router.get("/:slug", getSingleBlog);
router.delete("/:id", deleteBlog);
router.patch("/status/:id", updateBlogStatus);
router.post(
  "/image",
  uploadToCloudinary("blogSingle", ["contentImg"], [1]),
  addBlogImage
);
router.get("/image/single", getBlogContentImg);

module.exports = router;
