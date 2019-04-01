var worldcup = require('../models/worldcup')

/**
 * Gets all the worldcups
 **/
function getAllWorldCups(req, res, next) {
  worldcup.getAllWorldCups(function(err, worlcups){
    if(err){
      return res.send(400);
    } else {
      return res.send(200, parseWorldCups(worldcups));
    }
  });
}

/**
 * Gets the current worldcup
 **/
function getCurrentWorldCup(req, res, next) {
  worldcup.getCurrentWorldCup( function(err, worldcups) {
    if(err) {
      return res.send(400);
    } else {
      return res.send(200, parseWorldCup(worldcups));
    }
  });
}

/**
 * Gets the specifies worldcup
 **/
function getWorldCup(req, res, next){
  var wcId = req.param('id');
  worldcup.getWorldCup(wcId, function(err, worldcups) {
    if(err) {
      return res.send(400);
    } else {
      return res.send(200, parseWorldCup(worldcups));
    }
  });
}

function updateWorldCup(req, res, next) {

}

/**
 * Creates a worldcup
 **/
function createWorldCup(req, res, next){

}

function parseWorldCups(inp) {
  ret = []
  for(var i = 0; i < inp.length; ++i) {
    ret.push(parseWorldCup(inp[i]));
  }
  return ret;
}

function parseWorldCup(inp) {
  var ret = {};
  ret['id'] = inp._id
  ret['initDate'] = inp.initDate
  ret['endDate'] = inp.endDate
  ret['state'] = inp.state
  ret['name'] = inp.name
  ret['rules'] = inp.rules
  ret['part'] = inp.part
  ret['classif'] = inp.classif
  ret['gps'] = inp.gps
  return ret;
}

module.exports = {
  getAllWorldCups: getAllWorldCups,
  getCurrentWorldCup: getCurrentWorldCup,
  getWorldCup: getWorldCup,
  createWorldCup: createWorldCup,
  updateWorldCup: updateWorldCup

};
