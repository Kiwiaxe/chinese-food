const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: process.env.NODE_ENV || 'production', // development, production, none
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		publicPath: process.env.NODE_ENV === 'production'
    ? '/chinese-food/'
    : '/',
	},
	devtool: 'inline-source-map',
	devServer: {
  static: path.resolve(__dirname, 'dist'),
  port: 8080
},
	module: {
		rules: [
			{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
			{
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'assets/images/[name][ext]',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'assets/fonts/[name][ext]',
      },
			{ 
				test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			 {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
		]
	},

	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({template: './src/index.html'}),
		new MiniCssExtractPlugin({
      filename: 'assets/styles/index.css',
    }),
		new CopyPlugin({
    patterns: [
      { from: "src/assets", to: "assets" },
      { from: "src/products.json", to: "products.json" }
    ],
  }),
	]
};
