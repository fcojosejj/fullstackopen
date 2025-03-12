const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const middleware = require("../utils/middleware");

/* const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
} */

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogsRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body;
    const user = request.user;

    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user.id,
    });

    const blog = await newBlog.save();
    user.blogs = user.blogs.concat(blog._id);
    await user.save();
    response.status(201).json(blog);
  },
);

blogsRouter.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    console.log(request.params);
    console.log("datos del usuario", user);
    const blog = await Blog.findById(request.params.id);

    if (user.id.toString() !== blog.user.toString())
      response.status(401).json({ error: "unauthorized" });
    else if (!blog) response.status(404).end();
    else {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    }
  },
);

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const newblog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newblog, {
    new: true,
  });
  response.status(200).json(updatedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;
  const blog = await Blog.findById(request.params.id);
  blog.comments.push(body);
  const comment = await blog.save();
  response.status(201).json(comment);
});

module.exports = blogsRouter;
