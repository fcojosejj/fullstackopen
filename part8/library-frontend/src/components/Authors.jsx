import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import Select from "react-select"

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries : [
      { query: ALL_AUTHORS }
    ]
  })
  const authors = useQuery(ALL_AUTHORS)

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({
      variables: {
        name,
        born: Number(born)
      }
    })

    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }
  
 if (authors.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            name
            <Select 
              defaultValue={name}
              onChange={({ value }) => setName(value)}
              options={authors.data.allAuthors.map((a) => ({ value: a.name, label: a.name }))}
            />
          </div>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">set born</button>
          </form>
      </div>
    </div>
  )
}

export default Authors
