const express = require('express')
const router = express.Router()
const cntrl = require('../../controllers/contacts')
const {
    validationCreateContact,
    validationUpdateContact,
    validationUpdateStatusContact,
    validationObjectId,
} = require('./valid-contact-router')

const guard = require('../../helper/guard')

router
    .get('/', guard, cntrl.getAll)
    .post('/', guard, validationCreateContact, cntrl.create)

router
    .get('/:id', guard, validationObjectId, cntrl.getById)
    .delete('/:id', guard, validationObjectId, cntrl.remove)
    .put('/:id', guard, validationUpdateContact, cntrl.update)

router.patch(
    '/:id/favorite',
    guard,
    validationUpdateStatusContact,
    cntrl.updateStatus
)

module.exports = router
