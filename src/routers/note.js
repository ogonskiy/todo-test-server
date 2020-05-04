const express = require('express')
const Note = require('../models/note')
const router = new express.Router()

router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find({})
    res.send(notes)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/notes/:id', async (req, res) => {
  try {
    const _id = req.params.id

    const note = await Note.findOne({ _id })

    if (!note) {
      return res.status(404).send()
    }
    res.send(note)
  } catch (error) {
    res.status(500).send()
  }
})

router.post('/notes', async (req, res) => {
  new Note(req.body)

  try {
    note.save()
    res.status(201).send()
  } catch (error) {
    res.status(400).send(error)
  }
})

router.patch('/notes/:id', async (req, res) => {
  const allowedUpdates = ['title', 'tasks']
  const updates = Object.keys(req.body)
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update)
  })

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Overposting is not allowed' })
  }

  try {
    const note = await Note.findOne({
      _id: req.params.id
    })
    if (!note) {
      res.status(404).send()
    }

    updates.forEach(update => {
      note[update] = req.body[update]
    })
    await note.save()

    res.send()
  } catch (error) {
    res.status(400).send()
  }
})

router.delete('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id
    })

    if (!note) {
      res.status(404).send()
    }
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router