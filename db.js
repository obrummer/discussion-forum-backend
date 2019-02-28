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

//selects messages by user_id and by post's id @Inari
const messagesId = (userid) => {
    return pool.connect()
        .then(client => {
            const sql = 'SELECT content from post where user_id=$1;';
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
            const sql = 'SELECT content, id, thread_id FROM post WHERE thread_id=$1;';
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

//selects messages (content) by thread_id from table 'post' @Inari
const threadId = () => {
    return pool.connect()
        .then(client => {
            const sql = 'SELECT topic, category FROM thread;';
            return client.query(sql)
                .then(res => {
                    client.release();
                    console.log(res.rows);
                    return res.rows;
                })
                .catch(err => {
                    client.release();
                    console.error(err);
                });
        })
}

//selects topics from table 'thread' and orders them by category @Inari
const categories = () => {
    return pool.connect()
        .then(client => {
            const sql = 'SELECT topic, category FROM thread ORDER BY category;';
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

const post = () => {
    return pool.connect()
        .then(client => {
            const sql = 'INSERT INTO post (content, created) VALUES ($1, $2);';
            return client.query(sql, ['Testaan restiä, josko toimis post', '2019-02-25 23:10:43'])
                .then(res => {
                    client.release();
                    console.log(res);
                    return res;
                })
                .catch(err => {
                    client.release();
                    console.error(err);
                });
        })
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
    postUser,
    post,
    threadId,
    getWithThreadId,
    getUserByUserName,
    insertThread
};