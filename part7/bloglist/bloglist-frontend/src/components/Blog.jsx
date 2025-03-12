
import { Button } from 'react-bootstrap'
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { changeNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom'
import Comments from "./Comments";

const Blog = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLikeBlog = async (blog) => {
    dispatch(likeBlog({ ...blog }));
  };

  const handleRemove = async (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      try {
        dispatch(removeBlog({ ...blog }))
        dispatch(changeNotification(`Blog ${blog.title} was deleted`, 3));
        navigate('/')
      } catch (error) {
        dispatch(changeNotification("Error removing blog", 3));
      }
    }
  };

  return (
    <div data-testid="blog">
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <p>Likes: {blog.likes}</p>
        <Button onClick={() => handleLikeBlog(blog)}>like</Button>
      </div>
      <p>added by {blog.author}</p>
      <Button onClick={() => handleRemove(blog)}>remove</Button>
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;
