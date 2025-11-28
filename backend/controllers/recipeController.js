const Recipe = require('../models/Recipe');

const createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, steps, photo, category, tags } = req.body;
        const newRecipe = new Recipe({
            title,
            ingredients,
            instructions,
            steps,
            photo,
            category,
            tags,
            author: req.user.id
        });
        const recipe = await newRecipe.save();
        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getAllRecipes = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', category, sort, ingredient, minRating } = req.query;
        const query = {
            title: { $regex: search, $options: 'i' }
        };

        if (category) {
            query.category = category;
        }

        if (ingredient) {
            query.ingredients = { $regex: ingredient, $options: 'i' };
        }

        if (minRating) {
            query.averageRating = { $gte: minRating };
        }

        let sortOption = { createdAt: -1 }; // Default sort
        if (sort === 'oldest') {
            sortOption = { createdAt: 1 };
        } else if (sort === 'popular') {
            sortOption = { averageRating: -1 };
        } else if (sort === 'highest-rated') {
            sortOption = { averageRating: -1 };
        }

        const recipes = await Recipe.find(query)
            .populate('author', 'name')
            .sort(sortOption)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Recipe.countDocuments(query);

        res.json({
            recipes,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('author', 'name').populate('comments.user', 'name');
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Recipe not found' });
        res.status(500).send('Server error');
    }
};

const updateRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, steps, photo, category, tags } = req.body;
        let recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

        if (recipe.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        recipe = await Recipe.findByIdAndUpdate(req.params.id, { $set: { title, ingredients, instructions, steps, photo, category, tags } }, { new: true });
        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

        if (recipe.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await recipe.deleteOne();
        res.json({ message: 'Recipe removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const addComment = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

        const newComment = {
            user: req.user.id,
            text: req.body.text
        };

        recipe.comments.unshift(newComment);
        await recipe.save();
        
        const updatedRecipe = await Recipe.findById(req.params.id).populate('comments.user', 'name');
        res.json(updatedRecipe.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const deleteComment = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

        const comment = recipe.comments.find(comment => comment.id === req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        recipe.comments = recipe.comments.filter(({ id }) => id !== req.params.commentId);
        await recipe.save();
        res.json(recipe.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const rateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

        const { value } = req.body;
        const ratingIndex = recipe.ratings.findIndex(r => r.user.toString() === req.user.id);

        if (ratingIndex > -1) {
            recipe.ratings[ratingIndex].value = value;
        } else {
            recipe.ratings.push({ user: req.user.id, value });
        }

        recipe.averageRating = recipe.ratings.reduce((acc, curr) => acc + curr.value, 0) / recipe.ratings.length;
        await recipe.save();
        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, addComment, deleteComment, rateRecipe };
