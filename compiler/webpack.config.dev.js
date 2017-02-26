var path = require("path");
var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './app/index',
    ],
    output: {
        path: path.resolve(__dirname, "temp"),
        filename: "bundle.js",
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            '__DEVTOOLS__': true,
            'process.env': JSON.stringify('development')
        }),
        new webpack.IgnorePlugin(/regenerator|nodent|js-beautify/, /ajv/)
    ],
    module: {
        loaders: [
            { test: /\.(js|jsx)$/, loaders: ['babel', 'eslint-loader'], exclude: /node_modules/ },
            { test: /\.json$/, loaders: ['json-loader'], exclude: /node_modules/ }
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules', 'app'],
    },
    eslint: {
        configFile: './compiler/.eslintrc.json'
    },
    progress: true
};
