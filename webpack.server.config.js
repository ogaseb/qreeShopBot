const path = require('path')
const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require( 'nodemon-webpack-plugin' ) // Ding

module.exports = {
  target: 'node',
  watch: false,
  mode: 'development',
  devtool: false,
  entry: './server.js',
  node: {
    __dirname: false
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'server.min.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new NodemonPlugin(), // Dong
  ],
  externals: [nodeExternals()]
}
