const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const webpack = require("webpack")
const CopyPlugin = require("copy-webpack-plugin");  // 复制文件夹内容到打包文件夹
const MiniCssExtractPlgin = require("mini-css-extract-plugin") // 提取css到css文件夹
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // 压缩css代码
const PurgeCssWebpackPlugin = require("purgecss-webpack-plugin") // 清除css无用代码
const CompressionPlugin = require("compression-webpack-plugin")  // gzip 压缩
const HtmlWebpackPlugin = require("html-webpack-plugin")
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin")  // 把runtime 代码嵌入模板中
const glob = require("glob")


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
      filename: "css/[name][contenthash:6].css"
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
    new CssMinimizerPlugin(),   // css 压缩
    // css tree shaking 
    new PurgeCssWebpackPlugin({
      paths: glob.sync(`${path.resolve(__dirname, "../src")}/**/*`, { nodir: true }),  //表示匹配src目录下的所有文件，非文件夹
      // 表示当前元素不会被treeshaking掉
      safelist: function () {
        return {
          standard: ["html"]
        }
      }
    }),
    // http 压缩 
    new CompressionPlugin({
      threshold: 0, // 比当前设置大 都压缩
      test: /\.(css|js)$/i
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime.*\.js$/i])
  ]
}