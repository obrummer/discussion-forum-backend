const Pool = require('pg').Pool;
require('dotenv').config();

const conopts = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: 'localhost',
    database: process.env.PGDATABASE,
    port: 5432
}

const pool = new Pool(conopts);

// selects all messages from table 'post' @Inari
const messages = () => {
    return pool.connect()
        .then(client => {
            const sql = 'SELECT * from post';
            return client.query(sql)
                .then(res => {
                    client.release();
                    return res.rows;
                })
                .catch(err => {
                    client.release();
                    console.error(err);
                });
        })
}

//selects all users from table 'kayttaja' @Inari
const users = () => {
    return pool.connect()
        .then(client => {
            const sql = 'SELECT * from users';
            return client.query(sql)
                .then(res => {
                    client.release();
                    return res.rows;
                })
                .catch(err => {
                    client.release();
                    console.error(err);
                });
        })
}

// select all topics by category
const getThreadsByCategory = async (category) => {
    let lCaseCat = category.toLowerCase();
    let client;
    try {
        client = await pool.connect();
        const sql = 'SELECT * FROM thread WHERE category LIKE $1;';
        const res = await client.query(sql, [lCaseCat]);
        return res.rows;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (client) {
            client.release();
        }
    }
}

//selects messages by user_id and by post's id @Inari
const messagesId = (userid) => {
    return pool.connect()
        .then(client => {
            const sql = 'SELECT content FROM post WHERE user_id=$1;';
            return client.query(sql, [userid])
                .then(res => {
                    client.release();
                    return res.rows;
                })
                .catch(err => {
                    client.release();
                    console.error(err);
                });
        })
}

// inserts new thread into tread table
const insertThread = async (author_id, topic, category) => {
    let client;
    try {
        client = await pool.connect();
        const sql = 'INSERT INTO thread (user_id, topic, category) VALUES ($1, $2, $3) RETURNING *;';
        const res = await client.query(sql, [author_id, topic, category]);
        return res.rows;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (client) {
            client.release();
        }
    }
}

//selects messages by user_id and by post's id @Inari
const getWithThreadId = (thread_id) => {
    return pool.connect()
        .then(client => {
            const sql = 'SELECT post.content, post.created, post.id, post.thread_id, users.username FROM post, users WHERE thread_id=$1 AND post.user_id=users.id ORDER BY created;';
            return client.query(sql, [thread_id])
                .then(res => {
                    client.release();
                    return res.rows;
                })
                .catch(err => {
                    client.release();
                    console.error(err);
                });
        })
}

// get category with thread ID
const threadId = async (thread_id) => {
    let client;
    try {
        client = await pool.connect();
        const sql = 'SELECT category FROM thread WHERE id=$1;';
        const res = await client.query(sql, [thread_id]);
        return res.rows;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (client) {
            client.release();
        }
    }
}

//selects topics from table 'thread' and orders them by category @Inari
const categories = () => {
    return pool.connect()
        .then(client => {
            const sql = 'SELECT * FROM thread ORDER BY category;';
            return client.query(sql)
                .then(res => {
                    client.release();
                    return res.rows;
                })
                .catch(err => {
                    client.release();
                    console.error(err);
                });
        })
}
// deletes user's own (user_id) message by post's id @Inari
const deletePost = (userid, postid) => {
    return pool.connect()
        .then(client => {
            const sql = `DELETE FROM post WHERE user_id=$1 AND id=$2;`;
            return client.query(sql, [userid, postid])
                .then(res => {
                    client.release();
                    return res;
                })
                .catch(err => {
                    client.release();
                    console.error(err);
                });
        })
}

// insert new message
const insertMessage = async (author_id, thread_id, text) => {
    let client;
    try {
        client = await pool.connect();
        const sql = 'INSERT INTO post (user_id, thread_id, content) VALUES ($1, $2, $3);';
        const res = await client.query(sql, [author_id, thread_id, text]);
        return res.rowCount > 0;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (client) {
            client.release();
        }
    }
}

// inserts new row to table 'kayttaja' @Inari/Juhanir
const postUser = async (uName, pWord) => {
    let client;
    try {
        client = await pool.connect();
        const sql = 'INSERT INTO users (username, password) VALUES ($1, $2);';
        const res = await client.query(sql, [uName, pWord]);
        return res.rowCount > 0;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (client) {
            client.release();
        }
    }
}

// gets user by username for login password check @juhanir
const getUserByUserName = async (uName) => {
    let client;
    try {
        client = await pool.connect();
        const sql = 'SELECT id, username, password FROM users WHERE username=$1;';
        const res = await client.query(sql, [uName]);
        return res.rows;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = {
    messages,
    messagesId,
    categories,
    deletePost,
    users,
    insertMessage,
    postUser,
    threadId,
    getThreadsByCategory,
    getWithThreadId,
    getUserByUserName,
    insertThread
};