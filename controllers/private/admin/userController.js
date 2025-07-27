const UserModel = require("../../../models/userModel")

async function getAllUsers(req, res) {
    try {

        const data = await UserModel.find()
        if (data) {
            res.status(200).json({ status: 200, msg: 'All user fetched.', data: data })
        } else {
            res.status(500).json({ status: 500, msg: 'User is not found.', data: null })

        }
    } catch (err) {
        res.status(500).json({ status: 500, msg: 'Server Error.', error: err })
    }
}

module.exports = {
    getAllUsers
}