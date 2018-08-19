var merge = require('webpack-merge')
var prodEnv = require('./prod.env.js')

module.exports = merge(prodEnv, {
//  PORT: 8080,
  SERVER_URL: `"http://localhost:8081"`,
  NODE_ENV: '"development"'

})
