var GP = require('../models/gp');

/**
 * Gets the GPs in the worldcup
 **/
function getGPs(req, res, next){
  var cupId = req.param('id');
  var gp = new GP();
  gp.getCupGPs(cupId, function(err, gps) {
    if(err) {
      return res.send(400);
    } else {
      return res.send(200, parseGPs(gps));
    }
  });
}

function getNextGP(req, res, next) {
  var cupId = req.param('id')
  var gpModel = new GP();
  gpModel.getNextGP(cupId, function(err, gp) {
    if(err) {
      return res.send(400);
    } else {
      return res.send(200, parseGP(gp));
    }
  });
}

/**
 * Gets the GPs in the worldcup
 **/
function getGP(req, res, next){
  var id = req.param('id');
  getGP(id, function(err, gp) {
    if(err) {
      return res.send(400);
    } else {
      return res.send(200, parseGP(gp));
    }
  });
}

function createGP(req, res, next) {
  var wcId = req.param('id');
  var gpi = req.body;
  gpi['worldcup'] = wcId;
  var inst = new GP();
  inst.createGP(gpi, function(err, ret) {
    if(err) {
      return res.send(400);
    } else {
      return res.send(200, parseGP(ret));
    }
  });
}

function parseGPs(gps) {
  var ret = [];
  for(var i=0; i<gps.length; ++i) {
    ret.push(gps[i]);
  }
  return ret;
}

function parseGP(gp) {
  var ret = {};
  ret['id'] = gp._id;
  ret['gpname'] = gp.gpname;
  ret['worldcup'] = gp.worldcup;
  ret['cdate'] = gp.date;
  ret['courses'] = gp.courses;
  return ret;
}

module.exports = {
    getGPs: getGPs,
    getGP: getGP,
    createGP: createGP,
    getNextGP: getNextGP
};
