const Dotenv = require('dotenv-webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SocialTags = require('social-tags-webpack-plugin');

const envUrl = process.env.NODE_ENV === 'production' ? 'https://www.311-data.org/' : 'http://dev.311-data.org/';
const description = 'Hack for LA’s 311-Data Team has partnered with the Los Angeles Department of Neighborhood Empowerment and LA Neighborhood Councils to create 311 data dashboards to provide all City of LA neighborhoods with actionable information at the local level.';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@reducers': path.resolve(__dirname, 'src/redux/reducers'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // options
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: 'src/.env',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: '311-Data Neighborhood Engagement Tool',
      favicon: './public/favicon.png',
      meta: {
        description,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new SocialTags({
      appUrl: envUrl,
      facebook: {
        'og:type': 'website',
        'og:url': envUrl,
        'og:title': '311-Data Neighborhood Engagement Tool',
        'og:image': './public/social-media-card-image.png',
        'og:description': description,
        'og:locale': 'en_US',
        // 'fb:app_id': 'placeholder',
      },
      twitter: {
        'twitter:card': 'summary_large_image',
        'twitter:url': envUrl,
        'twitter:title': '311-Data Neighborhood Engagement Tool',
        'twitter:image': './public/social-media-card-image.png',
        'twitter:description': description,
        'twitter:site': '@data_311',
      },
    }),
  ],
};
