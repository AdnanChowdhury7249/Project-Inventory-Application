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

module.exports = { getAllItems };
