const express = require('express');
const {
  getAllItems, postAddItem, deleteItem, putUpdateItem, getItemsByCategory,
} = require('../controllers/itemController');

const router = express.Router();

router.get('/', getAllItems);
router.get('/:categoryId', getItemsByCategory);
router.post('/:categoryId', postAddItem);
router.delete('/:id', deleteItem);
router.put('/:id', putUpdateItem);

module.exports = router;
