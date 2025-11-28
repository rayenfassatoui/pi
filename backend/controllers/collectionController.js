const Collection = require('../models/Collection');

const getCollections = async (req, res) => {
    try {
        const collections = await Collection.find({ user: req.user.id }).populate('recipes');
        res.json(collections);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const createCollection = async (req, res) => {
    try {
        const { name, description, isPublic } = req.body;
        const newCollection = new Collection({
            name,
            description,
            isPublic,
            user: req.user.id,
            recipes: []
        });
        const collection = await newCollection.save();
        res.json(collection);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const addRecipeToCollection = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) return res.status(404).json({ message: 'Collection not found' });
        
        if (collection.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const { recipeId } = req.body;
        if (!collection.recipes.includes(recipeId)) {
            collection.recipes.push(recipeId);
            await collection.save();
        }
        
        const updatedCollection = await Collection.findById(req.params.id).populate('recipes');
        res.json(updatedCollection);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const removeRecipeFromCollection = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) return res.status(404).json({ message: 'Collection not found' });

        if (collection.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        collection.recipes = collection.recipes.filter(id => id.toString() !== req.params.recipeId);
        await collection.save();
        
        const updatedCollection = await Collection.findById(req.params.id).populate('recipes');
        res.json(updatedCollection);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const deleteCollection = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) return res.status(404).json({ message: 'Collection not found' });

        if (collection.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await collection.deleteOne();
        res.json({ message: 'Collection removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { getCollections, createCollection, addRecipeToCollection, removeRecipeFromCollection, deleteCollection };
