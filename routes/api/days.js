var dRouter = require('express').Router();
var Day = require('../../models/day');

//get All Days
dRouter.get('/', function(req,res,next){
  Day.findAll()
  .then(function(days){
    console.log("got all days");
    res.json({days: days});
  }).catch(next);
});


//get the current Day
dRouter.get('/:id', function(req,res,next){
  Day.findById(req.params.id)
  .then(function(day){
    res.json({day: day});
  }).catch(next);
});

//add a new day
dRouter.post('/', function(req,res,next){
  console.log("did it work");
  Day.create(req.body)
  .then(function(newDay){
    console.log("did it work");
    res.json({day:newDay});
  }).catch(next);
});

//update current day
dRouter.put('/:id', function(req,res,next){
  Day.findById(req.params.id)
  .then(function(found){
    return found.update(req.body);
  }).then(function(updated){
    res.json({day: updated});
  }).catch(next);
});

//delete the day
dRouter.delete('/:id', function(req,res,next){
   Day.findById(req.params.id)
  .then(function(found){
    return found.destroy();
  }).then(function(){
    res.send("deleted!");
  }).catch(next);
});

module.exports = dRouter;
