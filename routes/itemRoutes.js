const express = require('express');
const { getAllItems, postAddItem } = require('../controllers/itemController');

const router = express.Router();

router.get('/', getAllItems);
router.post('/:categoryId', postAddItem);

module.exports = router;
