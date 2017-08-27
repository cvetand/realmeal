Array.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};

var sendJsonResponse = function(res, status_code, content) {
  var status = '';
  var message = null;
  var data = null;

  successful_status_codes = [200, 201];
  unsuccessful_status_codes = [204, 400, 401, 403, 404, 405, 409, 500];

  if(successful_status_codes.contains(status_code)){
    status = "success"
    data = content
  } else if(unsuccessful_status_codes.contains(status_code)) {
    status = "failed"
    message = content.errors || content
  }

  res.status(status_code);
  res.setHeader('Content-Type', 'application/json');
  res.json({
    status: status,
    message: message,
    data: data
  });
}


module.exports= function() {
  this.sendJsonResponse = sendJsonResponse
}
