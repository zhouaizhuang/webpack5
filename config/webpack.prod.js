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
    filename: 'static/js/main.js',
    clean: true
  },
  module: {
    rules: [
      {
        oneOf: [
          { test: /\.vue$/, use: 'vue-loader' },
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
            generator: {
              filename: 'static/images/[hash:10][ext][query]'
            }
          },
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
            type: 'asset/resource',
            generator: {
              filename: 'static/media/[hash:10][ext][query]'
            }
          },
          {
            test: /\.m?js$/,
            exclude: '/node_modules/',
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
                  presets: ['@babel/preset-env'],
                  cacheDirectory: true, // 开启babel缓存
                  cacheCompression: false, // 关闭缓存文件压缩
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
      filename: 'static/css/main.css'
    }),
    // new CssMinimizerPlugin(),
    // new TerserWebpackPlugin({
    //   parallel: threads, // 开启多进程和设置进程数量
    // })
  ],
  optimization: {
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js(webpack本身是自带js压缩的，但是为了传入多进程配置，就需要手动编写了)
      new TerserWebpackPlugin({
        parallel: threads, // 开启多进程和设置进程数量
      })
    ]
  },
  mode: 'production',
  devtool: 'source-map'
}
