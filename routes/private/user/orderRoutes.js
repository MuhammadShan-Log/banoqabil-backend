const express = require('express')
const { addOrder, getAllOrders, updateOrder, updateOrderStatus, deleteOrder, cancelOrder } = require('../../../controllers/private/user/orderController')

const router = express.Router()

router.route('/')
    .post(addOrder)
    .get(getAllOrders)

router.route('/:id')
    .post(updateOrder)
    .put(cancelOrder)
    .patch(updateOrderStatus)
    .delete(deleteOrder)

module.exports = router