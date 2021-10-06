const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const app = express()

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors())

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1', // 127.0.0.1 is localhost
    user: '',
    password: '',
    database: 'smart-brain-db'
  }
})

app.get('/', (req, res) => {
  res.send('smart brain api root')
})

app.get('/users', (req, res) => {
  db.select('*').from('users')
    .then(dbres => {
      res.json(dbres)
    })
    .catch(err => res.status(400).json('error fetching users'))
})

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))
app.get('/profile/:id', (req, res) => profile.getProfile(req, res, db))
app.put('/image', (req, res) => image.handleImagePut(req, res, db))
app.post('/imageurl', (req, res) => image.handleApiCall(req, res))

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})