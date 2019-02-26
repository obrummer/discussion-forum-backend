const Pool = require('pg').Pool; //lataa kirjasto ja sen client tai pool luokka

const conopts = { // määrittele yhteysasetukset
user: 'postgres',
password: 'iaaltojarvi',
host: 'localhost',
database: 'msg'
// port: 5432
}

const pool = new Pool(conopts);

const messages = () => {
 return pool.connect()
     .then(client => {
         const sql = 'SELECT * FROM messages;';
         return client.query(sql)
             .then(res => {
                 client.release();
                 console.log(res);
                 return res.rows;
             })
             .catch(err => {
                 client.release();
                 console.error(err);
             });
     })
}

module.exports = {messages};