require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfigFactory = require('./webpack.dev.conf')
var history = require('connect-history-api-fallback');
var brandConfig = require("../config/brand");
var chalk = require("chalk");

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

let processArgs = process.argv.splice(2);
const brand = processArgs[0] || "jdd"; //第一个参数为品牌类型
const moduleList = processArgs.splice(1); //后面的参数为模块名

if(!brandConfig[brand]){
    console.log(chalk.bgRed(`error,first parameter should be brand! \n`));
    return;
}

let webpackConfig = webpackConfigFactory(moduleList,brand);

var app = express()
var compiler = webpack(webpackConfig)


var historyList = [];

//支持history模式(需第一个注册)
app.use(history({
  rewrites: [{
    from: '/', // 正则或者字符串
    to: function(context){
      if(context.match.input.lastIndexOf('.') > context.match.input.lastIndexOf('/'))return context.match.input;

      let u = context.match.input.split('/');
      if(u[1]=='communal'||u[1]=='hd') return `/${u[1]}/${u[2]}/index.html`;

      return `/${u[1]}/index.html`;
    }
  }]
}));

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})


Object.keys(webpackConfig.entry).forEach(function (name) {


  var router = name.split('/app')[0];
  historyList.push({
    from:'/'+router,
    to:'/'+router+'/index.html'
  })
  historyList[router] = '/'+router+'/index.html';

});
// console.log(historyList);
// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')({rewrites:historyList}))

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)


// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('static'))
//

var uri = `http://localhost:${port}/${moduleList[0] ? moduleList[0].replace('_','/') :'home'}`;

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
