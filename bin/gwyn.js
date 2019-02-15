#!/usr/bin/env node
const program = require('commander');
const package = require('../package.json');


program.version(package.version,'-V,--version')
       .command('init [name]','创建项目')
       .parse(process.argv);


// console.log('end');