const path = require('path');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ttf|eot|svg|gif|woff|woff2|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    publicPath: '/build/',
    historyApiFallback: true,
    proxy: {
      '/': 'http://localhost:3000',
    },
  },
  resolve: {
    extensions: ['.jsx', '...'],
  },
};
