import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')


  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleQueryChange = (event) => setQuery(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    const nameObject = {
      name : newName,
      number : newNumber
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const peopleToShow = query === '' ? persons : persons.filter((p) => {
    return p.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter inputOnChange = {handleQueryChange}></Filter>
      
      <h2>Add a new</h2>
      <PersonForm onSubmit = {addPerson} onNameChange = {handleNameChange} onNumberChange = {handleNumberChange}></PersonForm>
      
      <h2>Numbers</h2>
      <Persons people = {peopleToShow}></Persons>
    </div>
  )
}

export default App