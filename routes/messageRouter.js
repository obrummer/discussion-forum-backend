const router = require('express').Router();
const db = require('../database/messageQueries');
const userhandler = require('../middlewares');


// ----- /api/messages route ----- //

<<<<<<< HEAD
// GET all messages per thread id
=======
// GET <retrieve all messages per thread id>
>>>>>>> cbfa63c8c14c963bc47ba89337257480d3ac8112
router.get('/thread/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            success: false,
            message: 'Thread id must be present in params.'
        });
    }
<<<<<<< HEAD

    try {
        let dbResponse = await db.getAllMessagesByThreadId(req.params.id);
        if (!dbResponse || dbResponse.length === 0) {
=======
    try {
        let dbResponse = await db.getAllMessagesByThreadId(req.params.id);
        if (!dbResponse) {
>>>>>>> cbfa63c8c14c963bc47ba89337257480d3ac8112
            throw new Error('Message retrieval failed.')
        }
        res.status(200).json({
            success: true,
            message: dbResponse
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

<<<<<<< HEAD
// GET single message per message id
=======
// GET <retrieve single message per message id>
>>>>>>> cbfa63c8c14c963bc47ba89337257480d3ac8112
router.get('/id/:id', userhandler.verify, async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            success: false,
            message: 'Message id must be present in params.'
        });
    }
<<<<<<< HEAD

=======
>>>>>>> cbfa63c8c14c963bc47ba89337257480d3ac8112
    try {
        let dbResponse = await db.getMessageById(req.params.id);
        if (!dbResponse || dbResponse.length === 0) {
            throw new Error('Message retrieval failed.')
        }
        res.status(200).json({
            success: true,
            message: dbResponse
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

<<<<<<< HEAD
// POST new message to thread
=======
// POST <add new message to thread>
>>>>>>> cbfa63c8c14c963bc47ba89337257480d3ac8112
// request body must contain content, thread_id, (author_id added by middleware)
// user must be logged in
router.post('/', userhandler.verify, async (req, res) => {
    if (!req.body.content || !req.body.thread_id) {
        return res.status(400).json({
            success: false,
            message: 'Content or userId undefined.'
        })
    }
    try {
        let dbResponse = await db.insertNewMessage(req.body.content, req.body.thread_id, req.body.author_id);
        if (!dbResponse || dbResponse.length === 0) {
            throw new Error('Message addition failed.')
        }
        res.status(200).json({
            success: true,
            message: dbResponse
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

module.exports = router;