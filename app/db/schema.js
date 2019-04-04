var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var models = {};

function createUserSchema() {

    if(!models['user']){
        var User = new Schema({
            username: {type: String, index: { unique: true }},
            name: String,
            wc: [Schema.ObjectId]
        }, {collection: 'user'});

        models['user'] = mongoose.model('user', User);
    }
    return models['user'];
}

function createWorldCupSchema() {

    if(!models['worldcup']){
        var WorldCup = new Schema({
          initDate: Date,
          endDate: Date,
          state: String,
          name: String,
          rules: String,
          part: [Schema.ObjectId],
          classif: String,
          gps: [Schema.ObjectId]

        }, {collection: 'worldcup'});

        models['worldcup'] = mongoose.model('worldcup', WorldCup);
    }
    return models['worldcup'];
}

function createGPSchema() {
  if(!models['gp']){
    var GP = new Schema({
      name: String,
      worldcup: Schema.ObjectId,
      date: Date,
      courses: String
    }, {collection: 'gp'});

    models['gp'] = mongoose.model('gp', GP);
  }

  return models['gp'];
}


module.exports = {
    createUserSchema: createUserSchema,
    createWorldCupSchema: createWorldCupSchema,
    createGPSchema: createGPSchema
};
