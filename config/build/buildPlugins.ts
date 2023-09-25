import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export function buildPlugins():webpack.WebpackPluginInstance[] {
  return [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new webpack.ProgressPlugin(),
  ]
}