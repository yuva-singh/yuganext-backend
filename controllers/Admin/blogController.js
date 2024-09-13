const asyncHandler = require("express-async-handler");
const { Blog, Img } = require("../../models/Admin/blogModel");

const createBlog = asyncHandler(async (req, res) => {
  const {
    blogTitle,
    slugUrl,
    metaTitle,
    metaKeyword,
    metaDescription,
    description,
  } = req.body;

  if (
    (!blogTitle,
    !slugUrl,
    !metaDescription,
    !metaKeyword,
    !metaTitle,
    !metaDescription,
    !description)
  ) {
    res.status(404);
    throw new Error("All fields Required!");
  }

  const image = req.files["image"] ? req.files["image"][0].path : null;

  const blog = await Blog.create({
    blogTitle,
    slugUrl,
    metaDescription,
    metaTitle,
    metaKeyword,
    description,
    image,
  });

  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }

  res.status(200).json({ message: "Blog created successfully!", blog });
});

const updateBlog = asyncHandler(async (req, res) => {
  const {
    blogTitle,
    slugUrl,
    metaTitle,
    metaKeyword,
    metaDescription,
    description,
  } = req.body;
  const blogId = req.params.id;

  if (
    (!blogTitle,
    !slugUrl,
    !metaDescription,
    !metaKeyword,
    !metaTitle,
    !metaDescription,
    !description)
  ) {
    res.status(404);
    throw new Error("All fields Required!");
  }

  const image = req.files["image"] ? req.files["image"][0].path : null;
  const blogImage = await Blog.findById(blogId);

  const blog = await Blog.findByIdAndUpdate(
    blogId,
    {
      blogTitle,
      slugUrl,
      metaDescription,
      metaTitle,
      metaKeyword,
      description,
      image: image == null ? blogImage.image : image,
    },
    { new: true }
  );

  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }

  res.status(200).json({ message: "Blog updated successfully!", blog });
});

const getAllBlog = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();

  const totalBlogs = blogs.length;

  if (blogs.length === 0) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const blogsThisMonth = await Blog.find({
    createdAt: {
      $gte: new Date(currentYear, currentMonth - 1, 1),
      $lt: new Date(currentYear, currentMonth, 1),
    },
  }).countDocuments();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const blogsToday = await Blog.find({
    createdAt: {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    },
  }).countDocuments();

  const response = {
    blogs,
    blogsThisMonth,
    blogsToday,
    totalBlogs,
  };

  res.status(200).json(response);
});

const getSingleBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.slug;

  const blog = await Blog.findOne({ slugUrl: blogId });

  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }

  res.status(200).json(blog);
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;

  const blog = await Blog.findByIdAndDelete(blogId);

  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }

  res.status(200).json({ message: "Blog deleted successfully!" });
});

const updateBlogStatus = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  const { status } = req.body;

  if (status === undefined || status === null || status === "") {
    res.status(404);
    throw new Error("All fields required!");
  }

  const blog = await Blog.findByIdAndUpdate(blogId, {
    status,
  }, { new: true });

  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }

  res.status(200).json({ message: "Blog Status Updated successfully!", blog });
});

const addBlogImage = asyncHandler(async (req, res) => {
  const contentImg = req.files["contentImg"]
    ? req.files["contentImg"][0].path
    : null;

  const blog = await Img.create({
    contentImg,
  });

  res.status(201).json({ message: "Content Image added successfully!", blog });
});

const getBlogContentImg = asyncHandler(async (req, res) => {
  const blog = await Img.find().sort({ createdAt: -1 });

  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }

  res.status(200).json(blog);
});

module.exports = {
  createBlog,
  updateBlog,
  getAllBlog,
  getSingleBlog,
  deleteBlog,
  updateBlogStatus,
  addBlogImage,
  getBlogContentImg,
};
