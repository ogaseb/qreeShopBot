const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin"); // Ding

module.exports = {
  target: "node",
  mode: "production",
  entry: "./server.js",
  output: {
    path: path.resolve(__dirname),
    filename: "build/[name].js"
  },
  plugins: [
    new NodemonPlugin() // Dong
  ],
  externals: [nodeExternals()]
};
