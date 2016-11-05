var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: '#eval-source-map',
  entry: './app/main.js',
  output: { path: __dirname, filename: 'bundle.js', publicPath: '/' },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },

      {test: /\.json$/,
      loader: 'json'}
    ]
  },
}
