const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const userRoles = require('../../enums/userRoles');
const gender = require('../../enums/gender');
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET_KEY
const expiresIn = process.env.JWT_EXPIRES_IN || '1h'

const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: [true, 'First Name is required.']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Phone is required.']
    },
    gender: {
        type: String,
        enum: Object.values(gender),
        required: [true, 'Gender is required.']
    },
    role: {
        type: String,
        enum: Object.values(userRoles),
        default: userRoles.User,
        required: [true, 'Role is required.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        select: false
    },

}, {
    timeStamps: true
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        next();
    } catch (err) {
        next(err);
    }
})

userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password)
}

userSchema.methods.signToken = async function (user) {
    const token = await jwt.sign(user, secret, { expiresIn: expiresIn })
    return token
}

userSchema.methods.verifyToken = async function (token) {
    const verifyToken = jwt.verify(token, secret)
    return verifyToken
}

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel