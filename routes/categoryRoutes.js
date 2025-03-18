const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getAllCategories, postAddCategory, deleteCategory, putUpdateCategory, getCategoryById,
} = require('../controllers/categoryController');

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

router.get('/', getAllCategories);
router.post('/', upload.single('image'), postAddCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', upload.single('image'), putUpdateCategory);
router.get('/:id', getCategoryById);

module.exports = router;
