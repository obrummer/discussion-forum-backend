const router = require('express').Router();
const db = require('../database/userQueries');
const userhandler = require('../middlewares');

// ----- /api/users route ----- //

// GET <retrieve all users>
// only for testing
router.get('/', async (req, res) => {
    try {
        let dbResponse = await db.getAllUsers();
        if (!dbResponse) {
            throw new Error('No users in database')
        }
        res.status(200).json({
            success: true,
            message: dbResponse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

// POST <register username and password>
// parameters req.body.username, req.body.pwinput
// middleware calls next only if successful user creation
router.post('/register', userhandler.register, async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.body.username,
        message: 'user registration successful'
    })
});

// POST <login with username and password>
// parameters req.body.username, req.body.pwinput
// middleware calls next only if successful login
router.post('/login', userhandler.signIn, async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.body.username,
        message: 'user logged in'
    })
});

module.exports = router;