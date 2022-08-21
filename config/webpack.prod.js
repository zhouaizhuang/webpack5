const path = require('path')
const os = require('os')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require("terser-webpack-plugin")
const threads = os.cpus.length
// 封装css Loader获取函数
function getStyleLoader(pre) {
  return [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env']
        }
      }
    },
    pre
  ].filter(Boolean)
}
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[contenthash:10].js',
    chunkFilename: 'static/js/[name].[contenthash:10].chunk.js',
    assetModuleFilename: "static/media/[contenthash:10][ext][query]", // 图片字体等通过type:asset处理
    clean: true
  },
  module: {
    rules: [
      {
        oneOf: [
          { test: /\.css$/, use: getStyleLoader() },
          { test: /\.less$/, use: getStyleLoader('less-loader') },
          { test: /\.s[ac]ss$/, use: getStyleLoader('sass-loader') },
          {
            test: /\.(png|jpe?g|gif|webp|svg)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024
              }
            },
          },
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
            type: 'asset/resource',
          },
          {
            test: /\.jsx?$/,
            include: path.resolve(__dirname, '../src'),
            use: [
              {
                loader: 'thread-loader',
                options: {
                  works: threads, // 进程数量
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  presets:[
                    [
                      'react-app',
                      {
                        useBuiltIns: 'usage',
                        corejs: '3',
                      }
                    ]
                  ],
                  cacheDirectory: true, // 开启babel缓存
                  cacheCompression: false, // 关闭缓存文件压缩
                  plugins: ["react-refresh/babel",'@babel/plugin-transform-runtime'], // 减小代码体积
                }
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: '/node_modules/',
      cache: true, // 开启缓存
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'),
      threads, // 开启多进程和设置进程数量
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:10].css',
      chunkFilename: 'static/css/[name].[contenthash:10].chunk.css'
    }),
  ],
  optimization: {
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js(webpack本身是自带js压缩的，但是为了传入多进程配置，就需要手动编写了)
      new TerserWebpackPlugin({
        parallel: threads, // 开启多进程和设置进程数量
      })
    ],
    // 代码分割操作
    splitChunks: {
      chunks: "all",
    }
  },
  resolve:{
    extensions: [".jsx", '.js', '.json'],
  },
  mode: 'production',
  devtool: 'source-map'
}
