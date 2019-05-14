#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');


program.version('0.0.1')
       .usage('<keywords>')
       .option('-f, --full', 'Full output without any styling')
       .parse(process.argv);
/*
console.log(program.args.length)

if(!program.args.length) {
    program.help();
} else {
    console.log('Keywords: ' + program.args);
}*/

if(program.full){
    console.log('Test');
}
