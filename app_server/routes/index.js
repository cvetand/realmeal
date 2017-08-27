var express = require('express');
var router  = express.Router();

var ctrlRecipes = require('../controllers/recipes');
var ctrlOthers  = require('../controllers/others');

// Recipe pages
router.get('/', ctrlRecipes.recipelist);
router.get('/recipe/:recipeId', ctrlRecipes.recipeInfo);

// Other pages
router.get('/about', ctrlOthers.about);

module.exports = router;
