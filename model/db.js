const mongoose = require('mongoose')
require('dotenv').config()

const uriDb = process.env.URI_DB

const db = mongoose.connect(
    uriDb,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 5,
    },
    console.log('Database connection successful')
)

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose error: ${err.message}`)
})

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected`)
})

process.on('SIGINT', async () => {
    mongoose.connection.close(() => {
        console.log('Connection to DB disconected and app terminated')
        process.exit(1)
    })
})

module.exports = db
