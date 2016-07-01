var hRouter = require('express').Router();
var Promise = require('bluebird');
var Hotel = require('../../models/hotel');

hRouter.get('/', function(req,res,next){
	Hotel.findAll().then(function(dbHotels){
    res.json({hotels: dbHotels});
  });
});

module.exports = hRouter;
