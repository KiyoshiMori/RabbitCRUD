import React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../client/index';
import client from '../lib/graphql';

const Html = ({ content, Scripts }) => (
	<html>
		<head>
			<title>RabbitCRUD</title>
		</head>
		<body>
			<h1>testFromRender!</h1>
			<div id="root" dangerouslySetInnerHTML={{
				__html: renderToString(content)
			}} />
			<Scripts />
	</body>
	</html>
);

export default ({ clientStats }) => (req, res) => {
	const { Js } = flushChunks(clientStats, {
		chunkNames: flushChunkNames()
	});

	const content = (
		<ApolloProvider
			client={client}
		>
			<App/>
		</ApolloProvider>
	);

	getDataFromTree(content).then(() => {
		const html = Html({ content, Scripts: Js });

		console.log(html);

		res.status(200);
		res.send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
		res.end();
	});
}