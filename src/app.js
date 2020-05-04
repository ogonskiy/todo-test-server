const express = require('express')
const cors = require('cors')
require('./db/mongoose') // connect mongoose to DB
const noteRouter = require('./routers/note')

const app = express()

app.use(cors())
app.use(express.json()) // parse JSON automatically
app.use(noteRouter)

module.exports = app