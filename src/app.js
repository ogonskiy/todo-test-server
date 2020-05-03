const express = require('express')
require('./db/mongoose') // connect mongoose to DB
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json()) // parse JSON automatically
app.use(taskRouter)

module.exports = app