const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const recipeSchema = new Schema({
    // TODO: write the schema
    title: {
        type: String,
        unique: true,
        required: true
    },
    level: {
        type: String,
        enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
    },
    ingredients: {
        type: Array
    },
    cuisine: {
        type: String,
        required: true
    },
    dishType: {
        type: String,
        enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
    },
    image: {
        type: String,
        default: 'https://images.media-allrecipes.com/images/75131.jpg'
    },
    duration: {
        type: Number,
        min: 0
    },
    creator: {
        type: ObjectId,
        ref: 'cooks'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Recipe = mongoose.model('recipes', recipeSchema);
module.exports = Recipe;