const fs = require('fs')
const { promises: fsPromise } = fs
const path = require('path')
const db = require('./db')
const { v4: uuidv4 } = require('uuid')
const Contacts = path.join(__dirname, './', 'contacts.json')
const { json } = require('express')
const { loadavg } = require('os')

const listContacts = async () => {
    /*РЕАЛИЗАЦИЯ ЧЕРЕЗ LOWDB*/
    // return db.get('contacts').value()

    const list = await fsPromise.readFile(Contacts)
    const parsedContacts = JSON.parse(list)
    return parsedContacts
}

const getContactById = async (id) => {
    /*РЕАЛИЗАЦИЯ ЧЕРЕЗ LOWDB*/
    // return db.get('contacts').find({ id }).value()

    /*РЕАЛИЗАЦИЯ ЧЕРЕЗ FS*/
    const contacts = await listContacts()
    const contact = contacts.find((contact) => contact.id == id)
    return contact
}

const removeContact = async (id) => {
    /*РЕАЛИЗАЦИЯ ЧЕРЕЗ LOWDB*/
    // const [record] = db.get('contacts').remove({ id })

    /*РЕАЛИЗАЦИЯ ЧЕРЕЗ FS*/
    const contacts = await listContacts()
    let newList = []
    let record

    contacts.map((item) => {
        if (item.id !== id) {
            newList.push(item)
        } else {
            record = item
        }
    })
    try {
        await fsPromise.writeFile(Contacts, JSON.stringify(newList))
    } catch (error) {
        console.log(error.message)
    }

    console.log(record)
    return await record
}

const addContact = async (body) => {
    const id = uuidv4()
    const record = { id, ...body }

    /*РЕАЛИЗАЦИЯ ЧЕРЕЗ LOWDB*/
    // db.get('contacts').push(record).write()

    /*РЕАЛИЗАЦИЯ ЧЕРЕЗ FS*/
    try {
        const contacts = await listContacts()
        newList = [...contacts]
        newList.push(record)
        await fsPromise.writeFile(Contacts, JSON.stringify(newList))
    } catch (error) {
        console.log(error.message)
    }

    return record
}

const updateContact = async (id, body) => {
    /*РЕАЛИЗАЦИЯ ЧЕРЕЗ LOWDB*/
    // const record = db.get('contacts').find({ id }).assign(body).value()
    // db.write()
    // return record.id ? record : null

    /*реализация через fs*/
    const contacts = await listContacts()
    let newList = []
    let record

    contacts.map((item) => {
        if (item.id != id) {
            newList.push(item)
        } else {
            record = { ...item, ...body }
            newList.push(record)
        }
    })
    try {
        await fsPromise.writeFile(Contacts, JSON.stringify(newList))
    } catch (error) {
        console.log(error.message)
    }

    console.log('RECORD DATS', record)
    return record
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}
