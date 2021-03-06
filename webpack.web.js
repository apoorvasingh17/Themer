/* eslint import/no-extraneous-dependencies: off */

const path = require("path");
const merge = require("webpack-merge");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  entry: {
    index: "./src/web/index"
  },
  devServer: {
    contentBase: path.join(__dirname, "build/web")
  },
  output: {
    path: path.resolve(__dirname, "build/web"),
    filename: "[name].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/web/index.html.ejs",
      filename: "index.html",
      chunks: ["index"]
    }),
    new CopyWebpackPlugin([
      { from: "./src/images", to: "images" },
      // FIXME: Bundling this in webpack causes it to fail, just copy for now
      { from: "./node_modules/json-url/dist/browser", to: "vendor" }
    ])
  ]
});
