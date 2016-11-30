var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
module.exports = {
    context: __dirname,
    entry: [
      './static/js/components/app.jsx'
    ],
    output: {
      path: __dirname + '/static/js/build',
      filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ }, // to transform JSX into JS
        ]
    },
    plugins: [
      new BundleTracker({filename: './webpack-stats.json'}),
    ],
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js', '.jsx']
    },
};
