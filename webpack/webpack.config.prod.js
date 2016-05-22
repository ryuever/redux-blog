var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var jquery = require('jquery');

// var webpack_config = require("webpack_config");

var config = require('config');

var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
var assetsPath = path.join(__dirname, '..', 'public', 'assets');

var webpack_config = {
  // devtool: "cheap-module-source-map",
  // context: path.join(__dirname, '../app'),
  entry:{
    app: path.join(__dirname, '..', 'app', 'client'),
    vendor: path.join(__dirname, '..', 'app', 'vendor'),
    style: path.join(__dirname, '..', 'app', 'stylesheets/rbMain')
  },
  output: {
    path: assetsPath,
    filename: '[name].js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new webpack.DefinePlugin({
    //   __TEST__: JSON.stringify(JSON.parse(process.env.TEST_ENV || 'false')),
    //   __DEV__: true
    // }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __DEV__: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new ExtractTextPlugin("[name].css")
    //
  ],
  module:{
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel',
        // include: path.resolve(__dirname, '..')
        exclude: path.resolve(__dirname, '..', "node_modules")
      },{
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      {test: /\.json$/, loader: "json-loader"}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.less'],
    // alias: {
    //   // webpack_config: path.join(__dirname, 'config', process.env.NODE_ENV)
    //   config: path.join(__dirname, 'config', process.env.NODE_ENV),
    //   pp: path.join(__dirname, '..', 'app', 'components', 'ArticleCommentListItemFooter')
    // },
    // root: path.resolve(__dirname, '..', 'app'),
    root: path.join(__dirname, '..', 'app')
    // modulesDirectories: [
    //   'node_modules', 'app'
    // ]
  }
}

var bower_dir = __dirname + '/bower_components';

// config.addVendor('react', bower_dir + '/simplemde/dist/simplemde.min.js');

module.exports = webpack_config;
