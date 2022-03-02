const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "development",
  // context:"",  默认为根路径
  // entry: "./src/main.js", // 当前的相对路径不是根据当前文件的所在相对路径，而是根据 context所设置的路径的相对路径
  entry: {
    main: "./src/main.js",
    index: "./src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./build"),
    chunkFilename: "[name].chunk.js" // 对应魔法注释的名字   通过import函数导入
    // 打包后静态资源的引用路径
    // publicPath:"./"
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".json", "vue"],// 引入后可省略后缀,
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
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
          name: "vendor"
        }
      },


    },
    runtimeChunk: {
      name: 'runtime'
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
          "style-loader",
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

        ]
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index2.html",
      title: "learn webpack"
    }),
    new webpack.DefinePlugin({
      BASE_URL: '"./"'
    }),
    // 把public 文件夹下边的内容复制到指定文件夹下  默认会根据上边设置的path去 复制
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


    })
  ]
}