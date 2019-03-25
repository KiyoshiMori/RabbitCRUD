import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { Card, Image, Icon } from 'semantic-ui-react';
import { getRabbitsQuery, createRabbitsQuery } from '../../../lib/graphql/queries/UserQueries';

const deleteRabbitMutation = gql`
mutation DeleteRabbit($token: String, $name: String, $weight: String, $id: Int) {
	deleteRabbit(input: { token: $token, name: $name, weight: $weight, id: $id }) {
		response
	}
}
`;

export default class RabbitList extends Component {
	render() {
		const { list, deleteRabbit } = this.props;

		if (!list) return 'woops';

		return (
			<Card.Group>
				<Mutation
					mutation={createRabbitsQuery}
					refetchQueries={[{
						query: getRabbitsQuery,
						variables: { token: localStorage.getItem('token') },
					}]}
				>
					{createRabbit => (
						<Card
							onClick={() => {
								createRabbit({
									variables: {
										token: localStorage.getItem('token'),
										weight: '7.4',
										name: 'testRabbit',
									},
								});
							}}
						>
							<Image src="https://www.pngarts.com/files/3/Plus-Symbol-PNG-Image-with-Transparent-Background.png" />
						</Card>
					)}
				</Mutation>
				{list.map(rabbit => (
					<Card key={rabbit.id}>
						<Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
						<Card.Content>
							<Card.Header>{rabbit.name}</Card.Header>
							<Card.Meta>
								<span>{rabbit.weight}</span>
							</Card.Meta>
							<Mutation
								mutation={deleteRabbitMutation}
								refetchQueries={[{
									query: getRabbitsQuery,
									variables: { token: localStorage.getItem('token') },
								}]}
							>
								{fn => (
									<Card.Content extra onClick={() => deleteRabbit(fn, rabbit)}>
										<a>
											<Icon name='remove' />
											delete
										</a>
									</Card.Content>
								)}
							</Mutation>
						</Card.Content>
					</Card>
				))}
			</Card.Group>
		);
	}
}
