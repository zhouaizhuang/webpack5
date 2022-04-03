const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js', // 打包后的文件名
    path: path.resolve(__dirname, './dist'), // 指定输出目录的根目录
    clean: true, // 每次打包先清除dist内文件
    assetModuleFilename: 'images/[contenthash][ext]', // 图片资源的处理，命名
  },
  plugins: [
    new HtmlWebpackPlugin({ // 这个插件可以生成html文件，相关配置文档https://github.com/jantimon/html-webpack-plugin#configuration
      template: './index.html', // 以./index.html为基础打包
      filename: 'app.html', // 新的名字
      inject: 'body', // js放到body中
    })
  ],
  devServer: {
    static: './dist',
  },
  devtool: 'inline-source-map', // 开始source-map之后。代码出现错误，浏览器能精准定位到那个文件多少行。否则的话。默认指向的是打包后的文件中位置
  mode:'development', // 打包环境
  module: {
    rules: [
      {
        test:/\.(jpg|png|gif|bmp|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024, // 图片小于8KB， 则转换为base64处理，以减轻服务器压力
          esModule: false, // 关闭es6原本的模块化，使用commonjs解析，否则会出现[Object Module]
          name: '[hash:10].[ext]',
          outputPath: 'images' //最终放在imgs目录下
        }
      },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, loader: 'url-loader', options: {name:'[hash:10].[ext]', outputPath: 'meadias'} },
      { test: /\.txt$/, type: 'asset/source'},
    ]
  }
}