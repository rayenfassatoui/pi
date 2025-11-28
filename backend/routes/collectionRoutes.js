const express = require('express');
const router = express.Router();
const { getCollections, createCollection, addRecipeToCollection, removeRecipeFromCollection, deleteCollection } = require('../controllers/collectionController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getCollections);
router.post('/', auth, createCollection);
router.post('/:id/recipes', auth, addRecipeToCollection);
router.delete('/:id/recipes/:recipeId', auth, removeRecipeFromCollection);
router.delete('/:id', auth, deleteCollection);

module.exports = router;
