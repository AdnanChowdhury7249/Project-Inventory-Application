const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getAllItems,
  postAddItem,
  deleteItem,
  putUpdateItem,
  getItemsByCategory,
  getItemById,
} = require('../controllers/itemController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post('/:categoryId', upload.single('image'), postAddItem);

router.get('/', getAllItems);
router.get('/:categoryId', getItemsByCategory);
router.get('/category/:id', getItemById);
router.put('/:id', upload.single('image'), putUpdateItem);
router.delete('/:id', deleteItem);

module.exports = router;
