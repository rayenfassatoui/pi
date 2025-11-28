const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        text: {
            type: String,
            required: true
        },
        checked: {
            type: Boolean,
            default: false
        },
        recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('ShoppingList', shoppingListSchema);
