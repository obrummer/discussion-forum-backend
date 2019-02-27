const Pool = require('pg').Pool; //lataa kirjasto ja sen client tai pool luokka

const conopts = { // määrittele yhteysasetukset
    user: 'postgres',
    password: 'iaaltojarvi',
    host: 'localhost',
    database: 'devskulit'
    // port: 5432
}

const pool = new Pool(conopts);

const messages = () => {
    return pool.connect()
        .then(client => {
            const sql = 'SELECT * FROM post;';
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

const categories = (topic) => {
    return pool.connect()
        .then(client => {
            const sql = 'SELECT topic FROM thread order by category;';
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

// const post = () => {
//     return pool.connect()
//         .then(client => {
//             const sql = 'INSERT INTO post (content, created) VALUES ($1, $2);';
//             return client.query(sql, ['Testaan restiä, josko toimis post', '2019-02-25'])
//                 .then(res => {
//                     client.release();
//                     console.log(res);
//                     return res;
//                 })
//                 .catch(err => {
//                     client.release();
//                     console.error(err);
//                 });
//         })
// }


module.exports = { messages, categories};