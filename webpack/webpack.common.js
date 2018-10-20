const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: [
        './src/client/index.js'
    ],
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(mp3|jpg|ttf)$/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/client/index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/client/images',
                to: 'images'
            },
            {
                from: 'src/client/favicon.ico',
                to: 'favicon.ico'
            }
        ])
    ]
}
