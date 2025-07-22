async function addOrder(req, res) {
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

module.exports = {
    addOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    cancelOrder
}