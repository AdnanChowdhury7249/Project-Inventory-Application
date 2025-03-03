const db = require('../queries/categoryQueries');

const getAllCategories = async (req, res) => {
  try {
    const result = await db.AllCategories();
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'database error' });
  }
};

const postAddCategory = async (req, res) => {
  const { name, description, imageUrl } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  try {
    const newCategory = await db.AddCategory(name, description, imageUrl);
    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Database error whilst adding category' });
  }
};

const DeleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.deleteCategory(id);

    if (result.error) {
      return res.status(404).json(result);
    }

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Database error whilst deleting category' });
  }
};

const putUpdateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description, imageUrl } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }
  try {
    const result = await db.updateCategory(id, name, description, imageUrl);
    if (result.error) {
      return res.status(404).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error('🔥 Error updating category:', error.message);
    return res.status(500).json({ error: 'database error whilst updating category' });
  }
};

module.exports = {
  getAllCategories, postAddCategory, DeleteCategory, putUpdateCategory,
};
