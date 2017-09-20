const UglifyJsPlugin = require('uglifyes-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');


module.exports = {
    entry: './src/ete.js',
    output: {
        filename: 'ete.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new UglifyJsPlugin({
            sourceMap: 'true'
        })
    ]
};