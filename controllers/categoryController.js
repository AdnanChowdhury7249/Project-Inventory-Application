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

module.exports = { getAllCategories };
