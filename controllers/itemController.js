// const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../queries/itemQueries');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Save images in "uploads" directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//   },
// });

// const upload = multer({ storage });

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
  try {
    const { name, description } = req.body;
    const { categoryId } = req.params;

    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // ✅ Save item to DB
    const newItem = await db.addItem(name, description, categoryId, imageUrl);
    return res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding item:', error);
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
  console.log('PUT Request Params:', req.params);
  console.log('PUT Request Body:', req.body);
  console.log('Uploaded File:', req.file); // Debugging

  const { id } = req.params;
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description required' });
  }

  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl; // Preserve existing image if no new upload
    const result = await db.updateItem(id, name, description, imageUrl);

    if (!result) {
      return res.status(404).json({ error: 'Item not found' });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error updating item:', error);
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
