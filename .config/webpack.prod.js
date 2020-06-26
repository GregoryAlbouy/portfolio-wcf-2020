const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const MODE = 'production'
const API_BASE_URL =  process.env.REMOTE_API_BASE_URL

console.table({
    MODE,
    API_BASE_URL
})

module.exports = webpackMerge(commonConfig, {
    mode: MODE,
    // devtool: 'source-map'
    plugins: [
        new webpack.DefinePlugin({
            __API_BASE_URL: JSON.stringify(API_BASE_URL)
        }),
    ]
})