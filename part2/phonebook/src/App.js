import { useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => {
        setPersons(res.data)
      })
  }

  useEffect(hook, [])

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