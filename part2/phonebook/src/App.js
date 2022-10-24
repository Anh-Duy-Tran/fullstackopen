import { useState, useEffect} from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './service/person'

const App = () => {
  const [persons, setPersons] = useState([])

  const hook = () => {
    personService
      .getAll()
      .then(initPeople => setPersons(initPeople))
      .catch(err => alert('fail'))
  }

  useEffect(hook, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')


  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleQueryChange = (event) => setQuery(event.target.value)

  const onDeleteClick = (event) => {
    const personToDel = persons.find((p) => p.id === Number.parseInt(event.target.value))

    if (window.confirm(`Delete contact ${personToDel.name}`)) {
      personService.remove(event.target.value)
      setPersons(persons.filter((p) => p.id !== Number.parseInt(event.target.value)))
    }
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.find((p) => p.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToPut = persons.find((p) => p.name === newName)
        personService.update(personToPut.id, {...personToPut, number : newNumber})
        
        const updatedPersons = [...persons]
        updatedPersons.find((p) => p.name === newName).number = newNumber
        setPersons(updatedPersons)
      }
      return;
    }

    const nameObject = {
      name : newName,
      number : newNumber
    }
    
    personService
      .create(nameObject)
      .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
      .catch(err => alert('fail'))
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
      <Persons people = {peopleToShow} onDeleteClick={onDeleteClick}></Persons>
    </div>
  )
}

export default App