var User = require('../models/user');

/**
 * Gets the user into the session
 * @param req
 * @param res
 * @param next
 */
function getUsers(req, res, next) {
    var user = new User();
    user.getAllUsers(function(err, users) {
        if(err) {
            return res.send(400);
        } else {
            return res.send(200, parseUsers(users));
        }
    });
}

function createUser(req, res, next) {
    var user = new User();
    var ujson = req.body;
    user.createUser(ujson, function(err, u) {
        if(err) {
            return res.send(400);
        } else {
            return res.send(200, parseUser(u));
        }
    });
}

function parseUsers(users) {
    var ret = [];
    for(var i=0; i<users.length; ++i){
        ret.push(parseUser(users[i]));
    }
    return ret;
}

function parseUser(user) {
    ret = {};
    ret['name'] = user.name;
    ret['id'] = user._id;
    ret['username'] = user.username
    return ret
}

module.exports = {
    createUser:createUser,
    getUsers:getUsers
}
