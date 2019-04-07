var GP = require('../models/gp');
var WorldCup = require('../models/worldcup');

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
  var cupId = req.param('id');
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
  var gpi = new GP();
  gpi.getGP(id, function(err, gp) {
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

function updateGP(req, res, next){
  var gpId = req.param('id')
  var up = req.body
  var gp = new GP()
  gp.updateGP(gpId, up, function(err, updated) {
    if(err) {
      return res.send(400);
    } else {
      return res.send(200, parseGP(updated));
    }
  });
}

function updateWorldCup(wc, result) {
  var points = [];
  for(key in result) {
    points.push({'nick':key, 'points': result[key]});
  }
  points.sort(function(a, b) {
    return b['points'] - a['points'];
  });
  var c = {}
  if(wc['classif']) {
    c = JSON.parse(wc['classif']);
  }
  var rules = JSON.parse(wc['rules']);
  for(var i=0; i < points.length; ++i) {
    if(!c[points[i]['nick']]) {
      c[points[i]['nick']] = 0
    }
    var pos = i+1
    c[points[i]['nick']] += rules['position'][''+pos];
  }
  wc['classif'] = JSON.stringify(c);
  var w = new WorldCup();
  w.updateWorldCup(wc['id'], wc, function(err, wcc) {
    if(err) {
      console.log(err);
    }
  });
}

function updateGPResult(req, res, next) {
  var gpId = req.param('id');
  var gpRes = req.body;
  var wc = new WorldCup();
  wc.getWorldCup(gpRes['worldcup'], function(err, worldcup) {
    if(err) {
      return res.send(400)
    } else {
      var result = createResult(JSON.parse(gpRes['courses']), JSON.parse(worldcup['rules']));
      updateWorldCup(worldcup, result);
      gpRes['result'] = JSON.stringify(result);
      var gp = new GP();
      gp.updateGP(gpId, gpRes, function(err, up) {
        if(err) {
          return res.send(400);
        } else {
          return res.send(200, parseGP(up));
        }
      });
    }
  });

}

function gpGetResults(req, res, next) {
  var id = req.param('id');
  var gpi = new GP();
  gpi.getGP(id, function(err, gp) {
    if(err) {
      return res.send(400);
    } else if(!gp['result']) {
      return res.send(200, "No s'ha fet la cursa encara "+gp['gpname']);
    } else {
      result = JSON.parse(gp['result']);
      res.writeHeader(200, {"Content-Type": "text/html"});  
      res.write(printResults(result));  
      res.end(); 
      //return res.send(200, printResults(result));
    }
  });
}

function printResults(result) {
  var points = [];
  for(key in result) {
    points.push({'nick':key, 'points': result[key]});
  }
  points.sort(function(a, b) {
    return b['points'] - a['points'];
  });
  var ret = '<html><div>';
  for(var i=0; i<points.length; ++i) {
    ret += '<p>'+points[i]['nick']+': '+points[i]['points']+'</p>';
  }
  return ret+'</div></html>';

}

function createResult(courses, rules) {
  var results = {}
  for(var i=0; i<courses.length; ++i) {
    for(var j=0; j<courses[i]["result"].length; ++j) {
      var current = courses[i]["result"][j];
      if(!results[current['username']]) {
        results[current['username']] = 0
      }
      results[current['username']] += rules['position'][current['pos']];
    }
  }
  return results;

}

function parseGPs(gps) {
  var ret = [];
  for(var i=0; i<gps.length; ++i) {
    ret.push(parseGP(gps[i]));
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
    getNextGP: getNextGP,
    updateGP: updateGP,
    updateGPResult: updateGPResult,
    gpGetResults: gpGetResults
};
