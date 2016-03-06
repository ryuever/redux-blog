var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var jquery = require('jquery');

var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
var assetsPath = path.join(__dirname, '..', 'public', 'assets');

var config = {
  // addVendor: function (name, path) {
  //   this.resolve.alias[name] = path;
  //   this.module.noParse.push(new RegExp('^' + name + '$'));
  // },
  // devtool: 'cheap-module-eval-source-map',
  // devtool: "source-map",
  context: path.join(__dirname, '../app'),
  entry:{
    // app: ['./client', hotMiddlewareScript],
    app: './client',
    vendor: './vendor',
    style: './stylesheets/_rb-main'
  },
  // entry: [
  //   'webpack-hot-middleware/client',
  //   './client'
  // ],
  output: {
    path: assetsPath,
    filename: '[name].js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __TEST__: JSON.stringify(JSON.parse(process.env.TEST_ENV || 'false')),
      __DEV__: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new ExtractTextPlugin("[name].css")
    //
  ],
  module:{
    loaders: [
      // { test: /js\/bootstrap-markdown\.js$/, loader: 'imports?jQuery=jquery' },
      {
        // test: /\.jsx?$/,
        test: /\.js$|\.jsx$/,
        loader: 'babel',
        include: path.join(__dirname,'..', 'app')
        // include: path.join(__dirname, 'app'),
        // query: {
        //   "presets": ["react", "es2015"],
        //   plugins: [
        //     ["react-transform", {
        //       transforms: [{
        //         transform: "react-transform-hmr",
        //         imports: ["react"],
        //         locals: ["module"]
        //       }, {
        //         "transform": "react-transform-catch-errors",
        //         "imports": ["react", "redbox-react"]
        //       }]
        //     }]
        //   ]
        // }
      },{
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      },

      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      {test: /\.json$/, loader: "json-loader"}


      // {
      //   test: /\.less$/,
      //   loader: "style!css!less"
      //   // test: /\.css?$/,
      //   // loaders: ['style', 'raw'],
      //   // include: __dirname
      // }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.less'],
    modulesDirectories: [
      'node_modules'
    ]
  }
}

var bower_dir = __dirname + '/bower_components';

// config.addVendor('react', bower_dir + '/simplemde/dist/simplemde.min.js');

module.exports = config;
