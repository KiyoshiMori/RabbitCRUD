import path from 'path';
import commonConfig from './common';
import nodeExternals from 'webpack-node-externals'

export default {
	...commonConfig,
	externals: nodeExternals(),
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