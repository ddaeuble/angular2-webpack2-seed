'use strict';

const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },
    resolve: { // if there is e.g. a require('styles.css') within the app-code, this block tells webpack how to resolve/find the referenced file 'styles.css'
        modules: [
            './node_modules',
            path.resolve('./src') // how to resolve relative paths, e.g. 'styles.css' -> './src/styles.css' ; but require('styles.css') does not search subdirs and find './src/public/styles.css'
        ],
        extensions: ['.ts', '.js'], // enables expressions like require('main') => will get resolved as require('main.ts') ; e.g. adding '.css' enables require('styles') => require('styles.css')
        enforceModuleExtension: false // makes the described extension-resolving optional (so you can require files by an explicit extension)
    },
    module: {
        rules: [ // what to do with referenced resources like require('styles.css') or import-expressions / angular-templateUrl- or angular-styleUrls-expressions / html-href- or html-src-expressions
            // see also .ts loaders in dev- and prod-config
            { test: /\.json$/i, issuer: /\.ts$/i, loader: 'json-loader' },
            { test: /\.html$/i, issuer: /\.ts$/i, loader: 'html-loader', options: {minimize: false} }, // html-loader automatically resolves internal html-references ; minimize=false: avoid template parse errors like "unexpected closing tag" in prod environment
            { test: /\.css$/i, issuer: /\.ts$/i, loaders: ['to-string-loader', 'css-loader'] },
            { test: /\.(json)$/i, issuer: /\.html$/i, loader: 'file-loader?name=data/[name].[ext]' },
            { test: /\.(css)$/i, issuer: /\.html$/i, loader: 'file-loader?name=styles/[name].[ext]' },
          //{ test: /\.css$/i, issuer: /\.html$/i, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
            { test: /\.(html)$/i, issuer: /\.html$/i, loader: 'file-loader?name=templates/[name].[ext]' },
            { test: /\.(js)$/i, issuer: /\.html$/i, loader: 'file-loader?name=scripts/[name].[ext]' },
            { test: /\.(png|jpe?g|gif|ico|svg)$/i, loader: 'file-loader?name=images/[name].[ext]' },
            { test: /\.(woff|woff2|ttf|otf|eot)$/i, loader: 'file-loader?name=fonts/[name].[ext]' }
        ]
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].bundle.js.map'
    },
    plugins: [
//new webpack.ProgressPlugin(),
        new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/))?src(\\|\/)linker/, path.resolve('./src')), // avoid warning in ./~/@angular/core/src/linker/system_js_ng_module_factory_loader.js 45:15 critical dependency: the request of a dependency is an expression
        new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfills'] }), // 'app' should only contain app-code and 'vendor' only vendor-code: this plugin identifies shared dependencies between app and vendors and moves them to vendors / it moves shared dependencies between vendors and polyfills to polyfills (which they don't have) because of the arguments-order
      //new ExtractTextPlugin('[name].bundle.css'),
        new CopyWebpackPlugin([
          //{ from: './src/index.html' },
          //{ from: './src/styles.css' },
          //{ from: './src/favicon.ico' },
            { from: './src/public/' } // copies content of the public-folder directly to the output-path (not under a subdir 'public')
            // attention: sometimes (while webpack-dev-server is running) CopyWebpackPlugin has problems with filenames containing spaces
        ])
    ]
};