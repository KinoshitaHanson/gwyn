process.env.NODE_ENV = "production";

const webpack = require("webpack");
const path = require("path");
const shell = require("shelljs");
const chalk = require("chalk");
const config = require("../config");
const L = require("lodash");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackConfigFactory = require("../build/webpack.prod.conf");

process.on('message', function(obj) {
    var module = obj.module;
    var brand = obj.brand;
    let wbc = webpackConfigFactory(brand); //L.cloneDeep(webpackConfig);
    let FirstModule, secodMenu, entry, outputPath, outputPublicPath;

    FirstModule = module.split("_")[0];
    if(module.indexOf("_") > -1) {
        secodMenu = module.split("_")[1];
    }

    if(secodMenu) {
        entry = path.resolve(__dirname, `../src/module/${FirstModule}/${secodMenu}/main.js`);
        outputPath = path.join(config.build.assetsRoot, module.replace("_", "/"));
        outputPublicPath = `/${FirstModule}/${secodMenu}/`; // path.join("/", `${FirstModule}/${secodMenu}`, "/");
    } else {
        entry = path.resolve(__dirname, `../src/module/${module}/main.js`);
        outputPath = path.join(config.build.assetsRoot, FirstModule);
        outputPublicPath = `/${FirstModule}/`; // path.join("/", FirstModule, "/");
    }

    wbc.entry = [path.resolve(__dirname,'./common/polyfill'),path.resolve(__dirname,'./common/setUrlParam2Cookie')].concat(entry);
    wbc.output.path = outputPath;
    wbc.output.publicPath = outputPublicPath;
    wbc.plugins = wbc.plugins.filter(function(plugin) {
        return plugin.constructor.name !== "HtmlWebpackPlugin";
    });

    let fileNameUrl = secodMenu ?
        path.join(config.build.assetsRoot, `${FirstModule}/${secodMenu}/index.html`) :
        path.join(config.build.assetsRoot, `${module}/index.html`);

    wbc.plugins.push(
        new HtmlWebpackPlugin({
            filename: fileNameUrl,
            template: path.resolve(__dirname, "../index.html"),
            inject: true,
            process:{
                env: {
                    vueRuntime:config.build.vueRuntime
                }
            },
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: "dependency"
        })
    );
    webpack(wbc, function(err, stats) {
            if (err) throw err;

            process.stdout.write(
                stats.toString({
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false
                }) + "\n\n"
            );

            console.log(chalk.cyan(`${brand}- ${wbc.output.path} Build complete.\n`));
            process.send('over')
//          if (webpackConfigArr.length > 0) buildAllModule(webpackConfigArr.shift());
        });
})
