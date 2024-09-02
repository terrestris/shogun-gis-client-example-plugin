const path = require('path');

const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');
const rspack = require('@rspack/core');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [{
      test: /\.m?js/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false
      }
    }, {
      test: /\.(j|t)s$/,
      exclude: [/[\\/]node_modules[\\/]/],
      loader: 'builtin:swc-loader',
      options: {
        jsc: {
          parser: {
            syntax: 'typescript'
          },
          externalHelpers: true
        },
        env: {
          targets: 'Chrome >= 48'
        }
      }
    }, {
      test: /\.tsx$/,
      loader: 'builtin:swc-loader',
      exclude: [/[\\/]node_modules[\\/]/],
      options: {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true
          },
          transform: {
            react: {
              runtime: 'automatic'
            }
          },
          externalHelpers: true
        },
        env: {
          targets: 'Chrome >= 48'
        }
      }
    }, {
      test: /\.d\.ts$/,
      loader: 'ignore-loader'
    }, {
      test: /\.(jpe?g|png|gif|ico|pdf|eot|svg|ttf|woff(2)?)$/,
      type: 'asset/resource'
    }]
  },
  resolve: {
    alias: {
      fs: false,
      path: false
    },
    extensions: [
      '.tsx',
      '.ts',
      '.js',
      '.cjs',
      '.mjs'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
    clean: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'ExamplePlugin',
      filename: 'index.js',
      exposes: {
        './FooterLinks': './src/FooterLinks/plugin'
      },
      dev: false,
      shared: {
        react: {
          requiredVersion: '^18',
          singleton: true
        },
        'react-dom': {
          requiredVersion: '^18',
          singleton: true
        },
        'react-i18next': {
          requiredVersion: '^14',
          singleton: true
        },
        'ol/': {
          requiredVersion: '^9',
          singleton: true
        }
      }
    })
  ]
};
