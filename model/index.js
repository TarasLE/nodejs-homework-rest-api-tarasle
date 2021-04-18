const fs = require('fs')
const { promises: fsPromise } = fs
const path = require('path')
const db = require('./db')
const { v4: uuidv4 } = require('uuid')
// const contactsPath = path.join(__dirname, 'model', 'contacts.json')
const contacts = require('./contacts.json')

console.log(JSON.parse(contacts))
const listContacts = async () => {
    // console.log(db.get('contacts'))
    return db.get('contacts').value()
    // await fs.readFile(contactsPath, 'utf8', (err, data) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     processFile(data)
    // })
}

// function processFile(data) {
//     testArray = JSON.parse(data)
//     return testArray
// }

const getContactById = async (id) => {
    return db.get('contacts').find({ id }).value()
}

const removeContact = async (id) => {
    const [record] = db.get('contacts').remove({ id })
    return record
}

const addContact = async (body) => {
    const id = uuidv4()
    const record = { id, ...body }
    db.get('contacts').push(record).write()
    return record
}

const updateContact = async (id, body) => {
    const record = db.get('contacts').find({ id }).assign(body).value()
    db.write()
    return record.id ? record : null
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}

listContacts()
