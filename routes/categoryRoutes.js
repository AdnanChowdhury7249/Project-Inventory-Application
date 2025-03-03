const express = require('express');
const {
  getAllCategories, postAddCategory, DeleteCategory, putUpdateCategory,
} = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', postAddCategory);
router.delete('/:id', DeleteCategory);
router.put('/:id', putUpdateCategory);

module.exports = router;
