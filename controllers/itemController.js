const db = require('../queries/itemQueries');

const getAllItems = async (req, res) => {
  try {
    const result = await db.allItems();
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'database error' });
  }
};

const postAddItem = async (req, res) => {
  const { name, description, imageUrl } = req.body;
  const { categoryId } = req.params;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }
  try {
    const newItem = await db.addItem(name, description, categoryId, imageUrl);
    return res.status(201).json(newItem);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'database error whilst adding item' });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.deleteItem(id);

    if (result.error) {
      return res.status(404).json(result);
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Database error whilst deleting item' });
  }
};

const putUpdateItem = async (req, res) => {
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
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllItems, postAddItem, deleteItem, putUpdateItem,
};
