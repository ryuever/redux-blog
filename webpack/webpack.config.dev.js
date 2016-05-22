var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

var assetsPath = path.join(__dirname, "..", "public", "assets");
var publicPath = "/assets/";

var commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    /* query: {
       "presets": ["es2015", "react", "stage-0"],
       "plugins": [
       "transform-decorators-legacy",
       "transform-react-remove-prop-types",
       "transform-react-constant-elements",
       "transform-react-inline-elements"
       ]
       }, */
    include: path.join(__dirname, '..', 'app'),
    exclude: path.join(__dirname, '..', 'node_modules')
  },
  { test: /\.json$/, loader: "json-loader" },
  { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
  /* {
     test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
     loader: 'url-loader',
     query: {
     name: '[hash].[ext]',
     limit: 10000,
     }
     }, */
  { test: /\.css|\.less$/,
    loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
  }
];

module.exports = [
  {
    // The configuration for the client
    name: "browser",
    /* The entry point of the bundle
     * Entry points for multi page app could be more complex
     * A good example of entry points would be:
     * entry: {
     *   pageA: "./pageA",
     *   pageB: "./pageB",
     *   pageC: "./pageC",
     *   adminPageA: "./adminPageA",
     *   adminPageB: "./adminPageB",
     *   adminPageC: "./adminPageC"
     * }
     *
     * We can then proceed to optimize what are the common chunks
     * plugins: [
     *  new CommonsChunkPlugin("admin-commons.js", ["adminPageA", "adminPageB"]),
     *  new CommonsChunkPlugin("common.js", ["pageA", "pageB", "admin-commons.js"], 2),
     *  new CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]);
     * ]
     */
    // A SourceMap is emitted.
    devtool: "source-map",
    context: path.join(__dirname, "..", "app"),
    entry: {
      app: "./client",
      vendor: './vendor',
      style: './stylesheets/rbMain'
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "[name].js",
      // The output path from the view of the Javascript
      publicPath: publicPath

    },
    module: {
      loaders: commonLoaders
    },
    resolve: {
      root: [path.join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css', '.less']
    },
    plugins: [
        // extract inline css from modules into separate files
      // new ExtractTextPlugin("styles/main.css"),
      // new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js', Infinity),
      new ExtractTextPlugin("[name].css"),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        }),
        new webpack.DefinePlugin({
          __DEVCLIENT__: false,
          __DEVSERVER__: false,
          __DEV__: true
        })
    ]
  }, {
    // The configuration for the server-side rendering
    name: "server-side rendering",
    context: path.join(__dirname, "..", "app"),
    entry: {
      server: "./server"
    },
    target: "node",
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "server.js",
      // The output path from the view of the Javascript
      publicPath: publicPath,
      libraryTarget: "commonjs2"
    },
    module: {
      loaders: commonLoaders
    },
    resolve: {
      root: [path.join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css', '.less']
    },
    plugins: [
        // Order the modules and chunks by occurrence.
        // This saves space, because often referenced modules
        // and chunks get smaller ids.
      new webpack.optimize.OccurenceOrderPlugin(),
        // new ExtractTextPlugin("styles/main.css"),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        }),
        new webpack.DefinePlugin({
          __DEVCLIENT__: false,
          __DEVSERVER__: false,
          __DEV__: true
        })
    ],
  }
];














/* var path = require('path');
   var webpack = require('webpack');
   var ExtractTextPlugin = require("extract-text-webpack-plugin");

   var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
   var assetsPath = path.join(__dirname, '..', 'public', 'assets');

   var config = {
   devtool: 'cheap-module-eval-source-map',
   context: path.join(__dirname, '../app'),
   entry:{
   app: ['./client', hotMiddlewareScript],
   vendor: './vendor',
   style: './stylesheets/rbMain'
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

   module.exports = config; */
