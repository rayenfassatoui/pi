const express = require('express');
const router = express.Router();
const { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, rateRecipe } = require('../controllers/recipeController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const commentRoutes = require('./commentRoutes');

router.use('/:id/comments', commentRoutes);

router.post('/upload', auth, upload.single('image'), (req, res) => {
    try {
        res.json({ url: `http://localhost:5000/uploads/${req.file.filename}` });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', auth, createRecipe);
router.put('/:id', auth, updateRecipe);
router.delete('/:id', auth, deleteRecipe);
router.post('/:id/rate', auth, rateRecipe);

module.exports = router;
