import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { changeNotification } from "../reducers/notificationReducer";
import Blog from "./Blog";

const BlogList = () => {
    const dispatch = useDispatch()
    const initialBlogs = useSelector(state => state.blogs)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        setBlogs([...initialBlogs].sort((a, b) => b.likes - a.likes))
    }, [initialBlogs]);

    const handleLikeBlog = async (blog) => {
        dispatch(likeBlog({ ...blog }));
      };
    
      const handleRemove = async (blog) => {
        if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
          try {
            dispatch(removeBlog({ ...blog }))
            dispatch(changeNotification(`Blog ${blog.title} was deleted`, 3));
          } catch (error) {
            dispatch(changeNotification("Error removing blog", 3));
          }
        }
      };

    return (
        <div data-testid="bloglist">
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleLikeBlog={handleLikeBlog}
                    handleRemove={handleRemove}
                />
            ))}
        </div>
    )
}

export default BlogList