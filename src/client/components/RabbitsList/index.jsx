import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { Card, Image, Icon, Modal, Input, Button, Divider, Header } from 'semantic-ui-react';
import { getRabbitsQuery, createRabbitsQuery, editRabbitsQuery } from '../../../lib/graphql/queries/UserQueries';

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
		selectedRabbit: null,
		edit: false,
	};

	handleInput = e => this.setState({ [e.target.name]: e.target.value });

	handleOpen = params => this.setState({ modalOpened: true, ...params });

	handleClose = () => this.setState({ modalOpened: false, rabbitName: '', rabbitWeight: '', selectedRabbit: null, edit: false });

	handleCreateRabbit = async fn => {
		const { rabbitWeight, rabbitName } = this.state;

		await fn({
			variables: {
				token: localStorage.getItem('token'),
				weight: rabbitWeight,
				name: rabbitName,
			},
		});

		this.setState({ rabbitName: '', rabbitWeight: '' })
	};

	handleEditRabbit = async fn => {
		const { rabbitWeight, rabbitName, selectedRabbit } = this.state;

		await fn({
			variables: {
				token: localStorage.getItem('token'),
				weight: rabbitWeight,
				name: rabbitName,
				id: selectedRabbit,
			},
		});

		this.setState({ rabbitName: '', rabbitWeight: '', selectedRabbit: null });
	};

	weightCheck = e => {
		const { rabbitWeight } = this.state;

		if (Number(rabbitWeight) > e.target.max) return this.setState({ rabbitWeight: e.target.max });
		if (Number(rabbitWeight) < e.target.min) return this.setState({ rabbitWeight: e.target.min });
	};

	render() {
		const { list, deleteRabbit } = this.props;
		const { modalOpened, rabbitName, rabbitWeight, edit } = this.state;

		if (!list) return <h1>woops</h1>;

		return (
			<Card.Group>
				<Modal
					open={modalOpened}
					onClose={this.handleClose}
					size="small"
				>
					<Modal.Header>Create a rabbit</Modal.Header>
					<Modal.Content image>
						<Image wrapped size="medium" src="/static/rabbit.png" />
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
								onBlur={this.weightCheck}
								name="rabbitWeight"
								value={rabbitWeight}
								type="number"
								min={0.1}
								max={10}
								step={0.1}
							/>
							<Divider />
							<Mutation
								mutation={edit ? editRabbitsQuery : createRabbitsQuery }
								refetchQueries={[{
									query: getRabbitsQuery,
									variables: { token: localStorage.getItem('token') },
								}]}
								onCompleted={this.handleClose}
							>
								{rabbitFn => (
									<Button
										onClick={() => {
											if (edit) {
												this.handleEditRabbit(rabbitFn);
											} else {
												this.handleCreateRabbit(rabbitFn);
											}
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
					<Card.Content>
						<Image src="/static/plus.png" />
					</Card.Content>
				</Card>
				{list.map(rabbit => (
					<Card key={rabbit.id}>
						<Image src="/static/rabbit.png" />
						<Card.Content>
							<Card.Header>{rabbit.name}</Card.Header>
							<Card.Meta>
								<span>Weight: {rabbit.weight}</span>
							</Card.Meta>
							<Card.Content
								extra
								onClick={() => this.handleOpen({
									selectedRabbit: rabbit.id,
									rabbitName: rabbit.name,
									rabbitWeight: rabbit.weight,
									edit: true,
								})}
							>
								<a>
									<Icon name="edit" />
									edit
								</a>
							</Card.Content>
							<Mutation
								mutation={deleteRabbitMutation}
								refetchQueries={[{
									query: getRabbitsQuery,
									variables: { token: localStorage.getItem('token') },
								}]}
							>
								{fn => (
									<Card.Content extra onClick={() => deleteRabbit(fn, rabbit)}>
										<Header as="a" size="tiny" color="red">
											<Icon name='remove' />
											delete
										</Header>
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
