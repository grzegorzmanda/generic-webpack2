const webpack = require('webpack');
const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');

let config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'main.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './public'),
        historyApiFallback: true,
        inline: true,
        open: true
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.scss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] }
            // SEPARATE STYLESHEET
            // { test: /\.scss$/, use: ExtractText.extract({ use: ['css-loader', 'sass-loader'], fallback: 'style-loader' }) }
        ]
    },
    plugins: [
        // new ExtractText('styles.css')
    ]
};

module.exports = config;