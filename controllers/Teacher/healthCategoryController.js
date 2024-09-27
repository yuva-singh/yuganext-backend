const asyncHandler = require("express-async-handler");
const { HealthCategory } = require("../../models/Teacher/healthCategoryModel");
const { Teacher } = require("../../models/Teacher/teacherModel");

const createHealthCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("name is required!");
  }

  const categoryExists = await HealthCategory.findOne({ name });

  if (categoryExists) {
    res.status(403);
    throw new Error("Health Category with this name already exists!");
  }

  const categoryEntry = await HealthCategory.create({
    name,
  });

  if (!categoryEntry) {
    res.status(500);
    throw new Error("server error!");
  }

  res
    .status(201)
    .json({ message: "Health Category created successfully!", categoryEntry });
});

const updateHealthCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("name is required!");
  }

  const updatedCategoryEntry = await HealthCategory.findByIdAndUpdate(
    categoryId,
    {
      name,
    },
    { new: true }
  );

  if (!updatedCategoryEntry) {
    res.status(500);
    throw new Error("server error!");
  }

  res.status(200).json({
    message: "Health Category updated successfully!",
    updatedCategoryEntry,
  });
});

const getAllHealthCategory = asyncHandler(async (req, res) => {
  const categoryEntries = await HealthCategory.find();

  res.status(200).json(categoryEntries);
});

const deleteHealthCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  const teachers = await Teacher.findOne({ specialization: categoryId });

  if (teachers.length > 0) {
    res.status(400);
    throw new Error(
      "You have existing teachers with this category. Please delete teachers with this category before deleting the category."
    );
  }
  const categoryEntries = await HealthCategory.findByIdAndDelete(categoryId);

  if (!categoryEntries) {
    res.status(500);
    throw new Error("server error!");
  }

  res.status(200).json({ message: "Category deleted successfully!" });
});

module.exports = {
  createHealthCategory,
  updateHealthCategory,
  getAllHealthCategory,
  deleteHealthCategory,
};
