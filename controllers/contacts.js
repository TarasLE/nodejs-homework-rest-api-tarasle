// const Contacts = require('../../model/index')
const Contacts = require('../model/index')

const getAll = async (req, res, next) => {
    try {
        const userId = req.user?.id
        const contacts = await Contacts.listContacts(userId, req.query)
        return res.json({
            status: 'success',
            code: 200,
            data: { contacts },
        })
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const userId = req.user?.id
        const contact = await Contacts.getContactById(userId, req.params.id)
        if (contact) {
            return res.json({ status: 'success', code: 200, data: { contact } })
        } else {
            return res
                .status(404)
                .json({ status: 'error', code: 404, data: 'not found' })
        }
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const userId = req.user?.id
        const contact = await Contacts.addContact(userId, req.body)
        return res
            .status(201)
            .json({ status: 'success', code: 201, data: { contact } })
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        const userId = req.user?.id
        const contact = await Contacts.removeContact(userId, req.params.id)
        if (contact) {
            return res.json({ status: 'success', code: 200, data: { contact } })
        } else {
            return res
                .status(404)
                .json({ status: 'error', code: 404, data: 'not found' })
        }
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const userId = req.user?.id
        const contact = await Contacts.updateContact(
            userId,
            req.params.id,
            req.body
        )
        if (contact) {
            return res.json({
                status: 'success',
                code: 200,
                data: { contact },
            })
        } else {
            return res
                .status(404)
                .json({ status: 'error', code: 404, data: 'not found' })
        }
    } catch (error) {
        next(error)
    }
}

const updateStatus = async (req, res, next) => {
    try {
        const userId = req.user?.id
        const contact = await Contacts.updateStatusContact(
            userId,
            req.params.id,
            req.body
        )
        if (contact) {
            return res.json({
                status: 'success',
                code: 200,
                data: {
                    contact,
                },
            })
        } else {
            return res.status(404).json({
                status: 'error',
                code: 404,
                data: 'Not Found',
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll,
    getById,
    remove,
    create,
    update,
    updateStatus,
}
