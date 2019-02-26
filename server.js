var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
//var fs = require('fs');
var cors = require('cors');
var messages = require ('./db');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get messages from the database @Inari
app.get('/api/messages', function (req, res) {
    messages.messages()
    .then(response => {
    res.send(response);
    });
})

app.use('/api', router);

let server = app.listen(3000, () => {
    console.log(`Server listening on ${server.address().port}`);
});


module.exports = app;
