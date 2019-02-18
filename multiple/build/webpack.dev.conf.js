var path = require('path');
var utils = require("./utils");
var webpack = require("webpack");
var config = require("../config");
var merge = require("webpack-merge");
var baseWebpackConfig = require("./webpack.base.conf");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');


var brandConfig = require("../config/brand");


module.exports = function webpackConfigFactory(modules,_brand='jdd') {
    var entry = {};
    entry["home/app"] = ["./build/dev-client",path.resolve(__dirname,'./common/setUrlParam2Cookie')].concat("./src/module/home/main.js");
    entry["communal/loginTransfer/app"] = ["./build/dev-client",path.resolve(__dirname,'./common/setUrlParam2Cookie')].concat("./src/module/communal/loginTransfer/main.js");

    modules.forEach(m=>{
        entry[`${m.replace('_','/')}/app`] = ["./build/dev-client",path.resolve(__dirname,'./common/setUrlParam2Cookie')].concat(`./src/module/${m.replace('_','/')}/main.js`);
    });
    const brand = brandConfig[_brand];

    // add hot-reload related code to entry chunks
    // Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    //     entry[config.currentProjectDirectory + name] = ["./build/dev-client",path.resolve(__dirname,'./common/setUrlParam2Cookie')].concat(baseWebpackConfig.entry[name]);
    // });
    baseWebpackConfig.entry = entry;

    let imgDir = path.join(__dirname, '..', 'src/public/images/'+brand.id+'/')

    let res = merge(baseWebpackConfig, {
        module: {
            rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
        },
        // cheap-module-eval-source-map is faster for development
        devtool: "#cheap-module-eval-source-map",
        plugins: [
            new webpack.DefinePlugin({
                "process.env": config.dev.env,
                BRAND_CONFIG: JSON.stringify(brand)
            }),
            // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            // https://github.com/ampedandwired/html-webpack-plugin
            new FriendlyErrorsPlugin(),
            new CopyWebpackPlugin([{
                from:imgDir,
                to:baseWebpackConfig.output.path+'/images/'
            }])
        ]
    });
    Object.keys(baseWebpackConfig.entry).forEach(function(name) {
        // console.log(name.split('app')[0]+'index.html');
        res.plugins.push(
            new HtmlWebpackPlugin({
                filename: name.split("app")[0] + "index.html",
                template: "index.html",
                chunks: [name],
                inject: true,
                process:{
                    env: {
                        vueRuntime:config.dev.vueRuntime
                    }
                },
            })
        );
    });

    return res;
}
