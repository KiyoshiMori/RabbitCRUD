import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const testQuery = gql`
{
	test(input: { text: "test1" }) {
		Answer
	}
}
`;

export default class extends Component {
	render() {
		return (
			<div>
				<Query
					query={testQuery}
					ssr={false}
				>
					{({ loading, error, data }) => {
						if (loading) return <h1>Loading...</h1>;
						if (error) return <h1>Error: {error}</h1>;

						return <h1>{data?.test?.Answer}</h1>
					}}
				</Query>
			</div>
		)
	}
}