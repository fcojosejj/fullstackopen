const Blog = require('../models/blogs')
const User = require('../models/user')

const initialBlogs = [
  {
    "title": "Més que un club",
    "author": "Francisco José Jordán Jiménez",
    "url": "https://www.fcbarcelona.es/es/",
    "likes": 1889
  },
  {
    "title": "Solana Manda",
    "author": "Francisco José Jordán Jiménez",
    "url": "https://www.solanadetorralba.es/",
    "likes": 1961,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'test',
    author: 'test',
    url: 'https://www.test.com',
    likes: 0
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}