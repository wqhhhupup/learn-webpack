const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const devConf = require("./webpack.dev")
const proConf = require("./webpack.prod")
const { merge } = require("webpack-merge")



const commonConf = function (isProduction) {

  return {

    // context:"",  默认为根路径
    // entry: "./src/main.js", // 当前的相对路径不是根据当前文件的所在相对路径，而是根据 context所设置的路径的相对路径
    entry: {
      main: "./src/main.js",
      index: "./src/index.js"
    },
    output: {
      filename: "js/[name].[contenthash:6].bundle.js",
      path: path.resolve(__dirname, "../build"),
      chunkFilename: "js/[name].[contenthash:6].chunk.js", // 对应魔法注释的名字   通过import函数导入
      // 打包后静态资源的引用路径
      publicPath:"./"
    },

    resolve: {
      extensions: [".js", ".ts", ".jsx", ".json", "vue"],// 引入后可省略后缀,
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },

    devServer: {
      hot: true,
      compress: true,  // 开发优化 压缩 减小包体积
      port: 9000,
      // contentBase: "./h.js"
      // static: "./h.js"
    },
    // devtool: "cheap-source-map",    //  开发时推荐
    module: {
      rules: [

        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            // MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              // options: {
              //   postcssOptions: {
              //     plugins: [
              //       require("autoprefixer"),
              //       require("postcss-preset-env")  //   把css样式转化为大多数浏览器识别的样式
              //     ]
              //   }
              // }
            }

          ],
          sideEffects: true
        }, {
          test: /\.less$/,
          use: [
            "style-loader",
            "css-loader",
            "postcss-loader",
            "less-loader"
          ]
        },
        {
          test: /\.(png|je?pg|svg|gif)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                name: 'img/[name].[hash:6].[ext]',
                limit: 100 * 1024  // 设置转成base64格式图片的限制 
              }
            }
          ]
        }, {
          test: /\.js$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        },
        // {
        //   test: /\.ts$/,
        //   use: "babel-loader"
        // },
      ],

    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index2.html",
        title: "learn webpack",
        cache: false, // 当文件没有发生改变时  使用缓存
        minify: isProduction ? {
          removeComments: true, // 移除模板中的注释
          collapseWhitespace: true, // 是否压缩
          minifyCSS: true, // 是否对 模板中的css 压缩
          // minifyJS: true

        } : false  // 当前属性决定代码收压缩 

      }),
      new webpack.DefinePlugin({
        BASE_URL: '"./"'
      }),

    ]
  }
}
module.exports = function (env) {
  const isProduction = env.production
  process.env.NODE_ENV = isProduction ? "production" : "development"

  // console.log( process.env.prodution, " process.env.prodution");
  const config = isProduction ? proConf : devConf
  const mergeConf = merge(commonConf(isProduction), config)
  // console.log(mergeConf, "=============");
  return mergeConf


} 