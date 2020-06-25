const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const hash = process.env.NODE_ENV === 'production' ? '[contenthash]' : '[hash]'

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
            filename: `assets/style/style.${hash}.css`
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        configFile: path.resolve(__dirname, 'babel.config.json') 
                    }
                }
            },
            {
                test: /\.c\.html?$/i,
                use: {
                    loader: 'html-loader',
                    options: {
                        esModule: true
                    },
                }
            },
            // {
            //     test: /\.html$/,
            //     exclude: /\.c\.html?$/,
            //     use: {
            //         loader: 'html-loader',
            //         query: {
            //             // interpolate: 'require',
            //             attributes: ['href']
            //         }
            //     }
            // },
            {
                // general .scss (.c.scss excluded): to css file
                test: /(?<!\.c)\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../'
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname)
                            }
                        }
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    }
                ]
            },
            {
                // .c.scss file: load as string
                test: /\.c\.s[ac]ss$/i,
                use: [
                    'to-string-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname)
                            }
                        }
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/images/'
                        }
                    },
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/fonts/'
                        }
                    },
                ]
            },
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    watchOptions: {
        ignored: /node_modules/
    }
}