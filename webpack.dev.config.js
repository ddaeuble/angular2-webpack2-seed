'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

/* common config */
const commonConfig = require('./webpack.config');

/* prod config */
const prodConfig = {
    devtool: 'cheap-source-map', // supports better debugging than 'cheap-module-eval-source-map' but is faster than 'source-map'
    devServer: {
        contentBase: './dist',
        port: 3000,
        https: false, // if setting to true, don't forget to update url of OpenBrowserPlugin
        compress: false, // disable gzip-compression for localhost (save performance)
        historyApiFallback: true, // lets routes like '/dashboard' be processed by '/' so by '/index.html'
        inline: true, // refresh the page on changes
        hot: true, // refresh the page on changes WITHOUT FULL PAGE RELOAD (IF POSSIBLE)
        stats: 'minimal' // only output when errors or new compilation happen
    },
    module: {
        rules: [
            { test: /\.ts$/i, loaders: ['@angularclass/hmr-loader', 'awesome-typescript-loader', 'angular2-template-loader'] }, // angular2-templage-loader automatically resolves angular-templateUrl- and angular-styleUrls-references ; awesome-typescript-loader compiles typescript to javascript ; angular2-hmr-loader injects HMR-relevant code
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // works together with devServer.inline and devServer.hot
        new webpack.NamedModulesPlugin(), // lets output HMR-tool more debugging information: tell the replaced module-name (like './src/app/app.module.ts') instead of just the module-number in the console
        new OpenBrowserPlugin({url: 'http://localhost:3000'})
    ]
};

module.exports = webpackMerge(commonConfig, prodConfig);