const Category = require('../models/Category');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const createCategory = async (req, res) => {
    try {
        const { name, image } = req.body;
        let category = await Category.findOne({ name });
        if (category) return res.status(400).json({ message: 'Category already exists' });

        category = new Category({ name, image });
        await category.save();
        res.json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { getCategories, createCategory };
