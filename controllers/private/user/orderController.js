const productModel = require("../../../models/productModel");

async function addOrder(req, res) {
    try {

        const { orderBy, products, shippingDetails } = req.body;

        const order = { orderBy, products, shippingDetails }

        const productIds = order.products.map((product => product.productId))
        // return console.log(productIds)

        const getProductsData = await productModel.find({ _id: { $in: productIds } })
        // return console.log(getProductsData)

        const checkProductIsActive = getProductsData.map((item) => {
            if (item !== undefined) { if (item.isActive == false) { return item } }
        }
        )
        return console.log(checkProductIsActive)

        if (checkProductIsActive.length > 0) {
            res.status(400).json({ status: 400, msg: 'inActive Product product is found in your cart.', data: checkProductIsActive })
        }

        const checkProductQuantity = getProductsData.map((item) => { if (item.checkProductQuantity > 9) { return item } })
        return console.log(checkProductQuantity)


        if (data) {
            res.status(200).json({ status: 200, msg: 'Order is added succesfuly.', data: data })
        } else {
            res.status(400).json({ status: 400, msg: 'Order is not added.', data: data })
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, msg: 'Server Error.', error: err })
    }
}

async function updateOrder(req, res) {
    try {
        if (data) {
            res.status(200).json({ status: 200, msg: 'Order is added succesfuly.', data: data })
        } else {
            res.status(400).json({ status: 400, msg: 'Order is not added.', data: data })
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, msg: 'Server Error.', error: err })
    }
}

async function cancelOrder(req, res) {
    try {
        if (data) {
            res.status(200).json({ status: 200, msg: 'Order is added succesfuly.', data: data })
        } else {
            res.status(400).json({ status: 400, msg: 'Order is not added.', data: data })
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, msg: 'Server Error.', error: err })
    }
}

async function updateOrderStatus(req, res) {
    try {
        if (data) {
            res.status(200).json({ status: 200, msg: 'Order is added succesfuly.', data: data })
        } else {
            res.status(400).json({ status: 400, msg: 'Order is not added.', data: data })
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, msg: 'Server Error.', error: err })
    }
}

async function deleteOrder(req, res) {
    try {
        if (data) {
            res.status(200).json({ status: 200, msg: 'Order is added succesfuly.', data: data })
        } else {
            res.status(400).json({ status: 400, msg: 'Order is not added.', data: data })
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, msg: 'Server Error.', error: err })
    }
}

async function getAllOrders(req, res) {
    try {
        if (data) {
            res.status(200).json({ status: 200, msg: 'Order is added succesfuly.', data: data })
        } else {
            res.status(400).json({ status: 400, msg: 'Order is not added.', data: data })
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, msg: 'Server Error.', error: err })
    }
}

module.exports = {
    addOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    cancelOrder,
    getAllOrders
}