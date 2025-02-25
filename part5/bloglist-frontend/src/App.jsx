import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Message from './components/Message'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [change, setChange] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
    setChange(false)
  }, [message, change])

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await blogService.login(username, password)

      window.localStorage.setItem('user', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    location.reload()
  }

  const handleNewBlog = async (newBlog) => {
    try {
      blogService.setToken(user.token)
      await blogService.createBlog(newBlog)
      blogFormRef.current.toggleVisibility()
      setMessage(`A new blog ${newBlog.title} was created by ${newBlog.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (error) {
      setMessage('Error creating a new blog')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleLikeBlog = async (blog) => {
    blogService.setToken(user.token)
    await blogService.likeBlog(blog)
    setChange(true)
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      try {
        blogService.setToken(user.token)
        await blogService.removeBlog(blog)
        setChange(true)
        setMessage(`Blog ${blog.title} was deleted`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      } catch (error) {
        setMessage('Error removing blog')
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Message message={message} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Message message={message} />
      <div>
        <p>{user.username} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLabel="create blog" ref={blogFormRef}>
        <BlogForm handleNewBlog={handleNewBlog} />
      </Togglable>

      <div data-testid='bloglist'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLikeBlog={handleLikeBlog} handleRemove={handleRemove} />
        )}
      </div>
    </div>
  )
}

export default App