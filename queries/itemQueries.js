const pool = require('../db/pool');

async function allItems() {
  return pool.query('SELECT * FROM items');
}

async function addItem(name, description, categoryId, imageUrl) {
  const query = `
  INSERT into items(name, description, category_id, image_url)
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `;
  try {
    const result = await pool.query(query, [name, description, categoryId, imageUrl]);
    return result.rows[0];
  } catch (error) {
    console.error('error adding item', error.message);
    throw error;
  }
}

module.exports = { allItems, addItem };
