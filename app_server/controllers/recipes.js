var request = require('request');
var apiOptions = {
  server: process.env.APP_URL + ':' + process.env.PORT
}
module.exports.recipelist = function(req, res) {
  var requestOptions;
  var path;

  path = '/api/recipes'

  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json:{},
    qs:{}
  };

  request(
    requestOptions,
    function(err, response, body) {
      renderRecipeList(req, res, body.data)
    }
  );
}

var renderRecipeList = function(req, res, responseBody){
  var message;
  if(!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "You don't have any recipes"
    }
  }
  res.render('recipe-list', {
    title: 'Real Meal - Discover the joy of cooking',
    pageHeader: {
      title: 'Real Meal',
      strapline: 'Discover the joy of cooking!'
    },
    message: message,
    recipes: responseBody
  });
};


var getRecipeInfo = function(req, res, callback) {
  var requestOptions;
  var path;

  path = '/api/recipes/' + req.params.recipeId;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json:{},
    qs:{}
  };

  request(
    requestOptions,
    function(err, response, body) {
      if (response.statusCode === 200) {
        callback(req, res, body.data);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
}

var renderRecipeInfo = function(req, res, recipeInfo) {
  res.render('recipe-info', {
    title: recipeInfo.name,
    pageHeader: {
      title: recipeInfo.name
    },
    recipe: recipeInfo
  });
};

module.exports.recipeInfo = function(req, res) {
  getRecipeInfo(req, res, function(req, res, responseData) {
    renderRecipeInfo(req, res, responseData);
  });
};
