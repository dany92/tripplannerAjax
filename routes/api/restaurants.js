var rRouter = require('express').Router();

rRouter.get('/', function(req,res,next){
	res.send("mikami");
});

module.exports = rRouter;