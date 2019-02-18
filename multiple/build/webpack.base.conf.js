var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

// const entry = {};
// entry['app'] = './src/module/' + config.currentProjectDirectory + '/main.js';

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [
        resolve('src'), resolve('test')
    ],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
});

module.exports = {
    context: path.resolve(__dirname, "../"),
    // entry: entry,
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    // externals: {
    //   'vue': 'Vue',
    // },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'public': path.resolve(__dirname, '../src/public'),
            'common': path.resolve(__dirname, '../src/common'),
            'html': path.resolve(__dirname, '../src/html'),
            'components': path.resolve(__dirname, '../src/public/components'),
            'football': path.resolve(__dirname, '../src/module/football'),
            'basketball': path.resolve(__dirname, '../src/module/basketball'),
            'home':path.resolve(__dirname, '../src/module/home'),
            'lottery':path.resolve(__dirname,'../src/module/lottery'),
            'communal':path.resolve(__dirname, '../src/module/communal'),
            'hd':path.resolve(__dirname, '../src/module/hd'),
            'point':path.resolve(__dirname, '../src/module/point'),
        }
    },
    module: {
        rules: [
            // ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
              test: /\.(js|vue)$/,
              loader: 'eslint-loader',
              enforce: 'pre',
              include: [path.join(__dirname, '..', 'src')],
              options: {
                // formatter: require('eslint-friendly-formatter'),
                formatter:  process.env.NODE_ENV === 'production'
                      ?require('eslint-friendly-formatter')
                      :require('eslint/lib/formatters/table'),
                emitWarning: false,
                quiet:process.env.NODE_ENV === 'production'
              }
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                  root: path.join(__dirname, '../')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 2048,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            // {
            //     test: /\.exec\.js$/,
            //     loader: 'script-loader'
            //     // https://webpack.js.org/guides/shimming/#other-utilities
            // }
        ]
    }
}
