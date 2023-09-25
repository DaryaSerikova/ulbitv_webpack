// const path = require('path');
// const HTMLWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');

// import * as path from 'path';
// import * as webpack from 'webpack';
// import * as HtmlWebpackPlugin from 'html-webpack-plugin';

import path from 'path';
import webpack from 'webpack';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import { buildPlugins } from './config/build/buildPlugins';

const config: webpack.Configuration = {
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
  plugins: buildPlugins(),

}

export default config;