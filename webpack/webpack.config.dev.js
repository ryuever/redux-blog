var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var jquery = require('jquery');

var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
var assetsPath = path.join(__dirname, '..', 'public', 'assets');

var config = {
  devtool: 'cheap-module-eval-source-map',
  context: path.join(__dirname, '../app'),
  entry:{
    app: ['./client', hotMiddlewareScript],
    vendor: './vendor',
    style: './stylesheets/_rb-main'
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
  ],
  module:{
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel',
        include: path.join(__dirname,'..', 'app')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      {test: /\.json$/, loader: "json-loader"}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.less'],
    root: path.resolve(__dirname, '..', 'app'),
    modulesDirectories: [
      'node_modules', 'app'
    ],
    fallback: path.resolve(__dirname, '..', 'app'),
    alias: {
      MakeRequest: path.resolve(__dirname, '..', 'app/util/MakeRequest')
    }
  }
}

module.exports = config;
