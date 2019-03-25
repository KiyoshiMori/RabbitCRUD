import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Segment, Grid, Input, Header, Button, Divider } from 'semantic-ui-react';

const loginMutation = gql`
	mutation Login($login: String, $password: String) {
		login(input: { login: $login, password: $password }) {
			token
		}
	}
`;

export default class LoginPage extends Component {
	state = {
		login: '',
		password: '',
	};

	handleInput = e => this.setState({ [e.target.name]: e.target.value });

	handleLogin = async fn => {
		const { login, password } = this.state;
		const { login: loginUser } = this.props;
		const { data } = await fn({ variables: { login, password } });

		console.log({ data });

		const token = data?.login?.token;

		if (token) {
			localStorage.setItem('token', token);
			this.setState({
				login: '',
				password: '',
			});
			loginUser();
		}
	};

	render() {
		const { login, password } = this.state;
		const { loggined } = this.props;

		return (
			<Grid centered>
				<Grid.Column width={6}>
					<Segment
						textAlign="center"
					>
						<Header>Login</Header>
						<Input
							placholder="Login input.."
							name="login"
							value={login}
							onChange={this.handleInput}
						/>
						<Header>Password</Header>
						<Input
							placholder="Login input.."
							type="password"
							name="password"
							value={password}
							onChange={this.handleInput}
						/>
						<Divider />
						<Grid.Column verticalAlign="bottom">
							<Mutation
								mutation={loginMutation}
							>
								{(loginUser, { loading, error }) => {
									console.log({ error });

									return (
										<Button
											loading={loading}
											size="large"
											onClick={() => this.handleLogin(loginUser)}
										>
											Login
										</Button>
									);
								}}
							</Mutation>
						</Grid.Column>
						{loggined && (
							<h1>
								You are loggined!
							</h1>
						)}
					</Segment>
				</Grid.Column>
			</Grid>
		);
	}
}
