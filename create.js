const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//Imported and Utilize Dependencies (Express, Mongoose, BodyParser)

mongoose.connect('mongodb://localhost/test')
const db = mongoose.connection
const app = express()
const port = 3000


//Initialized Express, Connection String to Mongo, and Assigned Port

app.use(bodyParser.json())

let db_status = 'Oops, MongoDB connection not successful.'

//Created a variable to tell if connection is not successful

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => db_status = 'Look HLK, I Successfully opened connection to Mongo!')

const postSchema = new mongoose.Schema({
  title: String,
  body: String
})

const Post = mongoose.model('Post', postSchema)

app.get('/', (req, res) => {
  res.send(db_status)
})

app.post('/add', (req, res) => {
  const newPost = new Post(req.body)
  newPost.save((err, post) => { return err ? res.sendStatus(500).json(err) : res.json(post) })
})

//Set up Route Handlers to get a Post Request to add a Post

app.listen(port, () => console.log(`Example app listening on port ${port}!`))