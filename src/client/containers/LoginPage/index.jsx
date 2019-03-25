import React, { Component } from 'react';
import { Segment, Grid, Input, Header, Button, Divider } from 'semantic-ui-react';

export default class LoginPage extends Component {
	render() {
		return (
			<Grid centered>
				<Grid.Column width={6}>
					<Segment
						textAlign="center"
					>
						<Header>Login</Header>
						<Input placholder="Login input.."/>
						<Header>Password</Header>
						<Input placholder="Login input.." type="password"/>
						<Divider />
						<Grid.Column verticalAlign="bottom">
							<Button size="large">Login</Button>
						</Grid.Column>
					</Segment>
				</Grid.Column>
			</Grid>
		);
	}
}
