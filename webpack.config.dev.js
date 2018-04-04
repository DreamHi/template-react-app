const { resolve } = require('path');
const webpack = require('webpack');

const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  entry: {
    main: './src/app.jsx',
    vendor: ['lodash', 'moment', 'react', 'react-dom', 'react-router-dom', 'prop-types'],
  },

  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  resolve: {
    extensions: ['.css', '.js', '.json', '.jsx'],
    modules: [resolve(__dirname, 'src', 'static'), 'node_modules'],
  },

  devServer: {
    port: 7777,
    contentBase: resolve(__dirname, 'dist'),
    compress: true,
    inline: true,
    hot: false,
    historyApiFallback: true,
    watchOptions: {
      poll: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpg|png)$/,
        use: 'url-loader',
      },
    ],
  },

  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor', 'manifest'],
    //   minChunks: Infinity,
    // }),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(process.env.API_URL || 'http://127.0.0.1:3000'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    // new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './src/static/html/template.html',
      favicon: './src/static/img/favicon.ico',
    }),
  ],

  optimization: {
    namedModules: true, // NamedModulesPlugin()
    splitChunks: { // CommonsChunkPlugin()
      name: 'vendor',
      minChunks: Infinity
    },
  }
};
