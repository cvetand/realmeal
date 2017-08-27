var router = require('express').Router();
var ctrlRecipes = require('../controllers/recipes')

// recipes
router.get('/recipes', ctrlRecipes.recipesListByRating);
router.post('/recipes', ctrlRecipes.recipesCreate);
router.get('/recipes/:recipeId', ctrlRecipes.recipesReadOne);

module.exports = router
