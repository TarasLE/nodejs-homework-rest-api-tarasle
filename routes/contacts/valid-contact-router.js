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

    favorite: Joi.boolean().optional(),
})

const schemaQueryContact = Joi.object({
    sortBy: Joi.string().valid('name', 'number', 'email', 'id').optional(),
    sortByDesc: Joi.string().valid('name', 'number', 'email', 'id').optional(),
    filter: Joi.string().optional(),
    limit: Joi.number().integer().min(0).max(50).optional(),
    offset: Joi.number().integer().min(0).optional(),
    favorite: Joi.boolean().optional(),
}).without('sortBy', 'sortByDesc')

const schemaUpdateContact = Joi.object({
    name: Joi.string().min(3).max(30).required().optional(),

    number: Joi.number().integer().min(6).max(10).optional(),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        })
        .optional(),
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
        next({ status: 400, message: error.message.replace(/"/g, "'") })
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
        return await validator(schemaUpdateStatusContact, req.body, next)
    },
    validationObjectId: async (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next({ status: 400, message: 'Invalid Object Id' })
        }
        next()
    },
    validationQueryContact: async (req, res, next) => {
        return await validator(schemaQueryContact, req.query, next)
    },
}
