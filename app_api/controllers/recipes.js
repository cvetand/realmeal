var mongoose = require('mongoose')
var Recipe = mongoose.model('Recipe')

require('./helpers')()

module.exports.recipesListByRating = function(req, res) {
  Recipe.find().exec(
    function(err, recipes){
      if(err) {
        sendJsonResponse(res, 400, err)
      } else {
        sendJsonResponse(res, 200, recipes)
      }
    }
  )
};

module.exports.recipesCreate = function(req, res) {
  Recipe.create(req.body, function(err, created_recipe) {
    if(err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, created_recipe)
    }

  });
};

module.exports.recipesReadOne = function(req, res) {
  if (req.params && req.params.recipeId){
    Recipe
      .findById(req.params.recipeId)
      .exec(function(err, recipe){
        if (!recipe) {
          sendJsonResponse(res, 404, "recipeId not found");
          return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
        }
        sendJsonResponse(res, 200, recipe)
      })
  } else {
    sendJsonResponse(res, 404, "No recipeId in request")
  }
}
