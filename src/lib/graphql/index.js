import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const port = process.env.PORT || 8080;
const domain = process.env.DOMEN || 'localhost';

const client = new ApolloClient({
	link: createHttpLink({
		uri: `http://${domain}:${port}/graphql`,
	}),
	cache: new InMemoryCache(),
	connectToDevTools: true,
});

export default client;
