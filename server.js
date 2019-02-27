var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
//var fs = require('fs');
var cors = require('cors');
var messages = require('./db');
var categories = require('./db');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get messages from the database @Inari
app.get('/api/messages', function (req, res) {
    messages.messages() // calling function in db.js
        .then(response => {
            res.send(response);
        });
})
// get messages from the database ordered by a category 
var topic;
app.get('/api/categories', function (req, res) {
    messages.categories(topic)
        .then(response => {
            res.send(response);
            console.log(response);
        });
})

// post to make a new new message into a table 'post' @Inari
app.post('/api/messages', function (req, res, next) {
    // const id = req.body.id // id of the message
    // const text = req.body.content; // Message text from the form
    // const time = req.body.created; // Timestamp from creation of the message
    // const thread = req.body.thread_id; //referencing to the thread id in table 'thread'
    // const user = req.body.user_id // referencing to the user id in table 'kayttaja'
    messages.post(content, created)
        .then(resolved => {
            console.log(resolved);
            res.send('New message added');
        })
});


app.use('/api', router);

let server = app.listen(3000, () => {
    console.log(`Server listening on ${server.address().port}`);
});


module.exports = app;
