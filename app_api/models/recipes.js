var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  ratings: {
    manual: Number,
    calculated: Number
  },
  servings: Number,
  time: {
    active_min: [Number],
    idle_min: [Number]
  },
  ingredients: [{
    name: String,
    quantity: {
      amount: Number,
      unit: String
    }
  }],
  tools:[{
    name: String
  }],
  tips_and_techniques: [{
    title: String,
    text: String
  }],
  instructions: [{
    name: String,
    description: String
  }]

})

mongoose.model('Recipe', recipeSchema)
