const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const PORT = 9999

module.exports = webpackMerge(commonConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        watchContentBase: true,
        hot: true,
        port: PORT,
    },
})
