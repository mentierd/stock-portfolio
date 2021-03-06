'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: './public/src/index.js',
    module: {
        htmlLoader: {
            ignoreCustomFragments: [/\{\{.*?}}/]
        },
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {test: /\.woff2$/, loader: 'url-loader?limit=10000&minetype=application/font-woff2'},
            {test: /\.woff$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
            {test: /\.ttf$/, loader: 'file-loader'},
            {test: /\.eot$/, loader: 'file-loader'},
            {test: /\.svg$/, loader: 'file-loader'}
        ],
        resolve: {
            alias: {
                components: './public/src/components',
                services: './public/src/services',
                views: './public/src/views'
            },
            extensions: ['', '.html', '.js', '.json'],
            root: __dirname
        }
    },
    output: {
        path: './public/dist',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: './public/src/index.html'
        })
    ],
    sassLoader: {
        includePaths: [
            './node_modules/bootstrap/scss'
        ]
    }
};