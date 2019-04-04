var GP = require('../models/gp');

/**
 * Gets the GPs in the worldcup
 **/
function getGPs(req, res, next){
  var cupId = req.params('id');
  var gp = new GP();
  gp.getCupGPs(cupId, function(err, gps) {
    if(err) {
      return res.send(400);
    } else {
      return res.send(200, parseGPs(gps));
    }
  });
}


/**
 * Gets the GPs in the worldcup
 **/
function getGP(req, res, next){

}

function createGP(req, res, next) {

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
  ret['name'] = gp.name;
  ret['worldcup'] = gp.worldcup;
  ret['date'] = gp.date;
  ret['courses'] = JSON.parse(gp.courses);
  return ret;
}

module.exports = {
    getGPs: getGPs,
    getGP: getGP,
    createGP: createGP
};
