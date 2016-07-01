var rRouter = require('express').Router();
var Promise = require('bluebird');
var Restaurant = require('../../models/restaurant');

rRouter.get('/', function(req,res,next){
	Restaurant.findAll().then(function(dbRestaurants){
    res.json({restaurants: dbRestaurants});
  });
});



module.exports = rRouter;
