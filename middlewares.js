const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./database/userqueries');
require('dotenv').config();

exports.logger = (req, res, next) => {
    console.log(`${req.method} request to ${req.originalUrl} send at ${new Date().toLocaleTimeString('fi')}`);
    next();
}

exports.register = [(req, res, next) => {

    if (!req.body.username || !req.body.pwinput) {
        return res.status(400).json({
            success: false,
            message: "Username or password undefined!"
        })
    }

    next();

}, async (req, res, next) => {

    try {
        let hashword = bcrypt.hashSync(req.body.pwinput, 10);
        let userCreation = await db.createUser(req.body.username, hashword);
        console.log(userCreation);
        if (userCreation.length === 0) {
            throw new Error('User not created for unknown reason.')
        };
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

    next();

}];

exports.signIn = [(req, res, next) => {

    if (!req.body.username || !req.body.pwinput) {
        return res.status(400).json({
            success: false,
            message: "Username or password undefined!"
        })
    }

    next();

}, async (req, res, next) => {

    try {
        let user = await db.getUserByName(req.body.username);
        if (!user || user.length === 0) {
            throw new Error('Username does not exist.');
        }
        let pWordComparison = bcrypt.compareSync(req.body.pwinput, user[0].password);
        if (pWordComparison) {
            let tokenObj = { token: jwt.sign({ username: user[0].username, id: user[0].id }, process.env.SECRET, { expiresIn: "4h" }) };
            res.setHeader("Authorization", "Bearer " + tokenObj.token);
        } else {
            throw new Error('Password incorrect!');
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }

    next();

}];

exports.verify = (req, res, next) => {

    const tkn = req.headers.authorization;

    try {
        if (!tkn) {
            throw new Error('Authorization missing');
        }
        let parsedToken = tkn.split(' ')[1].trim();
        let decoded = jwt.verify(parsedToken, process.env.SECRET);
        req.body.author_id = decoded.id;
        req.body.author_name = decoded.username
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }

    next();

};