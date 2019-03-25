import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Segment, Grid } from 'semantic-ui-react';
import RabbitsList from '../../components/RabbitsList';

import { getRabbitsQuery } from '../../../lib/graphql/queries/UserQueries';

export default class MainPage extends Component {
	deleteRabbit = async (fn, rabbit) => {
		const token = localStorage.getItem('token');
		const { id, name, weight } = rabbit;
		const res = await fn({
			variables: {
				name,
				weight,
				id,
				token,
			},
		});

		console.log({ res });
	};

	render() {
		const { loggined } = this.props;

		console.log(loggined);

		if (!loggined) return <h1>You are not loggined!</h1>;

		return (
			<Query
				query={getRabbitsQuery}
				variables={{ token: localStorage.getItem('token') }}
			>
				{({ loading, data }) => {
					return (
						<Segment loading={loading}>
							<Grid
								columns={3}
							>
								<Grid.Row centered>
									<RabbitsList list={data?.getRabbitsList} deleteRabbit={this.deleteRabbit} />
								</Grid.Row>
							</Grid>
						</Segment>
					);
				}}
			</Query>
		);
	}
}