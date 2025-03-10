const db = require('../queries/categoryQueries');

const getAllCategories = async (req, res, next) => {
  try {
    const result = await db.AllCategories();
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const postAddCategory = async (req, res, next) => {
  const { name, description, imageUrl } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  try {
    const newCategory = await db.AddCategory(name, description, imageUrl);
    return res.status(201).json(newCategory);
  } catch (error) {
    return next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await db.deleteCategory(id);

    if (result.error) {
      return res.status(404).json(result);
    }

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

const putUpdateCategory = async (req, res, next) => {
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
    console.error('Error updating category:', error.message);
    return next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await db.getCategory(id);
    if (!result) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllCategories, postAddCategory, deleteCategory, putUpdateCategory, getCategoryById,
};
