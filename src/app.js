import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';

import App from './client';
import client from './lib/graphql';
import 'semantic-ui-css/semantic.min.css';

const render = Component => {
	ReactDOM.hydrate(
		<ApolloProvider client={client}>
			<AppContainer>
				<BrowserRouter>
					<Component />
				</BrowserRouter>
			</AppContainer>
		</ApolloProvider>,
		document.getElementById("root")
	);
};

render (App);

if (module.hot) {
	module.hot.accept('./client', () => {
		const newApp = require('./client').default;
		render(newApp);
	})
}