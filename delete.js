const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Imported and Utilize Dependencies (Express, Mongoose, BodyParser)

const db = mongoose.connection;
const app = express();
const port = 3000;

//Initialized Express, Connection String to Mongo, and Assigned Port

app.use(bodyParser.json());

let db_status = 'MongoDB Connection not successful.'
//Created a variable to tell if connection is not successful

db.on('error', console.error.bind(console, 'connection error:' ));
db.once('open', () => db_status = 'Look HLK, I Successfully opened connection to Mongo!');

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
})

const Post = mongoose.model('Post', postSchema);


app.get("/", async (req, res) => {
    res.send(db_status)
})

app.post('/add', async (req, res) => {
    const newPost = new Post(req.body)
    newPost.save((err, post) => { return err ? res.sendStatus(500).json(err) : res.json(post) })
})

app.delete('/delete', async (req, res) => {
    Post.findByIdAndRemove(req.body.id, {}, (error, data) => {
        if (error) return res.sendStatus(500).json(error)
        return res.json(req.body)
    })
})
 
app.patch('/update', async (req, res) => {
    Post.findByIdAndUpdate(req.body.id, {$set: { title: req.body.title, body: req.body.body } }, (error, data) => {
        if (error) return res.sendStatus(500).json(error)
        return res.json(req.body)
    })
})

//Set up Route Handlers for CRUD API Testing

app.listen(3000, () => { 
    console.log("Listening at :3000...");
});

//Assigned the port to listen and console log the string