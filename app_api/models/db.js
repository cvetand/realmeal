var mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI)
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose connection error: ' + err)
});

db.on('disconnected', function() {
  console.log('Mongoose disconnected')
});

db.once('open', function() {
  // we're connected!
  console.log("Successfully connected to database")
});

gracefulShutdown = function (msg, callback){
  db.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

process.on('SIGINT', function() {
  gracefulShutdown('app inturruption', function(){
    process.exit(0);
  });
});

process.on('SIGTERM', function(){
  gracefulShutdown('app termination', function(){
    process.exit(0);
  });
});


require("./recipes")
