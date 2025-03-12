import axios from "axios";
const baseBlogsUrl = "/api/blogs";
const baseLoginUrl = "/api/login";
const baseUsersUrl = "/api/users";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseBlogsUrl);
  return response.data;
};

const login = async (username, password) => {
  const response = await axios.post(baseLoginUrl, { username, password });
  return response.data;
};

const createBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(baseBlogsUrl, blog, config);
  return response.data;
};

const likeBlog = async (blog) => {
  blog.id = blog.id.toString();
  blog.likes++;
  const response = await axios.put(baseBlogsUrl + `/${blog.id}`, blog);
  return response.data;
};

const removeBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  blog.id = blog.id.toString();
  console.log(blog.id);
  const response = await axios.delete(baseBlogsUrl + `/${blog.id}`, config);
  return response.data;
};

const getUsers = async () => {
  const response = await axios.get(baseUsersUrl);
  return response.data;
};

const addComment = async (blog, comment) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  blog.id = blog.id.toString();
  const response = await axios.post(
    baseBlogsUrl + `/${blog.id}/comments`,
    comment,
    config
  );
  return response.data;
};

export default { setToken, getAll, login, createBlog, likeBlog, removeBlog , getUsers, addComment };
