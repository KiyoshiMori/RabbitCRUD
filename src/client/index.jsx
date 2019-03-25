import React, { Component } from 'react';
import gql from 'graphql-tag';
import jwt from 'jsonwebtoken';
import { Switch, Route, Redirect } from 'react-router';

import { Container } from 'semantic-ui-react';
import Header from './components/Header';
import MainPage from './containers/MainPage';
import LoginPage from './containers/LoginPage';

const testQuery = gql`
query Test($text: String) {
	test(input: { text: $text }) {
		Answer
	}
}
`;

const testMutationQuery = gql`
mutation TestMutation($newText: String) {
	testMutation(input: { newText: $newText }) {
		response
	}
}
`;

export default class extends Component {
	state = {
		text: 'tester',
		loggined: false,
	};

	componentWillMount() {
		const token = global.localStorage.getItem('token');
		if (token) {
			const currentTime = new Date().getTime() / 1000;
			const expTime = jwt.decode(token)?.exp;
			if (currentTime < expTime) {
				this.login();
			} else {
				this.logout();
			}
		}
	}

	login = () => this.setState({ loggined: true });

	logout = () => {
		this.setState({ loggined: false });
		localStorage.removeItem('token');
	};

	LoginCheck = (Component, loggined, link = '/login') => {

		if (loggined) return Component;

		return <Redirect to={link} />;
	};

	render() {
		const { loggined } = this.state;
		console.log(this.props);

		return (
			<Container>
				<Header loggined={loggined} logout={this.logout} />
				<Switch>
					<Route
						path="/login"
						render={() => this.LoginCheck(<LoginPage login={this.login} loggined={loggined} />, !loggined, '/list')}
					/>
					<Route
						path="/list"
						render={() => this.LoginCheck(<MainPage loggined={loggined} />, loggined)}
					/>
					<Route render={() => <Redirect to="/login"/>} />
				</Switch>
			</Container>
		);
	}
}
