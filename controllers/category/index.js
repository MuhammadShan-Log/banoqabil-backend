const categoryModel = require("../../models/categoryModel");

async function addCategory(req, res, next) {
  try {
    const { title, createdBy } = req.body;

    const category = {
      title,
      createdBy,
    };

    const data = await categoryModel.create(category);

    if (data) {
      return res.status(201).json({ status: 201, msg: "Category is added.", data: data });
    } else {
      return res.status(400).json({ status: 400, msg: "Category is not added.", data: null });
    }
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req, res, next) {
  try {
    const categoryId = req.params.id;
    const { title, createdBy } = req.body;

    const category = {
      title,
      createdBy,
    };

    const data = await categoryModel.findByIdAndUpdate(categoryId, category, {
      new: true,
    });

    if (data) {
      return res
        .status(200)
        .json({ status: 200, msg: "Category is updated.", data: data });
    } else {
      return res
        .status(200)
        .json({ status: 200, msg: "Category is not found.", data: null });
    }
  } catch (err) {
    next(err);
  }
}

async function getAllCategories(req, res, next) {
  try {
    const data = await categoryModel.find();
    if (data) {
      return res
        .status(200)
        .json({ status: 200, msg: "All categories are fetched.", data: data });
    } else {
      return res
        .status(404)
        .json({ status: 404, msg: "Categories not found.", data: null });
    }
  } catch (err) {
    next(err);
  }
}

async function getCategoryById(req, res, next) {
  try {
    const categoryId = req.params.id;
    const data = await categoryModel.findById(categoryId);
    if (data) {
      return res
        .status(200)
        .json({ status: 200, msg: "Categories not found.", data: data });
    } else {
      return res
        .status(200)
        .json({ status: 200, msg: "Category not found.", data: null });
    }
  } catch (err) {
    next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const categoryId = req.params.id;
    const data = await categoryModel.findByIdAndDelete(categoryId);
    if (data) {
      return res.status(200).json({
        status: 200,
        msg: "Category is deleted succesfuly.",
        data: data,
      });
    } else {
      return res
        .status(200)
        .json({ status: 200, msg: "Category is not deleted.", data: null });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addCategory,
  updateCategory,
  getCategoryById,
  getAllCategories,
  deleteCategory,
};
