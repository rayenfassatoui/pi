const express = require('express');
const router = express.Router();
const { getProfile, getUserProfile, updateProfile, addFavorite, removeFavorite, getUserRecipes, getUserStats } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.get('/:id/profile', getUserProfile);
router.put('/favorites/:recipeId', auth, addFavorite);
router.delete('/favorites/:recipeId', auth, removeFavorite);
router.get('/:id/recipes', getUserRecipes);
router.get('/:id/stats', getUserStats);

module.exports = router;
