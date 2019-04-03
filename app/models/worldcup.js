var schema = require('../db/schema');
var wcModel = schema.createWorldCupSchema();

function WorldCup () {

}

WorldCup.prototype.getAllWorldCups = function(callback) {
  var wcModel = schema.createWorldCupSchema();
  wcModel.find({},function(error, worldcups) {
        if(error) {
            callback(error);
        } else {
            callback(null, worldcups);
        }
    });
};

WorldCup.prototype.getCurrentWorldCup = function(callback) {
  var wcModel = schema.createWorldCupSchema();
  wcModel.findOne({current: "current"},function(error, worldcup) {
        if(error) {
            callback(error);
        } else {
            callback(null, worldcup);
        }
    });
};

WorldCup.prototype.getWorldCup = function(id, callback) {
  var wcModel = schema.createWorldCupSchema();
  wcModel.findOne({_id:id},function(error, worldcup) {
        if(error) {
            callback(error);
        } else {
            callback(null, worldcup);
        }
    });
};

WorldCup.prototype.createWorldCup = function(wc, callback) {
  var wcModel = schema.createWorldCupSchema();
  wcModel.save(wc, function(err, wc) {
        callback(err, wc);
    });
};

WorldCup.prototype.addUserToCup = function(id, user, callback) {

};

module.exports = WorldCup;
