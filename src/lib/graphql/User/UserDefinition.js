export default `
	input loginInput {
		login: String
		password: String
	}
	
	type loginResponse {
		token: String
	}
	
	input getRabbitsInput {
		token: String
	}
	
	type getRabbitsResponse {
		id: Int
		name: String
		weight: String
	}
	
	input rabbitInput {
		id: Int
		name: String
		weight: String
		token: String
	}
	
	type rabbitResponse {
		response: String
	}
	
	extend type Query {
		getRabbitsList(input: getRabbitsInput): [getRabbitsResponse]
	}
	
	extend type Mutation {
		createRabbit(input: rabbitInput): rabbitResponse
		deleteRabbit(input: rabbitInput): rabbitResponse
		login(input: loginInput): loginResponse
	}
`;