const express = require('express')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

//Imported and Utilize Dependencies (Express, Mongoose, BodyParser)

const db = mongoose.connection
const app = express()
const port = 3000


//Initialized Express, Connection String to Mongo, and Assigned Port

let db_status = 'Ooops, MongoDB connection not successful.'

//Created a variable to tell if connection is not successful

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => db_status = 'Look HLK, I Successfully opened connection to Mongo!')

app.get('/', (req, res) => {
  res.send(db_status)
})

//Set up Route Handlers for a Get Request

app.listen(port, () => console.log(`Example app listening on port ${port}!`))