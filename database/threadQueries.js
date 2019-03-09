const pool = require('./db');

const getAllThreads = async () => {
    let client;
    try {
        client = await pool.connect();
        let sql = 'SELECT * FROM thread ORDER BY category, topic ASC;'
        let res = await client.query(sql);
        return res.rows;
    } catch (error) {
        return false;
    } finally {
        if (client) {
            client.release();
        }
    }
}

const getThreadById = async (id) => {
    let client;
    try {
        client = await pool.connect();
        let sql = 'SELECT * FROM thread WHERE id=$1;'
        let res = await client.query(sql, [id]);
        return res.rows;
    } catch (error) {
        return false;
    } finally {
        if (client) {
            client.release();
        }
    }
}

const getThreadByCategory = async (name) => {
    let client;
    try {
        client = await pool.connect();
        let sql = 'SELECT * FROM thread WHERE category LIKE $1 ORDER BY topic ASC;'
        let res = await client.query(sql, [name]);
        return res.rows;
    } catch (error) {
        return false;
    } finally {
        if (client) {
            client.release();
        }
    }
}

const addThread = async (topic, category, userId) => {
    let client;
    try {
        client = await pool.connect();
        let sql = 'INSERT INTO thread (topic, category, user_id) VALUES ($1, $2, $3) RETURNING *;'
        let res = await client.query(sql, [topic, category, userId]);
        return res.rows;
    } catch (error) {
        return false;
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = {
    getAllThreads,
    getThreadById,
    getThreadByCategory,
    addThread
}