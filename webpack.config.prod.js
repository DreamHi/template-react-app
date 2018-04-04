const { resolve } = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// the path(s) that should be cleaned
const pathsToClean = [
  'dist'
];

// the clean options to use
const cleanOptions = {
  exclude:  ['.gitkeep'],
  verbose:  true,
  dry:      false
};

module.exports = {
  mode: 'production',
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

  performance: {
    hints: false,
  },

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          beautify: false,
          compress: true,
          comments: false,
          mangle: false,
          toplevel: false,
        }
      })
    ],
    namedModules: true, // NamedModulesPlugin()
    splitChunks: { // CommonsChunkPlugin()
      name: 'vendor',
      minChunks: Infinity
    },
  },

  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor', 'manifest'],
    //   minChunks: Infinity,
    // }),
    // new ExtractTextPlugin('styles-[contenthash].css'),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        HOST_URL: JSON.stringify(process.env.HOST_URL),
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/static/html/template.html',
      favicon: './src/static/img/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
};
