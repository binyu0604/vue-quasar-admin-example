var path = require('path')

module.exports = {
  // Webpack aliases

  aliases: {
    quasar: path.resolve(__dirname, '../node_modules/quasar-framework/'),
    '@': path.resolve('src'),
    src: path.resolve(__dirname, '../src'),
    assets: path.resolve(__dirname, '../src/assets'),
    'vue$': 'vue/dist/vue.esm.js',
    'src': path.resolve(__dirname, '../src'),
    'views': path.resolve(__dirname, '../src/views'),
    'styles': path.resolve(__dirname, '../src/styles'),
    'api': path.resolve(__dirname, '../src/api'),
    'utils': path.resolve(__dirname, '../src/utils'),
    'store': path.resolve(__dirname, '../src/store'),
    'router': path.resolve(__dirname, '../src/router'),
    'mock': path.resolve(__dirname, '../src/mock'),
    'vendor': path.resolve(__dirname, '../src/vendor'),
    'static': path.resolve(__dirname, '../static'),
    components: path.resolve(__dirname, '../src/components')
  },

  // Progress Bar Webpack plugin format
  // https://github.com/clessg/progress-bar-webpack-plugin#options
  progressFormat: ' [:bar] ' + ':percent'.bold + ' (:msg)',

  // Default theme to build with ('ios' or 'mat')
  defaultTheme: 'mat',

  build: {
    env: require('./prod.env.js'),
    index: path.resolve(__dirname, '../dist/index.html'),
    publicPath: '',
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',          //请根据自己路径配置更改
    productionSourceMap: true,
    staticPath:'/static/',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env.js'),
    cssSourceMap: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // auto open browser or not
    openBrowser: true,
    publicPath: '/',
    port: 8080,
    api: `http://localhost`,
    // If for example you are using Quasar Play
    // to generate a QR code then on each dev (re)compilation
    // you need to avoid clearing out the console, so set this
    // to "false", otherwise you can set it to "true" to always
    // have only the messages regarding your last (re)compilation.
    clearConsoleOnRebuild: false,
    staticPath:'/static/',
    // Proxy your API if using any.
    // Also see /build/script.dev.js and search for "proxy api requests"
    // https://github.com/chimurai/http-proxy-middleware
    proxyTable: {}
  }
}

/*
 * proxyTable example:
 *
   proxyTable: {
      // proxy all requests starting with /api
      '/api': {
        target: 'https://some.address.com/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
 */
