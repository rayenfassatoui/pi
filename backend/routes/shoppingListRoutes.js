const express = require('express');
const router = express.Router();
const { getShoppingList, addItem, updateItem, deleteItem } = require('../controllers/shoppingListController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getShoppingList);
router.post('/items', auth, addItem);
router.put('/items/:itemId', auth, updateItem);
router.delete('/items/:itemId', auth, deleteItem);

module.exports = router;
