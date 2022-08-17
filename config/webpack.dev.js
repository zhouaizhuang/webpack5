const path = require('path')
const os = require('os')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const threads = os.cpus.length

module.exports = {
  entry: './src/main.js',
  output: {
    path: undefined,
    filename: 'static/js/main.js'
  },
  module: {
    rules: [
      {
        oneOf: [
          { test: /\.vue$/, use: 'vue-loader' },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
          { test: /\.s[ac]ss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
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
            // include: path.resolve(__dirname, '../src'),
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
      exclude: '/node_modules/', // 默认值，不写也是这个效果
      cache: true, // 开启缓存
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'),
      threads, // 开启多进程和设置进程数量
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    })
  ],
  devServer: {
    host: 'localhost',
    port: '3000',
    open: true,
    hot: true
  },
  mode: 'development',
  devtool: 'cheap-module-source-map'
}
