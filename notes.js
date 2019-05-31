/*
 * notes.js - Notes handling functionality.
 *
 * Author:  Wayne Riesterer
 * Date:    31/05/2019
 */

const fs = require('fs')
const chalk = require('chalk')

const status = {
  info: 'info',
  success: 'success',
  fail: 'fail'
}

const addNote = (title, body) => {
  const notes = loadNotes()
  if (noteExists(notes, title)) log(`"${title}" already exists`, status.fail)
  else {
    notes.push({ title, body })
    saveNotes(notes)
    log(`"${title}" saved succesfully`, status.success)
  }
}

const removeNote = title => {
  const notes = [...loadNotes()]
  const filteredNotes = notes.filter(note => note.title !== title)
  if (notes.length !== filteredNotes.length) {
    saveNotes(filteredNotes)
    log(`"${title}" removed succesfully`, status.success)
  } else {
    log(`${title} not found`, status.fail)
  }
}

const listNotes = () => {
  const notes = loadNotes()
  log('Notes')
  log('--------------------------------')
  if (notes.length > 0)
    notes.forEach(note => log(`${note.title}: ${note.body}`))
  else log("You currently haven't got any notes saved", status.info)
}

const readNote = title => {
  const notes = [...loadNotes()]
  const note = notes.find(note => note.title === title)
  log('Note')
  log('--------------------------------')
  if (note) log(`${note.title}: ${note.body}`)
  else log(`"${title}" not found`, status.fail)
}

const noteExists = (notes, title) => {
  return notes.filter(note => note.title === title).length > 0
}

const log = (note, result) => {
  switch (result) {
    case status.info:
      console.log(chalk.bgBlue.white(note))
      break
    case status.success:
      console.log(chalk.bgGreen.white(note))
      break
    case status.fail:
      console.log(chalk.bgRed.white(note))
      break
    default:
      console.log(note)
  }
}

const loadNotes = () => {
  try {
    const notesJson = fs.readFileSync('notes.json').toString()
    return JSON.parse(notesJson)
  } catch (e) {
    return []
  }
}

const saveNotes = notes => {
  fs.writeFileSync('notes.json', JSON.stringify(notes))
}

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
}
