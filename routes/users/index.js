const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/users')
const guard = require('../../helper/guard')
const rateLimit = require('express-rate-limit')
const uploadAvatar = require('../../helper/uploadAvatar')

const limiter = rateLimit({
    windows: 60 * 60 * 1000,
    max: 2,
    handler: (req, res, next) => {
        return res.status(429).json({
            status: 'error',
            code: 429,
            message: 'Too Many Requests',
        })
    },
})

router
    .post('/register', limiter, ctrl.reg)
    .post('/login', ctrl.login)
    .post('/logout', guard, ctrl.logout)

router.patch(
    '/avatars',
    guard,
    uploadAvatar.single('avatar'),
    ctrl.updateAvatar
)

router.get('/verify/:token', ctrl.verify)
router.post('/verify', ctrl.repeatEmailVerify)

module.exports = router
