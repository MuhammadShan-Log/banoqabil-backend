const orderModel = require("../../../models/orderModel");
const productModel = require("../../../models/productModel");

async function addOrder(req, res, next) {
    try {

        const { orderBy, products, shippingDetails } = req.body;

        const productIds = products.map((product => product.productId))
        // return console.log(productIds)

        const getProductsData = await productModel.find({ _id: { $in: productIds } })
        // return console.log(getProductsData)

        const validateReqProductsWithDBProducts = products.map(product => {
            const dbProduct = getProductsData.find(dbP => dbP._id.toString() === product.productId)

            if (!dbProduct) {
                return `Product is not valid.`
            }

            if (!dbProduct.isActive) {
                return `Order is not placed as your selected product '${dbProduct.title}' is Inactive.`
            }

            if (!dbProduct.inStock) {
                return `Order is not placed as your selected product '${dbProduct.title}' is Out of Stock.`
            }

            if (dbProduct.quantity < product.quantity) {
                return `Order is not placed as your selected product '${dbProduct.title}' has not enough quantity.`
            }

            return null;
        }).filter(msg => msg !== null)

        if (validateReqProductsWithDBProducts.length > 0) {
            return res.status(400).json({ status: 400, msg: 'Order is not placed.', errors: validateReqProductsWithDBProducts })
        }

        const newOrder = { orderBy, products, shippingDetails }

        const createOrder = await orderModel.create(newOrder)

        if (createOrder) {

            const bulkUpdates = products.map(product => {
                const dbProduct = getProductsData.find(p => p._id.toString() === product.productId);
                const newQty = dbProduct.quantity - product.quantity;

                return {
                    updateOne: {
                        filter: { _id: product.productId },
                        update: {
                            $set: {
                                quantity: newQty,
                                inStock: newQty > 0
                            }
                        }
                    }
                };
            });

            await productModel.bulkWrite(bulkUpdates);

            return res.status(201).json({ status: 201, msg: 'Order is placed successfuly.', data: createOrder })
        } else {
            return res.status(400).json({ status: 400, msg: 'Order is not placed.', data: null })
        }

    }
    catch (err) {
        return next(err)
    }
}

async function updateOrder(req, res, next) {
    try {

        const orderId = req.params.id

        const { orderBy, products, shippingDetails } = req.body;

        const productIds = products.map((product => product.productId))
        // return console.log(productIds)

        const getProductsData = await productModel.find({ _id: { $in: productIds } })
        // return console.log(getProductsData)

        const validateReqProductsWithDBProducts = products.map(product => {
            const dbProduct = getProductsData.find(dbP => dbP._id.toString() === product.productId)

            if (!dbProduct) {
                return `Product is not valid.`
            }

            if (!dbProduct.isActive) {
                return `Order is not placed as your selected product '${dbProduct.title}' is Inactive.`
            }

            if (!dbProduct.inStock) {
                return `Order is not placed as your selected product '${dbProduct.title}' is Out of Stock.`
            }

            if (dbProduct.quantity < product.quantity) {
                return `Order is not placed as your selected product '${dbProduct.title}' has not enough quantity.`
            }

            return null;
        }).filter(msg => msg !== null)

        if (validateReqProductsWithDBProducts.length > 0) {
            return res.status(400).json({ status: 400, msg: 'Order is not updated.', errors: validateReqProductsWithDBProducts })
        }

        const existingOrderUpdates = { orderBy, products, shippingDetails }

        const updateOrder = await orderModel.findByIdAndUpdate(orderId, { existingOrderUpdates }, { new: true })

        if (updateOrder) {

            const bulkUpdates = products.map(product => {
                const dbProduct = getProductsData.find(p => p._id.toString() === product.productId);
                const newQty = dbProduct.quantity - product.quantity;

                return {
                    updateOne: {
                        filter: { _id: product.productId },
                        update: {
                            $set: {
                                quantity: newQty,
                                inStock: newQty > 0
                            }
                        }
                    }
                };
            });

            await productModel.bulkWrite(bulkUpdates);

            return res.status(200).json({ status: 200, msg: 'Order is updated successfuly.', data: updateOrder })
        } else {
            return res.status(400).json({ status: 400, msg: 'Order is not updated.', data: null })
        }

    }
    catch (err) {
        return next(err)
    }
}


async function cancelOrder(req, res, next) {
    try {
        const orderStatus = "Cancelled"
        const data = await orderModel.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true }).populate('orderBy').populate('products.productId')
        if (data) {
            res.status(200).json({ status: 200, msg: 'Order is cancelled.', data: data })
        } else {
            res.status(400).json({ status: 400, msg: 'Order is not cancelled.', data: null })
        }
    }
    catch (err) {
        next(err)
    }
}

async function updateOrderStatus(req, res, next) {
    try {
        const { orderStatus } = req.body
        console.log(orderStatus)
        const data = await orderModel.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true }).populate('orderBy').populate('products.productId')
        if (data) {
            res.status(200).json({ status: 200, msg: 'Order status updated succesfuly.', data: data })
        } else {
            res.status(400).json({ status: 400, msg: 'Order status is not updated.', data: null })
        }
    }
    catch (err) {
        next(err)
    }
}

async function deleteOrder(req, res, next) {
    try {
        const data = await orderModel.findByIdAndDelete(req.params.id).populate('orderBy').populate('products.productId')
        if (data) {
            res.status(200).json({ status: 200, msg: 'Order is deleted succesfuly.', data: data })
        } else {
            res.status(400).json({ status: 400, msg: 'Order is not deleted.', data: data })
        }
    }
    catch (err) {
        next(err)
    }
}

async function getAllOrders(req, res, next) {
    try {
        const data = await orderModel.find().populate('orderBy').populate('products.productId')
        if (data) {
            res.status(200).json({ status: 200, msg: 'Order is added succesfuly.', data: data })
        } else {
            res.status(400).json({ status: 400, msg: 'Order is not added.', data: null })
        }
    }
    catch (err) {
        next(err)
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