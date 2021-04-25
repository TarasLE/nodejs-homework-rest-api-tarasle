const Joi = require('joi')
const mongoose = require('mongoose')

const schemaCreateContact = Joi.object({
    name: Joi.string().min(3).max(30).required(),

    number: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        })
        .required(),
})

const schemaUpdateContact = Joi.object({
    name: Joi.string().min(3).max(30).required().optional(),

    number: Joi.number().integer().min(6).max(10).optional(),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        })
        .optional(),
    favorite: Joi.boolean().optional(),
}).or('name', 'number', 'email')

const schemaUpdateStatusContact = Joi.object({
    favorite: Joi.boolean().required(),
})

const validator = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj)

        return next()
    } catch (error) {
        console.log(error)
        next({ status: 400, message: error.message })
    }
}

module.exports = {
    validationCreateContact: async (req, res, next) => {
        return await validator(schemaCreateContact, req.body, next)
    },
    validationUpdateContact: async (req, res, next) => {
        return await validator(schemaUpdateContact, req.body, next)
    },
    validationUpdateStatusContact: async (req, res, next) => {
        return await validate(schemaUpdateStatusContact, req.body, next)
    },
    validationObjectId: async (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next({ status: 400, message: 'Invalid Object Id' })
        }
        next()
    },
}
