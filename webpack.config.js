const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSS = require('optimize-css-assets-webpack-plugin');

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
            { 
              test: /\.(jpe?g|gif|png|svg)$/i,
              loaders: [
                  'file-loader?context=src/assets/images&name=images/[path][name].[ext]',
                  { 
                      loader: 'image-webpack-loader',
                  }
              ]
            },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.scss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] }
            // SEPARATE STYLESHEET
            // { test: /\.scss$/, use: ExtractTextPlugin.extract({ use: ['css-loader', 'sass-loader'], fallback: 'style-loader' }) }
        ]
    },
    plugins: [
        // new ExtractTextPlugin('styles.css')
    ]
};

module.exports = config;

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new OptimizeCSS()
    );
}