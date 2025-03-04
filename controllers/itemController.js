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
    return res.status(400).json({ error: 'Name, description and category id are required' });
  }
  try {
    const newItem = await db.addItem(name, description, categoryId, imageUrl);
    return res.status(201).json(newItem);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'database error whilst adding item' });
  }
};

module.exports = { getAllItems, postAddItem };
