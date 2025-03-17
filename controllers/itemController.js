const db = require('../queries/itemQueries');

const getAllItems = async (req, res, next) => {
  try {
    const result = await db.allItems();
    return res.json(result);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const postAddItem = async (req, res, next) => {
  const { name, description, imageUrl } = req.body;
  const { categoryId } = req.params;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }
  try {
    const newItem = await db.addItem(name, description, categoryId, imageUrl);
    return res.status(201).json(newItem);
  } catch (error) {
    return next(error);
  }
};

const deleteItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await db.deleteItem(id);

    if (result.error) {
      return res.status(404).json(result);
    }
    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

const putUpdateItem = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, imageUrl } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'name and description required' });
  }
  try {
    const result = await db.updateItem(id, name, description, imageUrl);

    if (result.error) {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const getItemsByCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const result = await db.getItems(categoryId);
    if (result.length === 0) {
      return res.status(404).json({ error: 'No items found for this category.' });
    }
    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

const getItemById = async (req, res, next) => {
  console.log(`Fetching item with ID: ${req.params.id}`);
  const { id } = req.params;
  try {
    const result = await db.getItemById(id);
    if (!result) {
      return res.status(404).json({ error: 'Item not found' });
    }
    return res.json(result);
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  getAllItems, postAddItem, deleteItem, putUpdateItem, getItemsByCategory, getItemById,
};
