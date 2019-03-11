const pool = require('./db');

// returns all users from user table
const getAllUsers = async () => {
    let client;
    try {
        client = await pool.connect();
        const sql = 'SELECT * FROM users;';
        const res = await client.query(sql);
        return res.rows;
    } catch (error) {
        return false;
    } finally {
        if (client) {
            client.release();
        }
    }
};

// returns user by username
const getUserByName = async uName => {
    let client;
    try {
        client = await pool.connect();
        const sql =
            'SELECT id, username, password FROM users WHERE username LIKE $1;';
        const res = await client.query(sql, [uName]);
        return res.rows;
    } catch (error) {
        return false;
    } finally {
        if (client) {
            client.release();
        }
    }
};

// creates a new user into user table
const createUser = async (uName, pWord) => {
    let client;
    try {
        client = await pool.connect();
        const sql =
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username;';
        let res = await client.query(sql, [uName, pWord]);
        return res.rows;
    } catch (error) {
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
};

module.exports = {
    getAllUsers,
    getUserByName,
    createUser
};
