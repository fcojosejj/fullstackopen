import Person from "./Person"

const PersonList = ({ persons, filter, deletePerson }) => {
    return (
        <ul>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map(person =>
            <li key={person.id}><Person name={person.name} number={person.number} /> <button onClick={() => deletePerson(person.id)}>delete</button></li>
          )}
      </ul>
    )
}

export default PersonList