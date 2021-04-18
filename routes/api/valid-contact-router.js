const Joi = require('joi')

const schemaCreateContact = Joi.object({
    name: Joi.string().min(3).max(30).required(),

    number: Joi.number().integer().required(),

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
}).or('name', 'number', 'email')

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
}
