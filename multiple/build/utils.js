var path = require("path");
var fs = require("fs");
var config = require("../config");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

exports.assetsPath = function(_path) {
    var assetsSubDirectory = process.env.NODE_ENV === "production" ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function(options) {
    options = options || {};

    var cssLoader = {
        loader: "css-loader",
        options: {
            minimize: process.env.NODE_ENV === "production",
            sourceMap: options.sourceMap
        }
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader];
        if(loader) {
            loaders.push({
                loader: loader + "-loader",
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if(options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: "vue-style-loader"
            });
        } else {
            return ["vue-style-loader"].concat(loaders);
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders("less"),
        sass: generateLoaders("sass", {
            indentedSyntax: true
        }),
        scss: generateLoaders("sass"),
        stylus: generateLoaders("stylus"),
        styl: generateLoaders("stylus")
    };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
    var output = [];
    var loaders = exports.cssLoaders(options);
    for(var extension in loaders) {
        var loader = loaders[extension];
        output.push({
            test: new RegExp("\\." + extension + "$"),
            use: loader
        });
    }
    return output;
};

/**
 * 查找目录下模块
 * @method
 * @param  {string[]} moduleList [目录名称]
 * @return {string[]}            [description]
 */
function findModule(moduleList) {
    let result = [];
    if(moduleList.length == 1 && moduleList[0] == 'all') moduleList = ['']
    moduleList.forEach(m => {
        if(m.indexOf('index.html') > -1) return;

        let path = resolve(`src/module/${m.replace('_','/')}`)
        if(!fs.existsSync(path)){
            throw new Error(`${path}  文件夹不存在`)
        }
        
        if(fs.statSync(path).isDirectory()) {
            
            let dir = fs.readdirSync(path);
            if(dir.indexOf('main.js') > -1) {
                result.push(m);
            } else {
                result = result.concat(findModule(dir.map(n => m ? `${m}/${n}` : n)));
            }
        }

    });

    return result;

};

exports.findModule = findModule;

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}