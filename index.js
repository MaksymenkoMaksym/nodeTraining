import Yargs from 'yargs'
import { Command } from 'commander'

import {
  addContact,
  removeContact,
  getContactById,
  listContacts,
} from './contacts.js'
// 1st approach to solve problem via Yargs
const argv = Yargs(process.argv.slice(2)).argv

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts()
      break

    case 'get':
      getContactById(id)
      break

    case 'add':
      addContact(name, email, phone)
      break

    case 'remove':
      removeContact(id)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}
// invokeAction(argv)
// 2nd approach to solve problem via Commander

const program = new Command()
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv2 = program.opts()

// TODO: wtf
function invokeAction2({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts()
      break

    case 'get':
      getContactById(id)
      break

    case 'add':
      addContact(name, email, phone)
      break

    case 'remove':
      removeContact(id)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction2(argv2)
