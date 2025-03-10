const pool = require('../db/pool');

async function AllCategories() {
  return pool.query('SELECT * FROM category');
}

async function AddCategory(name, description, imageUrl) {
  const query = `
  INSERT into category (name, description, image_url)
  VALUES($1, $2, $3)
  RETURNING *;
  `;
  try {
    const result = await pool.query(query, [name, description, imageUrl]);
    return result.rows[0];
  } catch (error) {
    console.error('Error adding category:', error.message);
    throw error;
  }
}

async function deleteCategory(id) {
  const query = 'DELETE FROM category WHERE id = $1 RETURNING *';

  try {
    const { rowCount } = await pool.query(query, [id]);

    if (rowCount === 0) {
      return { error: 'category not found' };
    }
    return { message: 'Category successfully deleted' };
  } catch (error) {
    console.error('Error deleting category', error.message);
    throw new Error('Database error while deleting category');
  }
}

async function updateCategory(id, name, description, imageUrl) {
  const query = `   UPDATE category 
    SET name = $1, description = $2, image_url = $3 
    WHERE id = $4 
    RETURNING *;
`;
  try {
    const { rowCount, rows } = await pool.query(query, [name, description, imageUrl, id]);
    if (rowCount === 0) {
      return { error: 'category not found' };
    }
    return rows[0];
  } catch (error) {
    console.error('error updating category', error.message);
    throw error;
  }
}

async function getCategory(id) {
  const query = 'SELECT * FROM category WHERE id = $1'; // ✅ Fetch category by ID
  const { rows } = await pool.query(query, [id]);
  return rows[0]; // ✅ Return first row (single category)
}

module.exports = {
  AllCategories, AddCategory, deleteCategory, updateCategory, getCategory,
};
