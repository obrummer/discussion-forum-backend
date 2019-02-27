const Pool = require('pg').Pool;

const conopts = {
    user: 'postgres',
    password: 'iaaltojarvi',
    host: 'localhost',
    database: 'devskulit'
    // port: 5432
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
            const sql = 'SELECT * from kayttaja';
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
//selects messages (content) by thread_id from table 'post' @Inari
const threadId = () => {
    return pool.connect()
        .then(client => {
            const sql = 'SELECT content FROM post order by thread_id;';
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
            const sql = 'SELECT topic FROM thread order by category;';
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

// inserts new row to table 'kayttaja' @Inari
const postUser = () => {
    return pool.connect()
        .then(client => {
            const sql = 'INSERT INTO kayttaja (username, password, created) VALUES ($1, $2, $3);';
            return client.query(sql, ['Salli', 'saltan', '2019-01-25 20:11:21'])
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


module.exports = { messages, messagesId, categories, deletePost, users, postUser, post, threadId };