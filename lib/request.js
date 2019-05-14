var url = require('url');
var querystring = require('querystring');
var Promise = require('promise');
var urlPattern = require('url-pattern');
var formidable = require('formidable');
var router = require('./router');

function parseBody(req, res){
	var form = new formidable.IncomingForm();
	return new Promise(function (resolve, reject){
		form.parse(req, function(err, fields, files) {
			if(err){
				res.end('{error:1}');
			}
			req.body = fields || {};
			req.files = files || {};
			resolve();
		});
	});
}

function parseQuerystring(req, res){
	return new Promise(function (resolve, reject){
		var purl = url.parse(req.url);
		req.url = purl.pathname;
		req.querystring = querystring.parse(purl.query);
		resolve();
	});
}

module.exports = {
	querystring: parseQuerystring,
	body: parseBody
};
