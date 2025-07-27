const productModel = require("../../models/productModel");

async function addProduct(req, res, next) {
  try {
    const {
      images,
      title,
      description,
      price,
      quantity,
      tags,
      sku,
      categoryIds,
      slug,
      inStock,
      isActive,
      isFeatured,
      createdBy,
      seo = {},
    } = req.body;
    const { metaTitle, metaDescription, metaKeywords } = seo;

    const product = {
      images,
      title,
      description,
      price,
      quantity,
      tags,
      sku,
      categoryIds,
      slug,
      inStock,
      isActive,
      isFeatured,
      createdBy,
      seo: {
        metaTitle,
        metaDescription,
        metaKeywords,
      },
    };

    const createProduct = await productModel.create(product);

    await createProduct.populate('createdBy').populate('categoryIds')

    if (createProduct) {
      res
        .status(201)
        .json({ status: 201, msg: "Product is created.", data: createProduct });
    }
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res) {
  try {
    const {
      images,
      title,
      description,
      price,
      quantity,
      tags,
      sku,
      categoryIds,
      slug,
      inStock,
      isActive,
      isFeatured,
      seo = {},
    } = req.body;
    const { metaTitle, metaDescription, metaKeywords } = seo;

    const product = {
      images,
      title,
      description,
      price,
      quantity,
      tags,
      sku,
      categoryIds,
      slug,
      inStock,
      isActive,
      isFeatured,
      seo: {
        metaTitle,
        metaDescription,
        metaKeywords,
      },
    };

    const createProduct = await productModel.create(product);

    await createProduct.populate('createdBy').populate('categoryIds')

    if (createProduct) {
      return res
        .status(200)
        .json({ status: 200, msg: "Product is updated.", data: createProduct });
    }
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res) {}

async function getAllProducts(req, res, next) {
  try {
    const data = await productModel.find().populate('categoryIds').populate('createdBy');
    if (data) {
      return res
        .status(200)
        .json({ status: 200, msg: "All products are fetched.", data: data });
    } else {
      return res
        .status(200)
        .json({ status: 200, msg: "Products not found.", data: null });
    }
  } catch (err) {
    next(err);
  }
}

async function getProductById(req, res) {}

async function searchProduct(req, res) {}

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  searchProduct,
};
