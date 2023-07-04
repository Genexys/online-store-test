/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv');

module.exports = (env) => {
  const isProduction = env.NODE_ENV === 'production';
  const mode = isProduction ? 'production' : 'development';
  const envFile = isProduction ? '.env.production' : '.env.development';
  const envPath = path.resolve(__dirname, envFile);
  const envVars = Dotenv.config({ path: envPath }).parsed || {};

  return {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    mode: mode,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
      extensions: ['.ts', '.tsx', '.js'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    devServer: {
      static: path.resolve(__dirname, 'src'),
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envVars),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ['ts-loader'],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]__[hash:base64:5]',
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash][ext]',
          },
        },
        {
          test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
          type: 'asset/resource',
        },
      ],
    },
  };
};
