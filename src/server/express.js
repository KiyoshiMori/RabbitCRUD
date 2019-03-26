import 'isomorphic-fetch';
import express from 'express';
import React from 'react';

import graphql from './graphql';

const server = express();

const serverPort = process.env.PORT || 8080;
const isDev = process.env.NODE_ENV === 'development';
let isBuilt = false;

graphql(server);

server.use('/static', express.static('static'));

if (typeof global.localStorage === "undefined" || global.localStorage === null) {
	const LocalStorage = require('node-localstorage').LocalStorage;
	global.localStorage = new LocalStorage('./scratch');
}


const done = () => {
	if (isBuilt) return;

	server.listen(serverPort, () => {
		isBuilt = true;
		console.log(`Server started at ${serverPort}`);
	});
};

if (isDev) {
	require('./webpackCompile').webpackHotLoader(server);
	done();
} else {
	require('./webpackCompile').webpackSSR(server, done);
}