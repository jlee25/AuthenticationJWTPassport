const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Recipe Schema

const RecipeSchema = new Schema({
  title: String,
});

const RecipeClass = mongoose.model('recipe', RecipeSchema)

module.exports = RecipeClass;