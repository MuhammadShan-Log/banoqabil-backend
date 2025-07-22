const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required."],
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required."],
    },
    inStock: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const productModel = new mongoose.model('Product', productSchema)

module.exports = productModel