import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  };

  const initialBlogs = useSelector(state => state.blogs)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    setBlogs([...initialBlogs].sort((a, b) => b.likes - a.likes))
  }, [initialBlogs]);



  return (
    <div data-testid="bloglist">
      <h1>blogs</h1>
      <Table striped>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  )
}

export default BlogList