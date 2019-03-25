import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { Card, Image, Icon, Modal, Input, Button, Divider } from 'semantic-ui-react';
import { getRabbitsQuery, createRabbitsQuery } from '../../../lib/graphql/queries/UserQueries';

const deleteRabbitMutation = gql`
mutation DeleteRabbit($token: String, $name: String, $weight: String, $id: Int) {
	deleteRabbit(input: { token: $token, name: $name, weight: $weight, id: $id }) {
		response
	}
}
`;

export default class RabbitList extends Component {
	state = {
		modalOpened: false,
		rabbitName: '',
		rabbitWeight: '',
	};

	handleInput = e => this.setState({ [e.target.name]: e.target.value });

	handleOpen = () => this.setState({ modalOpened: true });

	handleClose = () => this.setState({ modalOpened: false });

	render() {
		const { list, deleteRabbit } = this.props;
		const { modalOpened, rabbitName, rabbitWeight } = this.state;

		if (!list) return <h1>woops</h1>;

		return (
			<Card.Group>
				<Modal
					open={modalOpened}
					onClose={this.handleClose}
					size='small'
				>
					<Modal.Header>Create a rabbit</Modal.Header>
					<Modal.Content image>
						<Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
						<Modal.Description>
							<h1>Name</h1>
							<Input
								onChange={this.handleInput}
								name="rabbitName"
								value={rabbitName}
							/>
							<h1>Weight</h1>
							<Input
								onChange={this.handleInput}
								name="rabbitWeight"
								value={rabbitWeight}
							/>
							<Divider />
							<Mutation
								mutation={createRabbitsQuery}
								refetchQueries={[{
									query: getRabbitsQuery,
									variables: { token: localStorage.getItem('token') },
								}]}
								onCompleted={this.handleClose}
							>
								{createRabbit => (
									<Button
										onClick={() => {
											createRabbit({
												variables: {
													token: localStorage.getItem('token'),
													weight: rabbitWeight,
													name: rabbitName,
												},
											});
											this.setState({ rabbitName: '', rabbitWeight: '' })
										}}
									>
										Save
									</Button>
								)}
							</Mutation>
						</Modal.Description>
					</Modal.Content>
				</Modal>
				<Card
					onClick={() => {
						this.handleOpen();
					}}
				>
					<Image src="https://www.pngarts.com/files/3/Plus-Symbol-PNG-Image-with-Transparent-Background.png" />
				</Card>
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
