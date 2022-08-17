const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
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
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                cacheDirectory: true, // 开启babel缓存
                cacheCompression: false, // 关闭缓存文件压缩
              }
            }
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
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/main.css'
    }),
    new CssMinimizerPlugin()
  ],
  mode: 'production',
  devtool: 'source-map'
}
