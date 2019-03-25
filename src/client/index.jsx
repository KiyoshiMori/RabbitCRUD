import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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
	};

	render() {
		const { text, rabbits } = this.state;
		console.log(this.props);

		return (
			<Container>
				<Header />
				<LoginPage />
			</Container>
		);
	}
}
