import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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
		const { text } = this.state;
		console.log(this.props);

		return (
			<div>
				<Query
					query={testQuery}
					ssr={false}
					variables={{ text }}
				>
					{({ loading, error, data }) => {
						console.log({ data });
						if (loading) return <h1>Loading...</h1>;
						if (error) return <h1>Error: {error}</h1>;

						return <h1>{data?.test?.Answer}</h1>
					}}
				</Query>
				<Mutation
					mutation={testMutationQuery}
					refetchQueries={() => {
						console.log('REFETCH');
						this.setState({ text: 'mutated' });
						return [{
							query: testQuery,
							variables: { text: 'mutated' }
						}]
					}}
					awaitRefetchQueries={true}
				>
					{testMutate => (
						<button
							onClick={() => testMutate({
								variables: {
									newText: 'tester2!',
								}
							})}
						>
							Test mutation
						</button>
					)}
				</Mutation>
				<button onClick={() => this.setState({ text: 'tester2!' })}>Change name</button>
			</div>
		)
	}
}