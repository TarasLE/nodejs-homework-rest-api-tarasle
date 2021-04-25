// const fs = require('fs')
// const { promises: fsPromise } = fs
// const path = require('path')
// const db = require('./db')
// const { v4: uuidv4 } = require('uuid')
// const Contacts = path.join(__dirname, './', 'contacts.json')
// const { ObjectId } = require('mongodb')
// const { json } = require('express')
// const { loadavg } = require('os')

// const getCollection = async (db, name) => {
//     const client = await db
//     const collection = await client.db().collection(name)
//     return collection
// }

const Contacts = require('./schemas/contact')

const listContacts = async () => {
    const results = await Contacts.find()
    return results
}

const getContactById = async (id) => {
    const result = await Contacts.findOne({ _id: id })
    return result
}

const removeContact = async (id) => {
    const result = await Contacts.findByIdAndRemove({ _id: id })
    return result
}

const addContact = async (body) => {
    // try {
    const result = await Contacts.create(body)
    return result
    //     } catch (error) {
    //         if (error.name === 'ValidationError') {
    //             error.status = 400
    //         }
    //         throw error
    //     }
}

const updateContact = async (id, body) => {
    const result = await Contacts.findByIdAndUpdate(
        { _id: id },
        { ...body },
        { new: true }
    )
    return result
}

// const updateStatusContact = async (id, body) => {
//     const collection = await getCollection(db, 'contacts')
//     const objectId = new ObjectId(id)
//     const { value: record } = await collection.findOneAndUpdate(
//         {
//             _id: objectId,
//         },
//         { $set: body },
//         { returnOriginal: false }
//     )
// }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    // updateStatusContact,
}
