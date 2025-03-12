import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from 'react-bootstrap'
import PropTypes from "prop-types";

const BlogForm = ({ handleNewBlog }) => {
  const dispatch = useDispatch();
  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = (event) => {
    event.preventDefault()
    handleNewBlog({ title, author, url })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <h2>create new blog</h2>
      <Form onSubmit={createBlog}>
        <div>
          title
          <input
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button type="submit">create blog</Button>
      </Form>
    </div>
  );
};

export default BlogForm;
