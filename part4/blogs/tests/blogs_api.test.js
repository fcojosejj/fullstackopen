const { test, after, beforeEach, describe } = require('node:test')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blogs')
const blogs = require('../models/blogs')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogs = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('obtain blogs', () => {
  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
  
  test('blogs have a property called id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    response.body.forEach(blog => {
      assert.ok(Object.hasOwn(blog, 'id'))
    })
  })
})

describe('create a blog', () => {
  test('a blog can be created', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'New author',
      url: 'https://www.new.com',
      likes: 10
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
      const response = await helper.blogsInDb()
      assert.strictEqual(response.length, helper.initialBlogs.length + 1)
  })
  
  test('if a blog does not have like property, it is set to 0', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'New author',
      url: 'https://www.new.com',
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await helper.blogsInDb()
    assert.strictEqual(response[response.length - 1].likes, 0)
  })
  
  test('if a blog does not have title or url property, it is not created', async () => {
    const newBlog = {
      author: 'New author',
      likes: 10
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const response = await helper.blogsInDb()
    assert.strictEqual(response.length, helper.initialBlogs.length)
  })
})

describe('delete a blog', () => {
  test('a non existing blog cannot be deleted', async () => {
    const nonExistingId = await helper.nonExistingId()
    const response = await api
      .delete(`/api/blogs/${nonExistingId}`)
      .expect(404)
  })

  test('a blog can be deleted', async () => {
    const blogsBeforeDelete = await helper.blogsInDb()
  
    const response = await api
      .delete(`/api/blogs/${blogsBeforeDelete[blogsBeforeDelete.length - 1].id}`)
      .expect(204)
  
    const response2 = await helper.blogsInDb()
    assert.strictEqual(response2.length, blogsBeforeDelete.length - 1)
  })
})

describe('update a blog', () => {
  test('a non existing blog cannot be updated', async () => {
    const newBlog = {
      title: "Més que un club",
      author: "Francisco José Jordán Jiménez",
      url: "https://www.fcbarcelona.es/es/",
      likes: 6
    }
  
    const nonExistingId = await helper.nonExistingId()
    await api
      .put(`/api/blogs/${nonExistingId}`)
      .send(newBlog)
      .expect(404)
  })

  test('a blog can be updated', async () => {
    const newBlog = {
      title: "Més que un club",
      author: "Francisco José Jordán Jiménez",
      url: "https://www.fcbarcelona.es/es/",
      likes: 6
    }
  
    const blogs = await helper.blogsInDb()
  
    await api
      .put(`/api/blogs/${blogs[0].id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await helper.blogsInDb()
    assert.strictEqual(response[0].title, 'Més que un club')
    assert.strictEqual(response[0].likes, 6)
  })
})

after(async () => {
  await mongoose.connection.close()
})