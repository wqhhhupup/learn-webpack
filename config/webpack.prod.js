const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlgin = require("mini-css-extract-plugin")

module.exports = {
  mode: "production",
  externals: {
    lodash: "_",
    dayjs: "dayjs"
  },
  optimization: {
    splitChunks: {
      // initial 同步
      // async 异步
      // all 全部
      chunks: "all",// 异步  通过 import 导入
      //minSize: 20000, // 小于 minsize 才会拆包  
      //把大于maxsize的包 拆分成不小于 minsize 的包
      // maxSize: 30000,
      minChunks: 2, // 表示被引用的次数小于minChunks就不拆分
      // 表示匹配到
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          filename: "js/[id]_vendor.js",
          // name: "vendor"
        }
      },


    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: '"./"'
    }),

    new MiniCssExtractPlgin({
      filename: "css/[name][hash:6].css"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            // 需要忽略的文件
            ignore: [
              "**/index2.html",
              "**/.DS_Store"
            ]
          }
        }
      ]


    }),
    new CleanWebpackPlugin(),

  ]
}