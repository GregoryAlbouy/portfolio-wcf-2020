const webpack = require('webpack')
const path = require('path')
const dotenv = require('dotenv')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const rules = require('./webpack.rules.js')

dotenv.config({ path: './.config/.env' })
const mode = process.env.NODE_ENV
const hash = mode === 'production' ? '[contenthash]' : '[hash]'

module.exports = {
    entry: path.resolve(__dirname, '../src/index.ts'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: `assets/script/script.${hash}.js`
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            inject: "body"
        }),
        new MiniCssExtractPlugin({
            filename: `assets/style/style.${hash}.css`,

        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    watchOptions: {
        ignored: /node_modules/
    }
}