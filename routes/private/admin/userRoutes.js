const express = require('express')
const { getAllUsers } = require('../../../controllers/private/admin/userController')

const router = express.Router()

router.route('/')
    .get(getAllUsers)

module.exports = router