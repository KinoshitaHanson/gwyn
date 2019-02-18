/**
 * @description: 编译指定模块
 * @author: pkeros.
 * @date: 03/11/2017.
 * @mail: pkeros@vip.qq.com
 */

process.env.NODE_ENV = "production";

//const webpack = require("webpack");
const path = require("path");
//const shell = require("shelljs");
const chalk = require("chalk");
//const config = require("../config");
//const L = require("lodash");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
//const webpackConfigFactory = require("../build/webpack.prod.conf");
const fork = require('child_process').fork
var numCPUs = require('os').cpus().length;
numCPUs = Math.floor(numCPUs/2);

//let webpackConfigArr = [];

/**
 * 按模块打包
 * @method buildWithModule
 * @param  {[type]}        modules       [description]
 * @param  {String}        [brand='qiuku8'] [description]
 * @return {[type]}                      [description]
 */
function buildWithModule(modules, brand = 'qiuku8') {
    // 添加模块配置
    console.log(chalk.cyan(`Start Build ... \n`));
    let allMoudleLength = modules.length,x=0;
    for(var i = 0; i < numCPUs; i++) {
        let module = modules.shift();
        if(!module) {
            return;
        }
        let n = fork(path.join(__dirname,'./child-build.js'));
        n.send({
            module,
            brand
        })
        n.on('message', function(m) {
            let module = modules.shift();
            console.log(`${++x/allMoudleLength*100}%`);
            if(module) {
                n.send({
                    module,
                    brand
                })
            }else{
                if(--i==0){
                    let second  = (new Date().getTime()-global.startTime)/1000;
                    console.log(`耗时${Math.floor(second/60)}分${Math.round(second%60)}秒`);
                    if(!process.env.npm_config_report){
                        process.exit(0)
                    }
                }
            }
        })
    }
}
module.exports = buildWithModule;
