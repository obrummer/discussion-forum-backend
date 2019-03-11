const pool = require('./db');

const getAllMessagesByThreadId = async threadId => {
    let client;
    try {
        client = await pool.connect();
        let sql =
            'SELECT post.content, post.created, post.id, post.thread_id, users.username FROM post, users WHERE thread_id=$1 AND post.user_id=users.id ORDER BY post.created ASC;';
        let res = await client.query(sql, [threadId]);
        return res.rows;
    } catch (error) {
        return false;
    } finally {
        if (client) {
            client.release();
        }
    }
};

const getMessageById = async messageId => {
    let client;
    try {
        client = await pool.connect();
        let sql = 'SELECT * FROM post WHERE id=$1;';
        let res = await client.query(sql, [messageId]);
        return res.rows;
    } catch (error) {
        return false;
    } finally {
        if (client) {
            client.release();
        }
    }
};

const insertNewMessage = async (content, thread_id, user_id) => {
    let client;
    try {
        client = await pool.connect();
        let sql =
            'INSERT INTO post (content, thread_id, user_id) VALUES ($1, $2, $3) RETURNING *;';
        let res = await client.query(sql, [content, thread_id, user_id]);
        return res.rows;
    } catch (error) {
        return false;
    } finally {
        if (client) {
            client.release();
        }
    }
};

module.exports = {
    getAllMessagesByThreadId,
    insertNewMessage,
    getMessageById
};
