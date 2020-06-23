const path = require('path')
const webpackMerge = require('webpack-merge')
const devConfig = require('./webpack.dev.js')

const PORT = 9998

module.exports = webpackMerge(devConfig, {
    entry: path.resolve(__dirname, '../src/index.test.ts'),
    devServer: {
        port: PORT,
    },
})
