import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import RabbitsList from '../../components/RabbitsList';

export default class HeaderComponent extends Component {
	state = {
		rabbits: [
			{
				name: 'rabbit1',
				weight: 5.5,
			},
			{
				name: 'rabbit2',
				weight: 8.1,
			},
		],
	};

	render() {
		const { rabbits } = this.state;
		return (
			<Segment>
				<Grid
					columns={3}
				>
					<Grid.Row centered>
						<RabbitsList list={rabbits} />
					</Grid.Row>
				</Grid>
			</Segment>

		);
	}
}