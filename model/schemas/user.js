const mongoose = require('mongoose')
const { Schema, model } = mongoose
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const { nanoid } = require('nanoid')
const { Gender } = require('../../helper/constants')

const SALT_FACTOR = 6

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ['starter', 'pro', 'business'],
            default: 'starter',
        },
        token: {
            type: String,
            default: null,
        },
        avatar: {
            type: String,
            default: function () {
                return gravatar.url(this.email, { s: '250' }, true)
            },
        },

        verify: {
            type: Boolean,
            default: false,
        },
        verifyTokenEmail: {
            type: String,
            required: true,
            default: nanoid(),
        },
    },
    { versionKey: false, timestamps: true }
)

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSaltSync(SALT_FACTOR)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

userSchema.methods.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
