const pool = require('../db/pool');

async function allItems() {
  return pool.query('SELECT * FROM items');
}

async function getItems(categoryId) {
  const query = 'SELECT * FROM items WHERE category_id = $1';
  const { rows } = await pool.query(query, [categoryId]);
  return rows; // ✅ Ensure it returns actual rows
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

async function deleteItem(id) {
  const query = 'DELETE FROM items WHERE id = $1 RETURNING *';
  try {
    const { rowCount } = await pool.query(query, [id]);
    if (rowCount === 0) {
      return { error: 'item does not exist' };
    }
    return { message: 'item successfully deleted' };
  } catch (error) {
    console.error('error deleting item', error.message);
    throw new Error('Database error while deleting item');
  }
}

async function updateItem(id, name, description, imageUrl) {
  const query = `UPDATE items
  set name = $1, description = $2, image_url = $3 
  WHERE id = $4
  RETURNING *
  `;
  try {
    const { rowCount, rows } = await pool.query(query, [name, description, imageUrl, id]);
    if (rowCount === 0) {
      return { error: 'item not found' };
    }
    return rows[0];
  } catch (error) {
    console.error('error updating items', error.message);
    throw new Error('database error whilst updating item');
  }
}

module.exports = {
  allItems, addItem, deleteItem, updateItem, getItems,
};
