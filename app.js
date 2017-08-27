require('dotenv').config()

var express     = require('express')
var path        = require('path');
var bodyParser  = require('body-parser');
var app         = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add models and connect to db
require('./app_api/models/db');

// Add routes
var routes    = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');
app.use('/', routes);
app.use('/api', routesApi);



// Set frontend mapping
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (process.env.NODE_ENV === 'production') {
  // Change logging and other stuff for production
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
  });
} else {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

if (!process.env.PORT){
  process.env.PORT = 8080;
}

app.listen(process.env.PORT, function () {
  console.log('App listening on port ' + process.env.PORT)
})
