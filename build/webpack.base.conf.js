process.traceDeprecation = true
// process.noDeprecation = true
var
  path = require('path'),
  webpack = require('webpack'),
  config = require('../config'),
  cssUtils = require('./css-utils'),
  env = require('./env-utils'),
  merge = require('webpack-merge'),
  projectRoot = path.resolve(__dirname, '../'),
  ProgressBarPlugin = require('progress-bar-webpack-plugin'),
  useCssSourceMap =
    (env.dev && config.dev.cssSourceMap) ||
    (env.prod && config.build.productionSourceMap)

const VueLoaderPlugin = require('vue-loader/lib/plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV !== 'development' ?  config.build.assetsPublicPath: config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: config.aliases
  },
  module: {
    rules: [

      { // eslint
        enforce: 'pre',
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        include: projectRoot,
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.special\.json$/,
        type: "javascript/auto",
        use: "special-loader"
      },
      {
        test: /\.js$/,
        // loader: 'babel-loader',
        loader: 'happypack/loader?id=babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: cssUtils.postcss,
          loaders: merge({js: 'babel-loader'}, cssUtils.cssLoaders({
            sourceMap: useCssSourceMap,
            extract: env.prod
          }))
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    /* Uncomment if you wish to load only one Moment locale: */
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new webpack.DefinePlugin({
      'process.env': config[env.prod ? 'build' : 'dev'].env,
      'DEV': env.dev,
      'PROD': env.prod,
      '__THEME': '"' + env.platform.theme + '"'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: env.prod,
      options: {
        context: path.resolve(__dirname, '../src'),
        postcss: cssUtils.postcss
      }
    }),
    new ProgressBarPlugin({
      format: config.progressFormat
    }),
    new require('happypack')({
      id: 'babel',
      loaders: ['babel-loader']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    })

  ],
  performance: {
    hints: false
  },
  // optimization: {
  //   //   minimize: env === 'production' ? true : false, //是否进行代码压缩
  //   //   minimizer: [
  //   //     new require('webpack-parallel-uglify-plugin')({
  //   //       // 配置项
  //   //     }),
  //   //   ],
  //   //   splitChunks: {
  //   //     chunks: "async",
  //   //     minSize: 30000, //模块大于30k会被抽离到公共模块
  //   //     minChunks: 1, //模块出现1次就会被抽离到公共模块
  //   //     maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
  //   //     maxInitialRequests: 3, //入口模块最多只能加载3个
  //   //     name: true,
  //   //     cacheGroups: {
  //   //       default: {
  //   //         minChunks: 2,
  //   //         priority: -20,
  //   //         reuseExistingChunk: true,
  //   //       },
  //   //       vendors: {
  //   //         test: /[\\/]node_modules[\\/]/,
  //   //         priority: -10
  //   //       }
  //   //     }
  //   //   },
  //   //   runtimeChunk: {
  //   //     name: "runtime"
  //   //   }
  //   // }
}
