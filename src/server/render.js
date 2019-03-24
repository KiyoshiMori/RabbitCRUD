import React from 'react';
import { renderToString } from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../client/index';

export default ({ clientStats }) => (req, res) => {
	const { js } = flushChunks(clientStats, {
		chunkNames: flushChunkNames()
	});

	const html = `
		<html>
			<head>
				<title>RabbitCRUD</title>
			</head>
			<body>
				<h1>testFromRender!</h1>
				<div id="root">${renderToString(
					<App/>
				)}</div>
			</body>
			${js}
		</html>
	`;

	res.send(html);
}