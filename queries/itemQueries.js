const pool = require('../db/pool');

async function allItems() {
  return pool.query('SELECT * FROM items');
}

module.exports = { allItems };
