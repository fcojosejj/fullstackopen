const { test, after, before, describe } = require('node:test')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

before(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'fcojosejj',
      name: 'Francisco José Jordán Jiménez',
      password: 'solana1234',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with an existing username', async () => {
    const newUser = {
      username: 'root',
      name: 'Francisco José Jordán Jiménez again',
      password: 'solana1234',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('creation fails with a too short password', async () => {
    const newUser = {
      username: 'fcojosejj',
      name: 'Francisco José Jordán Jiménez',
      password: 'so',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })

  test('creation fails with a too short username', async () => {
    const newUser = {
      username: 'f',
      name: 'Francisco José Jordán Jiménez',
      password: 'solana1234',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('creation fails with no username', async () => {
    const newUser = {
      name: 'Francisco José Jordán Jiménez',
      password: 'solana1234',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('creation fails with no password', async () => {
    const newUser = {
      username: 'fcojosejj',
      name: 'Francisco José Jordán Jiménez',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})