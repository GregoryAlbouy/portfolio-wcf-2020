const path = require('path')
const webpackMerge = require('webpack-merge')
const devConfig = require('./webpack.dev.js')

const PORT = 9998
const MODE = 'development'
const API_BASE_URL =  process.env.LOCAL_API_BASE_URL

console.table({
    PORT,
    MODE,
    API_BASE_URL
})

module.exports = webpackMerge(devConfig, {
    entry: path.resolve(__dirname, '../tests/index.test.ts'),
    devServer: {
        port: PORT,
    },
})
