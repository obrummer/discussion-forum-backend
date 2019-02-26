var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var fs = require('fs');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.route('/messages').get(function (req, res) {
console.log("Täältä löytyy api");
res.json(messages);
})

app.use('/api', router);

let server = app.listen(3000, () => {
    console.log(`Server listening on ${server.address().port}`);
});

var messages = [
    {id: 1, msg: "Mitä kuuluu?"},
    {id: 2, msg: "Mitäs tässä, entäs sulle?"}
]
