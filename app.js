const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mw = require('./middlewares');
const userRoute = require('./routes/usersRouter');
const threadRoute = require('./routes/threadRouter');
const messageRoute = require('./routes/messageRouter');

const app = express();
const router = express.Router();

// app-level middleware
app.use(cors());
app.use(bodyParser.json());
app.use(mw.logger);
app.use('/api', router);

// routes
router.use('/users', userRoute);
router.use('/thread', threadRoute);
router.use('/messages', messageRoute);

router.get('/', (req, res) => {
    res.send('hello from api root!');
})

let server = app.listen(3001, () => {
    console.log(`Server listening on ${server.address().port}`);
});