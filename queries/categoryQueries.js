const pool = require('../db/pool');

async function AllCategories() {
  return pool.query('SELECT * FROM category');
}

module.exports = { AllCategories };
