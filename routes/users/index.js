const express = require('express')
const router = express.Router()
const cntrl = require('../../controllers/users')

router
    .post('/register', cntrl.reg)
    .post('/login', cntrl.login)
    .post('/logout', cntrl.logout)

module.exports = router
