var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var models = {};

function createUserSchema() {

    if(!models['user']){
        var User = new Schema({
            username: {type: String, index: { unique: true }},
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
          rules: Object,
          part: [Schema.ObjectId],
          classif: Object,
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
      courses: Object
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
