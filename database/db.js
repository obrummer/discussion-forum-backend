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

module.exports = pool;