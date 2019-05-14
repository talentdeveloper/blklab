var utils = module.exports = {};

utils.truth = function(x){
    return (x !== false) && exists(x);
}

utils.exists = function(x){
    return x != null;
}

utils.head = function(x){
    if(utils.exists(x))
        return x[0];
}

utils.tail = function(x){
    if(utils.exists(x))
        return Array.prototype.slice.call(x,1);
}

utils.cat = function(){
    var head = utils.head(arguments);
    if(utils.exists(head)){
        return head.concat.apply(head, utils.tail(arguments));
    }else{
        return [];
    }
}

utils.getItem = function(x){
    return function(item){
        return item && item[x];
    }
}

utils.pluck = function(arr, propertyName){
    if(utils.exists(arr)){
        return arr.map(utils.getItem(propertyName));
    }else{
        return undefined;
    }
}

utils.pick = function(obj, keys){}

utils.omit = function(obj, keys){}

utils.defaults = function(obj, keys){}

utils.groupBy = function(obj, keys){}

utils.any = function(){}

utils.all = function(){}

utils.values = function(obj){}

utils.finder = function(fun, col){
    return col.reduce(function(x,y){
        return fun(x, y) ? x : y;
    });
}

utils.repeat = function(times, fun){
    return utils.range(times).map(fun);
}

utils.range = function(times){
    var range = Array(times);
    for(var i=0;i<times;i++){
        range[i] = i;
    }
    return range;
}

utils.isObject = function(obj){
    return true;
}

utils.isString = function(str){
    return true;
}

utils.isArray = function(arr){
    return true;
}

utils.isNumber = function(num){
    return true;
}
