const express = require('express');
const {
  getAllCategories, postAddCategory, deleteCategory, putUpdateCategory, getCategoryById,
} = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', postAddCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', putUpdateCategory);
router.get('/:id', getCategoryById);

module.exports = router;
