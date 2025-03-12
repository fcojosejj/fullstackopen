import { useDispatch } from "react-redux"
import { createComment } from "../reducers/blogReducer"
import { Form, Button } from 'react-bootstrap'

const Comments = ({ blog }) => {
    const dispatch = useDispatch()

    const addComment = async (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        dispatch(createComment(blog, { text: comment }))
        event.target.comment.value = ''
    }

    return (
        <div>
            <h3>comments</h3>
            <Form onSubmit={addComment}>
                <input type="text" name="comment" placeholder="comment" />
                <Button type="submit">add comment</Button>
            </Form>
            {(blog.comments.length > 0) ? (
                <div>
                    <ul>
                        {blog.comments.map((comment) => (
                            <li key={comment.id}>{comment.text}</li>
                        ))}
                    </ul>

                </div>
            ) : <p>no comments yet</p>}
        </div>
    )
}

export default Comments