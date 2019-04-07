var schema = require('../db/schema');

var wcModel = schema.createWorldCupSchema();

function WorldCup () {

}

WorldCup.prototype.getAllWorldCups = function(callback) {
  wcModel.find(function(error, worldcups) {
        if(error) {
            callback(error);
        } else {
            callback(null, worldcups);
        }
    });
};

WorldCup.prototype.getCurrentWorldCup = function(callback) {

  wcModel.findOne({state: "current"},function(error, worldcup) {
        if(error) {
            callback(error);
        } else {
            callback(null, worldcup);
        }
    });
};

WorldCup.prototype.getWorldCup = function(id, callback) {

  wcModel.findOne({_id:id},function(error, worldcup) {
        if(error) {
            callback(error);
        } else {
            callback(null, worldcup);
        }
    });
};

WorldCup.prototype.createWorldCup = function(wc, callback) {
  var inst = new wcModel(wc);
  inst.save(wc, function(err, wc) {
        callback(err, wc);
    });
};

WorldCup.prototype.updateWorldCup = function(id, wc, callback) {
    wcModel.update({_id: id}, parseWorldCup(wc), function(err, r) {
        callback(err, r);
    });
};


function parseWorldCup(wc) {
    var nwc = {};
    putData(nwc, 'initDate', gp.initDate);
    putData(nwc, 'endDate', gp.endDate);
    putData(nwc, 'state', gp.state);
    putData(nwc, 'name', gp.name);
    putData(nwc, 'rules', gp.rules);
    putData(nwc, 'part', gp.part);
    putData(nwc, 'classif', gp.classif);
    putData(nwc, 'gps', gp.gps);
    return nwc;
  }
  
  function putData(war, id, data){
    if(data){
        war[id] = data;
    }
  }

module.exports = WorldCup;
