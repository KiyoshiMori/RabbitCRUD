import webpack from 'webpack';

import { client as clientDev, server as serverDev } from '../../config/webpack.dev';

export const webpackHotLoader = (server) => {
	const compiler = webpack([clientDev, serverDev]);

	const clientCompiler = compiler.compilers[0];

	const webpackDevMW = require('webpack-dev-middleware');
	const webpackHotMW = require('webpack-hot-middleware');
	const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
	server.use(webpackDevMW(compiler, clientDev.devServer));
	server.use(webpackHotMW(clientCompiler, clientDev.devServer));
	server.use(webpackHotServerMiddleware(compiler));
};