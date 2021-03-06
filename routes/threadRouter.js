const router = require('express').Router();
const db = require('../database/threadQueries');
const userhandler = require('../middlewares');

// ----- /api/thread route ----- //

// GET <retrieve all threads>
router.get('/', async (req, res) => {
    try {
        let dbResponse = await db.getAllThreads();
        if (!dbResponse || dbResponse.length === 0) {
            throw new Error('Thread query failed.');
        }
        res.status(200).json({ success: true, message: dbResponse });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET <retrieve single thread by thread id>
router.get('/id/:id', async (req, res) => {
    if (!req.params.id) {
        return res
            .status(400)
            .json({ success: false, message: 'Thread id required.' });
    }
    try {
        let dbResponse = await db.getThreadById(req.params.id);
        if (!dbResponse || dbResponse.length === 0) {
            throw new Error('Thread query failed.');
        }
        res.status(200).json({ success: true, message: dbResponse });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET <retrieve threads by category id>
router.get('/category/:id', async (req, res) => {
    if (!req.params.id) {
        return res
            .status(400)
            .json({ success: false, message: 'Category id required.' });
    }
    try {
        let dbResponse = await db.getThreadByCategory(req.params.id);
        if (!dbResponse || dbResponse.length === 0) {
            throw new Error('Thread query failed.');
        }
        res.status(200).json({ success: true, message: dbResponse });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST <add new thread>
// req body must contain 'topic', 'category_id', middleware adds author_id
// User must be logged in and authorization header must contain Bearer <token>
router.post('/', userhandler.verify, async (req, res) => {
    if (!req.body.topic || !req.body.category_id || !req.body.author_id) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'Topic, category or userId missing.'
            });
    }
    try {
        let dbResponse = await db.addThread(
            req.body.topic,
            req.body.category_id,
            req.body.author_id
        );
        if (!dbResponse || dbResponse.length === 0) {
            throw new Error('Thread addition failed.');
        }
        res.status(200).json({ success: true, message: dbResponse });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
