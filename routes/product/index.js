const express = require("express");
const {
  addProduct,
  updateProduct,
  getProductById,
  deleteProduct,
  getAllProducts,
} = require("../../controllers/product");
const router = express.Router();

router.route("/").post(addProduct).get(getAllProducts);

router
  .route("/:id")
  .post(updateProduct)
  .get(getProductById)
  .delete(deleteProduct);

  module.exports = router