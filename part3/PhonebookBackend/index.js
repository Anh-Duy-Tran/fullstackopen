const express = require('express')
const morgan = require('morgan')
const cors = require('cors')



const app = express()

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const maxId = 9999
const getNewId = () => {
  return Math.floor(Math.random() * maxId)
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

app.get('/api/persons', (req, res) => {
  res.json(persons).end()
})

app.get('/info', (req, res) => {
  const currentDate = new Date().toLocaleString();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  res.send(`
    <div>
      <p>Phonebook has info for ${persons.length} people</p>
    </div>
    <div>
      <p>${currentDate} (${timeZone})</p>
    </div>
  `).end()
  
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id)

  person ? res.json(person) : res.status(404)
  res.end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const personIndex = persons.findIndex(p => p.id === id)
  personIndex !== -1 ? persons.splice(personIndex, 1) : res.status(404)
  res.end()
})

app.post('/api/persons', (req, res) => {
  const person = req.body
  if (persons.some(p => p.name === person.name)) {
    res.status(400).json({ error: 'name must be unique' }).end()
    return;
  }
  if (person.name === undefined || person.name.length === 0 
    || person.number === undefined || person.number.length === 0) {
    res.status(400).json({ error: 'the name or number is missing' }).end()
    return;
  }

  const newPerson = {id : getNewId(), ...person}
  persons.push(newPerson)

  res.json(newPerson)
})

const unknownEndpoint = (req, res) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})