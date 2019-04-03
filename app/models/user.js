var schema = require('../db/schema');

var userModel = schema.createUserSchema();

function User () {

}

User.prototype.getAllUsers = function(callback) {
  userModel.find(function(error, users) {
        if(error) {
            callback(error);
        } else {
            callback(null, users);
        }
    });
};

User.prototype.createUser = function(user, callback) {
    var inst = new userModel(user);
    inst.save(user, function(err, u) {
          callback(err, u);
      });
};
  

module.exports = User;