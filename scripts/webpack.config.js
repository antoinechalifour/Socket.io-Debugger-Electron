const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: path.resolve(__dirname, '../dist')
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  }
}
