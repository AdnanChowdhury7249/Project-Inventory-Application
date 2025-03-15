const express = require('express');
const {
  getAllItems, postAddItem, deleteItem, putUpdateItem, getItemsByCategory, getItemById,
} = require('../controllers/itemController');

const router = express.Router();

router.get('/', getAllItems);
router.get('/:categoryId', getItemsByCategory);
router.get('/category/:id', getItemById);
router.post('/:categoryId', postAddItem);
router.delete('/:id', deleteItem);
router.put('/:id', putUpdateItem);

module.exports = router;
