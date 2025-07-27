const express = require('express')
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../../../controllers/private/admin/productController')
const router = express.Router()

router.route('/')
    .post(addProduct)
    .get(getAllProducts)

router.route('/:id')
    .get(getProductById)
    .post(updateProduct)
    .delete(deleteProduct)

module.exports = router