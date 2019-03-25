import React, { Component } from 'react';
import { Header, Menu } from 'semantic-ui-react';

export default class HeaderComponent extends Component {
	render() {
		const { loggined, logout } = this.props;

		return (
			<Menu size="large">
				<Menu.Menu position="right">
					{loggined ? (
						<Menu.Menu>
							<Menu.Item>
								Hello, Tester!
							</Menu.Item>
							<Menu.Item onClick={logout}>
								Logout
							</Menu.Item>
						</Menu.Menu>
					) : (
						<Menu.Item>
							Login
						</Menu.Item>
					)}
				</Menu.Menu>
			</Menu>
		);
	}
}
