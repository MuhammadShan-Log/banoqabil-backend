const UserModel = require("../../models/user")

async function Register(req, res, next) {
    try {

        const { firstName, lastName, email, phone, gender, password } = req.body

        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            gender: gender,
            password: password
        }

        const registerUser = await UserModel.create(userData)
        const user = registerUser.toObject();
        delete user.password

        if (registerUser) {
            return res.status(201).json({ status: 201, msg: 'User is registered successfuly.', data: user })
        } else {
            return res.status(201).json({ status: 400, msg: 'User is not register.', data: null })
        }

    } catch (err) {
        next(err)
    }
}

async function Login(req, res, next) {

    try {
        const { email, password } = req.body;
        const findUser = await UserModel.findOne({ email }).select('+password');

        if (!findUser) {
            return res.status(404).json({ status: 404, msg: 'User is not found', data: null })
        }

        const isMatch = await findUser.comparePassword(password)

        if (!isMatch) {
            return res.status(404).json({ status: 404, msg: 'Email or Password is invalid.', data: null })
        }

        if (isMatch) {
            const user = findUser.toObject();
            delete user.password
            const token = await findUser.signToken(user);
            return res.status(404).json({ status: 404, msg: 'Your are logged in succesfuly.', data: user, token: token })
        }

    } catch (err) {
        next(err)
    }

}

module.exports = {
    Register,
    Login
}