const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    blogTitle: {
      type: String,
    },
    slugUrl: {
      type: String,
    },
    metaTitle: {
      type: String,
    },
    metaKeyword: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const imgSchema = mongoose.Schema(
  {
    contentImg: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
const Img = mongoose.model("Img", imgSchema);

module.exports = {
  Blog,
  Img,
};
