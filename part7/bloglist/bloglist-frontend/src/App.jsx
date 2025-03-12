import { useEffect, useRef, useState } from "react";
import blogService from "./services/blogs";
import Message from "./components/Message";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { changeNotification } from "./reducers/notificationReducer";
import { setUser } from "./reducers/loginReducer";
import { getAllBlogs, createBlog } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import { initializeUsers } from "./reducers/userReducer";
import Users from "./components/UserList";
import User from "./components/User";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useParams, useNavigate } from 'react-router-dom'
import Menu from "./components/Menu";

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const user = useSelector(state => state.user);
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(getAllBlogs())
    dispatch(initializeUsers())
    if (user) {
      blogService.setToken(user.token);
    }
  }, [dispatch, user]);

  const handleNewBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog));
      blogFormRef.current.toggleVisibility();
      dispatch(changeNotification(`A new blog ${newBlog.title} was created by ${newBlog.author}`, 3));
    } catch (error) {
      dispatch(changeNotification("Error creating a new blog", 3));
    }
  };

  if (user === null) {
    return (
      <Router>
        <Login />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div>
        <Menu />
        <Message />

        <Routes>
          <Route path="/" element={
            <div>
              <Togglable buttonLabel="create blog" ref={blogFormRef}>
                <BlogForm handleNewBlog={handleNewBlog} />
              </Togglable>

              <BlogList />
            </div>
          } />

          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<User users={users} />} />
          <Route path="blogs/:id" element={<Blog blogs={blogs}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
