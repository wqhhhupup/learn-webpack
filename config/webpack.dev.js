const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const MiniCssExtractPlgin = require("mini-css-extract-plugin")
module.exports = {
  mode: "development",
  // context:"",  默认为根路径
  // entry: "./src/main.js", // 当前的相对路径不是根据当前文件的所在相对路径，而是根据 context所设置的路径的相对路径
  devServer: {
    hot: true,
    compress: true,  // 开发优化 压缩 减小包体积
    port: 9000,
    // contentBase: "./h.js"
    // static: "./h.js"
  },

  plugins: [
    // new HtmlWebpackPlugin({
    //   template: "./public/index2.html",
    //   title: "learn webpack"
    // }),
    new webpack.DefinePlugin({
      BASE_URL: '"./"'
    }),

    new MiniCssExtractPlgin({
      filename:"css/[name].[hash:6].css"
    })
    
  ]
}