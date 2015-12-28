var webpack = require('webpack');

var JS_REGEX = /\.js$|\.jsx$|\.es6$|\.babel$/;
module.exports = {
  context: __dirname + "/app",
  entry: {
    javascript: "./components/main.js",
    html: "./index.html"
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'libs': __dirname + '/libs',
      'constants': __dirname + '/app/constants',
      'stores': __dirname + '/app/stores',
      'components': __dirname + '/app/components',
      'actions': __dirname + '/app/actions',
      'services': __dirname + '/app/services',
      'styles': __dirname + '/app/styles',
      'images': __dirname + '/app/images'
    }
  },

  output: {
    filename: "components/main.js",
    path: __dirname + "/dist"
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ],
  module: {
    loaders: [
      {test: JS_REGEX, exclude: /node_modules/, loaders: ["babel-loader"]},
      {test: JS_REGEX, exclude: /node_modules|libs/, loaders: ["react-hot", "babel-loader"]},
      {test: /\.html$/, loader: "file?name=[name].[ext]"},
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml'},
      {test: /\.png$/, loader: "url-loader?mimetype=image/png"},
      {test: /\.jpg$|\.jpeg$/, loader: "url-loader?mimetype=image/jpeg"}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({sourceMap: false})
  ]
};
