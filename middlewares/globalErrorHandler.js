function globalErrorHandler(err, req, res, next) {
    if (err.name == 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message)
        // console.log(errors);
        res.status(400).json({ status: 400, msg: 'Validation failed.', err: errors })
    }
    else if (err.code == 11000) {
        const errors = Object.entries(err.keyPattern).map(([key, value]) => `${key} is already registered.`)
        res.status(400).json({ status: 400, msg: 'Duplicate key error.', err: errors })
    }

    else {
        res.status(500).json({ status: 500, msg: 'Server error.', err: err.message || err })
    }
    // console.log(err)
}

module.exports = globalErrorHandler