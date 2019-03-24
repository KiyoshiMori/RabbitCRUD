import React from 'react';
import ReactDOM from 'react-dom';

import App from './client';

const render = Component => {
	ReactDOM.hydrate(
		<Component />,
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