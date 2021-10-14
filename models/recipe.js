const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: String,
    description: String,
    instructions: String,
    ingredients: String,
    special: String,
    chef: String

})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;