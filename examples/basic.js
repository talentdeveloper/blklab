var BlkLab = require('../index');

BlkLab.Router.get('/', function(req, res){
	res.send({test:"something"});
});

BlkLab.Router.get('/path', function(req, res){
	res.send({test:"something"});
});

BlkLab.Router.get('/other', function(req, res){
	res.send({test:"something"});
});

BlkLab.Router.get('/thing', function(req, res){
	res.send({test:"something"});
});

BlkLab.Router.get('/doit', function(req, res){
	res.send({test:"something"});
});

BlkLab.Router.get('/alright', function(req, res){
	res.send({test:"something"});
});

new BlkLab.Server({
	cors: true
}).listen(4014);
