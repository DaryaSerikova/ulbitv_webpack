import { BuildOptions } from "./types/config";
import webpack from 'webpack';
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {

  const {paths, mode, isDev} = options;

  return {
    mode: mode,
    //entry - стартовая точка нашего приложения. В нашем случае это './src/index.js',
    entry: paths.entry,
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),

    // output - 'то настройка того, куда и как мы будем делать сборку нашего приложения
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
    },
    plugins: buildPlugins(options),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}