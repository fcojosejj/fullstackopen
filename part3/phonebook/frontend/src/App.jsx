import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import service from './services/routes'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [succesMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    service.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName) && window.confirm(`A person with name ${newName} already exists. Do you want to overwrite its number?`)) {
      service.update(persons.find(person => person.name === newName).id, {
        name: newName,
        number: newNumber,
      }).then(returnedPerson => {
        setPersons(persons.map(person => person.name === newName ? returnedPerson : person))
        setNewName('')
        setNewNumber('')

        setSuccessMessage(
          `Mr./Mrs. '${newName}' number has been updated`
        )

        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      }).catch(error => {
        setErrorMessage(
          error.response.data.error
        )
        setNewName('')
        setNewNumber('')

        setTimeout(() => {
          setErrorMessage(null)
          location.reload()
        }, 3000)
      })
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      service.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setSuccessMessage(
          `Mr./Mrs. '${returnedPerson.name}' has been added to the phonebook`
        )

        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      }). catch(error => {
        setErrorMessage(
          error.response.data.error
        )
        setNewName('')
        setNewNumber('')

        setTimeout(() => {
          setErrorMessage(null)
          location.reload()
        }, 3000)
      })
    }
  }

  const deletePerson = id => {
    if (window.confirm(`Are you sure you want to delete ${persons.find(person => person.id === id).name}?`)) {
      service.deletePerson(id).then(
        alert(`Person deleted successfully`),
        location.reload()
      )
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage message={errorMessage} />
      <Notification message={succesMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new number</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNewNameChange={handleNewNameChange} handleNewNumberChange={handleNewNumberChange} addNumber={addNumber} />
      <h2>Numbers</h2>
      <PersonList persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
