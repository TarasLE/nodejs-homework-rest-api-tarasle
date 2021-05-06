const express = require('express')
const router = express.Router()
const cntrl = require('../../controllers/users')
const guard = require('../../helper/guard')

router
    .post('/register', cntrl.reg)
    .post('/login', cntrl.login)
    .post('/logout', guard, cntrl.logout)

module.exports = router
