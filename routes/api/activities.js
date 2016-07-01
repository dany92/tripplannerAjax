var aRouter = require('express').Router();

aRouter.get('/', function(req,res,next){
	res.send("mikami");
});

module.exports = aRouter;