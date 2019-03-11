const router = require('express').Router();
const db = require('../database/userqueries');
const userhandler = require('../middlewares');

// ----- /api/users route ----- //

<<<<<<< HEAD
// GET all users
=======
// GET <retrieve all users>
>>>>>>> cbfa63c8c14c963bc47ba89337257480d3ac8112
// only for testing
router.get('/', async (req, res) => {
    try {
        let dbResponse = await db.getAllUsers();
<<<<<<< HEAD
        if (!dbResponse) { throw new Error('No users in database') }
        res.status(200).json({
            success: true,
            message: dbResponse
        })
=======
        if (!dbResponse) {
            throw new Error('No users in database')
        }
        res.status(200).json({
            success: true,
            message: dbResponse
        });
>>>>>>> cbfa63c8c14c963bc47ba89337257480d3ac8112
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

<<<<<<< HEAD
// POST register
=======
// POST <register username and password>
>>>>>>> cbfa63c8c14c963bc47ba89337257480d3ac8112
// parameters req.body.username, req.body.pwinput
// middleware calls next only if successful user creation
router.post('/register', userhandler.register, async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.body.username,
        message: 'user registration successful'
    })
});

<<<<<<< HEAD
// POST login
=======
// POST <login with username and password>
>>>>>>> cbfa63c8c14c963bc47ba89337257480d3ac8112
// parameters req.body.username, req.body.pwinput
// middleware calls next only if successful login
router.post('/login', userhandler.signIn, async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.body.username,
        message: 'user logged in'
    })
});

<<<<<<< HEAD

=======
>>>>>>> cbfa63c8c14c963bc47ba89337257480d3ac8112
module.exports = router;