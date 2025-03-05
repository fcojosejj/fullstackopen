import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))

        dispatch(notificationChange(`you added "${content}"`))
        setTimeout(() => dispatch(notificationChange('')), 5000)
    }

    return (
      <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name="anecdote" /></div>
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default AnecdoteForm