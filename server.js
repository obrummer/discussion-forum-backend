var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var cors = require('cors');
var messages = require('./db');
const uh = require('./userhandlers');
const jwt = require('jsonwebtoken');

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
    messages.users()
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
app.get('/api/thread/:thread_id', function (req, res) {
    let thread_id = req.params.thread_id;
    if (!thread_id) {
        res.status(400).send({ msg: "no id" });
    }
    messages.getWithThreadId(thread_id)
        .then(response => {
            console.log(response);
            res.send(response)
        })
})

// create a new message into table 'post' @Inari
// $ JWT verification required!
app.post('/api/messages', function (req, res, next) {
    const content = req.body.content;
    const created = req.body.created;
    messages.post(content, created)
        .then(resolved => {
            res.send('New message added');
        })
});

// create new discussion thread
// body must contain 'topic', 'category' and 'author_id' keys
// $ authorization required!
// must return thread id
app.post('/api/thread', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send({ success: false, msg: "Unauthorized user!" });
        return;
    };
    let topic = req.body.topic;
    let id = req.body.author_id;
    let category = req.body.category;
    messages.insertThread(id, topic, category)
        .then(response => {
            if (response) {
                res.status(201).send(response[0]);
                return;
            }
        })
        .catch(error => {
            console.log('tuli virhe');
            res.status(500).send("Thread creation failed");
        })
})

//create a new user into table 'kayttaja' @Inari
// $ hashed password created!
app.post('/api/users', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    uh.register(username, password).then(response => {
        if (response) {
            res.status(201).send({
                success: true,
                msg: 'user created!'
            });
        } else {
            res.status(500).send({
                success: false
            });
        }
    })
        .catch(err => res.status(500).send({ success: false }));
});

// login method @juhanir
// $ returns JWT with used id and name payload
app.post('/api/users/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    uh.signIn(username, password)
        .then(response => {
            if (response.token) {
                let userid = jwt.decode(response.token).id;
                let uname = jwt.decode(response.token).username;
                res.status(200).json({
                    success: true,
                    token: response.token,
                    id: userid,
                    name: uname
                });
            } else {
                res.status(401).send({ success: false });
            }
        })
        .catch(err => res.status(500).send({ success: false }));
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

let server = app.listen(3001, () => {
    console.log(`Server listening on ${server.address().port}`);
});

module.exports = app;
