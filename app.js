/*
 * Notes App - Basic NodeJS CLI notes application using the file system.
 *
 * Author:  Wayne Riesterer
 * Date:    31/05/2019
 */

const yargs = require('yargs')
const notes = require('./notes')

yargs.command({
  command: 'add',
  describe: 'Adds a new note',
  builder: {
    title: {
      describe: 'Title of the note',
      type: 'string',
      demandOption: true
    },
    body: {
      describe: 'Body of the note',
      type: 'string',
      demandOption: true
    }
  },
  handler: argv => notes.addNote(argv.title, argv.body)
})

yargs.command({
  command: 'remove',
  describe: 'Removes an existing note',
  builder: {
    title: {
      describe: 'Title of the note',
      type: 'string',
      demandOption: true
    }
  },
  handler: argv => notes.removeNote(argv.title)
})

yargs.command({
  command: 'list',
  describe: 'Lists all notes',
  handler: argv => notes.listNotes()
})

yargs.command({
  command: 'read',
  describe: 'Reads a note',
  builder: {
    title: {
      describe: 'Title of the note',
      type: 'string',
      demandOption: true
    }
  },
  handler: argv => notes.readNote(argv.title)
})

console.log()
yargs.parse()
console.log()
