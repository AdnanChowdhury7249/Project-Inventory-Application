const express = require('express');
const {
  getAllCategories, postAddCategory, deleteCategory, putUpdateCategory,
} = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', postAddCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', putUpdateCategory);

module.exports = router;
