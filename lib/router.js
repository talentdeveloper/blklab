var pathToRegexp = require('path-to-regexp');
var _ = require('underscore');
var Auth = require('./auth');

var struct = {
    'GET': [],
    'POST': [],
    'PUT': [],
    'DELETE': [],
};

function load(req, res){

	var methStruct = struct[req.method.toUpperCase()];
    if(methStruct){
		var resource;
		var regex;
		var params;
		var i;
		var len;
		var secure = false;

		methStruct.some(function(el){
			params = {};
            regex = el.pattern.exec(req.url.replace(/\/{2}/, '/'));
			if(regex){
                req.pattern = el.url;
                resource = el.resource;
				secure = el.secure;
				len = parseInt(el.keys.length) + 1;
				for(i=1;i<len;i++){
					params[el.keys[i-1].name] = regex[i];
				}
				return true;
			}
			return false;
		});

        if(resource && secure){
			Auth.validate.call(this, req, res).then(function(){
				req.params = params;
				resource.call(this, req, res);
			}, function(msg){
				res.status = 401;
				res.send(msg);
			})
		}else if(resource){
			req.params = params;
			resource.call(this, req, res);
        }else{
			res.status = 404;
			res.send(['Not Found']);
		}
    }else{
		res.status = 404;
		res.send(['Error']);
	}
}

function get(url, resource, secure){
	add(struct.GET, url, resource, secure);
}

function post(url, resource, secure){
    add(struct.POST, url, resource, secure);
}

function put(url, resource, secure){
    add(struct.PUT, url, resource, secure);
}

function del(url, resource, secure){
    add(struct.DELETE, url, resource, secure);
}

function add(struct, url, resource, secure){
	var keys = [];
	var pattern = new pathToRegexp(url, keys);
	struct.push({
        url: url,
		pattern: pattern,
		resource: resource,
		keys:keys,
		secure:secure
	});
}

internals = {};

exports = module.exports = internals.Router = {
    load: load,
    get: get,
    post:post,
    put:put,
    del:del
};
