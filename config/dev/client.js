import path from 'path';
import webpack from 'webpack';
import commonConfig from './common';

export default {
	...commonConfig,
	name: 'client',
	entry: {
		vendor: ['react', 'react-dom'],
		main: [
			'@babel/polyfill',
			'react-hot-loader/patch',
			'webpack-hot-middleware/client?reload=true',
			'./src/main.js',
		],
	},
	output: {
		filename: '[name]-bundle.js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/',
	},
	devServer: {
		contentBase: 'dist',
		overlay: true,
		hot: true,
		stats: {
			colors: true,
		},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	]
}