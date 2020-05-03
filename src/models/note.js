const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  tasks: {
    type: [taskSchema],
    default: () => []
  }
}, {
  timestamps: true
})

const Task = mongoose.model('Task', noteSchema)

module.exports = Task
