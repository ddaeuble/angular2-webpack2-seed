'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

//const NODE_ENV = process.env.NODE_ENV = process.env.ENV = 'production';

/* common config */
const commonConfig = require('./webpack.config');

/* prod config */
const prodConfig = {
  //devtool: 'source-map', // do not distribute mappings by default (enable it here if you need to)
    module: {
        rules: [
            { test: /\.ts$/i, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] }, // angular2-templage-loader automatically resolves angular-templateUrl- and angular-styleUrls-references ; awesome-typescript-loader compiles typescript to javascript
        ]
    },
    plugins: [
      //new webpack.DefinePlugin({ // enable production mode to angular in main.ts -> enableProdMode() ; now enabled by webpack by param -p
      //    'process.env': {
      //        'NODE_ENV': JSON.stringify(NODE_ENV)
      //    }
      //}),
        new webpack.NoErrorsPlugin(), // fail on first error
      //new webpack.optimize.OccurenceOrderPlugin(true), // optimize module-id allocation ; now enabled by webpack by default
        new webpack.optimize.UglifyJsPlugin() // minify bundled js-files
    ]
};

module.exports = webpackMerge(commonConfig, prodConfig);