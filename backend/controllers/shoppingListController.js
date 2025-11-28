const ShoppingList = require('../models/ShoppingList');

const getShoppingList = async (req, res) => {
    try {
        let shoppingList = await ShoppingList.findOne({ user: req.user.id });
        if (!shoppingList) {
            shoppingList = new ShoppingList({ user: req.user.id, items: [] });
            await shoppingList.save();
        }
        res.json(shoppingList);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const addItem = async (req, res) => {
    try {
        const { text, recipeId } = req.body;
        let shoppingList = await ShoppingList.findOne({ user: req.user.id });
        if (!shoppingList) {
            shoppingList = new ShoppingList({ user: req.user.id, items: [] });
        }

        shoppingList.items.push({ text, recipe: recipeId });
        await shoppingList.save();
        res.json(shoppingList);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateItem = async (req, res) => {
    try {
        const { checked } = req.body;
        const shoppingList = await ShoppingList.findOne({ user: req.user.id });
        
        const item = shoppingList.items.id(req.params.itemId);
        if (item) {
            item.checked = checked;
            await shoppingList.save();
        }
        res.json(shoppingList);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const deleteItem = async (req, res) => {
    try {
        const shoppingList = await ShoppingList.findOne({ user: req.user.id });
        shoppingList.items = shoppingList.items.filter(item => item.id !== req.params.itemId);
        await shoppingList.save();
        res.json(shoppingList);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { getShoppingList, addItem, updateItem, deleteItem };
