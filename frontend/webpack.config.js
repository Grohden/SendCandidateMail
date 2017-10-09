const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// assets.js
const Assets = require('../assets');

module.exports = {
    watch: true,
    watchOptions:{
        poll:1000,
        aggregateTimeout: 200
    },
    entry: {
        app: "./src/javascripts/app.js",
    },
    output: {
        path: __dirname + "/build/",
        filename: "[name].bundle.js"
    },
    plugins: [
        new CopyWebpackPlugin(Assets)
    ]
};