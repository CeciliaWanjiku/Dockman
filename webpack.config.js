const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, './client/src/index.html'),
  filename: 'index.html',
  inject: 'body'
});

const config = {
  devtool: 'eval-source-map',
  entry: [
    './client/src/index.jsx'
  ],
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel?cacheDirectory'],
      include: path.join(__dirname, 'client')
    }, { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }]
  },
  resolve: ['', '.js', '.jsx'],
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('styles.css')
  ]
};

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.module.loaders = [
    ...config.module.loaders,
    {
      test: /\.css/,
      loader: ExtractTextPlugin.extract('style', 'css')
    }
  ];
  config.plugins = [
    ...config.plugins,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    })
  ];
} else {
  config.entry = [
    'webpack-hot-middleware/client?reload=true',
    ...config.entry
  ];
  config.module.loaders = [
    ...config.module.loaders,
    {
      test: /\.css?$/,
      loader: 'style!css'
    }
  ];
  config.plugins = [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];
}

module.exports = config;
