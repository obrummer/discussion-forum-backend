const pool = require("./db");

const getAllThreads = async () => {
  let client;
  try {
    client = await pool.connect();
    let sql =
      "SELECT thread.id, thread.topic, categories.name FROM thread, categories WHERE categories.id=thread.category_id ORDER BY categories.name, topic ASC;";
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

const getThreadById = async id => {
  let client;
  try {
    client = await pool.connect();
    let sql = "SELECT * FROM thread WHERE id=$1;";
    let res = await client.query(sql, [id]);
    return res.rows;
  } catch (error) {
    return false;
  } finally {
    if (client) {
      client.release();
    }
  }
};

const getThreadByCategory = async id => {
  let client;
  try {
    client = await pool.connect();
    let sql =
      "select thread.id, thread.topic, categories.name from thread, categories where thread.category_id = $1 AND categories.id = $1 ORDER BY thread.topic ASC;";
    let res = await client.query(sql, [id]);
    return res.rows;
  } catch (error) {
    return false;
  } finally {
    if (client) {
      client.release();
    }
  }
};

const addThread = async (topic, categoryId, userId) => {
  let client;
  try {
    client = await pool.connect();
    let sql = "INSERT INTO thread (topic, category_id, user_id) VALUES ($1, $2, $3) RETURNING *;";
    let res = await client.query(sql, [topic, categoryId, userId]);
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
  getAllThreads,
  getThreadById,
  getThreadByCategory,
  addThread
};
