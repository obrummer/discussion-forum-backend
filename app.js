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
});
