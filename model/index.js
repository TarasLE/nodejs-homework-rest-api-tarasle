const fs = require('fs')
const { promises: fsPromise } = fs
const path = require('path')
const db = require('./db')
const { v4: uuidv4 } = require('uuid')
const Contacts = path.join(__dirname, './', 'contacts.json')
const { ObjectId } = require('mongodb')
// const { json } = require('express')
// const { loadavg } = require('os')

const getCollection = async (db, name) => {
    const client = await db
    const collection = await client.db().collection(name)
    return collection
}
const listContacts = async () => {
    const collection = await getCollection(db, 'contacts')
    const results = await collection.find().toArray()
    return results
}

const getContactById = async (id) => {
    const collection = await getCollection(db, 'contacts')
    const objectId = new ObjectId(id)
    const [results] = await collection.find({ _id: objectId }).toArray()
    return results
}

const removeContact = async (id) => {
    const collection = await getCollection(db, 'contacts')
    const objectId = new ObjectId(id)
    const { value: record } = await collection.findOneAndDelete({
        _id: objectId,
    })
    return record
}

const addContact = async (body) => {
    const record = {
        ...body,
        ...(body.favorite ? {} : { favorite: false }),
    }
    const collection = await getCollection(db, 'contacts')
    const {
        ops: [result],
    } = await collection.insertOne(record)

    return result
}

const updateContact = async (id, body) => {
    const collection = await getCollection(db, 'contacts')
    const objectId = new ObjectId(id)
    const { value: record } = await collection.findOneAndUpdate(
        {
            _id: objectId,
        },
        { $set: body },
        { returnOriginal: false }
    )
    return record
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
