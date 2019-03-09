const router = require('express').Router();
const db = require('../database/messageQueries');
const userhandler = require('../middlewares');


// ----- /api/messages route ----- //

// GET <retrieve all messages per thread id>
router.get('/thread/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            success: false,
            message: 'Thread id must be present in params.'
        });
    }
    try {
        let dbResponse = await db.getAllMessagesByThreadId(req.params.id);
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

// GET <retrieve single message per message id>
router.get('/id/:id', userhandler.verify, async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            success: false,
            message: 'Message id must be present in params.'
        });
    }
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

// POST <add new message to thread>
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