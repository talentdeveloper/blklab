var Promise = require('promise');

var internals = {};

exports = module.exports = internals.Auth = {
    token_field:'x-access-token',

    check: function(){},

    validate: function(req, res){
        return new Promise(function(resolve, reject){
            internals.Auth.check(req, res, resolve, reject);
        });
    }
}
