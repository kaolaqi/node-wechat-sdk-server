var path = require("path");
var fs = require("fs");
var merge = require("webpack-merge");

var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: "none",
  entry: "./demo/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    // publicPath: '/statis/',
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, "../node_modules"),
        use: ["babel-loader"]
      },
      {
        test: /\.(scss|css)$/,
        include: path.resolve(__dirname, "../src"),
        loaders: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
              // options: {
              // 	minimize: true
              // }
            },
            {
              loader: "sass-loader"
            },
            {
              loader: "postcss-loader"
            }
          ]
        })
      },
      {
        //读取模板
        test: /\.html$/,
        include: path.resolve(__dirname, "../src"),
        use: [
          {
            loader: "html-css-scope-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        //处理html图片
        test: /\.html$/,
        include: path.resolve(__dirname, "../src"),
        use: [
          {
            loader: "html-withimg-loader"
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        include: path.resolve(__dirname, "../src"),
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 2000,
              publicPath: "../",
              name: "img/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].[chunkhash:8].css"
    }),
    new HtmlWebpackPlugin({
      filename: "./demo/index.html",
      template: "./demo/index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: "dependency"
    })
  ],
  devServer: {
    host: "localhost",
    port: 8010,
    compress: true,
    open: true,
    openPage: "demo",
    hot: true,
    disableHostCheck: true
  },
  resolve: {
    alias: {
      "@": "../src"
    },
    extensions: [".js", ".json"]
  }
};
