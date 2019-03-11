const pool = require('./db');

const getAllCategories = async () => {
    let client;
    try {
        client = await pool.connect();
        let sql = 'SELECT * FROM categories;';
        let res = await client.query(sql);
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
    getAllCategories
};
