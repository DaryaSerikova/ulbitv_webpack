import path from 'path';
import webpack from 'webpack';
import { buildPlugins } from './config/build/buildPlugins';
import { buildLoaders } from './config/build/buildLoaders';
import { buildResolvers } from './config/build/buildResolvers';

const config: webpack.Configuration = {
  mode: 'development',
  //entry - стартовая точка нашего приложения. В нашем случае это './src/index.js',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  module: {
    rules: buildLoaders(),
  },
  resolve: buildResolvers(),

  // output - 'то настройка того, куда и как мы будем делать сборку нашего приложения
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  plugins: buildPlugins(),

}

export default config;