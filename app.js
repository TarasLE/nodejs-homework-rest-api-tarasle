const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const boolParser = require('express-query-boolean')
const contactsRouter = require('./routes/contacts')
const userRouter = require('./routes/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
)
app.use(express.json())
app.use(boolParser())

app.use('/api/users', userRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({
        status: status === 500 ? 'fail' : 'error',
        code: status,
        message: err.message,
    })
})

module.exports = app
