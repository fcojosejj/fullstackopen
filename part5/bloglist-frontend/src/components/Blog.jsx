import { useEffect, useState } from 'react'

const Blog = ({ blog, handleLikeBlog, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [user, setUser] = useState(null)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (user) setUser(JSON.parse(user))
  }, [])

  return (
    <div style={blogStyle} data-testid='blog'>
      <div style={hideWhenVisible}>
        {blog.title}.
        <button onClick={() => setVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={() => setVisible(false)}>hide</button>
        <p>Title: {blog.title}</p>
        <p>Author: {blog.author}</p>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={() => handleLikeBlog(blog)}>like</button></p>
        {user && user.username === blog.user.username &&
          <button onClick={() => handleRemove(blog)}>remove</button>
        }
      </div>
    </div>
  )
}

export default Blog