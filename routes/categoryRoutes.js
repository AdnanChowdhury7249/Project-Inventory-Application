const express = require('express');
const { getAllCategories, postAddCategory, DeleteCategory } = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', postAddCategory);
router.delete('/:id', DeleteCategory);

module.exports = router;
