import asyncHandler from "express-async-handler";
import Categories from "../Models/CategoriesModel.js";
import MoviesModel from "../Models/MoviesModel.js";

// ******** PUBLIC CONTROLLERS ********
// @desc get all categories
// @route GET /api/categories
// @route GET /api/
// @access Public
const getCategories = asyncHandler(async (req, res) => {
  try {
    // find all
    const categories = await Categories.find({});
    // send all categories
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ******** ADMIN CONTROLLERS ********
// @desc  cre categories
// @route POST /api/categories
// @access Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  try {
    // get title
    const { title } = req.body;
    // cre new category
    const category = new Categories({
      title,
    });
    // save category
    const createdCategory = await category.save();
    // send the new category
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc  update category
// @route PUT /api/categories/:id
// @access Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  try {
    // get category id from req params
    const category = await Categories.findById(req.params.id);

    if (category) {
      //update category title
      category.title = req.body.title || category.title;
      // save the updated category
      const updatedCategory = await category.save();
      // send the updated
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc  delete category
// @route DELETE /api/categories/:id
// @access Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const { typeRemove } = req.query;
  const category_id = req.params.id;
  if (typeRemove === "1") {
    // xoá movie liên quan tới category
    try {
      await Categories.deleteOne({ _id: category_id });
      const response = await MoviesModel.deleteMany({
        category_id: category_id,
      });
      res.json({ message: "Delete completed" });
    } catch (error) {
      res.json(error);
    }
  }
  if (typeRemove != 1) {
    try {
      // find the movie in DB
      // if the movie is found delete it
      const category = await Categories.deleteOne({ _id: category_id });
      const pushCategoryMovie = await MoviesModel.updateMany(
        { category_id: category_id },
        { $set: { category: "undefined" } }
      );
      if (category || pushCategoryMovie) {
        res.json({ message: "Category removed", data: pushCategoryMovie });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

export { getCategories, createCategory, updateCategory, deleteCategory };
