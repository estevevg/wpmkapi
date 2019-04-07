var schema = require('../db/schema');

var gpModel = schema.createGPSchema();

function GP() {

}

GP.prototype.createGP = function(gpi, callback) {
  var ins = new gpModel(gpi);
  console.log(gpi);
  ins.save(gpi, function(err, g) {
    callback(err, g);
  });
};

GP.prototype.getGP = function(gpId, callback) {
  gpModel.findOne({_id: gpId}, function(err, gp) {
    callback(err, gp);
  });
};

GP.prototype.getCupGPs = function(cupId, callback) {
  gpModel.find({worldcup: cupId}, function(err, gps) {
    callback(err, gps);
  });
};

GP.prototype.getNextGP = function(cupId, callback) {
  gpModel.find({worldcup: cupId}).sort('cdate').exec(function(err, gps) {
    if(err) {
      return callback(err);
    } else {
      var now = new Date();
      for(var i=0; i<gps.length; ++i) {
        console.log(gps[i]['gpname']);
        if(compareDates(now, gps[i]['cdate'])) {
          return callback(err, gps[i]);
        }
      }
      return callback(err, gps[gps.length - 1]); 
    }
  });
};

GP.prototype.updateGP = function(id, up, callback) {
  gpModel.update({_id:id}, parseGP(up), function(err, updated){
    callback(err, updated);
  });
};

function parseGP(gp) {
  var ngp = {};
  putData(ngp, 'gpname', gp.gpname);
  putData(ngp, 'worldcup', gp.worldcup);
  putData(ngp, 'cdate', gp.cdate);
  putData(ngp, 'courses', gp.courses);
  putData(ngp, 'result', gp.result);
  return ngp;
}

function putData(war, id, data){
  if(data){
      war[id] = data;
  }
}


function compareDates(current, next) {
  var mod = 1000*60*60*24;
  console.log(current.getTime() - next.getTime());
  console.log(mod);
  return (current.getTime() - next.getTime()) < mod;

}

module.exports = GP;
