const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
        },
        number: {
            type: String,
            min: 6,
            max: 10,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false, timestamps: true }
)

contactSchema.path('name').validate((value) => {
    const re = /[A-Z]\w+/
    return re.test(String(value))
})

contactSchema.path('number').validate((value) => {
    const re = /^[0-9]+$/
    return re.test(String(value))
})

contactSchema.path('email').validate((value) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return re.test(String(value))
})

contactSchema.path('favorite').validate((value) => {
    const re = /[false, true]/
    return re.test(Boolean(value))
})

const Contact = model('contact', contactSchema)

module.exports = Contact
