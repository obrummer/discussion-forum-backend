var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
//var fs = require('fs');
var cors = require('cors');
var messages = require('./db');
var users = require('./db');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get messages by user_id  @Inari
app.get('/api/messages/:user_id', function (req, res) {
    userid = req.params.user_id;
    messages.messagesId(userid) // calling function in db.js
        .then(response => {
            res.send(response);
        })
});
//get all users @Inari
app.get('/api/users', function (req, res) {
    users.users()
        .then(response => {
            res.send(response);
        })
})

//get all messages @Inari
app.get('/api/messages', function (req, res) {
    messages.messages()
        .then(response => {
            res.send(response);
        })
});
// get messages ordered by a category @Inari
var topic;
app.get('/api/categories', function (req, res) {
    messages.categories(topic)
        .then(response => {
            res.send(response);
            //console.log(response);
        })
});
// get messages by thread_id @Inari
app.get('/api/thread', function (req, res) {
    messages.threadId()
        .then(response => {
            console.log(response);
            res.send(response)
        })
})
// create a new new message into table 'post' @Inari
app.post('/api/messages', function (req, res, next) {
    const content = req.body.content;
    const created = req.body.created;
    messages.post(content, created)
        .then(resolved => {
            res.send('New message added');
        })
});
//create a new user into table 'kayttaja' @Inari
app.post('/api/users', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const created = req.body.created;
    users.postUser(username, password, created)
        .then(resolved => {
            res.send('New user added');
        })
});

//delete post by user_id and post's id @Inari
app.delete('/api/messages/:user_id/:id', (req, res, next) => {
    const postid = req.params.id;
    const userid = req.params.user_id;
    messages.deletePost(userid, postid)
        .then(resolved => {
            res.send('deleted ' + resolved.rowCount + ' rows');
        })
});

app.use('/api', router);

let server = app.listen(3000, () => {
    console.log(`Server listening on ${server.address().port}`);
});

module.exports = app;
