const User = require('../models/User');
const Recipe = require('../models/Recipe');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate('favorites')
            .populate('followers', 'name avatar bio')
            .populate('following', 'name avatar bio');
            
        // Get user's recipes
        const recipes = await Recipe.find({ user: req.user.id }).sort({ createdAt: -1 });
        
        const userObj = user.toObject();
        userObj.recipes = recipes;
        
        res.json(userObj);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password -favorites')
            .populate('followers', 'name avatar bio')
            .populate('following', 'name avatar bio');
            
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        // Get user's recipes
        const recipes = await Recipe.find({ user: req.params.id }).sort({ createdAt: -1 });
        
        const userObj = user.toObject();
        userObj.recipes = recipes;
        
        res.json(userObj);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateProfile = async (req, res) => {
    try {
        const { bio, avatar } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id, 
            { $set: { bio, avatar } }, 
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const addFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const recipeId = req.params.recipeId;

        if (user.favorites.includes(recipeId)) {
            return res.status(400).json({ message: 'Recipe already in favorites' });
        }

        user.favorites.push(recipeId);
        await user.save();
        res.json(user.favorites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const removeFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const recipeId = req.params.recipeId;

        user.favorites = user.favorites.filter(id => id.toString() !== recipeId);
        await user.save();
        res.json(user.favorites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getUserRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ author: req.params.id });
        res.json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getUserStats = async (req, res) => {
    try {
        const recipeCount = await Recipe.countDocuments({ author: req.params.id });
        const recipes = await Recipe.find({ author: req.params.id });
        const totalRatings = recipes.reduce((acc, curr) => acc + curr.ratings.length, 0);
        const averageRating = recipes.length > 0 
            ? recipes.reduce((acc, curr) => acc + curr.averageRating, 0) / recipes.length 
            : 0;

        res.json({
            recipeCount,
            totalRatings,
            averageRating
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { getProfile, getUserProfile, updateProfile, addFavorite, removeFavorite, getUserRecipes, getUserStats };
