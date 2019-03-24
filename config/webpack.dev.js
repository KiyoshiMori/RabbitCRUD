const path = require('path');
const webpack = require('webpack');

const client = require('./dev/client').default;
const server = require('./dev/server').default;

module.exports = {
	client,
	server,
};
