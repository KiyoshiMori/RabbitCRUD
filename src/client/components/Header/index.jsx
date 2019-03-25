import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import { Header, Menu } from 'semantic-ui-react';

export default class HeaderComponent extends Component {
	render() {
		const { loggined, logout } = this.props;
		const username = jwt.decode(localStorage.getItem('token'))?.username;

		return (
			<Menu size="large">
				<Menu.Menu position="right">
					{loggined ? (
						<Menu.Menu>
							<Menu.Item>
								Hello, {username}!
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
