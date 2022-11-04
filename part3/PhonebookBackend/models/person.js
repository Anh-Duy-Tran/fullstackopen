require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

const database = mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name : String,
  number : String,
})

personSchema.set('toJson', {
  transform : (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)