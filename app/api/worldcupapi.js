var WorldCup = require('../models/worldcup');
var Users = require('../models/user');

/**
 * Gets all the worldcups
 **/
function getAllWorldCups(req, res, next) {
  var worldcup = new WorldCup();
  worldcup.getAllWorldCups(function(err, worldcups){
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
  var worldcup = new WorldCup();
  worldcup.getCurrentWorldCup(function(err, worldcups) {
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
  var worldcup = new WorldCup();
  var wcId = req.param('id');
  worldcup.getWorldCup(wcId, function(err, worldcups) {
    if(err) {
      return res.send(400);
    } else {
      return res.send(200, parseWorldCup(worldcups));
    }
  });
}

/**
 * Creates a worldcup
 **/
function createWorldCup(req, res, next){
  var worldcup = new WorldCup();
  var wc = req.body;
  var users = new Users();
  users.getAllUsers(function(err, users) {
    var u = [];
    for(var i=0; i<users.length; ++i) {
      u.push(users[i]._id);
    }
    wc['part'] = u;
    worldcup.createWorldCup(wc, function(err, ret) {
      if(err) {
        res.send(400);
      } else {
        res.send(200, parseWorldCup(wc));
      }
    });
  });
}

function updateWorldCup(req, res, next) {
  var wcId = req.param('id');
  var wc = req.body;
  var wcin = new WorldCup();
  wcin.updateWorldCup(wcId, wc, function(err, wc) {
    if(err) {
      return res.send(400);
    } else {
      return res.send(400, parseWorldCup(wc));
    }
  });
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
