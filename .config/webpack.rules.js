const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const typescript = {
    test: /\.tsx?$/i,
    exclude: /node_modules/,
    use: 'ts-loader'
}

const javascript = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            configFile: path.resolve(__dirname, 'babel.config.json') 
        }
    }
}

const htmlComponent = {
    test: /\.c\.html?$/i,
    use: {
        loader: 'html-loader',
        options: {
            esModule: true
        },
    }
}

// .c.scss file: load as string
const cssComponent = {
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
}

// general .scss (.c.scss excluded): to css file
const cssGlobal = {
    test: /(?<!\.c)\.s[ac]ss$/i,
    use: [
        MiniCssExtractPlugin.loader,
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
}

const image = {
    test: /\.(jpe?g|png|gif|svg|ico)$/i,
    use: [
        {
            loader: 'file-loader',
            options: {
                outputPath: 'assets/images/'
            }
        },
    ]
}

const font = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    use: [
        {
            loader: 'file-loader',
            options: {
                outputPath: 'assets/fonts/'
            }
        },
    ]
}

module.exports = [
    typescript,
    javascript,
    htmlComponent,
    cssComponent,
    cssGlobal,
    image,
    font
]