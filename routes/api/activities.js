var aRouter = require('express').Router();
var Promise = require('bluebird');
var Activity = require('../../models/activity');

aRouter.get('/', function(req,res,next){
  Activity.findAll().then(function(dbActivities){
    res.json({activities: dbActivities});
  });
});

module.exports = aRouter;
