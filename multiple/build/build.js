require("./check-versions")();

process.env.NODE_ENV = "production";
global.startTime = new Date().getTime();

var ora = require("ora");
var rm = require("rimraf");
var path = require("path");
var chalk = require("chalk");
var webpack = require("webpack");
var config = require("../config");
var utils = require("./utils");
var buildModule = require("./build-with-module");
const shell = require("shelljs");
var brandConfig  = require('../config/brand');

let processArgs = process.argv.splice(2);
const brand = processArgs[0] || "qiuku8"; //第一个参数为品牌类型
let moduleList = processArgs.splice(1); //后面的参数为模块名
if(moduleList.length==0){
    console.log('请输入至少一个模块！');
    return;
    // moduleList = [config.currentProjectDirectory.slice(0,config.currentProjectDirectory.length-1).replace('/','_')]
}

if(!brandConfig[brand]){
    console.log(chalk.bgRed(`error,first parameter should be brand! \n`));
    return;
}


const modules = utils.findModule(moduleList);

if (modules.length == 0) {
    console.log(chalk.bgRed(`error,please enter the module! \n`));
    return;
}
shell.rm("-rf", config.build.assetsRoot);
buildModule(modules.map(m => m.replace("/", "_")), brand);

// rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
//     if (err) throw err;
//     buildModule(modules.map(m => m.replace("/", "_")), brand);
// });
