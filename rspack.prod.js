const rspack = require('@rspack/core');
const {
  merge
} = require('webpack-merge');

const common = require('./rspack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.less|\.css$/,
      use: [
        rspack.CssExtractRspackPlugin.loader,
        {
          loader: 'css-loader'
        }, {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }]
    }]
  },
  plugins: [
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: 'resources/public',
          filter: (filepath) => !filepath.endsWith('.ejs'),
          noErrorOnMissing: true
        }
      ]
    }),
    new rspack.CssExtractRspackPlugin({
      filename: '[name].[contenthash].css'
    })
  ].filter(Boolean),
  output: {
    filename: '[name].[contenthash].js'
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    }
  }
});
