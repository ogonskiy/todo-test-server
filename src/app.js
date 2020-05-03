const express = require('express')
require('./db/mongoose') // connect mongoose to DB
const noteRouter = require('./routers/note')

const app = express()

app.use(express.json()) // parse JSON automatically
app.use(noteRouter)

module.exports = app