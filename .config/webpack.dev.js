const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const PORT = 9999
const MODE = 'development'
const API_BASE_URL =  process.env.LOCAL_API_BASE_URL

// Prevents from showing this config info when using test config
// (which imports this file)
if (require.main === module) {
    console.table({
        PORT,
        MODE,
        API_BASE_URL
    })
}

module.exports = webpackMerge(commonConfig, {
    mode: MODE,
    devServer: {
        contentBase: './dist',
        watchContentBase: true,
        historyApiFallback: true,
        hot: true,
        port: PORT,
    },
    plugins: [
        new webpack.DefinePlugin({
            __API_BASE_URL__: JSON.stringify(API_BASE_URL)
        }),
    ]
})
