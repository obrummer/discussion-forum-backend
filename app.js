<<<<<<< HEAD
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors');
const mw = require('./middlewares');
const userRoute = require('./routes/usersRouter');
const threadRoute = require('./routes/threadRouter');
const messageRoute = require('./routes/messageRouter');


// app-level middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(mw.logger);

// routes
app.use('/api/users', userRoute);
app.use('/api/thread', threadRoute);
app.use('/api/messages', messageRoute);

router.get('/', (req, res) => {
    res.send('hello from root!');
})

app.use('/api', router);
let server = app.listen(3001, () => {
    console.log(`Server listening on ${server.address().port}`);
=======
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mw = require("./middlewares");
const userRoute = require("./routes/usersRouter");
const threadRoute = require("./routes/threadRouter");
const messageRoute = require("./routes/messageRouter");
const categoryRoute = require("./routes/categoryRouter");

const app = express();
const router = express.Router();

// app-level middleware
app.use(cors());
app.use(bodyParser.json());
app.use(mw.logger);
app.use("/api", router);

// routes
router.use("/users", userRoute);
router.use("/thread", threadRoute);
router.use("/messages", messageRoute);
router.use("/categories", categoryRoute);

router.get("/", (req, res) => {
  res.send("hello from api root!");
});

let server = app.listen(3001, () => {
  console.log(`Server listening on ${server.address().port}`);
>>>>>>> cbfa63c8c14c963bc47ba89337257480d3ac8112
});
