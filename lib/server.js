var http = require('http');
var https = require('https');
var Router = require('./router');
var Req = require('./request');
var Res = require('./response');
var Middleware = require('./middleware');
var Promise = require('promise');


function Server(options){
	var self = this;
	this.options = options;
	this.optionHeaders = null;
	this.method;

	var protocol = options.ssl ? https : http;

	this.server = http.createServer();
	this.server.on('request', this.dispatch());
    return this.server;
}

Server.prototype.inject = function(req, res){
	req.querystring = {};
	req.pattern = "";
	req.body = {};
	req.files = {};
	res.send = Res.send.bind(res);
	res.status = 200;
	res.headers = {};
	res.gzip = false;
	res.etag = false;
	res.if_none_match = req.headers['if-none-match'] || '';
	res.contentType = 'application/json';
	if(this.options.cors === true && this.optionHeaders){
		res.headers = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers':this.optionHeaders['access-control-request-headers'],
			'Access-Control-Allow-Methods':this.optionHeaders['access-control-request-method']
		};
	}
};

Server.prototype.dispatch = function() {
	var self = this;
	var handler;
	return function(req, res){
		this.method = req.method.toLowerCase();
		if(this.method == 'options'){
			self.optionHeaders = req.headers;
			self.inject(req, res);
			res.writeHead(res.status, res.headers);
			res.end('');
		}else{
			var ret;
			self.inject(req, res);
			if(this.method == 'get'){
				ret = Req.querystring(req, res);
			}else{
				ret = Req.body(req, res);
			}
			ret.then(function(){
				Router.load(req, res);
			});
		}
	};
};

Server.prototype.use = function(fn){
	Middleware.use(fn);
	return this;
}

internals = {};

exports = module.exports = internals.Server = Server;
