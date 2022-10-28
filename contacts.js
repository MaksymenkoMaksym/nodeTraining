import fs from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'
import colors from 'colors'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const contactsPath = path.resolve('./db/contacts.json')

const read = async () => {
  const binaryData = await fs.readFile(contactsPath)
  const dataJSON = binaryData.toString()
  const dataArray = JSON.parse(dataJSON)
  return dataArray
}
const write = async (data) => {
  const content = JSON.stringify(data)
  await fs.writeFile(contactsPath, content, 'utf8')
}
async function listContacts() {
  const dataArray = await read()
  console.table(dataArray)
}

async function getContactById(contactId) {
  console.log(typeof contactId, 'contactId')
  try {
    const dataArray = await read()
    const contact = dataArray.find((el) => el.id === contactId)
    if (!contact) {
      throw new Error(`Contact not found`)
    }
    console.log(
      `Contact wih ID: ${contactId} successfully found`.bgBrightYellow
        .underline,
      contact,
    )
    return contact
  } catch (error) {
    console.log(
      `Error:${error} occurred when try to get contact with ID: ${contactId}`
        .bgRed.blue,
    )
  }
}

async function removeContact(contactId) {
  try {
    const dataArray = await read()
    const dataArrayUpdated = dataArray.filter((el) => el.id !== contactId)
    if (dataArrayUpdated.length === dataArray.length) {
      throw new Error(`Contact not found`)
    }
    await write(dataArrayUpdated)
    console.log(
      `Contact wih ID: ${contactId} successfully removed`.bgBrightYellow
        .underline,
    )
    return contactId
  } catch (error) {
    console.log(
      `Error:${error} occurred when try to delete contact with ID: ${contactId}`
        .bgRed.blue,
    )
  }
}

async function addContact(name, email, phone) {
  try {
    const dataArray = await read()
    const generatedID = randomUUID()
    const contact = { id: generatedID, name, email, phone }
    dataArray.push(contact)
    await write(dataArray)
    console.log(
      `Contact: ${JSON.stringify(contact)} successfully added`.brightWhite
        .underline.bold,
    )
    return generatedID
  } catch (error) {
    console.log(
      `Error:${error} occurred when try to add contact ${JSON.stringify(
        contact,
      )}`.bgRed.random,
    )
  }
}

export { addContact, removeContact, getContactById, listContacts }
// module.exports = {
//   addContact,
//   removeContact,
//   getContactById,
//   listContacts,
// }
