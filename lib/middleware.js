var struct = [];

function use(fn){
	struct.push(fn);
}

var internals = {};

exports = module.exports = internals.Middleware = {
    use: use
};

