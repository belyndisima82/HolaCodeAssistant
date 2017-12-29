const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
    entry: [
        'webpack-hot-middleware/client?reload=true'
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})