var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;
var models = {};

function createUserSchema() {

    if(!models['user']){
        var User = new Schema({
            username: {type: String, index: { unique: true }},
            distId: Schema.ObjectId
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
          status: String,
          name: String,
          rules: String,
          part: [Schema.ObjectId],
          class: String,
          gps: [Schema.ObjectId]

        }, {collection: 'warranty'});

        models['warranty'] = mongoose.model('warranty', Warranty);
    }

    return models['warranty'];
}

function createGPSchema() {
  if(!models['gp']){
    var GP = new Schema({
      date: Date,
      courses: String
    });
  }
}


module.exports = {
    createUserSchema: createUserSchema,
    createWorldCupSchema: createWorldCupSchema,
    createGPSchema: createGPSchema
};
