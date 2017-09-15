const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

const config = {
  devtool: isProd ? false : 'source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }, 'sass-loader']
        }))
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),

    new CopyPlugin([{
      from: path.join(__dirname, 'index.html'),
      to: path.join(__dirname, 'dist', 'index.html')
    }])
  ]
}

const appEntry = ['babel-polyfill']
if (!isProd) appEntry.push('react-hot-loader/patch')
appEntry.push('./src/index')
config.entry = {app: appEntry}

module.exports = config
