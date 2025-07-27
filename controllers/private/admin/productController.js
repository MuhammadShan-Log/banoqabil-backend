const productModel = require("../../../models/product");

async function addProduct(req, res) {
    try {
        const { title, price, quantity, inStock, isActive } = req.body;

        const product = { title, price, quantity, inStock, isActive }
        const data = await productModel.create(product)

        if (data) {
            res.status(201).json({ status: 201, msg: 'Product is added.', data: data })
        } else {
            res.status(400).json({ status: 400, msg: 'Product is not added.', data: null })
        }
    } catch (err) {
        res.status(500).json({ status: 500, msg: 'Server Error.', data: null, error: err })
    }
}

async function updateProduct(req, res) {
    try {

        const { title, price, quantity, inStock, isActive } = req.body;

        const product = { title, price, quantity, inStock, isActive }
        const data = await productModel.findByIdAndUpdate(req.params.id, { product }, { new: true })

        if (data) {
            res.status(200).json({ status: 200, msg: 'Product is updated.', data: data })
        } else {
            res.status(400).json({ status: 400, msg: 'Product is not updated.', data: null })
        }
    } catch (err) {
        res.status(500).json({ status: 500, msg: 'Server Error.', data: null, error: err })
    }
}

async function deleteProduct(req, res) {
    try {

        const { isActive } = req.body;

        // const product = { isActive }

        const data = await productModel.findByIdAndUpdate(req.params.id, { isActive }, { new: true })

        if (data) {
            res.status(200).json({ status: 200, msg: 'Product is deleted.', data: data })
        } else {
            res.status(400).json({ status: 400, msg: 'Product not found.', data: null })
        }
    } catch (err) {
        res.status(500).json({ status: 500, msg: 'Server Error.', data: null, error: err })
    }
}

async function getProductById(req, res) {
    try {

        const data = await productModel.findById(req.params.id)
        console.log(req.params.id)
        if (data) {
            res.status(200).json({ status: 200, msg: 'Product data is fetched.', data: data })
        } else {
            res.status(400).json({ status: 400, msg: 'Product is not found.', data: null })
        }
    } catch (err) {
        res.status(500).json({ status: 500, msg: 'Server Error.', data: null, error: err })
    }
}

async function getAllProducts(req, res) {
    try {

        const data = await productModel.find()

        if (data) {
            res.status(200).json({ status: 200, msg: 'All Products data is fetched.', data: data })
        } else {
            res.status(400).json({ status: 400, msg: 'Products not found.', data: null })
        }
    } catch (err) {
        res.status(500).json({ status: 500, msg: 'Server Error.', data: null, error: err })
    }
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProducts
}