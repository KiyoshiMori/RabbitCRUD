import React, { Component } from 'react';
import { Header, Menu } from 'semantic-ui-react';

export default class HeaderComponent extends Component {
	render() {
		return (
			<Menu size="large">
				<Menu.Menu position="right">
					<Menu.Item>
						Hello, Tester!
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		);
	}
}
