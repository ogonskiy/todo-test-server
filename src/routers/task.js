const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/tasks/:id', async (req, res) => {
  try {
    const _id = req.params.id

    const task = await Task.findOne({ _id })

    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (error) {
    res.status(500).send()
  }
})

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    task.save()
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.patch('/tasks/:id', async (req, res) => {
  const allowedUpdates = ['description', 'completed']
  const updates = Object.keys(req.body)
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update)
  })

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Overposting is not allowed' })
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id
    })
    if (!task) {
      res.status(404).send()
    }

    updates.forEach(update => {
      task[update] = req.body[update]
    })
    await task.save()

    res.send(task)
  } catch (error) {
    res.status(400).send()
  }
})

router.delete('/tasks/:id', async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id)
    const task = await Task.findOneAndDelete({
      _id: req.params.id
    })

    if (!task) {
      res.status(404).send()
    }
    res.send(task)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router