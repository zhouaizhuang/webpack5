const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // 以./index.html为基础打包
      filename: 'app.html', // 新的名字
      inject: 'body', // js放到body中
    })
  ],
  mode:'development',
}