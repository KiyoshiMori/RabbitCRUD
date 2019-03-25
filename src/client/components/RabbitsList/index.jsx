import React, { Component } from 'react';

import { Card, Image } from 'semantic-ui-react';

export default class RabbitList extends Component {
	render() {
		const { list } = this.props;

		if (!list) return 'woops';

		return (
			<Card.Group>
				<Card>
					<Image src="https://www.pngarts.com/files/3/Plus-Symbol-PNG-Image-with-Transparent-Background.png" />
				</Card>
				{list.map(rabbit => (
					<Card>
						<Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
						<Card.Content>
							<Card.Header>{rabbit.name}</Card.Header>
							<Card.Meta>
								<span>{rabbit.weight}</span>
							</Card.Meta>
						</Card.Content>
					</Card>
				))}
			</Card.Group>
		);
	}
}
