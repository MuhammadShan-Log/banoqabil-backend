const express = require('express')
const { addCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../../controllers/category')
const router = express.Router()

router.route('/')
.post(addCategory)
.get(getAllCategories)

router.route('/:id')
.get(getCategoryById)
.post(updateCategory)
.delete(deleteCategory)

module.exports = router