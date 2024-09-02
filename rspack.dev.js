const path = require('path');

// const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');
const { merge } = require('webpack-merge');

const common = require('./rspack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    server: 'http',
    port: 8080,
    client: {
      webSocketURL: 'http://0.0.0.0:0/client-plugins/ws'
    },
    static: path.join(__dirname, 'resources', 'public')
  },
  module: {
    rules: [{
      test: /\.less$/,
      type: 'css',
      use: [{
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }]
    }]
  },
  // plugins: [
  //   new ReactRefreshPlugin()
  // ]
});
