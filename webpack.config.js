const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  mode: 'development',
  //entry - стартовая точка нашего приложения. В нашем случае это './src/index.js',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  // output - 'то настройка того, куда и как мы будем делать сборку нашего приложения
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new webpack.ProgressPlugin(),
  ],

}