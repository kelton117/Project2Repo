const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {type: String},
    description: {type: String },
    instructions: {type: String},
    ingredients: {type: String},
    special: {type: String},
    chef: {type: String},

})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;