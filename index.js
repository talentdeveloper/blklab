var Server = require('./lib/server');
var Router = require('./lib/router');
var Auth = require('./lib/auth');

internals = {
	Server: Server,
	Router: Router,
	Auth: Auth
};

exports = module.exports = internals;
