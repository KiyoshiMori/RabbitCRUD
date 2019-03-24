import path from 'path';
import commonConfig from './common';

export default {
	...commonConfig,
	target: 'node',
	name: 'server',
	entry: './src/server/render.js',
	output: {
		filename: 'dev-server-bundle.js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, '../build'),
		libraryTarget: 'commonjs2',
	},
	devtool: 'source-map',
}