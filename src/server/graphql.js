import express from 'express';
import graphqlExpress from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';

import schema from '../lib/graphql/schema';

// const server = express();
// const router = express.Router();

export default (server) => {
	console.log({ schemaTest: schema });

	server.use(
		'/graphql',
		graphqlExpress({
			schema: schema,
		}),
	);
	server.use(
		'/playground',
		expressPlayground({
			endpointURL: '/graphql',
		}),
	);
};