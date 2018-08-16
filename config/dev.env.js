var merge = require('webpack-merge')
var prodEnv = require('./prod.env.js')

module.exports = merge(prodEnv, {
//  PORT: 8080,
  API: 'http://localhost',
  NODE_ENV: '"development"'
})
