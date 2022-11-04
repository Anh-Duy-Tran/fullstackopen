const express = require('express')
const cors = require('cors')

const Person = require('./models/person')

const app = express()

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())

app.use(requestLogger)

app.use(cors())

app.use(express.static('build'))


app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.send(persons)
  })
})

app.get('/info', async (req, res) => {
  const currentDate = new Date().toLocaleString();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const personsNum = (await Person.find({})).length

  res.send(`
    <div>
      <p>Phonebook has info for ${personsNum} people</p>
    </div>
    <div>
      <p>${currentDate} (${timeZone})</p>
    </div>
  `).end()
})

app.get('/api/persons/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(person => {
      res.json(person)
    })
})

app.delete('/api/persons/:id', async (req, res) => {
  Person
    .findByIdAndDelete(req.params.id)
    .then(deleted => res.json(deleted))
    .catch(console.log)
})

app.post('/api/persons', (req, res) => {
  const person = req.body
  
  if (person === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const newPerson = new Person({...person})

  newPerson.save().then(saved => res.json(saved))
})

app.put('/api/persons/:id', (req, res) => {
  const person = req.body

  if (person === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  Person.findByIdAndUpdate(req.params.id, person).then(updated => res.json(updated))
})

const unknownEndpoint = (req, res) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})