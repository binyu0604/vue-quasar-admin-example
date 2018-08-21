
var
  config = require('../config'),
  webpack = require('webpack'),
  merge = require('webpack-merge'),
  cssUtils = require('./css-utils'),
  baseWebpackConfig = require('./webpack.base.conf.js'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/hot-reload'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  //开发环境下默认启用cache，在内存中对已经构建的部分进行缓存
  //避免其他模块修改，但是该模块未修改时候，重新构建，能够更快的进行增量构建
  //属于空间换时间的做法
  cache: true,
//  output: {
  //   pathinfo: true //输入代码添加额外的路径注释，提高代码可读性
  // },
  // eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  module: {
    rules: cssUtils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      postcss: true
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      path:config.dev.staticPath,
      chunksSortMode: 'none'
    }),
    new FriendlyErrorsPlugin({
      clearConsole: config.dev.clearConsoleOnRebuild
    })
  ],
  performance: {
    hints: false
  }
  // optimization: {
  //   namedModules: true, //取代插件中的 new webpack.NamedModulesPlugin()
  //   namedChunks: true
  // }
})
