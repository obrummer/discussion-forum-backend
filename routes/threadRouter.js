const router = require('express').Router();
const db = require('../database/threadQueries');
const userhandler = require('../middlewares');

// ----- /api/thread route ----- //

// GET all threads
router.get('/', async (req, res) => {
    try {
        let dbResponse = await db.getAllThreads();
        if (!dbResponse || dbResponse.length === 0) {
            throw new Error('Thread query failed.')
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

// GET single thread by thread id
router.get('/id/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            success: false,
            message: 'Thread id required.'
        });
    }

    try {
        let dbResponse = await db.getThreadById(req.params.id);
        if (!dbResponse || dbResponse.length === 0) {
            throw new Error('Thread query failed.')
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

// GET threads by category name
router.get('/category/:category', async (req, res) => {
    if (!req.params.category) {
        return res.status(400).json({
            success: false,
            message: 'Category name required.'
        });
    }
    try {
        let dbResponse = await db.getThreadByCategory(req.params.category);
        if (!dbResponse || dbResponse.length === 0) {
            throw new Error('Thread query failed.')
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

// POST new thread 
// req body must contain 'topic', 'category', middleware adds author_id
// User must be logged in and authorization header must contain Bearer <token>
router.post('/', userhandler.verify, async (req, res) => {
    if (!req.body.topic || !req.body.category || !req.body.author_id) {
        return res.status(400).json({
            success: false,
            message: 'Topic, category or userId missing.'
        })
    }

    try {
        let dbResponse = await db.addThread(req.body.topic, req.body.category, req.body.author_id);
        if (!dbResponse || dbResponse.length === 0) {
            throw new Error('Thread addition failed.')
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
})

module.exports = router;