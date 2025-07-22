const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    shippingDetails: {
        name: {
            type: String,
            required: [true, "Name is required."]
        },
        email: {
            type: String,
            required: [true, "Email is required."]
        },
        phone: {
            type: String,
            required: [true, "Phone is required."]
        },
        address: {
            type: String,
            required: [true, "Address is required."]
        },
    }
}, {
    timestamps: true
})