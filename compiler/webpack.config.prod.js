var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './app/index'
    ],
    output: {
        path: path.resolve(__dirname, "../docs"),
        filename: 'bundle.js',
        publicPath: ''
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            '__DEVTOOLS__': false,
            'process.env': { NODE_ENV: JSON.stringify("production") }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.IgnorePlugin(/regenerator|nodent|js-beautify/, /ajv/),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './app/index-prod.html',
            hash: true,
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules', 'app'],
    },
    module: {
        loaders: [
            { test: /\.(js|jsx)$/, loaders: ['babel'], exclude: /node_modules/ },
            { test: /\.html$/, loader: 'html', query: { minimize: true }},
            { test: /\.json$/, loaders: ['json-loader'], exclude: /node_modules/ }
        ]
    }
};
