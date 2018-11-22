/**
 * Created by DeLL on 2018/11/22.
 */

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  //入口文件
  entry:['./src/js/index.js','./index.html'],
  //输出
  output:{
    path: resolve(__dirname,'./build'),
    filename: './js/built.js'
  },
  //loader
  module:{
    rules:[
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,  // 匹配文件的规则，说明loader对哪些文件生效
        use: [{  //从右往左依次同步执行
          loader: "style-loader" // 创建一个style标签，将js中的css放入其中
        }, {
          loader: "css-loader" // 将css以commonjs语法打包到js中
        }, {
          loader: "less-loader" // 编译less为css
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,   // 8kb以下的图片会做base64处理
              publicPath: 'images', //修改样式中url图片路径
              outputPath: 'images',  //图片最终输入的路径
              name: '[hash:10].[ext]'  //hash 文件哈希值（可以指定位数）  ext 文件扩展名
            }
          }
        ]
      },
      {
        test: /.js/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: `jshint-loader`,
            options: {
              // 查询 jslint 配置项，请参考 http://www.jshint.com/docs/options/
              // 例如
              camelcase: true,
              //jslint 的错误信息在默认情况下会显示为 warning（警告）类信息
              //将 emitErrors 参数设置为 true 可使错误显示为 error（错误）类信息
              emitErrors: true,
              //jshint 默认情况下不会打断webpack编译
              //如果你想在 jshint 出现错误时，立刻停止编译
              //请设置 failOnHint 参数为true
              failOnHint: true,
              esversion: 6
              // 自定义报告函数
              // reporter: function(errors) { }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']

          }
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },
  //插件
  plugins:[
    new HtmlWebpackPlugin({
      template:'./index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './build',
    hot: true, //开启热模替换功能
    port: 3000,
    open: true  //自动打开浏览器
  }
}