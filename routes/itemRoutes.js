const express = require('express');
const { getAllItems, postAddItem, deleteItem } = require('../controllers/itemController');

const router = express.Router();

router.get('/', getAllItems);
router.post('/:categoryId', postAddItem);
router.delete('/:id', deleteItem);

module.exports = router;
