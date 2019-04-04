var schema = require('../db/schema');

var gpModel = schema.createGPSchema();

function GP() {

}

GP.prototype.createGP = function(gp, callback) {
  var inst = new gpModel();
  gp.save(gp, function(err, g) {
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

module.exports = GP;
