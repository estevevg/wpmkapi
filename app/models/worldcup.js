var schema = require('../db/schema');
var wcModel = schema.createWorldCupSchema();

function WorldCup () {

}

WorldCup.prototype.getWorldCups = function(callback) {
  wcModel.find({},function(error, worldcups) {
        if(error) {
            callback(error);
        } else {
            callback(null, worldcups);
        }
    });
}

WorldCup.prototype.getCurrentWorldCup = function(callback) {
  wcModel.findOne({current: "current"},function(error, worldcup) {
        if(error) {
            callback(error);
        } else {
            callback(null, worldcup);
        }
    });
}

WorldCup.prototype.getWorldCup = function(id, callback) {
  wcModel.findOne({_id:id},function(error, worldcup) {
        if(error) {
            callback(error);
        } else {
            callback(null, worldcup);
        }
    });
}

WorldCup.prototype.addUserToCup = function(id, user, callback) {
  
}

WorldCup.prototype.createWorldCup = function(wc, callback) {
  wcModel.save(wc, function(err, wc) {
        callback(err, wc);
    });
}

module.exports = WorldCup;
