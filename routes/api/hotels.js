var hRouter = require('express').Router();

hRouter.get('/', function(req,res,next){
	res.send("mikami");
});

module.exports = hRouter;