import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Segment, Grid, Form, Header, Button, Divider, Message } from 'semantic-ui-react';

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
		touched: [],
	};

	handleInput = (e, { name, value }) => this.setState({ [name]: value });

	handleTouched = name => {
		this.setState(state => ({
			touched: {
				...state.touched,
				[name]: true,
			},
		}));
	};

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
		const { login, password, touched } = this.state;
		const { loggined } = this.props;

		return (
			<Grid centered>
				<Grid.Column width={6}>
					<Segment
						// textAlign="center"
					>
						<Mutation
							mutation={loginMutation}
						>
							{(loginUser, { loading, error }) => {
								return (
									<Form
										error={!!error}
										onSubmit={() => this.handleLogin(loginUser)}
									>
										<Form.Input
											label="Login"
											placholder="Login input.."
											name="login"
											value={login}
											onChange={this.handleInput}
											onBlur={() => this.handleTouched('login')}
											error={touched?.login && !login}
										/>
										<Form.Input
											label="Password"
											placholder="Login input.."
											type="password"
											name="password"
											value={password}
											onChange={this.handleInput}
											onBlur={() => this.handleTouched('password')}
											error={touched?.password && !password}
										/>
										<Divider/>
										<Grid.Column verticalAlign="bottom">
											<Fragment>
												<Button
													disabled={!login || !password}
													loading={loading}
													size="large"
												>
													Login
												</Button>
												{error && (
													<Message
														error
														header="Error"
														content="Bad credentials."
													/>
												)}
											</Fragment>
										</Grid.Column>
									</Form>
								);
							}}
						</Mutation>
					</Segment>
				</Grid.Column>
			</Grid>
		);
	}
}
