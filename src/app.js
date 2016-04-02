var express     =   require("express");
var bodyParser  =   require("body-parser");

module.exports = function $app(
  questionsController,
  db,
  user
) {
  var app = express();
  var router = express.Router();
  // Pre-Middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({"extended" : false}));
  
  // Post-Middleware
      
  app.use('/',router);

  return app;
}
