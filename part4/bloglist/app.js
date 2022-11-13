const express = require('express')
const cors = require('cors')


const app = express()

const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app